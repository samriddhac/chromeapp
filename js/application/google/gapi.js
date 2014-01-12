/**
 * Created by Samriddha on 18/12/13.
 */
var authObject = {};

function loadGapi(){
    gapi.client.setApiKey(apiKey);
    checkAuthentication();
}
function checkAuthentication(){
    gapi.auth.authorize({client_id: client_id, scope: apiScope, immediate: true}, function(){
        var tokenObj = gapi.auth.getToken();
        authObject = {
            token:tokenObj.access_token,
            expiredAt:tokenObj.expires_at,
            expiredIn:tokenObj.expires_in
        };
        loadAPIInterfaces();
    });
}

function loadAPIInterfaces(){
    gapi.client.load('youtube', 'v3', function() {});
}

function getMySubscriptions() {
    var request = gapi.client.youtube.subscriptions.list({
        mine: true,
        part: 'snippet',
        maxResults:50
    });
    request.execute(function(response) {
        var youtubeSubsSectionDivScope = angular.element($('#thumbnailViewerId')).scope();
        youtubeSubsSectionDivScope.thumbnailResult = copyListViewerObjectModelSubs(response.items);
        youtubeSubsSectionDivScope.$apply();
    });
}

function getMyChannels() {
    var request = gapi.client.youtube.channels.list({
        mine: true,
        part: 'snippet,contentDetails',
        maxResults:50
    });
    request.execute(function(response) {
        var applicationScope = angular.element($('#thumbnailViewerId')).scope();
        applicationScope.googlePlusId = response.items[0].contentDetails.googlePlusUserId;
        applicationScope.personalPlaylist = response.items[0].contentDetails.relatedPlaylists;
        applicationScope.thumbnailResult = copyListViewerObjectModelSubs(response.items);
        applicationScope.$apply();
    });
}

function getMyRecentActivity() {
    var request = gapi.client.youtube.activities.list({
        mine: true,
        part: 'snippet',
        maxResults:50
    });
    request.execute(function(response) {
        var applicationScope = angular.element($('#thumbnailViewerId')).scope();
        applicationScope.thumbnailResult = copyListViewerObjectModelSubs(response.items);
        applicationScope.$apply();
    });
}

function getMyFavourites() {
    var applicationScope = angular.element($('#thumbnailViewerId')).scope();
    var playListId = '';
    if(!isNullObject(applicationScope.personalPlaylist)){
        playListId = applicationScope.personalPlaylist.favorites;
        var favRequest = gapi.client.youtube.playlistItems.list({
            mine: true,
            part: 'snippet',
            playlistId:playListId,
            maxResults:50
        });
        favRequest.execute(function(response) {
            applicationScope.thumbnailResult = copyListViewerObjectModelSubs(response.items);
            applicationScope.$apply();
        });
    }
    else {
        var request = gapi.client.youtube.channels.list({
            mine: true,
            part: 'contentDetails',
            maxResults:50
        });
        request.execute(function(response) {
            applicationScope.googlePlusId = response.items[0].contentDetails.googlePlusUserId;
            applicationScope.personalPlaylist = response.items[0].contentDetails.relatedPlaylists;
            playListId = response.items[0].contentDetails.relatedPlaylists.favorites;
            var favRequest = gapi.client.youtube.playlistItems.list({
                mine: true,
                part: 'snippet',
                playlistId:playListId,
                maxResults:50
            });
            favRequest.execute(function(response) {
                applicationScope.thumbnailResult = copyListViewerObjectModelSubs(response.items);
                applicationScope.$apply();
            });
        });
    }
}


function getMyHistory() {
    var applicationScope = angular.element($('#thumbnailViewerId')).scope();
    var playListId = '';
    if(!isNullObject(applicationScope.personalPlaylist)){
        playListId = applicationScope.personalPlaylist.watchHistory;
        var favRequest = gapi.client.youtube.playlistItems.list({
            mine: true,
            part: 'snippet',
            playlistId:playListId,
            maxResults:50
        });
        favRequest.execute(function(response) {
            applicationScope.thumbnailResult = copyListViewerObjectModelSubs(response.items);
            applicationScope.$apply();
        });
    }
    else {
        var request = gapi.client.youtube.channels.list({
            mine: true,
            part: 'contentDetails',
            maxResults:50
        });
        request.execute(function(response) {
            applicationScope.googlePlusId = response.items[0].contentDetails.googlePlusUserId;
            applicationScope.personalPlaylist = response.items[0].contentDetails.relatedPlaylists;
            playListId = response.items[0].contentDetails.relatedPlaylists.watchHistory;
            var favRequest = gapi.client.youtube.playlistItems.list({
                mine: true,
                part: 'snippet',
                playlistId:playListId,
                maxResults:50
            });
            favRequest.execute(function(response) {
                applicationScope.thumbnailResult = copyListViewerObjectModelSubs(response.items);
                applicationScope.$apply();
            });
        });
    }
}

function getMyWatchLater() {
    var applicationScope = angular.element($('#thumbnailViewerId')).scope();
    var playListId = '';
    if(!isNullObject(applicationScope.personalPlaylist)){
        playListId = applicationScope.personalPlaylist.watchLater;
        var favRequest = gapi.client.youtube.playlistItems.list({
            mine: true,
            part: 'snippet',
            playlistId:playListId,
            maxResults:50
        });
        favRequest.execute(function(response) {
            applicationScope.thumbnailResult = copyListViewerObjectModelSubs(response.items);
            applicationScope.$apply();
        });
    }
    else {
        var request = gapi.client.youtube.channels.list({
            mine: true,
            part: 'contentDetails',
            maxResults:50
        });
        request.execute(function(response) {
            applicationScope.googlePlusId = response.items[0].contentDetails.googlePlusUserId;
            applicationScope.personalPlaylist = response.items[0].contentDetails.relatedPlaylists;
            playListId = response.items[0].contentDetails.relatedPlaylists.watchLater;
            var favRequest = gapi.client.youtube.playlistItems.list({
                mine: true,
                part: 'snippet',
                playlistId:playListId,
                maxResults:50
            });
            favRequest.execute(function(response) {
                applicationScope.thumbnailResult = copyListViewerObjectModelSubs(response.items);
                applicationScope.$apply();
            });
        });
    }
}