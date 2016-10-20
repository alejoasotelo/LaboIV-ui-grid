angular
  .module('app')
  .service('data', function ($http) {
    function extraerData (data){
      return data.data;
    }

    this.data = function () {
      return $http.get('./data/1000Datos.json').then(extraerData);
    }

    this.sexo = function () {
      return $http.get('./data/animales.json').then(extraerData);
    }
  })
