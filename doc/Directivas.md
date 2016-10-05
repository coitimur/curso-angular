# Directivas
## ¿Qué son las Directivas?
Son marcadores sobre un elemento del DOM (atributo, nombre del elemento, comentario o classe CSS) que le dicen al compilador de HTML de Angular que
agrege un comportamiento específico a ese elemento del DOM o que transforme el elemento y sus hijos.

Angular viene con un conjunto de directivas incorporadas como `ngBind`, `ngModel` y `ngClass`. Igual que creamos controladores y servicios, podemos crear nuestras propias directivas. Cuando Angular arranca la aplicación, el compilador de HTML (`$compiler`) recorre los elementos del DOM buscando directivas
## Normalización
Angular normaliza la etiqueta de un elemento y el nombre de un atributo para determinar qué elemento coincide con una directiva. Típicamente referimos una directiva por su nombre normalizado en `camelCase` (ej. ngModel). Sin embargo, como el lenguaje HTML no distingue entre mayúsculas y minúsculas, no referimos a las directivas en el DOM por su forma `lower-case`, típicamente usando  nombres `dash-limited` sobre los elementos del DOM (ej. ng-model).

El proceso de no`rmalización es como sigue:
1. quita `x-` y `data-` de la parte inicial del nombre de los elementos/atributos.
2. Convierte el nombre delimitado con  `:`, `-` or `_` a `camelCase`.

```
<div ng-controller="Controller">
  Hello <input ng-model='name'> <hr/>
  <span ng-bind="name"></span> <br/>
  <span ng:bind="name"></span> <br/>
  <span ng_bind="name"></span> <br/>
  <span data-ng-bind="name"></span> <br/>
  <span x-ng-bind="name"></span> <br/>
</div>
```

## Tipos de Directivas
El compilador de HTML de Angular puede encontrar directivas basadas en nombres de elementos, atributos, nombres de clases CSS y también, comentarios.


```
<my-dir></my-dir>
<span my-dir="exp"></span>
<!-- directive: my-dir exp -->
<span class="my-dir: exp;"></span>
```

## Creando Directivas
De la misma forma que los controladores, las directivas son registradas sobre los módulos usando el método `directive` del API de`module`. Éste, toma el nombre de la directiva seguido por la función factoría. Esta función factoría debe devolver un objeto con diferentes opciones para dedirle al compilador (`$compile`) qué comportamiento debe tener la directiva.

La función factoría es invocada sólo una vez cuando el compilador encuentra la directiva la primera vez.

### Directiva que extiende la plantilla
Si tenemos una parte de la plantilla que muestra una información que se repite muchas veces en el código y cuando cambia esta información hay que cambiarla en todos los sitios. Esta es una buena oportunidad para utilizar una directiva para simplificar la plantilla.

JavaScript:

```
angular.module('app', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Naomi',
    address: '1600 New York'
  };
}])
.directive('myCustomer', function() {
  return {
    template: 'Name: {{customer.name}} Address: {{customer.address}}'
  };
});
```

HTML:

```
<div ng-controller="Controller">
  <div my-customer></div>
</div>
```

En el ejemplo anterior se ha utilizado la opción `template`, pero esta no es adecuada para plantillas con cierto tamaño. Es mejor usar la opción `templateUrl` en su lugar:

```
angular.module('docsTemplateUrlDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Naomi',
    address: '1600 Amphitheatre'
  };
}])
.directive('myCustomer', function() {
  return {
    templateUrl: 'my-customer.html'
  };
});
```
my-customer.html
```
Name: {{customer.name}} Address: {{customer.address}}
```

La opción `templateUrl` puede ser también una función que retorne la URL de una plantilla HTML. Angular llamará la función con dos parámetros: el elemento sobre el que está la directiva y un objeto `attr` asociado con el elemento.


index.html

```
<div ng-controller="Controller">
  <div my-customer type="name"></div>
  <div my-customer type="address"></div>
</div>
```

script.js

```
angular.module('docsTemplateUrlDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Naomi',
    address: '1600 Amphitheatre'
  };
}])
.directive('myCustomer', function() {
  return {
    templateUrl: function(elem, attr) {
      return 'customer-' + attr.type + '.html';
    }
  };
});
```
customer-address.html

```
Address: {{customer.address}}
```

customer-name.html

```
Name: {{customer.name}}
```
>Nota: Cuando se crea una directiva, por defecto, su uso está restringido a elementos y atributos. Para crear directivas que puedan ser usadas de otras formas, es necesario usar la opción `restrict`.


Los valores que puede tomar la opción `restrict` son:
- 'A' - uso como nombre de atributo
- 'E' - uso como nombre de elemento
- 'C' - uso como nombre de clase CSS
- 'M' - uso como comentario

Estas restricciones pueden ser combinadas como necesitemos:
- 'AEC' - se puede usar como nombre de atributo, elemento o clase.

### Aislar el Scope de una Directiva
Las directivas que hemos visto hasta ahora comparten el contexto con el controlador que tiene asignada la plantilla.

Podemos aislar el scope dentro de la directiva del scope fuera de ella, y luego mapear sólo los objetos que nos interesen. Para hacer esto usamos la opción `scope`:
index.html
```
<div ng-controller="Controller">
  <my-customer info="naomi"></my-customer>
  <hr>
  <my-customer info="igor"></my-customer>
