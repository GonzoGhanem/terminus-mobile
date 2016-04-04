angular.module('terminus.services', [])

.factory('Bondis', function($http) {
  
  var base = 'https://gonzoft-terminus.herokuapp.com/';
  // var base = 'http://localhost:3000/';
  return {
    all: function(origin, to, only_upcoming) {
      var endpoint = only_upcoming ? 'proximos/' : 'bondis/'
      var url = base + endpoint + origin + '/' + to;
      return $http.get(url).then(function(resp) {
        return resp.data.bondis;
      }, function(err) {
        console.error('ERR', err);
      })
    }
  };
})

.factory('Destinations', function($http) {
  
  var base = 'https://gonzoft-terminus.herokuapp.com/destinations';
  // var base = 'http://localhost:3000/';
  return {
    all: function() {
      return $http.get(base).then(function(resp) {
        return resp.data.destinations;
      }, function(err) {
        console.error('ERR', err);
      })
    }
  };
})
.factory('Settings', function() {
  var key = 'terminus-user-settings';
  return {
    get: function() {
      return JSON.parse(window.localStorage[key] || '{"to": 944, "from": 2000}')
    },
    save: function(settings) {
      window.localStorage[key] = JSON.stringify(settings);
    }
  };
});
