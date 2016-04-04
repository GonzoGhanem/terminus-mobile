angular.module('terminus.controllers.settings', [])

.controller('SettingsCtrl', function($scope, $rootScope, $ionicLoading, $state, Settings, Destinations) {
	$scope.settings = Settings.get();

	Destinations.all().then(function(data){
		$scope.destinations = data;
	});

	$scope.saveSettings = function(){
		Settings.save($scope.settings)
		$ionicLoading.show({
			template: "Guardando configuración personal..",
			duration: 3000
		});
		$rootScope.$broadcast('SETTINGS-CHANGED', $scope.settings)
		$state.go('bondis')
	}
})
