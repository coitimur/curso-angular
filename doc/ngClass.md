# ngClass
Es una directiva Angular que nos ayuda a hacer cosas como:
- Añadir/eliminar clases CSS basándose en el valor de variables Angular.
- Añadir/eliminar clases CSS basándose en la evaluación de expresiones.
- Bindear una o múltiples clases basándose en datos dinámicos.


## Sintaxis de Cadena
Ésta es la forma más simple de uso de ngClass. Añadimos una variable Angular a ng-class y ésta es la clase que será usada para este elemento.

Ejemplo:
```
<!doctype html>
<html lang="en">
    <head>
       
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
        <script>
            angular.module('classApp', [])
            .controller('mainController', function($scope) {

            });
        </script>
    </head>
    <body>

       <div class="container" ng-app="classApp" ng-controller="mainController">

          <br>
          <div class="row">
            <div class="col-xs-6">

             
              <form>
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Escribe una clase" ng-model="claseCss">
                </div>
              </form>

              <p>Probar:</p>
              <ul>
                <li>text-danger</li>
                <li>text-success</li>
                <li>text-warning</li>
                <li>bg-primary</li>
                <li>bg-info</li>
              </ul>
            </div>   
            
            <div class="col-xs-6">

              <div class="jumbotron text-center">
                <h2 ng-class="claseCss">
                  Hola
                </h2>
              </div>

            </div>
          </div>

        </div>
    </body>
</html>
```



## Sintaxis Array
Esta forma es similar a la sintaxis de cadena, pero con ahora es posible aplicar varias class CSS.

```
<!doctype html>
<html lang="en">
    <head>
       
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
        <script>
            angular.module('classApp', [])
            .controller('mainController', function($scope) {

            });
        </script>
    </head>
    <body>

       <div class="container" ng-app="classApp" ng-controller="mainController">

          <br>
          <div class="row">
            <div class="col-xs-6">

              
              <form>
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Escribe una clase" ng-model="claseCss1">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Escribe otra clase" ng-model="claseCss2">
                </div>
              </form>

              <p>Probar:</p>
              <ul>
                <li>text-danger</li>
                <li>text-success</li>
                <li>text-warning</li>
                <li>bg-primary</li>
                <li>bg-info</li>
              </ul>
            </div>   
            <div class="col-xs-6">

              <div class="jumbotron text-center">
                <h2 ng-class="[claseCss1, claseCss2]">
                  Hola
                </h2>
              </div>

            </div>
          </div>

        </div>
    </body>
</html>
```


## Evaluación de expresiones
Una forma más avanzada (y probablemente la que más usarás) es aplicar una clase como resultado de la evaluación de una variable o expresión. Si la variable o expresión evalúa a `true` se aplicará la clase.
Para evaluar una expresión, debemos usar las llaves `{}` para que Angular sepa la expresión que tiene que evaluar.


```
<!doctype html>
<html lang="en">
    <head>
       
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
		<style>
		.textLarge {
			font-size: 250%;
			font-weight: bold;
		}
		</style>

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
        <script>
            angular.module('classApp', [])
            .controller('mainController', function($scope) {

            });
        </script>
    </head>
    <body>

       <div class="container" ng-app="classApp" ng-controller="mainController">

          <br>
          <div class="row">
            <div class="col-xs-6">

              
              <form>
                <div class="form-group">
                  
                  <input type="checkbox" ng-model="textoGrande"> Tamaño grande
                </div>
                <div class="form-group">
                  <input type="number" class="form-control" placeholder="Resultado de 3+2" ng-model="suma">
                </div>
              </form>

              
            </div>   
            <div class="col-xs-6">

              <div class="jumbotron text-center">
                <h2 ng-class="{ textLarge: textoGrande, 'text-success': suma==5, 'text-danger': (suma!=5 && suma!=undefined  && suma!=''  ) }">
                  Hola
                </h2>
              </div>

            </div>
          </div>

        </div>
    </body>
</html>
```
>Los nombres de clases Css que contengan guiones (ej.: text-success) deben ponerse entre comillas simples. Angular requiere que la clave sea un identificador válido igual que el nombre de un objeto en JavaScript.



## Uso del operador Ternario
El operador ternario nos permite usar una abreviatura para especificar dos clases diferentes.


```
<!doctype html>
<html lang="en">
    <head>
       
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
		<style>
		.even-row > td { background: green;}
		.odd-row > td { background: red;}
		
		</style>

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
        <script>
            angular.module('classApp', [])
            .controller('mainController', function($scope) {
				
            });
        </script>
    </head>
    <body>

       <div class="container" ng-app="classApp" ng-controller="mainController">

          <br>
          <div class="row">
            <div class="col-xs-6">

              <table border="solid 1px">
				<tr>
					<th> Número</th>
				</tr>
					
				<tr ng-repeat="numero in [0,1,2,3,4,5,6,7]" ng-class="$even ? 'even-row' : 'odd-row'">
					<td>{{numero}}</td>
				</tr>
			  </table>
          
            </div>   
            
          </div>

        </div>
    </body>
</html>
```






## Opciones de Uso
La directiva ngClass se puede usar como un atributo (así es como se ha usado en los ejemplos anteriores) o como una clase:

```
<!-- Sintaxis cadena -->
<div class="item ng-class:type;">Hola</div>

<!-- Sintaxis aray -->
<div class="item ng-class:[clase1, clase2];">Hola</div>

<!-- Sintaxis expresión -->
<div class="item ng-class:{ 'text-error': wrong };">Hola</div>
```
Las dos formas funcionan igual.
















