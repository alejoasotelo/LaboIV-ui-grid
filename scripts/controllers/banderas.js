angular
  .module('app')
  .controller('BanderasCtrl', function($scope, banderas) {

    $scope.pais = {};
    $scope.results = [];

    banderas.traerPais('andorra').then(function(pais){
      console.log(pais);
      $scope.pais = pais;
    });

    $scope.buscar = function(query) {
      $scope.results = [];
      banderas.traerPais(query).then(function(pais){
        $scope.results.push(pais);
      });
    }
    
  })
