angular.module('app').service('banderas', function($http) {

	var self = this;

	var base_url = 'http://www.egos27.somee.com/api/bandera';

	this.traerTodo = function () {

		return $http.get(base_url).then(function(r){
			return r.data.Paises;
		});

	}

	this.traerBanderas = function() {

		return $http.get(base_url).then(function(r){

			return r.data.Paises.map(function (p, a, b){

				return {Bandera: p.Bandera, BanderaChica: p.BanderaChica}

			});

		});

	}

	this.traerNombres = function () {

		return $http.get(base_url).then(function(r){

			return r.data.Paises.map(function(a, b, c){
				return {Nombre: a.Nombre};
			});
			
		});

	}

	this.traerPais = function(pais) {

		return $http.get(base_url+'/'+pais).then(function(r) {

			return r.data.length > 0 ? r.data[0] : [];

		});

	}

});