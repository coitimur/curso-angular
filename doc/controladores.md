
# Controlador

En Angular, un  `Controller` es definido por una función constructor de JavaScript. Cuando un `Controller` es enlazado al DOM por medio de la directiva `ng-controller`, Angular instanciará un nuevo objeto `Controller`, usando la función constructura especificada. Un nuevo `scope` será creado y estará disponible como un parámetro inyectable a la función constructora como `$scope`.

Si el controlador ha sido enlazado al DOM usando la sintaxis `ng-contoller="controller as alias"` entonces la instancia del controlador será asignada a una propiedad del nuevo `scope`.

Usar los contraladores para:

- Establecer el estado inicial de los objetos del `$scope`.
- Añadir funcionalidad a los objetos del `$scope`.

NO usar los controladores para:

- Manipular el DOM. Los `Controller` deben contener sólo lógica de negocio. Poner lógica de presentación en los `Controller` afecta significativamente a su testabilidad.
- Formatear entradas. Usar [Angular form controls](https://docs.angularjs.org/guide/forms)
- Formatear salidas. Usar [Angular filter](https://docs.angularjs.org/guide/filter) en su lugar.
- Compartir código o estado. Usar [Angular services](https://docs.angularjs.org/guide/services) en su lugar.
- Gestionar el ciclo de vida de otros componentes. Por ejemplo, para crear instancias de servicios.

### Establecer el estado inicial de un objeto __`$scope`__

Cuando se crea una aplicación, se necesita establecer el estado inicial del `$scope`.  Esto lo hacemos enlazando propiedades al objeto `$scope`. Las propiedades contienen el __`view model`__, el modelo que será presentado por la vista. Todas las propiedades del `$scope` estarán desponibles para la plantilla en el lugar del DOM donde se registro el controlador con la sintaxis `ng-contoller="controller_name"`.

El siguiente ejemplo muestra cómo crear un `controller` en el  cual se le enlaza una propiedad al `$scope`:

```
angular.module('myApp',[]);

angular.module('myApp')
.controller('PruebaController', function($scope) {
  $scope.saludo = 'Hola!';
});
```

Se crea el módulo `myApp` y después se le añade la función constructura del controlador usando el método `.controller()`. Esto mantinen a la función constructora del controlador, fuera del contexto global.

Se enlaza el controlador al DOM usando la directiva `ng-contoller`. Ahora, la propiedad `name` puede ser vinculada a la plantilla: 


```
<div ng-controller="PruebaController">
  {{ name }}
</div>
```

### Añadiendo Funcionamiento a un Objeto Scope

Para reaccionar a los eventos o ejecutar cálculos en la vista, debemos proveer funcionamiento al contexto, enlazando métodos al objeto `$scope`. Estos métodos estarán entonces disponibles para ser llamados de la la plantilla. 

```
angular.module('myApp',[]);

angular.module('myApp',).controller('PruebaController', function($scope) {
  $scope.double = function(value) { return value * 2; };
});
```

Una vez que el controlador ha sido enlazado al DOM, el método `double` puede ser invocado en una expresión Angular en la plantilla:

```
<div ng-controller="PruebaController">
  El doble de <input ng-model="num"> es igual a {{ double(num) }}
</div>
```

### Usando los Controladores Correctamente

En general, un controlador debería contener sólo la lógica de negocio necesaría para una sóla vista.

La forma más común de mantener el tamaño de los controladores reducido, es encapsulando el trabajo  que no pertenezca al controlador en servicios y entonces usar éstos en los controladores vía inyección de dependencias. 

### Herencia del Scope

Cuando se enlazan controladores en diferentes niveles de las jerarquias del DOM, se obtiene una jerarquia de scopes que heredan uno de otro. El `$scope` que cada controlador recibe tendrá acceso a la propiedades y métodos definidas en los controladores que están más arriba en la jerarquía. Desde los `$scope` que están más abajo en la jerarquía se podrá acceder a la propiedades de los padres con `$scope.$parent.property_method`, `$scope.$parent.$parent.property_method`, ... 