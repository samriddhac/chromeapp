app.factory('YoutubeClientFactory', ['HttpClientFactory', 'GoogleClientFactory', function(HttpClientFactory,GoogleClientFactory){
    return {
        initSubscription:function(successCallBack, failureCallBack){
            HttpClientFactory.makeRequest(URLUtil.getYouTubeSubscriptionURL(), Constants.HTTP_METHOD_GET, GoogleClientFactory.getAuthConfig(), null, successCallBack, failureCallBack);
        },
        initChannels:function(successCallBack, failureCallBack) {
            HttpClientFactory.makeRequest(URLUtil.getMyChannelURL(), Constants.HTTP_METHOD_GET, GoogleClientFactory.getAuthConfig(), null, successCallBack, failureCallBack);
        },
        loadChannel:function(channelId,successCallBack, failureCallBack){
            HttpClientFactory.makeRequest(URLUtil.getPlayListURL(channelId), Constants.HTTP_METHOD_GET, GoogleClientFactory.getAuthConfig(), null, successCallBack, failureCallBack);
        }
    }
}]);