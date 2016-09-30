

# Filtros

Los filtros formatean el valor de una expresión para mostrarla al usuario. Pueden ser usados en plantillas, controladores y servicios. Angular trae una serie de filtros incorporados:

- [filter][filterfilter]: selecciona un subconjunto de  items desde un array y los devuelve como un nuevo array.

Uso en HTML:
```
{{ filter_expression | filter : expression : comparator : anyPropertyKey}}
```
Ejemplo:
```
<label>Any: <input ng-model="search.$"></label> 
<br>
<label>Name only <input ng-model="search.name"></label>
<br>
<label>Phone only <input ng-model="search.phone"></label>
<br>
<label>Equality <input type="checkbox" ng-model="strict"></label>
<br>
<li ng-repeat="phone in phones | filter:search:strict">
		<span>{{phone.name}}</span>
		<p>{{phone.snippet}}</p>
</li>
```

Uso en JavaScript:
```
$filter('filter')(array, expression, comparator, anyPropertyKey)
```
Ejemplo:
```
.controller("PhoneListController",function(,$scope, $filter){
  ...
  var phonesAll = [
                    ...
                  ]
  $scope.phones = $filter('filter')(phonesAll);
  ...
}
```



- [currency][filtercurrency]: formatea un número como moneda. Cuando no se provee un símbolo de moneda, es utilizado el símbolo de la moneda local.

El formato de la salida estará basado en la localización actual.

Uso en HTML:
```
{{ currency_expression | currency : symbol : fractionSize}}
```
Ejemplo:
```
<input type="number" ng-model="precio" >
 <br>
 Símbolo de moneda por defecto ($): <span>{{precio | currency}}</span>
 <br>
 Símbolo de moneda personalizado (USD$): <span>{{precio | currency:"USD$"}}</span>
 <br>
  Sin decimales: <span>{{amount | currency:"USD$":0}}</span>
</div>
```

Uso en JavaScript:
```
$filter('currency')(amount, symbol, fractionSize)
```
Ejemplo:
```
<input type="number" ng-model="precio" >
 <br>
  Sin decimales: <span>{{precio}}</span>
</div>

----------------------------------------------------
.controller("PhoneListController",function(,$scope, $filter){
  ...
  $filter('currency')(precio,"€",2);
  ...
}
```
- [number][filternumber]: formatea un número como texto. Si la entrada es `null` o `undefined` esto es lo que será devuelto. Si la entrada es infinito o -infinito el simbolo `∞` o `-∞` será devuelto respectivamente. Si la entrada no es un número una cadena vacía será devuelta.

El formato de la salida estará basado en la localización actual.

Uso en HTML:
```
{{ number_expression | number : fractionSize}}
```
Ejemplo:
```
<div>
<input type="number" ng-model="cantidad" >
 <br>
 Cantidad: <span>{{cantidad | number: 1}}</span> 
</div>
```

Uso en JavaScript:
```
$filter('number')(number, fractionSize)
```
Ejemplo:
```
<div>
<input type="number" ng-model="cantidad" >
 <br>
 Cantidad: <span>{{cantidad}}</span> 
</div>

-------------------------------------------------
.controller("PhoneListController",function(,$scope, $filter){
  ...
     $scope.fecha=$filter('number')(cantidad,1);
  ...
}
```

- [date][filterdate]: formatea una fecha a una cadena con el formato que le pedimos con el parámetro  `format` (opcional). 

El formato de la salida estará basado en la localización actual.

Uso en HTML:
```
{{ date_expression | date : format : timezone}}
```
Ejemplo:
```
<div>
<input type="date" ng-model="fecha" >
 <br>
 Fecha: <span>{{fecha| date: yyyy-MM-dd}}</span>
</div>
```

Uso en JavaScript:
```
$filter('date')(date, format, timezone)
```
Ejemplo:
```
<div>
<input type="date" ng-model="fecha" >
 <br>
 Fecha: <span>{{fecha}}</span>
</div>
------------------------------------------------
.controller("PhoneListController",function(,$scope, $filter){
  ...
     $scope.fecha=$filter('date')(fecha,'yyyy-MM-dd');
  ...
}
```

- [json][filterjson]: convierte un objeto JavaScript (json, array y tipos primitivos) a una cadena JSON. 


Uso en HTML:
```
{{ json_expression | json : spacing_for_indent}}
```
Ejemplo:
```
<pre id="default-spacing">{{ {'name':'value'} | json }}</pre>
<pre id="custom-spacing">{{ {'name':'value'} | json:4 }}</pre>
```

Uso en JavaScript:
```
$filter('json')(object, spacing)
```
Ejemplo:
```
.controller("PhoneListController",function(,$scope, $filter){
  ...
     var objJS={'name':'value'};
     console.log('JSON format:' $filter('json')(objJS);
     console.log('JSON format indent:' $filter('json')(objJS, 4);
  ...
}
```







También es posible crear fácilmente unos personalizados.


[filtercurrency]: https://docs.angularjs.org/api/ng/filter/currency
[filterfilter]: https://docs.angularjs.org/api/ng/filter
[filternumber]: https://docs.angularjs.org/api/ng/filter/number

[filterdate]: https://docs.angularjs.org/api/ng/filter/date

[filterjson]: https://docs.angularjs.org/api/ng/filter/json

[filterlowercase]: https://docs.angularjs.org/api/ng/filter/uppercase

[filterlimitto]: https://docs.angularjs.org/api/ng/filter/limitto
[filterorderby]: https://docs.angularjs.org/api/ng/filter/orderby
