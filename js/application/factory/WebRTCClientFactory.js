app.factory('WebRTCClientFactory', function(){
    return {
        isWebRTCEnabled:function(){
            if(navigator.getUserMedia || navigator.webkitGetUserMedia){
                return true;
            }
            return false;
        },
        connectToMediaAdapters:function(successCallback, failureCallback){
            if(navigator.getUserMedia || navigator.webkitGetUserMedia) {
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
            }
            navigator.getUserMedia({"audio":true, "video":true}, function(stream){
                successCallback(URL.createObjectURL(stream));;
            }, function(error){
                failureCallback();
                trace("navigator.getUserMedia error: ", error);
            });
        }
    }
});