</div>
```

script.js
```
angular.module('docsIsolateScopeDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
  $scope.igor = { name: 'Igor', address: '123 Somewhere' };
}])
.directive('myCustomer', function() {
  return {
    restrict: 'E',
    scope: {
      customerInfo: '=info'
    },
    templateUrl: 'my-customer-iso.html'
  };
});
```
my-customer-iso.html
```
Name: {{customerInfo.name}} Address: {{customerInfo.address}}
```
La opción `scope` es un objeto que contiene una propiedad por cada binding aislado.


```
//...
scope: {
  customerInfo: '=info'
},
//...
```

Para los casos en los que el nombre del atributo sea el mismo que el valor que queramos bindear dentro de la directiva, se puede emplear la sintaxis abreviada:


```
...
scope: {
  // same as '=customer'
  customer: '='
},
...
```

El scope aislado, aisla todo menos los modelos que han sido explicitamente añadidos al objeto `scope:{}`. Esto es útil cuando estamos construyendo componentes reusables, porque evita que se pueda cambiar el estado de sus modelos ,a excepción de los que explicitamente se haya decidido exponer.

>Nota: Normalmente un scope hereda prototípicamente de su padre, pero un scope aislado no.

### Creando una Directiva que manipula objetos del DOM
Vamos a construir una directiva que muestre la hora actual. Una vez por segundo, modificando el DOM para reflejar la hora actual.

Las Directivas que quieren modificar el DOM usan la opción `link`
para resgistrar `listeners` y para modificar el DOM. Es ejecutada después de que la plantilla haya sido clonada y es donde se pone la lógica de la directiva.

La opción `link` toma una función, `function link(scope, element, attrs, controller, transcludeFn) { ... }`, donde:
- `scope` es un objeto scope de Angular.
- `element` es el envoltorio jqLite del elemento sobre el que está la directiva.
- `attrs` es un objeto hash con pares clave-valor de los nombres normalizados de los atributos y sus correspondientes valores.
- `controller` es la instancia del controlador requerido por la directiva.
- `transcludeFn` es una función para vincular el correcto scope de transclusión.

En la función `link`, vamos a modificar la hora presentada una vez por segundo, o cuando el usuario cambie la cadena de formato a la que la directiva está bindeada.

index.html
```
<div ng-controller="Controller">
  Date format: <input ng-model="format"> <hr/>
  Current time is: <span my-current-time="format"></span>
</div>
```
script.js
```
angular.module('docsTimeDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.format = 'M/d/yy h:mm:ss a';
}])
.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

  function link(scope, element, attrs) {
    var format,
        timeoutId;

    function updateTime() {
      element.text(dateFilter(new Date(), format));
    }

    scope.$watch(attrs.myCurrentTime, function(value) {
      format = value;
      updateTime();
    });

    element.on('$destroy', function() {
      $interval.cancel(timeoutId);
    });

    // start the UI update process; save the timeoutId for canceling
    timeoutId = $interval(function() {
      updateTime(); // update DOM
    }, 1000);
  }

  return {
    link: link
  };
}]);

```

### Creando una Directiva que envuela a otros Elementos
Hemo visto que podemos pasar modelos a una directiva usando un scope aislado, pero a veces sería deseable pasar una plantilla entera en lugar de un objeto o cadena de texto. Supongamos que queremos crear componente 'cuadro de diálogo'. El 'cuadro de diálogo' debe ser capaz de envolver cualquier contenido arbitrario.

Para hacer esto, necesitamos la opción `transclude`

index.html
```
<div ng-controller="Controller">
  <my-dialog>Check out the contents, {{name}}!</my-dialog>
</div>
```
script.js
```
angular.module('docsTransclusionDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.name = 'Tobias';
}])
.directive('myDialog', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'my-dialog.html'
  };
});
```
my-dialog.html
```
<div class="alert" ng-transclude></div>
```

La opción `transclude` hace que el contenido una directiva con esta opción tenga acceso al scope fuera de la directiva en vez de  de al de dentro.

Para ilustrar esto, veamos el siguiente ejemplo. En este hemos añadido la función `link` en `script.js` que redefine `name` como `Jeff`
index.html
```
<div ng-controller="Controller">
  <my-dialog>Check out the contents, {{name}}!</my-dialog>
</div>
```

script.js
```
angular.module('docsTransclusionExample', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.name = 'Tobias';
}])
.directive('myDialog', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'my-dialog.html',
    link: function(scope) {
      scope.name = 'Jeff';
    }
  };
});
```
my-dialog.html
```
<div class="alert" ng-transclude></div>
```


