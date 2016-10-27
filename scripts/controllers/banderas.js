angular
  .module('app')
  .controller('BanderasCtrl', function($scope, banderas) {

    $scope.results = [];

    $scope.buscar = function(query) {
      $scope.results = [];
      banderas.traerPais(query).then(function(pais){
        if (typeof pais.Nombre != 'undefined') {
          $scope.results.push(pais);
        }
      });
    }
    
  })
