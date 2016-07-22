angular.module('terminus.controllers.bondis-detail', [])

.controller('BondisDetailCtrl', function($scope, $state, bondi, DAYS_OF_WEEK, $ionicLoading) {
  $ionicLoading.hide();
  $scope.bondi = bondi;
  $scope.bondi.days_to_show = [];
  angular.forEach($scope.bondi.days, function(elem, index){
    if(elem){
      $scope.bondi.days_to_show.push(DAYS_OF_WEEK[index])
    }
  });
})
