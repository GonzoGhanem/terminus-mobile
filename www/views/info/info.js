angular.module('terminus.controllers.info', [])

.controller('InfoCtrl', function($scope, $state, Bondis, Destinations) {
  
  $scope.showBondis = function(){
    $state.go('bondis')
  }
})
