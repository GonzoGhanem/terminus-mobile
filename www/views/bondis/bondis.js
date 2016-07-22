angular.module('terminus.controllers.bondis', [])

.controller('BondisCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$stateParams',
  '$ionicLoading',
  'Bondis',
  'Settings',
  'DAYS_OF_WEEK',
  'Destinations',
  '$ionicModal',
  'Requests',
  'last_searched_bondis',
  function(
    $scope,
    $rootScope,
    $state,
    $stateParams,
    $ionicLoading,
    Bondis,
    Settings,
    DAYS_OF_WEEK,
    Destinations,
    $ionicModal,
    Requests,
    last_searched_bondis){

  $scope.user_settings = Settings.get()
  $scope.bondis = last_searched_bondis
  if($scope.bondis.length > 0){
    angular.forEach($scope.bondis, function(bondi){
      generate_days_string(bondi)
    })
  }
  $ionicLoading.show({
    template:'Cargando destinos, puede demorar unos segundos la primera vez ..'
  })
  $scope.saveFirstTime = function() {
    if($scope.data.from == null || $scope.data.to == null) {
      alert('Debe seleccionar un origen y un origen')
      return
    }
    Settings.save($scope.data);
    $scope.searchBondis();
    $scope.modalFirstTime.hide();
  }
  if(angular.equals({}, $scope.user_settings)){
    $scope.data = {
      from: null,
      to: null,
      upcoming: true,
      destinations: [],
      from_name: '',
      to_name: ''
    }
    $scope.destination_types = [
      {id: 'from', name: "desde"},
      {id: 'to', name: "hacia"}
    ]
    $ionicModal.fromTemplateUrl('first-time-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalFirstTime = modal;
      Destinations.all().then(function(data){
        $scope.data.destinations = data;
        $ionicLoading.hide();
        $scope.modalFirstTime.show();
      })
    });
  } else {
    Destinations.all().then(function(data){
      // $scope.data.destinations = data;
      $ionicLoading.hide();
      $scope.data = {
        from: $scope.user_settings.from,
        to: $scope.user_settings.to,
        upcoming: $scope.user_settings.upcoming,
        destinations: data,
        from_name: '',
        to_name: ''
      }
      data.every(function(x){
        if($scope.data.from_name != '' && $scope.data.to_name != '') {
          return false;
        }
        if(x.code == $scope.data.from){
          $scope.data.from_name = x.name;
        } else if (x.code == $scope.data.to) {
          $scope.data.to_name = x.name;
        }
        return true;
      })
    });
  }

  $scope.setDefaults = function(check, modify){
    if($scope.data[check] != 2000){
      $scope.data[modify] = 2000
    }
  }

  $scope.searchBondis = function(){
    $ionicLoading.show({
      template: 'Buscando viajes...'
    });
    Bondis.all($scope.data.from, $scope.data.to, $scope.data.upcoming).then(function(data){
      $scope.bondis = data;
      angular.forEach($scope.bondis, function(bondi){
        generate_days_string(bondi)
      })
      $ionicLoading.hide()
    });
  }
  function generate_days_string(bondi){
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
    $ionicLoading.show({
      template:'Buscando detalles de ruta..'
    })
    $state.go('detail', {bondiId: bondi.id})
  }

  $rootScope.$on('SETTINGS-CHANGED', function(event, settings){
    $scope.user_settings = settings
    angular.extend($scope.data, {
      from: $scope.user_settings.from,
      to: $scope.user_settings.to
    });
    $scope.searchBondis();
  })

  $ionicModal.fromTemplateUrl('contact-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.contactModal = modal;
  });
  $scope.openModal = function() {
    $scope.request = {
      email: undefined,
      destiny: undefined
    }
    $scope.contactModal.show();
  };
  $scope.closeModal = function() {
    $scope.contactModal.hide();
  };
  $scope.sendRequest = function() {
    $ionicLoading.show({
      template: 'Enviando solicitud...'
    });
    Requests.send($scope.request.destiny, $scope.request.email)
    .then(function(response){
      $ionicLoading.hide()
      $scope.closeModal()
    })
  }
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.contactModal.remove();
  });

  
}])
