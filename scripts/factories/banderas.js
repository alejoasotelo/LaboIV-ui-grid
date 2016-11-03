angular.module('app').factory('fBanderas', function($http) {
	
	var base_url = 'http://www.egos27.somee.com/api/bandera';

	var obj = {};

	var traerURL = function(endpoint) {

		if (!endpoint) {

			return base_url;

		} 

		return base_url + (endpoint.charAt(0) == '/' ? endpoint : '/' + endpoint);
	}

	var traerTodo = function () {

		return $http.get(traerURL()).then(function(r){
			var paises = r.data.Paises;

            // Fix para que se vean las banderas.
            return paises.map(function(a, b, c) {

                return {
                    Nombre: a.Nombre,
                    Bandera: a.Bandera.replace('https://', 'http://'),
                    BanderaChica: a.BanderaChica.replace('https://', 'http://')
                };

            });
		});

	}

	var traerPais = function (pais) {

		return $http.get(traerURL(pais)).then(function(r){

			var p = r.data.length > 0 ? r.data[0] : [];

			// Fix para que muestre las banderas.
			if (p.Bandera) {
				p.Bandera = p.Bandera.replace('https://', 'http://');
				p.BanderaChica = p.BanderaChica.replace('https://', 'http://');
			}

			return p;

		});

	}

	var traerSoloBanderas = function() {

		return $http.get(traerURL()).then(function(r) {

			return r.data.Paises.map(function (p, a, b) {

				return {
					Bandera: p.Bandera.replace('https://', 'http://'), 
					BanderaChica: p.BanderaChica.replace('https://', 'http://')
				}

			});

		});

	}

	var traerSoloNombres = function () {

		return $http.get(traerURL()).then(function(r) {

			return r.data.Paises.map(function(a, b, c) {

				return {
					Nombre: a.Nombre
				};

			});
			
		});

	}

	obj.nombreDeFactory = 'Banderas';
	obj.traerTodo = traerTodo;
	obj.traerPais = traerPais;
	obj.traerSoloBanderas = traerSoloBanderas;
	obj.traerSoloNombres = traerSoloNombres;

	return obj;

});