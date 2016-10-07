# Form
Vamos a ver la etiqueta `form` y la directiva ngForm junto con las facilidades de validación sobre el cliente que estas nos proporciona a través de sus propiedades.
Si es especificada la propiedad `name`, el controlador del formulario es publicado en el scope actual con ese nombre.


## Propiedades y Clases CSS de los formularios Angular

### Clases CSS
Angular proporciona clases CSS sobre los formularios para ayudarnos a validarlos. Estas propiedades nos dan varias informaciones sobre un formulario o sus campos (`input`) y son aplicadas a formularios y campos.

A nivel de formulario:
`ng-valid` es colocada si todos los campos del formulario están validados.
`ng-invalid` es colocada si alguno de los campos del formulario es invalido.
`ng-pristine` es colocada si ninguno de los campos del formulario ha sido modificado.
`ng-dirty` es colocada si alguno de los campos del formulario ha sido modificado.
 `ng-touched` es colodada si alguno de los campos del formulario ha sido tocado.
`ng-submitted` es colocada si el formulario fue enviado.

A nivel de campo:
`ng-valid` es colocada si el campo está validado.
`ng-invalid` es colocada si el campo es invalido.
`ng-pristine` es colocada si el campo ha no sido modificado.
`ng-dirty` es colocada si el campo ha sido modificado.
`ng-touched` es colodada si el campo ha sido tocado.
 

Exiten otras clases más específicas utilizadas por Angular:
`ng-invalid-required`        {  }
`ng-invalid-minlength`       {  }
`ng-valid-max-length`        {  }

### Propiedades
Angular proporciona propiedades sobre los formularios para ayudarnos a validarlos. Estas propiedades nos dan varias informaciones sobre un formulario o sus campos (`input`) y son aplicadas a formularios y campos.

A nivel de formulario:
`$valid` es true si todos los campos del formulario están validados.
`$invalid` es true si alguno de los campos del formulario es invalido.
`$pristine` es true si ninguno de los campos del formulario ha sido modificado.
`$dirty` es true si alguno de los campos del formulario ha sido modificado.
`$touched` es true si alguno de los campos del formulario ha sido tocado.
`$submitted` es true si el formulario fue enviado.

A nivel de campo:
`$valid` es true si el campo está validado.
`$invalid` es true si el campo es invalido.
`$pristine` es true si el campo ha no sido modificado.
`$dirty` es true si el campo ha sido modificado.
`$touched` es true si el campo ha sido tocado.





La directiva ngAnimate detecta cuando alguna de estás clases es añadida o quitada.

## Enviando un formulario y previniendo la acción por defecto
Como el papel de los formularios en las aplicaciones del lado cliente como Angular es diferente que en las apliaciones clásicas de ida y vuelta, es deseable que el navegador no envíe los datos del formulario al servidor con una recarga completa de la página. Para esto, es necesario que algún código JavaScrip sea ejecutado para gestionar el envío de los datos del formulario.

Por esta razón, Angular previene la acción por defecto (envío del formulario al servidor), si no tiene el atributo `action` especificado.

Podemos usar una de las dos formas siguientes para especificar que método javascript debe ser llamado cuando un formulario es envíado:
- Directiva `ngSubmit` sobre el elemento `form` .
- Directiva `ngClick` sobre el primer botón o campo de tipo submit.

##Animaciones
Las animaciones en ngForm son disparadas cuando algunas de las clases CSS son añadidas o quitadas.



## Ejemplo

