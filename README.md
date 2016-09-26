



# __Curso AngularJS__

Tabla de contenidos
=================


  * [Introducción](#introduccion)
  *  [Prerrequisitos](#prerequisitos)
  * [Pasos para el desarrollo de la aplicación](#pasos-para-el-desarrollo-de-la-aplicación)
	  * [paso-0 Bootstrapping](#paso-0-bootstrapping)
	  * [paso-1 Plantilla Estática](#paso-1-plantilla-estática)
	  * [paso-2 Plantillas Angular](#paso-2-plantillas-angular)
	  * [paso-3 Componentes](#paso-3-componentes)
	  * [paso-4  Organización de Archivos y Directorios](#paso-4-organización-de-archivos-y-directorios)
	  * [paso-5 Filtrar la Directiva ngRepeater](#paso-5-filtrar-la-directiva-ngrepeater)
	  * [paso-6 Two-way Data Binding](#paso-6-two-way-data-binding)
	  * [paso-7 XHR e Inyección de Dependencias](#paso-7-xhr-e-inyección-de-dependencias)
	  * [paso-8 Links en las Plantillas e Imágenes](#paso-8-links-en-las-plantillas-e-imágenes)
	  * [paso-9 Enrutado & Multiples Vistas](#paso-9-enrutado-y-multiples-vistas)
	  * [paso-10 Más Plantillas](#paso-10-más-plantillas)
	  * [paso-11 Filtros Personalizados](#paso-11-filtros-personalizados)
	  * [paso-12 Gestores de Eventos](#paso-12-gestores-de-eventos)
	  * [paso-13 REST y Servicio Personalizados](#paso-13-rest-y-servicio-personalizados)
	  * [paso-14 Animaciones](#paso-14-animaciones)


Introducción
===========
Esta aplicación guía al desarrollador durante el proceso de desarrollo de una aplicación web usando AngularJS. La aplicación y el tutorial están basados en [Angularjs.org tutorial][tutorial-angular-org].

Cada paso enseña un único aspecto del framework.



Prerequisitos
===========

### __Git (opcional)__
- Descargar e instalar [git][git-setup].
- Descargar el proyecto en una carpeta de nuestro sistema utilizando desde una consola de comandos:
```
git clone https://github.com/coitimur/curso-angular
```
- o descargar zip desde https://github.com/coitimur/curso-angular

### __Base de Datos y Herramientas__
- Descargar e instalar el servidor  [PostgreSQL][pgsql] . Cuando el asistente de instalación solicite la contraseña para el usuario 'admin' le ponemos: '1234'.
- Descargar e instalar la herramienta [pgAdmin][pgadmin] para administración y desarrollo del servidor PostgreSQL. 
- Conectar pgAdmin al servidor PostgreSQL y ejecutar el script [esquemaDB.sql][esquemadb]


### __Node.js y Herramientas__

- Descargar e instalar [Node.js][node-download].


Pasos para el desarrollo de la aplicación
==================================

paso-0 Bootstrapping              [<i class="icon-upload"></i>](#tabla-de-contenidos)
--------------------
Desde el directorio raíz del proyecto descargado 'curso-angular' abrimos una consola de comandos y
reseteamos el espacio de trabajo al paso-0, con el comando:
```
git checkout -f paso-0
```
Desde el directorio raíz del proyecto descargado 'curso-angular' instalamos las dependencias y arrancamos el servidor con el comando:
```
npm start
```
En este paso del tutorial veremos los archivos más importantes de la aplicación. También aprenderemos a arrancar el servidor incorporado a la aplicación para que sirva los recursos que necesita la parte cliente.

Para ver la aplicación funcionando en el navegador, abrimos una ventana y navegamos a http://localhost:3000.

La página HTML 	que muestra "Nothing here yet!" ha sido construida como muestra el código siguiente.

`client/index.html`:

```
<!doctype html>
<html lang="es" ng-app>
  <head>
    <meta charset="utf-8">
    <title>My HTML File</title>
    <script src="bower_components/angular/angular.js"></script>
  </head>
  <body>

    <p>Nothing here {{'yet' + '!'}}</p>

  </body>
</html>
```
####__¿Qué hace que funcione?__

__Atributo__ `ng-app`:
```
<html ng-app>
```
El atributo `ng-app` representa la directiva Angular `ngApp` (Angular usa `kebab-case` para sus atributos personalizado y `camelCase` para las directivas que los implementan). Esta directiva es utilizada para decirle a Angular cual es el elemento raíz de nuestra aplicación. Esto da a los desarrolladores la posibilidad de decirle a Angular, si será la página HTML entera o sólo una parte de ésta, tratada como la aplicación AngularJS.

_Referencias_: [ngApp][ngapp]

__Etiqueta script__ `angular.js`:
```
<script src="bower_components/angular/angular.js"></script>>
```
Este código descarga la librería `angular.js`. Cuando la página HTML ha sido totalmente descargada el navegador ejecuta el código de la librería `angular.js`.  Cuando Angular se pone en funcionamiento intenta encontrar la etiqueta `ng-app` en la página HTML. Si la encuentra arrancará la aplicación AngularJS, con el elemento sobre el que ha sido  definida, como el elemento raíz.

_Referencias_: [Bootstrap][bootstrap]

__Doble llave con una expresión__ :
```
Nothing here {{'yet' + '!'}}
```
Esta línea demuestra dos características  de las capacidades de las plantillas de Angular:7

- Una ligadura (binding de ahora en adelante), denotado por las llaves dobles.
- Una expresión usada en el binding:  `'yet' + '!'`

El binding le dice a Angular que tiene que evaluar una expresión e insertar el resultado en el DOM en el lugar del binding.

Las expresiones Angular son como las sentencias JavaScript pero son evaluadas por Angular dentro del contexto del modelo actual, en lugar de hacerlo dentro del alcance del contexto global (window).

_Referencias_: [Expresiones Angular][expangular]

#### __Pruebas__
Añada otras expresiones al archivo `index.html`:
```
<p>100 + 200 = {{100 + 200}}</p>
```

#### __Resumen de cambios__
- Añadir el script 'angular.js' al archivo index.html.
- Añadir la directiva ngApp para bootstrap la aplicación.
- Añadir un plantilla (template) muy simple con una expresión.

paso-1 Plantilla Estática
-------------------------
Para mostrar cómo Angular mejora el HTML estándar, vamos a crear una página HTML púramente estática, para después en el paso-2 ver cómo podemos cambiar el código HTML a una plantilla Angular que muestre dinámicamente el mismo resultado, leyendo los datos desde un array almacenado en una variable.

Añadimos el siguiente código HTML al archivo `client/index.html`:

```
<ul>
  <li>
    <span>Nexus S</span>
    <p>
      Fast just got faster with Nexus S.
    </p>
  </li>
  <li>
    <span>Motorola XOOM™ with Wi-Fi</span>
    <p>
      The Next, Next Generation tablet.
    </p>
  </li>
</ul>
```

#### __Resumen de cambios__
- Añadir una lista estática con dos teléfonos.

[Ver diferencias del código con el paso-0][dif-paso-0-paso-1]

paso-2 Plantillas Angular  [<i class="icon-upload"></i>](#tabla-de-contenidos)
-------------------------------------
En este paso vamos a crear una página dinámica con Angular. 

Hay muchas formas de estructurar el código de una aplicación. Para aplicaciones angular, alentamos el uso del patrón de diseño Modelo-Vista-Controlador (MVC) para desacoplar el código y los conceptos por separado. Con esto en mente, vamos a usar un poco de JavaScript angular y añadir modelos, vistas y controladores a nuestra aplicación.

#### __Vista y Plantilla__
En Angular, la vista es la proyección del modelo a través de la plantilla HTML. Esto quiere decir que cuando el modelo cambia Angular refresca los los puntos de la plantilla donde se enlazo el modelo, modificando la vista.

La vista es creada por Angular a partir de la plantilla HTML.

`client/index.html`:

```
<html ng-app="phonecatApp">
<head>
  ...
  <script src="bower_components/angular/angular.js"></script>
  <script src="app.js"></script>
</head>
<body ng-controller="PhoneListController">

  <ul>
    <li ng-repeat="phone in phones">
      <span>{{phone.name}}</span>
      <p>{{phone.snippet}}</p>
    </li>
  </ul>

</body>
</html>
```
Vamos a reemplazar la lista de teléfonos harcodeada en HTML con la directiva ngRepeat y dos expresiones Angular:

- El atributo `ng-repeat="phone in phones` sobre la etiqueta <li> es la directiva repetidora de Angular.
- Las expresiones envueltas en dobles llaves `{{phone.name}}` y `{{phone.snippet}}` serán reemplazadas por el valor de las expresiones.

También hemos añadido una nueva directiva, [ngController][ngctrl], la cual conecta el controlador `PhoneListController` a la etiqueta `<body>`:

- El controlador `PhoneListController` está a cargo del sub-árbol del DOM que cuelga de la etiqueta `<body>`, incluida ésta.
- Las expresiones entres dobles llaves `{{phone.name}}` y `{{phone.snippet}}` denotan un binding, están haciendo referencia a propiedades de nuestro modelo  `phone` que ha sido creado en el controlador `PhoneListController`.
- También hemos especificado el módulo a cargar al inicio de la aplicación,  usando  `ng-app="phonecatApp`, donde   `phonecatApp` es el nombre del módulo que contiene el controlador  `PhoneListController`.

#### __Modelo y Controlador__

El modelo de datos es instanciado dentro del controlador  `PhoneListController`. El controlador es una simple función constructora que toma un único parámetro, `$scope`:

`client/app.js`:

```
// Define the `phonecatApp` module
var phonecatApp = angular.module('phonecatApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('PhoneListController', function PhoneListController($scope) {
  $scope.phones = [
    {
      name: 'Nexus S',
      snippet: 'Fast just got faster with Nexus S.'
    }, {
      name: 'Motorola XOOM™ with Wi-Fi',
      snippet: 'The Next, Next Generation tablet.'
    }, {
      name: 'MOTOROLA XOOM™',
      snippet: 'The Next, Next Generation tablet.'
    }
  ];
});
```
Aquí hemos declarado un controlador llamado `PhoneListController`  y registrado éste en un módulo Angular, `phonecatApp`. Observad que la directiva `ng-app` (en la etiqueta `<html>`) ahora especifica el nombre del módulo `phonecatApp` como el módulo a cargar cuando la aplicación realice el arranque.

El controlador proporcionar un contexto para nuestro modelo de datos, el controlador nos permite establecer el data-binding entre el modelo y la vista:

- La directiva `ngController`, localizada sobre la etiqueta `<body>`, referencia el nombre del controlador, `PhoneListController` (localizado en el archivo JavaScript `app.js`).
- El controlador `PhoneListController` conecta el dato `phones` al `$scope` que fue inyectado a la función del controlador.  Este scope es un descendiente prototípico del rootscope que se creó cuando arrancó la aplicación. Este scope del controlador está disponible para todos los binding ubicados dentro de la etiqueta `body ng-controller="PhoneListController">`.

#### __Scope__

El concepto de scope es crucial en Angular. Un scope puede ser visto cómo el pegamento que permite a la plantilla, al modelo y al controlador trabajar juntos. Angular usa los scopes, junto con la información contenida el la plantilla, el modelo y el controlador para mantener el modelo y la vista separada, pero sincronizadas. Los cambios realizados sobre el modelo son reflejados en la vista, y los cambios que ocurran en la vista son son reflejados en el modelo. 

#### __Pruebas__

- Añadir otro binding al archivo `index.html`:
```
<p>Total number of phones: {{phones.length}}</p>
```
- Crear una nueva propiedad del modelo en el controlador:
```
$scope.name = 'world';
```
y bindearla a la plantilla:

```
<p>Hello, {{name}}!</p>
```
- Crear un repetidor en `index.html` que construya una tabla:
```
<table>
  <tr><th>Row number</th></tr>
  <tr ng-repeat="i in [0, 1, 2, 3, 4, 5, 6, 7]"><td>{{i}}</td></tr>
</table>
```
- Intentar crear una tabla 10x10 utilizando un `ngRepeat` adicional.

#### __Resumen de cambios__
- Convertir la lista estática de teléfonos en dinámica:
  - Creando el controlador `PhoneListController`.
  - Extrayendo los datos desde el HTML del controlador como un conjunto de datos en memoria.
  - Convirtiendo el documento estático en una plantilla con el uso de la directiva `ngRepeat`.

[Ver diferencias del código con el paso-1][dif-paso-1-paso-2]

paso-3 Componentes   [<i class="icon-upload"></i>](#tabla-de-contenidos)
-------------------------------
En el paso anterior, hemos visto cómo un controlador y una plantilla trabajan juntas para convertir una página HTML estática en una vista dinámica. Éste es un patrón muy común en apliaciones SPA ( Single-Page Aplications):

- En lugar de crear una página HTML estática en el servidor, el código del cliente "se hace cargo" e interactúa dinámicamente con la vista, modificandola al instante para reflejar los cambios en los datos del modelo, por lo general como resultado de la interacción del usuario (vamos a ver un ejemplo en el paso 5).

La plantilla (la parte de la vista que contiene los binding y la lógica de presentación), actúa como un modelo de cómo nuestros datos deben estar organizados y presentados al usuario. El controlador proporciona el contexto en el cual los bindings son evaluados y donde se aplica el comportamiento y la lógica para nuestra plantilla.

Hay todavía un par de áreas que podemos mejorar:

- ¿ Y si queremos volver a utilizar la misma funcionalidad en otra parte de la aplicación?

Tendríamos que duplicar toda la plantilla (incluyendo el controlador). Esto es propenso a errores y perjudica el mantenimiento.

- El scope, que une el controlador y la plantilla en una vista dinámica, no está aislado de otras partes de la página. Esto quiere decir que un cambio,  que no esté relacionado, en otra parte de la página (por ejemplo, una colisión de nombres de variables) podría tener efectos secundarios inesperados y con una difícil depuración.

#### __Componentes al rescate__
Angular combina la unión de los controladores con las plantillas en entidades reutilizables y aisladas, conocidas como componentes. Además Angular, creará un contexto aislado para cada instancia de nuestro componente, lo que significa que no hay herencia prototípica, ni riesgo de que nuestro componente afecte a otras parte de la aplicación o viceversa.

Para crear un componente, se utiliza el método `.componente()` de un módulo Angular. 

En su forma más simple, un componente contiene una plantilla y un controlador. En realidad,  se puede omitir el controlador y Angular creará un controlador ficticio para nosotros. Esto es útil para los componentes que simplemente realizan alguna presentación, pero que no proveen ningún comportamiento a la plantilla.

Veamos un ejemplo:
```
angular.
  module('myApp').
  component('greetUser', {
    template: 'Hello, {{$ctrl.user}}!',
    controller: function GreetUserController() {
      this.user = 'world';
    }
  });
```

Ahora cada vez que incluyamos `<greet-user></greet-user>` en nuestra vista, Angular ampliará el DOM con un sub-árbol construido usando la plantilla y el controlador especificado en el componente.

¿De dónde vienen esos $ctrl? y ¿a qué se refieren? Por razones ya mencionadas se considera una buena práctica evitar el uso del scope directamente. Podemos ( y debemos) utilizar la instancia de nuestro controlador, es decir, asignar nuestros datos y métodos a propiedades nuestro controlador (el `this` dentro del constructor del controlador) en lugar de hacerlo directamente al escope. 

Desde la plantilla, podemos hacer referencia a la instancia del controlador usando un alias. De esta manera, el contexto de evaluación de nuestras expresiones está todavía más claro. De forma predeterminada los componentes utilizan `$ctrl` como alias de controlador, pero podemos anularla en caso de necesidad.

#### __Usando Componentes__

Ahora que hemos visto cómo crear componentes, vamos a refactorizar el HTML de nuestra página `index.html` haciendo uso del componente creado.

`client/index.html`
```
<html ng-app="phonecatApp">
<head>
  ...
  <script src="bower_components/angular/angular.js"></script>
  <script src="app.js"></script>
  <script src="phone-list.component.js"></script>
</head>
<body>

  <!-- Use a custom component to render a list of phones -->
  <phone-list></phone-list>

</body>
</html>
```
`client/app.js`
```
// Define the `phonecatApp` module
angular.module('phonecatApp', []);
```

`client/phone-list.component.js`
```
// Register `phoneList` component, along with its associated controller and template
angular.
  module('phonecatApp').
  component('phoneList', {
    template:
        '<ul>' +
          '<li ng-repeat="phone in $ctrl.phones">' +
            '<span>{{phone.name}}</span>' +
            '<p>{{phone.snippet}}</p>' +
          '</li>' +
        '</ul>',
    controller: function PhoneListController() {
      this.phones = [
        {
          name: 'Nexus S',
          snippet: 'Fast just got faster with Nexus S.'
        }, {
          name: 'Motorola XOOM™ with Wi-Fi',
          snippet: 'The Next, Next Generation tablet.'
        }, {
          name: 'MOTOROLA XOOM™',
          snippet: 'The Next, Next Generation tablet.'
        }
      ];
    }
  });
```
El resultado de la salida debería ser el mismo. Pero, ¿qué hemos ganado?:

- Nuestra lista de teléfonos es reutilizable.
- Nuestra vista principal ( `index.html`) está limpia y es declarativa.
- Nuestro componente está aislado y a salvo de influencias externas.
- Es más fácil poner a prueba nuestro componente de forma aislada.


#### __Pruebas__

Anadir un par de listas de teléfonos a la página, añadiendo más elementos  `<phone-list></phone-list>` a la página `index.html`. Y ahora añadimos otro binding a la plantilla del componente:
```
template:
    '<p>Total number of phones: {{$ctrl.phones.length}}</p>' +
    '<ul>' +
    ...
```
Recargue la página y observe que la nueva característica se ha propagado a todas las listas de teléfono.


#### __Resumen de cambios__
- Introducir componentes.
- Combinar el controlador y la plantilla en un componente `phoneList` reusable y aislado.
- Refactorizar la aplicación.

[Ver diferencias del código con el paso-2][dif-paso-2-paso-3]

paso-4  Organización de Archivos y Directorios   [<i class="icon-upload"></i>](#tabla-de-contenidos)
--------------------------------------------------------------------

#### Resumen de cambios
- Refactorizar la estructura de directorios y ficheros, aplicando las mejores técnicas y prácticas para que sea más fácil el mantenimiento y escalado de la apliación en el futuro:
  - Poner cada entidad en su propio fichero.
  - Organizar el código por característica en lugar de por función.
  - Separar el código en módulos de los que otro módulos puedan depender.
  - Usar plantillas externas en lugar de cadenas de texto HTML inline.

[Ver diferencias del código con el paso-3][dif-paso-3-paso-4]

paso-5 Filtrar la Directiva ngRepeater     [<i class="icon-upload"></i>](#tabla-de-contenidos)
--------------------------------------------------------

#### Resumen de cambios
- Añadir un cuadro de búsqueda para demostrar:
  - Cómo funciona el data-binding sobre los campos de entrada.
  - Cómo usar el filtro `filter`.
  - Cómo la directiva `ngRepeat` automáticamente reduce y agranda el número de teléfonos en la vista.

[Ver diferencias del código con el paso-4][dif-paso-4-paso-5]

paso-6 Two-way Data Binding   [<i class="icon-upload"></i>](#tabla-de-contenidos)
-------------------------------------------

#### Resumen de cambios
- Añadir una propiedad `age` al modelo phone.
- Añadir un drop-down menu para controlar el orden de la lista de teléfonos.
- Sustituir el valor del orden por defecto en el controlador.

[Ver diferencias del código con el paso-5][dif-paso-5-paso-6]

paso-7 XHR e Inyección de Dependencias    [<i class="icon-upload"></i>](#tabla-de-contenidos)
------------------------------------------------------------

#### Resumen de cambios
- Reemplazar el conjunto de datos en memoria con datos cargados desde el servidor a través de una llamada a un servicio REST:
  - Los datos JSON son cargador utilizando el servicio `$http`.
- Demuestra el uso de `servicios` e `inyección de dependencias` (DI):
  - El servicio `$http` es inyectado al controlador a través de DI.
  - Introduce el uso del método de anotación DI: `.$inject` e inline array.

[Ver diferencias del código con el paso-6][dif-paso-6-paso-7]

paso-8 Links en las Plantillas e Imágenes   [<i class="icon-upload"></i>](#tabla-de-contenidos)
-----------------------------------------------------------

#### Resumen de cambios
- Añadir una imagen del teléfono y un enlace para ir a la página de detalles del teléfono.
- Realizar pequeños ajustes sobre los estilos de la página modificando el CSS.

[Ver diferencias del código con el paso-8][dif-paso-8-paso-9]

paso-9 Enrutado y Multiples Vistas [<i class="icon-upload"></i>](#tabla-de-contenidos)
-------------------------------------------------

#### Resumen de cambios
- Introduce el servicio `$route`, el cual permite enlazar URLs  a vistas para realizar routing:
  - Añadir el módulo `ngRoute` como dependencia.
  - Configurar las rutas para la aplicación.
  - Usar la directiva `ngView` en 'index.html'.
- Crear una ruta al listado de teléfonos (`/phones`):
  - Mapear `/phones` al componente `phoneList`.
- Crear una ruta a los detalles del teléfono (`/phones/:phoneId`):
  - Mapear `/phones/:phoneId` a un nuevo componente `phoneDetail`.
  - Crear un componente tonto `phoneDetail`, el cual muestra el teléfono seleccionado.
  - Pasar el parámetro `phoneId`al controlador del componente por medio del servicio `$routeParams`.

[Ver diferencias del código con el paso-8][dif-paso-8-paso-9]

paso-10 Más Plantillas [<i class="icon-upload"></i>](#tabla-de-contenidos)
---------------------------------

#### Resumen de cambios
- Implementa la extracción de los datos del teléfono seleccionado y el renderizado sobre la vista:
  - Usar el servicio `$http` en el controlador `PhoneDetailController` para extraer los datos a través de la llamada a un servicio REST.
  - Crear una plantilla para la vista de los detalles.
- Añadir estilos CSS para hacer bonita la página de detalles.

[Ver diferencias del código con el paso-9][dif-paso-9-paso-10]

paso-11 Filtros Personalizados  [<i class="icon-upload"></i>](#tabla-de-contenidos)
--------------------------------------------
#### Resumen de cambios
- Implementar un filtro personalizado `checkmark`.
- Modificar la plantilla `phoneDetail` para usar el filtro `checkmark`.

[Ver diferencias del código con el paso-10][dif-paso-10-paso-11]

paso-12 Gestores de Eventos  [<i class="icon-upload"></i>](#tabla-de-contenidos)
------------------------------------------

#### Resumen de cambios
- Hacer clickables los thumbnails de las imágenes en la vista de los detalles del teléfono:
  - Añadir una propiedad `mainImageUrl` al controlador `PhoneDetailController`.
  - Implementar el método `setImage()` para cambiar la imagen principal.
  - Usar `ngClick` sobre los thumbnails para registrar un gestor que cambie la imagen principal.

[Ver diferencias del código con el paso-11][dif-paso-11-paso-12]

paso-13 REST y Servicio Personalizados  [<i class="icon-upload"></i>](#tabla-de-contenidos)
---------------------------------------------------------

#### Resumen de cambios
- Sustituir `$http` con `$resource`.
- Crear el servicio personalizado `Phone` que representa el cliente RESTful.

[Ver diferencias del código con el paso-12][dif-paso-12-paso-13]

paso-14 Animaciones   [<i class="icon-upload"></i>](#tabla-de-contenidos)
------------------------------

#### Resumen de cambios
- Añadir animaciones a la aplicación:
  - Animación de los cambios a la lista de teléfonos, añadiendo, elimiando y reordenando teléfonos con `ngRepeat`.
  - Animación de las transiciones de la vista con `ngView`.
  -  Animación de los cambios de la imagen principal en la vista de detalles del teléfono.
- Muestra tres clases de animaciones:
  - Animaciones de CSS transition.
  - Animacions de CSS keyframe.
  - Animaciones basadas en JavaScript.

- Sustituye `$http` con `$resource`.
- Crea el servicio personalizado `Phone` que representa el cliente RESTful.

[Ver diferencias del código con el paso-12][dif-paso-12-paso-13]

## Desarrollando la Aplicación



### Instalación de dependencias


La aplicación utiliza diversas herramientas de Node.js, puede instalarlos ejecutando:

```
npm install
```
Esto también ejecutará Bower para descargar los ficheros Angular necesarios para el paso del tutorial en curso.


### Arranque de la aplicación durante el desarrollo

- Ejecutar `npm start`.
- Ir en el navegador a [http://localhost:3000/](http://localhost:8000/) para ver la apliación funcionando.





## Estructura Directorios de la Aplicación

```
client/                     --> todo el código fuente de la apliación
  bower_components/...   --> JS/CSS librarias de terceras partes, incluyendo Angular
  core/                   --> todo el código del módulo core (usado a través de toda la aplicación)
    filters/...        --> filtros personalizados`
        checkmark/...        --> archivos del filtro `checkmark` 
    factories/...       --> factorias personalizadas
         phone/...            --> archivos del submódulo `core.phone`
    core.module.js       --> el archivo del módulo core
  img/...                --> archivos de las imágenes utilizadas en la aplicación
  partials/...          --> archivos de los parciales de la aplicación
        phone-detail/...       --> files for the `phoneDetail` module, including JS source code, HTML templates, specs
        phone-list/...         --> files for the `phoneList` module, including JS source code, HTML templates, specs
  app.config.js          --> configuration de los servicios de uso en toda la aplicación
  css/...                --> archivos con las hojas de estilos personalizadas para la aplicación
        app.css                --> la hoja de estilos CSS personalizados de la aplicación
  app.module.js          --> el módulo principal de la aplicación
  index.html             --> el archivo de La principal plantilla HTML de la aplicación
node_modules/...         --> herramientas de desarrollo (descargados usando `npm`)
bower.json               --> metadatos específicos para Bower y las dependencias del lado cliente
package.json             --> metadatos específicos de Node.js y las dependencias de las herramientas de desarrollo
```


## Más información

Para más información sobre AngularJS, visite https://angularjs.org/.

[tutorial-angular-org]: https://docs.angularjs.org/tutorial
[bower]: http://bower.io/
[git-home]: https://git-scm.com
[git-setup]: https://help.github.com/articles/set-up-git/
[node-download]: https://nodejs.org/en/download/
[pgsql]: http://www.postgresql.org.es/descargas
[pgadmin]: https://www.pgadmin.org/download/
[ngapp]: https://docs.angularjs.org/api/ng/directive/ngApp
[bootstrap]: https://docs.angularjs.org/guide/bootstrap
[expangular]: https://docs.angularjs.org/guide/expression
[ngctrl]: https://docs.angularjs.org/api/ng/directive/ngController

[esquemadb]: https://github.com/coitimur/curso-angular/blob/master/esquemaDB.sql
[dif-paso-0-paso-1]: https://github.com/coitimur/curso-angular/compare/paso-0...paso-1
[dif-paso-1-paso-2]: https://github.com/coitimur/curso-angular/compare/paso-1...paso-2
[dif-paso-2-paso-3]: https://github.com/coitimur/curso-angular/compare/paso-2...paso-3
[dif-paso-3-paso-4]: https://github.com/coitimur/curso-angular/compare/paso-3...paso-4
[dif-paso-4-paso-5]: https://github.com/coitimur/curso-angular/compare/paso-4...paso-5
[dif-paso-5-paso-6]: https://github.com/coitimur/curso-angular/compare/paso-5...paso-6
[dif-paso-6-paso-7]: https://github.com/coitimur/curso-angular/compare/paso-6...paso-7
[dif-paso-7-paso-8]: https://github.com/coitimur/curso-angular/compare/paso7...paso-8
[dif-paso-8-paso-9]: https://github.com/coitimur/curso-angular/compare/paso-8...paso-9
[dif-paso-9-paso-10]: https://github.com/coitimur/curso-angular/compare/paso-9...paso-10
[dif-paso-10-paso-11]: https://github.com/cotimur/curso-angular/compare/paso-10...paso-11
[dif-paso-11-paso-12]: https://github.com/coitimur/curso-angular/compare/paso-11...paso-12
[dif-paso-12-paso-13]: https://github.com/coitimur/curso-angular/compare/paso-12...paso-13
[dif-paso-13-paso-14]: https://github.com/coitimur/curso-angular/compare/paso-13...paso-14
