angular
.module('app')
.controller('ConfCtrl', function($scope, data, i18nService, uiGridConstants, NgMap, banderas) {

  var lista_de_paises = new Array();

  $scope.titulo = "Configuracion Campos";
  $scope.usuario = {};
  // Objeto de configuracion de la grilla.
  $scope.gridOptions = {};
  $scope.gridOptions.paginationPageSizes = [25, 50, 75];
  // Configuracion de la paginacion
  $scope.gridOptions.paginationPageSize = 25;
  $scope.gridOptions.columnDefs = columnDefs();
  // Activo la busqueda en todos los campos.
  $scope.gridOptions.enableFiltering = true;


  // Objeto de configuracion de la grilla.
  $scope.gridAmigosOptions = {};
  $scope.gridAmigosOptions.paginationPageSizes = [25, 50, 75];
  // Configuracion de la paginacion
  $scope.gridAmigosOptions.paginationPageSize = 25;
  $scope.gridAmigosOptions.columnDefs = columnDefsAmigos();
  // Activo la busqueda en todos los campos.
  $scope.gridAmigosOptions.enableFiltering = true;

  // Configuracion del idioma.
  i18nService.setCurrentLang('es');

  $scope.mostrarMapa = false;
  $scope.mostrarMapaAmigos = false;

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

  function columnDefs () {
    return [  
    {
      field: 'id', 
      name: '#', 
      width: 45
    },
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
      field: 'localizar',
      name: 'Localizar',
      cellTemplate: '<div style="display:block; text-align: center; padding-top: 4px;"><button ng-click="grid.appScope.localizar(row.entity)" class="btn btn-default btn-xs">Localizar</button></div>'
    },
    {
      field: 'Amigos',
      name: 'Amigos',
      cellTemplate: '<div style="display:block; text-align: center; padding-top: 4px;"><button ng-click="grid.appScope.mostrarAmigos(row.entity)" class="btn btn-default btn-xs">Mostrar amigos</button></div>'
    }
    ];
  }

  function columnDefsAmigos () {
    return [
    {
      field: 'nombre', 
      name: 'nombre', 
      enableFiltering: false
    },
    {
      field: 'edad', 
      name: 'edad'
    },
    {
      field: 'raza', 
      name: 'raza'
    }
    ];
  }

  var map = null, mapAmigos = null, marker = null, markersAmigos = [], infowindow = null;

  $scope.localizar = function(row) {

    $scope.mostrarMapa = true;

    if (map == null) {

      NgMap.getMap().then(function(_map) {
        $scope.mostrarMapa = true;
        map = _map;
        localizar(row);
      });

    } else {

      $scope.mostrarMapa = true;
      localizar(row);

    }
    
  }

  function localizar(row) {
    var html = row.Nombre + ' ' + row.apellido;

      // Inicializo el unico marker y el info window.
      marker = marker == null ? new google.maps.Marker({title: html}) : marker;
      infowindow = infowindow == null ? new google.maps.InfoWindow() : infowindow;

      // Si ya existe el info window lo cierro.
      if (infowindow != null) {
        infowindow.close();     
      }

      google.maps.event.addListener(marker, 'click', function() {        
        infowindow.setContent(html);
        infowindow.open(map, marker);
      });

      var latLng = new google.maps.LatLng(row.Latitud, row.Longitud);
      
      marker.setTitle(html);
      marker.setPosition(latLng);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      marker.setMap(map);
      map.setCenter(latLng);
    }


    $scope.mostrarAmigos = function(row) {
      $scope.usuario.nombre = row.Nombre + ' ' + row.apellido;

      $scope.gridAmigosOptions.data = row.Amigos;

      if (mapAmigos == null) {
        console.log('null');

        NgMap.getMap().then(function(_map) {
          mapAmigos = _map;
          console.log('esaaaa');
          console.log(mapAmigos);
          localizarAmigos(row.Amigos);
        });
      } else {        
        console.log('localizarAmigos');
          localizarAmigos(row.Amigos);
      }


    }

    function localizarAmigos (amigos) {

      console.log(google);

      $scope.mostrarMapaAmigos = false;

      var len = markersAmigos.length;
      if (len > 0) {
        for(var i=0; i < len; i++) {
          markersAmigos[i] = null;
        }
      }

      len = amigos.length;

      for (var i = 0; i < len; i++) {
        var row = amigos[i];
        var html = row.nombre;

        // Inicializo el unico marker y el info window.
        var _marker = new google.maps.Marker({title: html});
        var latLng = new google.maps.LatLng(row.Latitud, row.Longitud);
        
        _marker.setTitle(html);
        _marker.setPosition(latLng);
        _marker.setMap(mapAmigos);
        markersAmigos.push(_marker);
        console.log(markersAmigos);
      }

      if (markersAmigos.length > 0) {
        $scope.mostrarMapaAmigos = true;
      }

    }
  });