```
<!doctype html>
<html lang="en">
    <head>
       
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
		<style>
			body { padding-top:30px; }
			
		</style>

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
        <script>
                angular.module('app', [])
				.controller('mainController', function($scope) {      
					$scope.submitForm = function() {

						// check to make sure the form is completely valid
						if ($scope.userForm.$valid) {
							alert('El formulario ha sido enviado');
						}
					};
				});
        </script>
    </head>
    <body>
          <br>
          <div ng-app="app" ng-controller="mainController">
				<div class="container">
				<div class="row">  
				   
				<div class="col-sm-6">
					<!-- FORM ============ -->
				  
					<form name="userForm" ng-submit="submitForm()" novalidate>

						<!-- NOMBRE -->
						<div class="form-group" ng-class="{ 'has-error' : userForm.name.$invalid && !userForm.name.$pristine }">
							<label>Name</label>
							<input type="text" name="name" class="form-control" ng-model="user.name" ng-required="true">
							<p ng-show="userForm.name.$invalid && !userForm.name.$pristine" class="help-block">Este campo es obligatorio.</p>
						</div>
					  
						<!-- NOMBRE USUARIO -->
						<div class="form-group" ng-class="{ 'has-error' : userForm.username.$invalid && !userForm.username.$pristine }">
							<label>Username</label>
							<input type="text" name="username" class="form-control" ng-model="user.username" ng-minlength="3" ng-maxlength="8">
							<p ng-show="userForm.username.$error.minlength" class="help-block">El nombre de usuario es demasiado corto.</p>
							<p ng-show="userForm.username.$error.maxlength" class="help-block">El nombre de usuario es demasiado largo.</p>
						</div>
						
						<!-- EMAIL -->
						<div class="form-group" ng-class="{ 'has-error' : userForm.email.$invalid && !userForm.email.$pristine }">
							<label>Email</label>
							<input type="email" name="email" class="form-control" ng-model="user.email">
							<p ng-show="userForm.email.$invalid && !userForm.email.$pristine" class="help-block">Introduzca una dirección de email válida</p>
						</div>
						
						<!-- PASSWORD -->
						<div class="form-group" ng-class="{ 'has-error' : userForm.password.$invalid && !userForm.password.$pristine }">
							<label>Password</label>
							<input type="password" name="password" class="form-control" ng-model="user.password" ng-pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/">
							<p ng-show="userForm.password.$invalid && !userForm.password.$pristine" class="help-block">Introduzca una contraseña válida: 
							<br>	<span>Longitud de 8 a 15 </span>
							<br>	<span>Al menos una letra mayúscula</span>
							<br>	<span>Al menos una letra minúscula</span>
							<br>	<span>Al menos un número</span>
							<br>	<span>Al menos un carácter especial</span>
							
							
							</p>
						</div>
						
						
						
						
						<button type="submit" class="btn btn-primary" ng-disabled="userForm.$invalid">Enviar</button>
						
					</form>
				  </div>
				  <div class="col-sm-6">
					 
					<div class="row">
						<div class="col-xs-2">
							<h3>Form</h3>
							<table class="table table-bordered">
								<tbody>
									<tr>
										<td ng-class="{ success: userForm.$valid, danger: userForm.$invalid }">Valid</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.$pristine, danger: !userForm.$pristine }">Pristine</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.$dirty }">Dirty</td>
									</tr>
									
								</tbody>
							</table>
						</div>
						<div class="col-xs-2">
							<h3>Name</h3>
							<table class="table table-bordered">
								<tbody>
									<tr>
										<td ng-class="{ success: userForm.name.$valid, danger: userForm.name.$invalid }">Valid</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.name.$pristine, danger: !userForm.name.$pristine }">Pristine</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.name.$dirty }">Dirty</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.name.$touched }">Touched</td>
									</tr>
									
								</tbody>
							</table>
						</div>
						<div class="col-xs-2">
							<h3>UserN</h3>
							<table class="table table-bordered">
								<tbody>
									<tr>
										<td ng-class="{ success: userForm.username.$valid, danger: userForm.username.$invalid }">Valid</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.username.$pristine, danger: !userForm.username.$pristine }">Pristine</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.username.$dirty }">Dirty</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.username.$touched }">Touched</td>
									</tr>
									
								</tbody>
							</table>
						</div>
						<div class="col-xs-2">
							<h3>Email</h3>
							<table class="table table-bordered">
								<tbody>
									<tr>
										<td ng-class="{ success: userForm.email.$valid, danger: userForm.email.$invalid }">Valid</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.email.$pristine, danger: !userForm.email.$pristine }">Pristine</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.email.$dirty }">Dirty</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.email.$touched }">Touched</td>
									</tr>
									
								</tbody>
							</table>
						</div>
						<div class="col-xs-2">
							<h3>Password</h3>
							<table class="table table-bordered">
								<tbody>
									<tr>
										<td ng-class="{ success: userForm.password.$valid, danger: userForm.password.$invalid }">Valid</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.password.$pristine, danger: !userForm.password.$pristine }">Pristine</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.password.$dirty }">Dirty</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.password.$touched }">Touched</td>
									</tr>
									
								</tbody>
							</table>
						</div>
						
						
						
					</div>
					
				</div>
			</div>
		</div>

      
    </body>
</html>
```


