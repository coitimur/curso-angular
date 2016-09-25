


# Curso AngularJS


## Intruducción
Esta aplicación guía al desarrollador durante el proceso de desarrollo de una aplicación web usando AngularJS. La aplicación y el tutorial están basados en [Angularjs.org tutorial][tutorial-angular-org].

Cada paso enseña un único aspecto del framework.



## Prerequisitos

### Git (opcional)
- Descargar e instalar [git][git-setup].
- Descargar el proyecto en una carpeta de nuestro sistema utilizando desde una consola de comandos:
```
git clone https://github.com/coitimur/curso-angular
```
- o descargar zip desde https://github.com/coitimur/curso-angular

### Base de Datos y Herramientas
- Descargar e instalar el servidor  [PostgreSQL][pgsql] . Cuando el asistente de instalación solicite la contraseña para el usuario 'admin' le ponemos: '1234'.
- Descargar e instalar la herramienta [pgAdmin][pgadmin] para administración y desarrollo del servidor PostgreSQL. 


### Node.js y Herramientas


- Descargar e instalar [Node.js][node-download].


## __Pasos para el desarrollo de la aplicación__

### __paso-0 Bootstrapping__
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
#### ¿Qué hace que funcione?
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

#### Pruebas
Añada otras expresiones al archivo `index.html`:
```
<p>100 + 200 = {{100 + 200}}</p>
```

#### Resumen de cambios
- Añadir el script 'angular.js' al archivo index.html.
- Añadir la directiva ngApp para bootstrap la aplicación.
- Añadir un plantilla (template) muy simple con una expresión.

### paso-1 _Plantilla Estática_

#### Resumen de cambios
- Añadir un fichero css ('cliente/app.css').
- Añadir una lista estática con dos teléfonos.

[Ver diferencias del código con el paso-0][dif-paso-0-paso-1]

### paso-2 _Plantillas Angular_



#### Resumen de cambios
- Convertir la lista estática de teléfonos en dinámica:
  - Creando el controlador `PhoneListController`.
  - Extrayendo los datos desde el HTML del controlador como un conjunto de datos en memoria.
  - Convirtiendo el documento estático en una plantilla con el uso de la directiva `ngRepeat`.

[Ver diferencias del código con el paso-1][dif-paso-1-paso-2]

### paso-3 _Componentes_

#### Resumen de cambios
- Introducir componentes.
- Combinar el controlador y la plantilla en un componente `phoneList` reusable y aislado.
- Refactorizar la aplicación.

[Ver diferencias del código con el paso-2][dif-paso-2-paso-3]

### paso-4 _Organización de Archivos y Directorios_

#### Resumen de cambios
- Refactorizar la estructura de directorios y ficheros, aplicando las mejores técnicas y prácticas para que sea más fácil el mantenimiento y escalado de la apliación en el futuro:
  - Poner cada entidad en su propio fichero.
  - Organizar el código por característica en lugar de por función.
  - Separar el código en módulos de los que otro módulos puedan depender.
  - Usar plantillas externas en lugar de cadenas de texto HTML inline.

[Ver diferencias del código con el paso-3][dif-paso-3-paso-4]

### paso-5 _Filtrar la Directiva ngRepeater_

#### Resumen de cambios
- Añadir un cuadro de búsqueda para demostrar:
  - Cómo funciona el data-binding sobre los campos de entrada.
  - Cómo usar el filtro `filter`.
  - Cómo la directiva `ngRepeat` automáticamente reduce y agranda el número de teléfonos en la vista.

[Ver diferencias del código con el paso-4][dif-paso-4-paso-5]

### paso-6 _Two-way Data Binding_

#### Resumen de cambios
- Añadir una propiedad `age` al modelo phone.
- Añadir un drop-down menu para controlar el orden de la lista de teléfonos.
- Sustituir el valor del orden por defecto en el controlador.

[Ver diferencias del código con el paso-5][dif-paso-5-paso-6]

### paso-7 _XHR e Inyección de Dependencias_

#### Resumen de cambios
- Reemplazar el conjunto de datos en memoria con datos cargados desde el servidor a través de una llamada a un servicio REST:
  - Los datos JSON son cargador utilizando el servicio `$http`.
- Demuestra el uso de `servicios` e `inyección de dependencias` (DI):
  - El servicio `$http` es inyectado al controlador a través de DI.
  - Introduce el uso del método de anotación DI: `.$inject` e inline array.

[Ver diferencias del código con el paso-6][dif-paso-6-paso-7]

### paso-8 _Links en las Plantillas e Imágenes_

#### Resumen de cambios
- Añadir una imagen del teléfono y un enlace para ir a la página de detalles del teléfono.
- Realizar pequeños ajustes sobre los estilos de la página modificando el CSS.

[Ver diferencias del código con el paso-8][dif-paso-8-paso-9]

### paso-9 _Enrutado & Multiples Vistas_

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

### paso-10 _Más Plantillas_

#### Resumen de cambios
- Implementa la extracción de los datos del teléfono seleccionado y el renderizado sobre la vista:
  - Usar el servicio `$http` en el controlador `PhoneDetailController` para extraer los datos a través de la llamada a un servicio REST.
  - Crear una plantilla para la vista de los detalles.
- Añadir estilos CSS para hacer bonita la página de detalles.

[Ver diferencias del código con el paso-9][dif-paso-9-paso-10]

### paso-11 _Filtros Personalizados_

#### Resumen de cambios
- Implementar un filtro personalizado `checkmark`.
- Modificar la plantilla `phoneDetail` para usar el filtro `checkmark`.

[Ver diferencias del código con el paso-10][dif-paso-10-paso-11]

### paso-12 _Gestores de Eventos_

#### Resumen de cambios
- Hacer clickables los thumbnails de las imágenes en la vista de los detalles del teléfono:
  - Añadir una propiedad `mainImageUrl` al controlador `PhoneDetailController`.
  - Implementar el método `setImage()` para cambiar la imagen principal.
  - Usar `ngClick` sobre los thumbnails para registrar un gestor que cambie la imagen principal.

[Ver diferencias del código con el paso-11][dif-paso-11-paso-12]

### paso-13 _REST y Servicio Personalizados_

#### Resumen de cambios
- Sustituir `$http` con `$resource`.
- Crear el servicio personalizado `Phone` que representa el cliente RESTful.

[Ver diferencias del código con el paso-12][dif-paso-12-paso-13]

### paso-14 _Animaciones_

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

Los siguientes documentos describen cómo desarrollar la aplicación.

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
