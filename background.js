chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('html/index.html', {
        'bounds': {
            'width': 1110,
            'height': 600
        },
        minWidth: 1110,
        maxHeight: 600
        //frame: 'none'
    });
});