### Accediendo las propiedades del Formulario Angular
- Para el formulario: `form_name.angular_property`
- Para un campo: `form_name.input_name.angular_property`

### Propiedad HTML5 `novalidate`
La propiedad `novalidate` previene las validaciones que HTML5 realiza por defecto.

## Controles HTML de entrada (input)
Los controles HTML usados con la directiva `ngModel`, proporcionan data-binding, control del estado del `input` y validación. Los controles de entrada Angular, siguen los controles input de HTML5 y 'polyfills' (implementa estas características sobre navegadores antiguos) las validaciones HTML5 sobre navegadores que no las soportan.
>Nota: No todas las características ofrecidas están disponibles para todos los tipos de `input`.

### Uso
como elemento:

```
<input
  ng-model="string"
  [name="string"]
  [ng-required="boolean"]
  [ng-minlength="number"]
  [ng-maxlength="number"]
  [ng-pattern="string"]
  [ng-change="string"]
  [ng-trim="boolean"]>
...
</input>
```

#### Argumentos
- `ngModel` expresión angular para data-binding.
- `name` (opcional) propiedad name del formulario bajo el cual el control ha sido publicado.
- `ngRequired` (opcional) establece a `true` la propiedad `required` si no es introducido valor al control.
- `ngMinlength` (opcional) establece a `true` la propiedad `minlength` si la longitud del valor de entrada es inferior al valor del parámetro.
- `ngMaxlength` (opcional) establece a `true` la propiedad `maxlength` si la longitud del valor de entrada es superior al valor del parámetro.
- `ngPattern` (opcional) establece a true la propiedad `pattern` si el valor de entrada no coincide con la expresión regular pasada con el parámetro.
- 
- `ngChange` (opcional) una expresión Angular para ser ejecutada cuando el valor de entrada cambie debido a una interacción del usuario con el control.
- `ngTim` (opcional)si es establecido a `false`, Angular no realizará de forma automática la operación `trim` (quitar espacios por delante y por detrás) sobre el valor de entrada. Este parámetro es ignorado para los controles de tipo password, los cuales nunca realizan un `trim` de la entrada. El valor por defecto es true.

## Directiva ngMessages
Desde Angular 1.3, hay una nueva herramienta para crear y manejar formularios, ngMessages. Este módulo nos ayuda específicamente a mostrar mensajes de error desde la validación del formulario.

```
<form name="userForm">

    <input 
        type="text" 
        name="username" 
        ng-model="user.username" 
        ng-minlength="3" 
        ng-maxlength="8"
        required>
        
    <div ng-messages="userForm.name.$error">
        <p ng-message="minlength">Your name is too short.</p>
        <p ng-message="maxlength">Your name is too long.</p>
        <p ng-message="required">Your name is required.</p>
    </div>

</form>
```
ngMessages gestiona el mostrar u ocultar mensajes específicos basados en los errores. Básicamente, lo que hace es iterar a través del objeto userForm.name.$error y mostrar los mensajes adecuados al error.

### Usando ngMessages
La configuración de ngMessages es muy simple. Sólo necesitamos enlazar la dependencia al archivo index.html

```
<!-- load ngmessages -->
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular-messages.js"></script>
ff
```
y despúes injectar el módulo a nuestra aplicación (ponerlo como dependencia del módulo principal)

```
angular.module('app', ['ngMessages']);
```

### Mostar Mensajes
Para mostrar mensajes de error tenemos que usar la directiva ng-messages pasándole el objeto $error del campo:


```
<div ng-messages="<formName>.<inputName>.$error">
    <p ng-message="<validationName>">Your message here.</p>
</div>
```

En nuestro ejemplo, para el campo `username`:

