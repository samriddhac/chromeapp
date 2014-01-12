//This is the abstraction factory for all the factories.
app.factory('AbstractClientFactory', ['GoogleClientFactory','YoutubeClientFactory', function(GoogleClientFactory, YoutubeClientFactory){
    return {
        factoryInstance:function(factoryName){
            switch(factoryName) {
                case Constants.SERVICE_PROVIDER_GOOGLE :{
                    return GoogleClientFactory;
                }
                case Constants.SERVICE_PROVIDER_YOUTUBE :{
                    return YoutubeClientFactory;
                }
            }
        }
    }
}]);