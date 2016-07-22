angular.module('terminus.directives', ['terminus.config'])

.directive('destinationsFilter', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/destinations/filter.html',
    controller: function ($scope) {
      $scope.start = 0;
      $scope.setDefaults = function(code, name){
        var check = undefined
        var modify = undefined
        if($scope.data.show_from) {
          check = 'from'
          modify = 'to'
        } else {
          check = 'to'
          modify = 'from'
        }
        $scope.data[check] = code;
        $scope.data[check + '_name'] = name;
        if($scope.data[check] != 2000){
          $scope.data[modify] = 2000;
          $scope.data[modify + '_name'] = 'Rosario';
        }
        $scope.data['show_' + check] = false;
      }
    }
  };
})
.directive('selectBondi', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/bondis/select.html',
    controller: function ($scope) {
      $scope.showHideSearches = function(show, hide) {
        $scope.data['show_'+show] = !$scope.data['show_'+show]
        $scope.data['show_'+hide] = false
        $scope.data.filter_destination = ''

      }
    }
  };
})