```
<label>Username</label>
<input type="text" name="username" class="form-control" ng-model="user.username" ng-minlength="3" ng-maxlength="8">
<div class="help-block" ng-messages="userForm.username.$error" >
    <p ng-message="minlength">Nombre de usuario demasiado corto.</p>
    <p ng-message="maxlength">Nombre de usuarios demasido largo.</p>

</div>
```

Tener que repetir esto por cada campo es algo tedioso. Lo podemos simplificar utilizando un fichero externo que contenga todos los mensajes de error e incluirlo utilizando la directiva `ng-messages-inclue`:

messages.html

```
<p ng-message="required">Este campo es obligatorio</p>
<p ng-message="minlength">El campo es demasiado corto</p>
<p ng-message="maxlength">El campo es demasiado largo</p>
<p ng-message="email">Introduzca un email válido</p>
<p ng-message="pattern"> Introduzca una contraseña válida:
	<br>	<span>Longitud de 8 a 15 </span>
	<br>	<span>Al menos una letra mayúscula</span>
	<br>	<span>Al menos una letra minúscula</span>
	<br>	<span>Al menos un número</span>
	
</p>
```

index.html

```
...
<label>Username</label>
<input type="text" name="username" class="form-control" ng-model="user.username" ng-minlength="3" ng-maxlength="8">
<div class="help-block" ng-messages="userForm.username.$error">
    <div ng-messages-include="messages.html"></div>
</div>
...
```

Esto quiere decir que podemos reutilizar los mensajes de error para toda la aplicación.

```
<!doctype html>
<html lang="en">
    <head>
       
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
		<style>
			body { padding-top:30px; }
			
		</style>

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular-messages.js"></script>
        <script>
                angular.module('app', ['ngMessages'])
				.controller('mainController', function($scope) {      
					$scope.submitForm = function() {

						// check to make sure the form is completely valid
						if ($scope.userForm.$valid) {
							alert('El formulario ha sido enviado');
						}
					};
				});
        </script>
    </head>
    <body>
          <br>
          <div ng-app="app" ng-controller="mainController">
				<div class="container">
				<div class="row">  
				   
				<div class="col-sm-6">
				
					<!-- FORM ============ -->
				  
					<form name="userForm" ng-submit="submitForm()" novalidate>

						<!-- NOMBRE -->
						<div class="form-group"">
							<label>Name</label>
							<input type="text" name="name" class="form-control" ng-model="user.name" ng-required="true">
							<div class="help-block" ng-messages="userForm.name.$error" >
								<div ng-messages-include="messages.html"></div>
							</div>
						</div>
					  
						<!-- NOMBRE USUARIO -->
						<div class="form-group">
							<label>Username</label>
							<input type="text" name="username" class="form-control" ng-model="user.username" ng-minlength="3" ng-maxlength="8">
							
							<div class="help-block" ng-messages="userForm.username.$error" >
								<div ng-messages-include="messages.html"></div>
							</div>
						</div>
						
						<!-- EMAIL -->
						<div class="form-group">
							<label>Email</label>
							<input type="email" name="email" class="form-control" ng-model="user.email">
							<div class="help-block" ng-messages="userForm.email.$error" >
								<div ng-messages-include="messages.html"></div>
							</div>
						</div>
						
						<!-- PASSWORD -->
						<div class="form-group"">
							<label>Password</label>
							<input type="password" name="password" class="form-control" ng-model="user.password" ng-pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/">
						</div>
						<div class="help-block" ng-messages="userForm.password.$error" >
							<div ng-messages-include="messages.html"></div>
						</div>
						{{userForm.password.$error}}
						
						
						
						<button type="submit" class="btn btn-primary" ng-disabled="userForm.$invalid">Enviar</button>
						
						
						
						
					</form>
				  </div>
				  <div class="col-sm-6">
					 
					<div class="row">
						<div class="col-xs-2">
							<h3>Form</h3>
							<table class="table table-bordered">
								<tbody>
									<tr>
										<td ng-class="{ success: userForm.$valid, danger: userForm.$invalid }">Valid</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.$pristine, danger: !userForm.$pristine }">Pristine</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.$dirty }">Dirty</td>
									</tr>
									
								</tbody>
							</table>
						</div>
						<div class="col-xs-2">
							<h3>Name</h3>
							<table class="table table-bordered">
								<tbody>
									<tr>
										<td ng-class="{ success: userForm.name.$valid, danger: userForm.name.$invalid }">Valid</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.name.$pristine, danger: !userForm.name.$pristine }">Pristine</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.name.$dirty }">Dirty</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.name.$touched }">Touched</td>
									</tr>
									
								</tbody>
							</table>
						</div>
						<div class="col-xs-2">
							<h3>UserN</h3>
							<table class="table table-bordered">
								<tbody>
									<tr>
										<td ng-class="{ success: userForm.username.$valid, danger: userForm.username.$invalid }">Valid</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.username.$pristine, danger: !userForm.username.$pristine }">Pristine</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.username.$dirty }">Dirty</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.username.$touched }">Touched</td>
									</tr>
									
								</tbody>
							</table>
						</div>
						<div class="col-xs-2">
							<h3>Email</h3>
							<table class="table table-bordered">
								<tbody>
									<tr>
										<td ng-class="{ success: userForm.email.$valid, danger: userForm.email.$invalid }">Valid</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.email.$pristine, danger: !userForm.email.$pristine }">Pristine</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.email.$dirty }">Dirty</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.email.$touched }">Touched</td>
									</tr>
									
								</tbody>
							</table>
						</div>
						<div class="col-xs-2">
							<h3>Password</h3>
							<table class="table table-bordered">
								<tbody>
									<tr>
										<td ng-class="{ success: userForm.password.$valid, danger: userForm.password.$invalid }">Valid</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.password.$pristine, danger: !userForm.password.$pristine }">Pristine</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.password.$dirty }">Dirty</td>
									</tr>
									<tr>
										<td ng-class="{ success: userForm.password.$touched }">Touched</td>
									</tr>
									
								</tbody>
							</table>
						</div>
						
						
						
					</div>
					
				</div>
			</div>
		</div>

      
    </body>
</html>
```

