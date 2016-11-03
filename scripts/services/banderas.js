angular.module('app').service('banderas', function($http) {

	var self = this;

	var base_url = 'http://www.egos27.somee.com/api/bandera';

	this.traerTodo = function () {

		return $http.get(base_url).then(function(r){
			return r.data.Paises.map(function (a, b, c) {

				a.Bandera = a.Bandera.replace('https:', 'http:');
				a.BanderaChica = a.BanderaChica.replace('https:', 'http:');
				return a;
			});
		});

	}

	this.traerBanderas = function() {

		return $http.get(base_url).then(function(r){

			return r.data.Paises.map(function (p, a, b){

				return {
					Bandera: p.Bandera.replace('https:', 'http:'), 
					BanderaChica: p.BanderaChica.replace('https:', 'http:')
				}

			});

		});

	}

	this.traerNombres = function () {

		return $http.get(base_url).then(function(r){

			return r.data.Paises.map(function(a, b, c){
				return {
					Nombre: a.Nombre
				};
			});
			
		});

	}

	this.traerPais = function(pais) {

		return $http.get(base_url+'/'+pais).then(function(r) {

			var p = r.data.length > 0 ? r.data[0] : [];

			if (p.Bandera) {
				p.Bandera = p.Bandera.replace('https:', 'http:'); 
				p.BanderaChica = p.BanderaChica.replace('https:', 'http:');
			}

			return p;

		});

	}

});