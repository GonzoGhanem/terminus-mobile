angular.module('terminus.services', ['terminus.config'])

.factory('Bondis',['$http','terminus.api-base', function($http, apiConfig) {
  var key = 'last-bondi-search';
  return {
    all: function(origin, to, only_upcoming) {
      var endpoint = only_upcoming ? 'proximos/' : 'bondis/'
      var url = apiConfig.base_host + endpoint + origin + '/' + to;
      return $http.get(url).then(function(resp) {
        window.localStorage[key] = JSON.stringify(resp.data.bondis);
        return resp.data.bondis;
      }, function(err) {
        console.error('ERR', err);
      })
    },
    details: function(bondi) {
      var url = apiConfig.base_host +'details/' + bondi
      return $http.get(url).then(function(response) {
        return response.data
      })
    },
    last_search: function() {
      return JSON.parse(window.localStorage[key] || '[]')
    }
  };
}])

.factory('Destinations', ['$http','terminus.api-base', '$q', function($http, apiConfig, $q) {
  var key = 'terminus-destinos';
  var base = apiConfig.base_host + 'destinations';

  return {
    all: function() {
      var deferred = $q.defer()
      if(window.localStorage.getItem(key) != null) {
        console.log("CACHEADO")
        deferred.resolve(JSON.parse(window.localStorage[key]))
      } else {
        console.log("NO CACHEADO")
        $http.get(base).then(function(resp) {
          window.localStorage[key] = JSON.stringify(resp.data.destinations)
          deferred.resolve(resp.data.destinations)
        })
      }
      return deferred.promise;
    }
  };
}])

.factory('Requests', ['$http','terminus.api-base', function($http, apiConfig) {

  var base_url = apiConfig.base_host + 'requests';

  return {
    send: function(text, email) {
      return $http.post(base_url, {
        text: text,
        email: email
      }).then(function(resp) {
        return resp.data.bondis;
      }, function(err) {
        console.error('ERR', err);
      })
    }
  };
}])

.factory('Settings', function() {
  var key = 'terminus-user-settings';
  return {
    get: function() {
      return JSON.parse(window.localStorage[key] || '{}')
    },
    save: function(settings) {
      window.localStorage[key] = JSON.stringify(settings);
    }
  };
});