messages.html

```
<p ng-message="required">Este campo es obligatorio</p>
<p ng-message="minlength">El campo es demasiado corto</p>
<p ng-message="maxlength">El campo es demasiado largo</p>
<p ng-message="email">Introduzca un email válido</p>
<p ng-message="pattern"> Introduzca una contraseña válida:
	<br>	<span>Longitud de 8 a 15 </span>
	<br>	<span>Al menos una letra mayúscula</span>
	<br>	<span>Al menos una letra minúscula</span>
	<br>	<span>Al menos un número</span>
</p>
```

También es posible utilizar la directiva `ngTemplate` para incluir los mensajes de error en el mismo archivo y prescindir del fichero externo:


```
<script type="text/ng-template" id="messages.html">
    <p ng-message="required">Este campo es obligatorio</p>
    <p ng-message="minlength">El campo es demasiado corto</p>
    <p ng-message="maxlength">El campo es demasiado largo</p>
    <p ng-message="email">Introduzca un email válido</p>
    <p ng-message="pattern"> Introduzca una contraseña válida:
        <br>	<span>Longitud de 8 a 15 </span>
        <br>	<span>Al menos una letra mayúscula</span>
        <br>	<span>Al menos una letra minúscula</span>
        <br>	<span>Al menos un número</span>
    </p>
</script>
```

## Usando Checkboxes en Angular

Los controles de formulario `checkbox` (casilla de verificación) son muy comunes en los formularios. Vamos a ver como Angular bindea sus datos utilizando la directiva `ngModel`.

### Uso

como elemento:
```
<input type="checkbox"
       ng-model="string"
       [name="string"]
       [ng-true-value="expression"]
       [ng-false-value="expression"]
       [ng-change="string"]>
```

####Parámetros
- `ngModel` expresión angular para data-binding.
- `name` (opcional) propiedad name del formulario bajo el cual el control ha sido publicado.
- `ngTrueValue` (opcional) el valor que será asignado a la expresión cuando sea seleccionado.
- `ngFalseValue` (opcional) el valor que será asignado a la expresión cuando no sea seleccionado.
- `ngChange` (opcional) una expresión Angular para ser ejecutada cuando el valor de entrada cambie debido a una interacción del usuario con el control.





Añadimos a nuestro formulario tres checkbox:

