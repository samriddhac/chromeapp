app.directive('thumbnailmedia', function(){
    return {
      restrict:'E',
      scope: true,
      templateUrl:'templates/thumbnailMediaViewer.html',
      link:function(scope,element, attrs){
          //Some of the functions from ApplicationController will be moved here.--Need to do Priority 2 item.

          scope.loadMedia = function(item) {
              var newVideoUrl = Constants._YOUTUBE_VIDEO_BASE_URL+item.itemId;
              document.querySelector('#mediaViewer').setAttribute(
                  'src', newVideoUrl);
          };
      }
    }
});