angular.module('terminus.controllers.bondis-detail', [])

.controller('BondisDetailCtrl', function($scope, $state, $stateParams, Bondis, DAYS_OF_WEEK) {
  $scope.bondi = $stateParams.bondi;
  $scope.bondi.days_to_show = [];
  angular.forEach($scope.bondi.days, function(elem, index){
    if(elem){
      $scope.bondi.days_to_show.push(DAYS_OF_WEEK[index])
    }
  });
  $scope.showBondis = function(){
    $state.go('bondis')
  }
})
