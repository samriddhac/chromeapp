app.controller('ApplicationController', function ($scope, AbstractClientFactory){

    $scope.listResult = [];
    $scope.thumbnailResult = [];
    $scope.mediaList = [];

    $scope.selectedListItem = undefined;
    $scope.selectedMedia = undefined;

    /*Youtube specific variables*/
    $scope.googlePlusId = '';
    $scope.personalPlaylist = undefined;

    var googleClientFactory = AbstractClientFactory.factoryInstance(Constants.SERVICE_PROVIDER_GOOGLE);
    var youtubeClientFactory = AbstractClientFactory.factoryInstance(Constants.SERVICE_PROVIDER_YOUTUBE);
    var webRtcClientFactory = undefined;

    $scope.authenticate = function(interactive) {
        if (!googleClientFactory._AUTH_TOKEN) {
            googleClientFactory.authenticate(interactive, function() {
                console.log('Authentication Successful..')
            });
        } else {
            googleClientFactory.revokeAuthToken(function() {});
        }
    }

    $scope.isSelectedListItem = function(item){
        if(item === $scope.selectedListItem){
            return true;
        }
        return false;
    }

    $scope.initYouTubeGallary = function() {
        $scope.showMyyoutube = 1;
        $scope.listResult = $scope.youtubeGallaryList;
    };

    $scope.initMyVideosGallary = function() {
        $scope.showMyVideo = 1;
        $scope.listResult = $scope.myVideoList;
        webRtcClientFactory = AbstractClientFactory.factoryInstance(Constants.MEDIA_PROVIDER_WEBRTC);
        if(webRtcClientFactory.isWebRTCEnabled){
            console.log('Web RTC Enabled!!');
        }
    };

    $scope.initSubscription = function(opt_callback) {
        $scope.currentView = Constants._LOADER_VIEW;
        youtubeClientFactory.initSubscription(function(response){
            $scope.thumbnailResult = $scope.copyListViewerObjectModel(response.items);
            $scope.currentView = Constants._THUMBNAIL_VIEW;
            opt_callback && opt_callback();
        }, null);
    };

    $scope.initChannels = function(opt_callback) {
        $scope.currentView = Constants._LOADER_VIEW;
        youtubeClientFactory.initChannels(function(response){
            $scope.personalPlaylist = response.items[0].contentDetails.relatedPlaylists;
            $scope.thumbnailResult = $scope.copyListViewerObjectModel(response.items);
            $scope.currentView = Constants._THUMBNAIL_VIEW;
            opt_callback && opt_callback();
        }, null);
    };

    $scope.initYoutubeChannelGuide = function(channelName) {
        $scope.currentView = Constants._LOADER_VIEW;
        $scope.selectedListItem = channelName;
        if(Util.isNullObject($scope.personalPlaylist)){
            youtubeClientFactory.initChannels(function(response){
                $scope.personalPlaylist = response.items[0].contentDetails.relatedPlaylists;
                $scope.loadYoutubeGuide(channelName);
            }, null);
        }
        else {
            $scope.loadYoutubeGuide(channelName);
        }
    };

    $scope.loadYoutubeGuide = function(channelName){
        switch (channelName) {
            case Constants._CHANNEL_SUBSCRIPTIONS : {
                $scope.initSubscription($scope.loadImages);
                break;
            }
            case Constants._MY_CHANNEL : {
                $scope.initChannels($scope.loadImages);
                break;
            }
            case Constants._MY_RECENT_ACTIVITY : {
                $scope.initRecentActivity($scope.loadImages);
                break;
            }
            case Constants._CHANNEL_FAVOURITES : {
                $scope.loadChannel($scope.personalPlaylist.favorites, $scope.loadImages);
                break;
            }
            case Constants._CHANNEL_HISTORY : {
                $scope.loadChannel($scope.personalPlaylist.watchHistory, $scope.loadImages);
                break;
            }
            case Constants._CHANNEL_LIKES : {
                $scope.loadChannel($scope.personalPlaylist.likes, $scope.loadImages);
                break;
            }
            case Constants._CHANNEL_UPLOAD : {
                $scope.loadChannel($scope.personalPlaylist.uploads, $scope.loadImages);
                break;
            }
            case Constants._CHANNEL_WATCH_LATER : {
                $scope.loadChannel($scope.personalPlaylist.watchLater, $scope.loadImages);
                break;
            }

        }
    };

    $scope.loadChannel = function(channelId, opt_callback) {
        youtubeClientFactory.loadChannel(channelId, function(response){
            $scope.thumbnailResult = $scope.copyListViewerObjectModel(response.items);
            $scope.currentView = 3;
            opt_callback && opt_callback();
        }, null);
    };

    $scope.call = function(el,arguments) {
        if(!Util.isNullObject(arguments)){
            el.clickFunctionReference(arguments);
        }
        else {
            el.clickFunctionReference();
        }

    };


    $scope.youtubeGallaryList = [
        {
            title:"What to watch",
            name:Constants._CHANNEL_WHAT_TO_WATCH,
            desc:"What to watch",
            thumbnail:"../image/icons/pixel.gif",
            imageClass:"thumb what-to-watch-icon",
            clickFunctionReference:$scope.initYoutubeChannelGuide
        },
        {
            title:"Subscriptions",
            name:Constants._CHANNEL_SUBSCRIPTIONS,
            desc:"My Youtube Subscriptions",
            thumbnail:"../image/icons/pixel.gif",
            imageClass:"thumb my-subscriptions-icon",
            clickFunctionReference:$scope.initYoutubeChannelGuide
        },
        {
            title:"Channels",
            name:Constants._MY_CHANNEL,
            desc:"My Youtube Channels",
            thumbnail:"../image/icons/pixel.gif",
            imageClass:"thumb my-channel-icon",
            clickFunctionReference:$scope.initYoutubeChannelGuide
        },
        {
            title:"Recent Activity",
            name:Constants._MY_RECENT_ACTIVITY,
            desc:"My Youtube Activity",
            thumbnail:"../image/icons/pixel.gif",
            imageClass:"thumb what-to-watch-icon",
            clickFunctionReference:$scope.initYoutubeChannelGuide
        },
        {
            title:"Favourites",
            name:Constants._CHANNEL_FAVOURITES,
            desc:"My Youtube Favourites",
            thumbnail:"../image/icons/pixel.gif",
            imageClass:"thumb what-to-watch-icon",
            clickFunctionReference:$scope.initYoutubeChannelGuide
        },
        {
            title:"Likes",
            name:Constants._CHANNEL_LIKES,
            desc:"My Youtube Social",
            thumbnail:"../image/icons/pixel.gif",
            imageClass:"thumb social-icon",
            clickFunctionReference:$scope.initYoutubeChannelGuide
        },
        {
            title:"Watch Later",
            name:Constants._CHANNEL_WATCH_LATER,
            desc:"My Youtube Watch Later",
            thumbnail:"../image/icons/pixel.gif",
            imageClass:"thumb watch-later-icon",
            clickFunctionReference:$scope.initYoutubeChannelGuide
        },
        {
            title:"History",
            name:Constants._CHANNEL_HISTORY,
            desc:"My Youtube History",
            thumbnail:"../image/icons/pixel.gif",
            imageClass:"thumb history-icon",
            clickFunctionReference:$scope.initYoutubeChannelGuide
        },
        {
            title:"Uploads",
            name:Constants._CHANNEL_UPLOAD,
            desc:"My Youtube uploads",
            thumbnail:"../image/icons/pixel.gif",
            imageClass:"thumb purchases-icon",
            clickFunctionReference:$scope.initYoutubeChannelGuide
        }
    ];

    $scope.captureVideo = function(){
        $scope.currentView = Constants._MEDIA_VIEW;
        webRtcClientFactory.connectToMediaAdapters(function(stream) {
            var video = document.querySelector('#localMedia').src = stream;
            video.load();
        });
    };

    $scope.myVideoList = [
        {
            title:"Record a Video",
            name:Constants._RECORD_VIDEO,
            desc:"Record a Video",
            thumbnail:"../image/icons/pixel.gif",
            imageClass:"thumb what-to-watch-icon",
            clickFunctionReference:$scope.captureVideo
        }
    ];

    $scope.copyListViewerObjectModel = function(subscribtionResult){
        var objList = [];
        if(!Util.isNullObject(subscribtionResult)){
            for(var i=0;i<subscribtionResult.length;i++){
                var obj = {
                    id:subscribtionResult[i].id,
                    kind:subscribtionResult[i].kind,
                    title:subscribtionResult[i].snippet.title,
                    desc:subscribtionResult[i].snippet.description,
                    thumbnail:subscribtionResult[i].snippet.thumbnails.default.url,
                    imageUri:Constants.__DEFAULT_IMAGE_LOAD_URL,
                    clickFunctionReference: $scope.loadItem,
                    shareInFb:true,
                    shareInGp:true,
                    uploadInYoutube:false,
                    //itemId:(resourceId.channelId!==undefined)?resourceId.channelId:(resourceId.videoId!==undefined)?resourceId.videoId:undefined,
                    fbFunctionReference:'shareToFb()',
                    gpFunctionReference:'shareToGp()'
                };
                if(!Util.isNullObject(subscribtionResult[i].snippet.resourceId) && !Util.isNullObject(subscribtionResult[i].snippet.resourceId.channelId)){
                    obj.itemId = subscribtionResult[i].snippet.resourceId.channelId;
                }
                else if(!Util.isNullObject(subscribtionResult[i].snippet.resourceId) && !Util.isNullObject(subscribtionResult[i].snippet.resourceId.videoId)){
                    obj.itemId = subscribtionResult[i].snippet.resourceId.videoId;
                }
                objList.push(obj);
            }
        }
        return objList;
    }

    $scope.loadItem = function(catagory, item) {
        switch (catagory){
            case Constants._KIND_PLAYLIST_ITEM :
            {
                $scope.mediaList = $scope.thumbnailResult;
                $scope.selectedMedia = item;
                $scope.currentView = Constants._THUMBNAIL_MEDIA_PLAYER_VIEW;
                break;
            }
            default :{
                console.log('No view available');
            }
        }
    }

    $scope.loadImages = function() {
        if(!Util.isEmptyList($scope.thumbnailResult)) {
            for(var i=0;i<$scope.thumbnailResult.length;i++){
                var thumbnailObj = $scope.thumbnailResult[i];
                if(thumbnailObj.thumbnail && thumbnailObj.imageUri === Constants.__DEFAULT_IMAGE_LOAD_URL) {
                    Util.loadImage(thumbnailObj.thumbnail, function(blob_uri, requested_uri) {
                        $scope.$apply(function(scope) {
                            for (var k=0; k<scope.thumbnailResult.length; k++) {
                                if (scope.thumbnailResult[k].thumbnail === requested_uri) {
                                    scope.thumbnailResult[k].imageUri = blob_uri;
                                }
                            }
                        });
                    });
                }
            }
        }
    };
});

