//This is the abstraction factory for all the factories.
app.factory('AbstractClientFactory', ['GoogleClientFactory','YoutubeClientFactory', 'WebRTCClientFactory', function(GoogleClientFactory, YoutubeClientFactory, WebRTCClientFactory){
    return {
        factoryInstance:function(factoryName){
            switch(factoryName) {
                case Constants.SERVICE_PROVIDER_GOOGLE :{
                    return GoogleClientFactory;
                }
                case Constants.SERVICE_PROVIDER_YOUTUBE :{
                    return YoutubeClientFactory;
                }
                case Constants.MEDIA_PROVIDER_WEBRTC :{
                    return WebRTCClientFactory;
                }
            }
        }
    }
}]);