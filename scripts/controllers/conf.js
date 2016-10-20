angular
.module('app')
.controller('ConfCtrl', function($scope, data, i18nService, uiGridConstants, NgMap) {

  var lista_de_paises = new Array();

  $scope.titulo = "Configuracion Campos";
  // Objeto de configuracion de la grilla.
  $scope.gridOptions = {};
  $scope.gridOptions.paginationPageSizes = [25, 50, 75];
  // Configuracion de la paginacion
  $scope.gridOptions.paginationPageSize = 25;
  $scope.gridOptions.columnDefs = columnDefs();
  // Activo la busqueda en todos los campos.
  $scope.gridOptions.enableFiltering = true;
  // Configuracion del idioma.
  i18nService.setCurrentLang('es');

  $scope.mostrarMapa = false;

  data.data().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;

      var paises_agregados = new Array();

      for(var r in rta) {
        var pais = rta[r].Pais;

        if (paises_agregados.indexOf(pais) < 0) {
          lista_de_paises.push({value: pais, label: pais});
          paises_agregados.push(pais);
        }
      }

      lista_de_paises.sort(function(a,b){return a.value > b.value ? 1 : (a.value == b.value ? 0 : -1);});
    });

  console.log(uiGridConstants);

  function columnDefs () {
    return [  
    {
      field: 'id', 
      name: '#', 
      width: 45
    },
    /*{ 
      field: 'titulo', 
      name: 'ocupacion',
      filter:{
        condition: uiGridConstants.filter.STARTS_WITH,
        placeholder: 'comienza con...'
      }
    },*/
    {
      field: 'Nombre', 
      name: 'nombre', 
      enableFiltering: false
    },
    {
      field: 'apellido', 
      name: 'apellido'
    },
    {
      field: 'email', 
      name: 'mail'
    },
    { 
      field: 'sexo',
      name: 'sexo',
      filter: {
        type: uiGridConstants.filter.SELECT,
        selectOptions: [
        {value: 'Female', label: 'Femenino'},
        {value: 'Male', label: 'Masculino'}
        ]
      },
      //filtro de los datos
      cellFilter: 'sexo'
    },
    {
      field: 'ip_address', name: 'ip'
    },
    {
      field: 'Fecha_nacimiento', name: 'fechaNacimiento', type: 'date', cellFilter: "date: 'dd-MM-yyyy'"
    },
    {
      field: 'Pais', name: 'pais',
      filter: {
        type: uiGridConstants.filter.SELECT,
        selectOptions: lista_de_paises
      }
    },
    {
      field: 'Tarjeta_credito', name: 'Tarjeta de credito'
    },
    {
      field: 'Zona_horaria', name: 'Zona Horaria'
    },
    {
      field: 'foto', 
      name: 'foto', 
      cellTemplate: '<div style="display:block; text-align: center;"><img width="30px" ng-src="{{grid.getCellValue(row, col)}}" lazy-src></div>'
    },
    {
      field: 'boton',
      name: 'boton',
      cellTemplate: '<button ng-click="grid.appScope.localizar(row.entity)">Localizar</button>'
    }
    ];
  }

  var marker = null;

  $scope.localizar = function(row) {

    $scope.mostrarMapa = true;

    console.log(row.Latitud, row.Longitud);

    NgMap.getMap().then(function(map) {
      console.log(map);
      $scope.mostrarMapa = true;

      var latLng = new google.maps.LatLng(row.Latitud, row.Longitud);

     /* marker = new google.maps.Marker({
        title: "Hi marker "
      });
      marker.setPosition(latLng);
      marker.setMap(map)*/

      map.setCenter(latLng);
    });
  }
})
