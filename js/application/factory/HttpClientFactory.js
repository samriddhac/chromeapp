app.factory('HttpClientFactory', ['$http', function($http){
    return {
        makeRequest:function(url, method, headerConfig, requestBody, successCallback, opt_failureCallBack) {
            switch(method){
                case Constants.HTTP_METHOD_GET : {
                    $http.get(url,headerConfig).success(function(response){
                        successCallback(response);
                    })
                    .error(function(response){
                        opt_failureCallBack && opt_failureCallBack(response);
                    })
                    break;
                }
                case Constants.HTTP_METHOD_POST : {
                    break;
                }
                case Constants.HTTP_METHOD_PUT : {
                    break;
                }
                case Constants.HTTP_METHOD_DELETE : {
                    break;
                }
                default :{
                    console.log('Invalid method');
                }
            }
        }
    }
}]);