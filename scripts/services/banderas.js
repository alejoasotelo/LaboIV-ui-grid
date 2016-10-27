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

			var len = r.data.Paises.length;
			var list_banderas = [];

			for(var i=0; i < len; i++) {

				var obj = r.data.Paises[i];
				var banderas = {
					Bandera: obj.Bandera,
					BanderaChica: obj.BanderaChica,
				};

				list_banderas.push(banderas);
			}

			return list_banderas;
		});

	}

	this.traerNombre = function () {

		return $http.get(base_url).then(function(r){
			var len = r.data.Paises.length;
			var list_nombres = [];

			for(var i=0; i < len; i++) {

				var obj = r.data.Paises[i];
				var Nombre = {
					Nombre: obj.Nombre
				};

				list_nombres.push(Nombre);
			}

			return list_nombres;
		});

	}

	this.traerPais = function(pais) {

		return $http.get(base_url+'/'+pais).then(function(pais) {

			return pais;

		});

	}

});