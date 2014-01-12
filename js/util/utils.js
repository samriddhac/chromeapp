function Util() {};

Util.isNullObject = function(obj) {
    if(obj===null || obj===undefined)
        return true;
    return false;
}

Util.isEmptyList = function(objList) {
    if(objList===null || objList===undefined || objList.length===0)
        return true;
    return false;
}

Util.getTrustedThumbnail = function(thumbnail){
    return thumbnail;
}

Util.loadImage =function(uri, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        callback(window.webkitURL.createObjectURL(xhr.response), uri);
    }
    xhr.open('GET', uri, true);
    xhr.send();
}

