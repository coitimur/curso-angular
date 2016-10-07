#ngDirectivas


##ngBind
Esta directiva tiene una funcionalidad similar al uso de las dobles llaves {{}} en la plantilla.

```
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
</head>
<body ng-app="app">
    <div ng-controller="mainController">
        <label>Enter Text <input type="text" ng-model="name" /> </label>
        <br />
        <b>Binded data:</b> <span ng-bind="name">
        </span>
    </div>
<script>
    var app = angular.module("app", []);
    app.controller('mainController', ['$scope', function ($scope) {
        $scope.name = 'Example';
    }]);
</script>
</body>
</html>
```



##ngRepeat
La directiva ngRepeat instancia una plantilla una vez por cada elemento de una colección. Cada plantilla instanciada tiene su propio scope.

```
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
	<script>
    var app = angular.module("app", []);
    app.controller('mainController', ['$scope', function ($scope) {
        $scope.students = [{ name: 'John' }, { name: 'Smith' }, { name: 'Allen' }, { name: ' Johnson' }, { name: 'Harris' }, { name: ' Williams' }, { name: 'David' }];
    }]);
</script>


</head>
<body ng-app="app">
    <div ng-controller="mainController">
        <ul>
            <li ng-repeat="student in students">{{student.name}}</li>
        </ul>
    </div>

</body>
</html>
```


Propiedades:
`$index` (number) el offset de la iteración del elemento repetido (0..length-1)
`$first` (boolean) es `true` si el elemento es el primero en el iterador.
`$middle` (boolean) es `true` si el elemento repetido está entre el primero y el último en el iterador.
`$last` (boolean) es `true` si el elemento es el último en el iterator.
`$even` (boolean) es `true` si la variable $index es par (en otro caso,`false`)
`$odd` (boolean) es `true` si la variable $index es impar (en otro caso,`false`)


Es posible crar alias para estas propiedades con ngInit. Esto puede ser útil, por ejemplo, con ngRepeats anidados.

```
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
	<script>
    angular.module("app", [])
    .controller('mainController', function ($scope) {
         $scope.list = [['a', 'b'], ['c', 'd']];
    });
</script>


</head>
<body ng-app="app">
    <div ng-controller="mainController">
      <div ng-repeat="innerList in list" ng-init="outerIndex = $index">
        <div ng-repeat="value in innerList" ng-init="innerIndex = $index">
           <span class="example-init">list[ {{outerIndex}} ][ {{innerIndex}} ] = {{value}};</span>
        </div>
      </div>
    </div>

</body>
</html>
```

### Iterar sobre de las propiedades de un objeto
Es posible que ngRepeat itere sobre las propiedades de un objeto usando la sintáxis:

```
<div ng-repeat="(key, value) in myObj"> ... </div>
```
Sin embargo, hay limitaciones comparado con la iteración de un array:
- No es posible utilizar los filtros `orderBy` y `filter`.
- Ignorará las propiedades cuya `key` empiece con `$`.

```
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
	<script>
    var app = angular.module("app", []);
    app.controller('mainController', ['$scope', function ($scope) {
        $scope.students = [{ name: 'John' }, { name: 'Smith' }, { name: 'Allen' }, { name: ' Johnson' }, { name: 'Harris' }, { name: ' Williams' }, { name: 'David' }];
    }]);
</script>
</head>
<body ng-app="app">
    <div ng-controller="mainController">
        <ul>
            <li ng-repeat="(key,value) in students">
			
			key:{{key}}
			
			value:{{value}}
			
			</li>
        </ul>
    </div>
</body>
</html>
```

###Duplicados y Track By


La función de seguimiento por defecto (la que sigue cada item por su identidad) no permite elementos duplicados en los arrays. Esto es porque cuando hay duplicados, no es posible mantener una correlación de uno a uno entre los elementos de la colección y los elementos DOM.


Si es necesario repetir los elementos, se puede sustituir el comportamiento por defecto de seguimiento con con nuestra propia expresión.

Por ejemplo, es posible realizar un seguimiento de los items por el índice de cada elemento de la colección, mediante el uso de la propiedad especial `$index`:

```
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
	<script>
    var app = angular.module("app", []);
    app.controller('mainController', ['$scope', function ($scope,$id) {
        
	}]);
	
</script>
</head>
<body ng-app="app">
    <div ng-controller="mainController">
		<div ng-repeat="n in [42, 42, 43, 43] track by $index">
			{{n}}
		</div>
    </div>
</body>
</html>
```

> Para grandes colecciones, esto mejora significativamente el rendimiento del procesamiento. Si no disponemos un identificador único, el seguimiento de los `items` utilizando la propiedad $index puede proporcionar un aumento de rendimiento.



La expresión track by debe ser siempre la última:
```
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
	<script>
    var app = angular.module("app", []);
    app.controller('mainController', ['$scope', function ($scope) {
        $scope.students = [{ name: 'John' }, { name: 'Smith' }, { name: 'Allen' }, { name: 'Johnson' }, { name: 'Harris' }, { name: 'Williams' }, { name: 'David' }];
    }]);
</script>
</head>
<body ng-app="app">
    <div ng-controller="mainController">
        <ul>
            <li ng-repeat="student in students | orderBy: 'name' track by $index">
				student:{{student.name}}
			</li>
        </ul>
    </div>
</body>
</html>
```

### Start y End
Para repetir una serie de elementos, en lugar de sólo un elemento padre en cada iteración, ngRepeat, permite extender el rango del iterador, definiendole explicitamente puntos de inicio y fin utilizando ng-repeat-start y ng-repeat-end respectivamente.


El siguiente ejemplo hace uso de esta característica:

```

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
	<script>
    var app = angular.module("app", []);
    app.controller('mainController', ['$scope', function ($scope) {
        $scope.students = [{ name: 'John', sex: 'Male' }, { name: 'Smith', sex: 'Male' }, { name: 'Allen', sex: 'Male' }, { name: 'Johnson', sex: 'Male' }, { name: 'Harris', sex: 'Male' }, { name: 'Williams', sex: 'Male' }, { name: 'David', sex: 'Male' }];
    }]);
</script>
</head>
<body ng-app="app">
    <div ng-controller="mainController">
		<header ng-repeat-start="student in students">
		  <h2>Alumno:</h2>
		</header>
		<div class="body">
		   {{ student.name }}
		</div>
		<footer ng-repeat-end>
		  <hr> 
		</footer>
		
		<table class="table table-striped table-bordered">
			<tr ng-repeat-start="student in students">
				<td><strong>{{student.name}}</strong></td>
			</tr>
			<tr ng-repeat-end>
				<td>{{ student.sex}}</td>
			</tr>
		</table>
		
        
    </div>
</body>
</html>
```

## ngOptions
La directiva `ngOptions` puede ser usada para generar dinámicamente una lista de elementos `<option>` para el elementos `<select`.

En muchos casos, ngRepeat puede ser usada sobre el elemento <option> en vez de ngOptions, para conseguir un resultado similar. Sin embargo, ngOptions aporta los siguientes beneficios:
- Reduce el consumo de memoria, puesto que no crea un nuevo scope por cada instancia repetida
- Incrementa la velocidad de renderizado.
- Más flexibiliad para asignar la parte visible del modelo vía la parte `select as` del comando.


