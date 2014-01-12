function URLUtil(){}

URLUtil.getYouTubeSubscriptionURL = function(){
    var url = Constants._YOUTUBE_DATA_API_BASE_URL+"youtube/v3/subscriptions?part=snippet&maxResults=50&mine=true";
    return url;
};

URLUtil.getMyChannelURL = function(){
    var url = Constants._YOUTUBE_DATA_API_BASE_URL+"youtube/v3/channels?part=snippet,contentDetails&maxResults=50&mine=true";
    return url;
};


URLUtil.getPlayListURL = function(playListId){
    var url = Constants._YOUTUBE_DATA_API_BASE_URL+"youtube/v3/playlistItems?part=snippet&maxResults=50&&playlistId="+playListId;
    return url;
};
