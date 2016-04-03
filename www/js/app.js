var app = angular.module('terminus', ['ionic', 'terminus.controllers', 'terminus.services']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/bondis')

  $stateProvider.state('bondis', {
    url: '/bondis',
    templateUrl: 'templates/bondis.html'
  })
  $stateProvider.state('detail', {
    url: '/detail/:bondiId',
    templateUrl: 'templates/bondis-detail.html',
    params: { bondi: null }
  })
  $stateProvider.state('info', {
    url: '/info',
    templateUrl: 'templates/info.html'
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