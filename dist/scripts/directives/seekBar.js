(function() {
   function seekBar() {
       return {
           templateUrl: '/templates/directives/seek_bar.html',
           replace: true,
           restrict: 'E',
           scope: {},
           link: function(scope, element, attributes) {
             
           }
       };
  }

  angular
      .module('blocJams')
      .directive('seekBar', seekBar);
})();
