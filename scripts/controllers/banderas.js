angular
.module('app')
.controller('BanderasCtrl', function($scope, uiGridConstants, factBanderas) {

    // Objeto de configuracion de la grilla.
    $scope.gridBanderas = {};
    $scope.gridBanderas.paginationPageSizes = [25, 50, 75];   
    $scope.gridBanderas.paginationPageSize = 25; // Configuracion de la paginacion
    $scope.gridBanderas.columnDefs = columnDefs();
    $scope.gridBanderas.enableFiltering = true; // Activo la busqueda en todos los campos.

    function columnDefs () {
        return [
        {
            field: 'Nombre',
            name: 'Nombre',
            enableFiltering: false
        },
        {
            field: 'BanderaChica',
            name: 'BanderaChica',
            enableFiltering: false,
            cellTemplate: '<div style="display:block; text-align: center;"><img width="30px" ng-src="{{grid.getCellValue(row, col)}}" lazy-src></div>'
        }
        ];
    }

    $scope.buscar = function(query) {

        factBanderas.traerPais(query).then(function(pais){
            if (typeof pais.Nombre != 'undefined') {

                $scope.gridBanderas.data = [pais];

            } else {

                $scope.gridBanderas.data = [{
                    Nombre: 'No existe',
                    BanderaChica: null,
                    Bandera: null
                }];

            }
        });

    }

    $scope.resetear = function () {

        $scope.query = '';

        cargarTodasLasBanderas();

    }

    var cargarTodasLasBanderas = function () {
        factBanderas.traerTodo().then(function(banderas) {

            banderas.sort(function (a, b){
                return a.Nombre > b.Nombre ? 1 : (a.Nombre < b.Nombre ? -1 : 0);
            });

            $scope.gridBanderas.data = banderas;
        });
    }

    cargarTodasLasBanderas();

})
