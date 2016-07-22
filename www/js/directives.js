angular.module('terminus.directives', ['terminus.config'])

.directive('destinationsFilter', function() {
  return {
    restrict: 'E',
    templateUrl: '../views/destinations/filter.html',
    controller: function ($scope, $attrs) {
      console.log("ANDA");
      console.log($scope.data.from);
      console.log($attrs);
    }
  };
})