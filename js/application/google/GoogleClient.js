function GoogleClient() {

    var _AUTH_TOKEN;

    this.__defineGetter__(_AUTH_TOKEN, function(){
        return _AUTH_TOKEN;
    });

    GoogleClient.prototype.authenticate = function(interactive, callback) {
        try{
            chrome.identity.getAuthToken({interactive:interactive}, function(token){
                if(token){
                    _AUTH_TOKEN = token;
                    callback && callback();
                }
            }.bind(this)
            );
        }
        catch(e) {
            console.log(chrome.runtime.lastError);
        }
    }

    GoogleClient.prototype.removeCachedAuthToken = function(opt_callback) {
        if (_AUTH_TOKEN) {
            var accessToken = _AUTH_TOKEN;
            _AUTH_TOKEN = null;
            // Remove token from the token cache.
            chrome.identity.removeCachedAuthToken({
                token: _AUTH_TOKEN
            }, function() {
                opt_callback && opt_callback();
            });
        } else {
            opt_callback && opt_callback();
        }
    };


    GoogleClient.prototype.revokeAuthToken = function(callback) {
        if (_AUTH_TOKEN) {
            // Make a request to revoke token
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' +
                _AUTH_TOKEN);
            xhr.send();
            //this.removeCachedAuthToken(opt_callback);
        }
    };

    GoogleClient.prototype.getAuthConfig =  function() {
        var config = {
            params: {'alt': 'json'},
            headers: {
                'Authorization': 'Bearer ' + _AUTH_TOKEN
            }
        };
        return config;
    };

}