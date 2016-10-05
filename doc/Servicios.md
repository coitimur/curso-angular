# Servicios

Cada aplicación web que escribamos estará compuesta de objetos que colaboran para conseguir el funcionamiento deseado. Estos objetos necesitan ser instanciados y conectados para que la aplicación haga su trabajo. En las aplicaciones Angular la mayoría de estos servicios son instanciados y conectados por el servicio `injector`.

El servicio `injector` crea dos tipos de objetos, servicios y objetos especializados. Los servicios son objetos cuya API ha sido definida por el desarrollador cuando escribió el servicio. Los objetos especializados conforman el API del framework AngularJs. Estos objetos son los controladores, directivas, filtros y animaciones.

El servicio `injector` necesita saber cómo crear estos objetos. Se lo decimos, registrando alguno de los cinco tipos de servicios que permite Angular.

El más detallado es el servicio `provider`. Los otros cuatro son (constant, value, factory y service) son azucar sintactico encima del servicio `provider`.

Vamos a ver diferentes escenarios para crear y usar varios tipos de servicios. Empezaremos con el caso más simple, en el que compartiremos una cadena de texto en varios lugares de la apliación utilizando el servicio `value`.

## Servicio Value
Supongamos que queremos tener un servicio llamado  "clientId" el cual provee una cadena de texto representando un identificador de usuario. Lo definimos así:
```
angular.module('myApp,[])
.value('clientId','4273596876');

```
lo injectamos en un controlador, servicio, filtro o directiva:
```
angular.module('myApp')
controller('DemoController', function(clientId){
	this.clientId=clientId;
})
```
## Servicio Factory
El servicio Value es muy simple para escribirlo, pero carece de algunas características importantes que a menudo se necesitan de un servicio. El servicio Factory agrega las siguientes características: 
- capacidad de utilizar otros servicios (tener dependencias)
- inicialización del servicio
- inicialización perezosa

El servicio Factory construye un nuevo servicio usando una función con cero o más argumentos (éstos son las dependencias de otros servicios). El valor retornado por esta función es la instancia del servicio creado.

>Nota: Todos los servicios en Angular son singletons. Esto quiere decir que el `injector` usará la definción del servicio una sola vez para crear el objeto y utilizará la refencia cacheada para futuras necesidades.

Como el servicio Factory es una versión más potente del servicio Value, éste puede ser construido con él. Usando el ejemplo anterior el servicio Value `clientId` puede ser reescrito como un servicio Factory:
```
angular.module('myApp')
.factory('clientId', function(){
	return '4273596876
})
```
Pero como el servicio `clientId` consiste únicamente en una cadena de texto, resulta más apropiado el servicio Value, ya que hace el código más fácil de seguir.

Supongamos que queremos contruir un servicio que calcule un token usado para autenticarse contra un API remoto. Este token se llamará `apiToken` y será calculado basandose en el servicio Value `clientId` y un secreto almacenado en el almacenamiento local del navegador.
```
angular.module('myApp')
.factory('apiToken', ['clientId', function(clientId) {
  var encrypt = function(data1, data2) {
    // NSA-proof encryption algorithm:
    return (data1 + ':' + data2).toUpperCase();
  };

  var secret = window.localStorage.getItem('myApp.secret');
  var apiToken = encrypt(clientId, secret);

  return apiToken;
}]);
```
En el código anterior, vemos cómo el servicio `apiToken` se ha definido utilizando la definición de una Factory que depende del servicio `clientId`. El servicio Factory utiliza el algoritmo NSA para generar un token de autenticación.

De la misma forma que el servicio Value, el servicio Factory puede crear una instancia de cualquier tipo: primitivo, objeto literal, función, o incluso una instancia de tipo personalizado.

## Servicio Service

