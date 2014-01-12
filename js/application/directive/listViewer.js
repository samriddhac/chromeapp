app.directive("listviewer", function(){
    return {
        restrict:'E',
        scope:true,
        templateUrl:'templates/listViewer.html',
        link: function(scope, element, attrs) {
            //Some of the functions from ApplicationController will be moved here.--Need to do Priority 2 item.
        }
    };
})