```
<!-- MULTIPLE CHECKBOXES -->
<label>Favorite Colors</label>
<div class="form-group">
    <label class="checkbox-inline">
        <input type="checkbox" name="favoriteColors" ng-model="user.favoriteColors.red"> Red
    </label>
    <label class="checkbox-inline">
        <input type="checkbox" name="favoriteColors" ng-model="user.favoriteColors.blue"> Blue
    </label>
    <label class="checkbox-inline">
        <input type="checkbox" name="favoriteColors" ng-model="user.favoriteColors.green"> Green
    </label>
</div>
```

### Valores personalizados
Por defecto, los controles `checkbox` retornan un valor `true` o `false`. Pero es posible que necesitemos que retornen un valor diferente. Angular, proporciona una forma para hacerlo usando las directivas `ng-true-value` y `ng-false-value`

```
...

    <!-- CUSTOM VALUE CHECKBOXES -->
    <label></label>
    <div class="checkbox">
        <label>
            <input type="checkbox" name="contento" ng-model="user.contento" ng-true-value="Sí" ng-false-value="No">
            ¿Estás contento?
        </label>
    </div>

...
```

## Usando Radio buttons en Angular
Los radio buttons son un poco más fáciles debido a que no tiene que almacenar múltiples valores. Un radio button será un único valor, ya que sólo podemos seleccionar una cosa.

### Uso

como elemento:
```
<input type="radio"
       ng-model="string"
       value="string"
       [name="string"]
       [ng-change="string"]
       ng-value="string">
```

####Parámetros
- `ngModel` expresión angular para data-binding.
- `value` el valor que será asignado a la expresión `ngModel` cuando sea seleccionado. `value` sólo soporta valores de tipo `string`
- `name` (opcional) propiedad name del formulario bajo el cual el control ha sido publicado.
- `ngChange` (opcional) una expresión Angular para ser ejecutada cuando el valor de entrada cambie debido a una interacción del usuario con el control.
- ngValue (opcional) la expresión Angular que será asignada a `ngModel` cuando sea seleccionado. Debe ser usado en vez de `value` cuando necesitemos un valor que no sea de tipo `string` (`boolean`, `array`, ...).






```
...

    <!-- RADIO BUTTONS -->
    <label>Sexo</label>
    <div class="form-group">
        <div class="radio">
            <label>
                <input type="radio" name="sexo" value="varón" ng-model="user.sexo">
                Varón
            </label>
        </div>
        <div class="radio">
            <label>
                <input type="radio" name="sexo" value="mujer" ng-model="user.sexo">
                Mujer
            </label>
        </div>
    </div>

...
```

## Alias: ngForm
En Angular los formularios pueden estar anidados. Esto quiere decir que el formulario padre será valido cuando todos los formularios hijos lo estén también. Los navegadores no permiten el anidamiento de los elementos `<form>`, por eso Angular proporciona la directiva `ngForm`, la cual funciona igual que` <form>` pero a demás puede ser anidada. El anidamiento de formularios puede ser útil, por ejemplo, si necesitamos determinar la validación de un subgrupo de controles.

>Nota: El propósito de ngForm es agrupar controles, no reemplazar la etiqueta form.


Ejemplo:

```
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
</head>
<body ng-app="app">
    <div ng-controller="mainController">
        <form ng-submit="save(user)">
            First Name:<input type="text" ng-model="user.firstName"> <br />
            Last Name:<input type="text" ng-model="user.lastName"><br />
            User Name:<input type="text" ng-model="user.userName"><br />
            Password:<input type="password" ng-model="user.password"><br />
            Gender: <input type="radio" ng-model="user.gender" value="male" />male
            <input type="radio" ng-model="user.gender" value="female" />female<br />
            <button type="submit">save</button>
        </form>
        <pre>Form:{{user | json}}</pre>
      <pre>Saved Data:{{saveDate | json}}</pre>
    </div>
    <script>
        var app = angular.module("app", []);
        app.controller('mainController', ['$scope', function ($scope) {
            $scope.saveDate = {};
            $scope.save = function (user) {
                $scope.saveDate = angular.copy(user);
            }
        }]);
    </script>
</body>
</html>
```
Si cambiamos la etiqueta `form` por la directiva `ng-form`, vemos que el botón submmit no funciona.