Los desarrolladores de JavaScrip a menudo usan tipos personalizados para escribir código orientado a objeto:
```
function UnicornLauncher(apiToken) {

  this.launchedCount = 0;
  this.launch = function() {
    // Make a request to the remote API and include the apiToken
    ...
    this.launchedCount++;
  }
}

```
Observamos que el unicorlauncher depende del servicio `apiToken`. Podemos satisfacer esta dependencia inyectándole el servicio `apiToken`:
```
angular.module('myApp')
.factory('unicornLauncher', ["apiToken", function(apiToken) {
  return new UnicornLauncher(apiToken);
}]);
```
Éste es, exactamente el uso más adecuado del servicio Service.

El servicio Service produce un servicio igual que Value y Factory, pero este lo hace invocando a un constructor usando el operador `new`. El constructor puede tomar cero o más argumentos, los cuales representan las dependencias que necesita la instancia de este tipo.

Como ya tenemos un constructor para nuestro nuasdfLauncker type, podemos reemplazar la definición anterior del servicio Factory con un servicio Service:
```
angular.module('myApp')
.service('unicornLauncher', ["apiToken", UnicornLauncher]);
```

## Servicio Provider
Como se mencionó al principio, el servicio Provider es el núcleo de todas las definciones de servicios, es la definición más detallada con más capacidades, pero para la mayoría de los servicios es demasiado.

La definición del Provider es sintácticamente definida como un tipo personalizado que implementa el método `$get`. Este método es una función factoría igual que la que podemos usar con la definción de un Factory. De hecho, si definimos un Factory, un Provider con el método `$get` configurado con la función factoría, es creado por debajo.

Deberíamos usar la definición de un Provider sólo cuando queramos exponer un API para toda la aplicación que deba ser configurada antes de que la aplicación arranque. Esto es interesante sólo para servicios reusables cuyo funcionamiento puede variar  ligeramente entre aplicaciones.

Digamos que nuestro servicio `inicornLauncher` es tan maravilloso que muchas aplicaciones quieren usarlo. Por defecto el launcher gdfgdf gdsgsd:
```
angular.module('myApp')
.provider('unicornLauncher', function UnicornLauncherProvider() {
  var useTinfoilShielding = false;

  this.useTinfoilShielding = function(value) {
    useTinfoilShielding = !!value;
  };

  this.$get = ["apiToken", function unicornLauncherFactory(apiToken) {

    // let's assume that the UnicornLauncher constructor was also changed to
    // accept and use the useTinfoilShielding argument
    return new UnicornLauncher(apiToken, useTinfoilShielding);
  }];
});
```
Para activar el papel de aluminio como blindaje en nuestra aplicación, tenemos que crear una función de configuración a través del API de module y que el `unicornLauncherProvider` inyecta en ella:
```
angular.module('myApp')
.config(["unicornLauncherProvider", function(unicornLauncherProvider) {
  unicornLauncherProvider.useTinfoilShielding(true);
}]);

```
Durante el proceso de arranque de la aplicación, antes de que Angular cree todos los servicios, configura e instancia los Providers. Ésta es la fase de configuración del ciclo de vida de la aplicación. Durante esta fase los servicios no están accesibles porque no han sido creados todavía.

Una vez que la fase de configuración ha terminado, la interacción con los Provider no está permitida y comienza el proceso de creación de los servicios. Esta parte del ciclo de vida de la aplicación se llama fase de ejecución.

## Servicio Constant

Hemos visto como Angular divide el ciclo de vida de la aplicación en la fase de configuración y la fase de ejecución, y cómo podemos proveer configuración a la aplicación vía la fase de configuración. Como el método `config` se ejecuta durante la fase de configuración cuando los servicios no están todavía disponibles, éste no tiene acceso ni siquiera a los objetos más simples creados a través de la definción del servicio de Value.

Dado que los valores simples URLs, atributos de configuración, etc. no tienen dependencias o configuración, a veces resulta útil que estén disponibles para las fases de configuración y ejecución. Para esto es la especificación Constant.


```
angular.module('myApp')
.constant('planetName', 'Greasy Giant');
```
