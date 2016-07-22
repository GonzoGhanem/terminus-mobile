var app = angular.module('terminus', ['ionic', 'terminus.controllers', 'terminus.services', 'terminus.directives']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/bondis')

  $stateProvider.state('bondis', {
    url: '/bondis',
    templateUrl: 'views/bondis/bondis.html',
    controller: 'BondisCtrl',
    resolve: {
      last_searched_bondis: function(Bondis) {
        return Bondis.last_search()
      }
    }
  })
  $stateProvider.state('detail', {
    url: '/detail/:bondiId',
    templateUrl: 'views/bondis-detail/bondis-detail.html',
    controller: 'BondisDetailCtrl',
    resolve: {
      bondi: function(Bondis, $stateParams) {
        return Bondis.details($stateParams.bondiId).then(function(bondi){
          return bondi
        })
      }
    }
  })
  $stateProvider.state('info', {
    url: '/info',
    templateUrl: 'views/info/info.html'
  })
  $stateProvider.state('settings', {
    url: '/settings',
    templateUrl: 'views/settings/settings.html'
  })
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    // if (navigator.splashscreen) {
    //  navigator.splashscreen.hide();
    // }
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 100);
  });
});

app.constant('DAYS_OF_WEEK',{
  0: 'Lunes',
  1: 'Martes',
  2: 'Miércoles',
  3: 'Jueves',
  4: 'Viernes',
  5: 'Sábado',
  6: 'Domingo',
  7: 'Feriado'
})
