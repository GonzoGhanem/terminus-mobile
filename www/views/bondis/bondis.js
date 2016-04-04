angular.module('terminus.controllers.bondis', [])

.controller('BondisCtrl', function($scope, $rootScope, $state, $stateParams, $ionicLoading, Bondis, Destinations, Settings, DAYS_OF_WEEK) {
  $scope.user_settings = Settings.get()

  $scope.data = {
    from: $scope.user_settings.from,
    to: $scope.user_settings.to,
    upcoming: true
  }
  
  Destinations.all().then(function(data){
    $scope.destinations = data
  })


  $scope.setDefaults = function(check, modify){
    if($scope.data[check] != 2000){
      $scope.data[modify] = 2000
    }
  }

  $scope.searchBondis = function(){
    $ionicLoading.show({
      template: 'Cargando bondis...'
    });
    Bondis.all($scope.data.from, $scope.data.to, $scope.data.upcoming).then(function(data){
      $scope.bondis = data;
      angular.forEach($scope.bondis, function(bondi){
        generate_days_string(bondi)
      })
      $ionicLoading.hide()
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
  $scope.switchDestinations = function(){
    var original = {
      origin: $scope.data.from,
      destiny: $scope.data.to
    }
    $scope.data.to = original.origin
    $scope.data.from = original.destiny
    $scope.searchBondis()
  }

  $scope.switchToDefault = function(){
    $scope.data.to = $scope.user_settings.to
    $scope.data.from = $scope.user_settings.from
    $scope.searchBondis()
  }
  
  $scope.showDetail = function(bondi){
    // Let's not use this view for now
    // $state.go('detail', {bondi: bondi})
  }

  $rootScope.$on('SETTINGS-CHANGED', function(event, settings){
    $scope.user_settings = settings
  })

})
