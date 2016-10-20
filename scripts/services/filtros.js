angular.module('app')
  .filter('sexo', function () {
  	var sexo = {
  		'Male': 'Masculino',
  		'Female': 'Femenino'
  	}
    return function (input) {
    	if (!input)
    		return '';
      return sexo[input];
    };
  });
