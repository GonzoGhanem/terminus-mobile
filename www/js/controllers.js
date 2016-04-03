angular.module('terminus.controllers', [])

.controller('BondisCtrl', function($scope, $state, Bondis, Destinations, DAYS_OF_WEEK) {
  $scope.data = {
    from: 2000,
    to: 944,
    upcoming: true
  }
  
  Destinations.all().then(function(data){
    $scope.destinations = data;
  });

  $scope.setDefaults = function(check, modify){
    if($scope.data[check] != 2000){
      $scope.data[modify] = 2000
    }
  }

  $scope.searchBondis = function(){
    Bondis.all($scope.data.from, $scope.data.to, $scope.data.upcoming).then(function(data){
      $scope.bondis = data;
      angular.forEach($scope.bondis, function(bondi){
        generate_days_string(bondi)
      })
    });
  }
  var generate_days_string = function(bondi){
    bondi.days_to_show = [];
    angular.forEach(bondi.days, function(elem, index){
      if(elem){
        bondi.days_to_show.push(DAYS_OF_WEEK[index])
      }
    });
  }
  $scope.showHelp = function(){
    $state.go('info')
  }
  
  $scope.showDetail = function(bondi){
    // Let's not use this view for now
    // $state.go('detail', {bondi: bondi})
  }

})
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
.controller('InfoCtrl', function($scope, $state, Bondis, Destinations) {
  
  $scope.showBondis = function(){
    $state.go('bondis')
  }
})
