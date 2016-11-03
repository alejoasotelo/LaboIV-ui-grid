angular.module('app').factory('factBanderas', function(banderas) {
	
	var base_url = 'http://www.egos27.somee.com/api/bandera';

	var obj = {};

	var traerURL = function(endpoint) {

		if (!endpoint) {

			return base_url;

		} 

		return base_url + (endpoint.charAt(0) == '/' ? endpoint : '/' + endpoint);
	}

	var traerTodo = function () {

		return banderas.traerTodo();

	}

	var traerPais = function (pais) {

		return banderas.traerPais(pais);

	}

	var traerSoloBanderas = function() {

		return banderas.traerSoloBanderas();

	}

	var traerSoloNombres = function () {

		return banderas.traerSoloNombres();

	}

	obj.traerTodo = traerTodo;
	obj.traerPais = traerPais;
	obj.traerSoloBanderas = traerSoloBanderas;
	obj.traerSoloNombres = traerSoloNombres;

	return obj;

});