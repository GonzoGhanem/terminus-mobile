angular.module('terminus.controllers.settings', [])

.controller('SettingsCtrl', [
	'$scope',
	'$rootScope',
	'$ionicLoading',
	'$state',
	'Settings',
	'Destinations',
	function($scope,
		$rootScope,
		$ionicLoading,
		$state,
		Settings,
		Destinations) {

	$scope.settings = Settings.get();

	$ionicLoading.show('Cargando destinos, puede demorar unos segundos la primera vez ..')
	Destinations.all().then(function(data){
		$scope.destinations = data;
		$ionicLoading.hide();
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
}])
