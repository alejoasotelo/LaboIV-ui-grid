angular.module('app')
// Finalizacion de referencia al modulo

.directive('utnSaludo', function() {

	return {
		template: '<h1>Hola Mundo</h1>',
		restrict: 'AECM',
		replays: true
	}

})

.directive('mostrarTitulo', function() {

	return {
		template: '<h1>mostrarTitulo</h1>',
		restrict: 'E'
	}

})

.directive('utnTemplate', function() {

	return {
		templateUrl: 'scripts/directivas/utnTemplate.html',
		restrict: 'E'
	}

});