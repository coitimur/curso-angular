
# MÓDULOS

Un módulo es un contenedor de las diferentes partes de la aplicación. Los módulos permiten que el código sea compartimentado, proporcionando una separación lógica para los desarrolladores. En JavaScript, el uso de módulos previene el problema de los conflictos entre variables globales.

La mayoría de las aplicaciones tienen un método `main` que instancia y conecta las diferentes partes de la aplicación.

Las aplicaciones Angular no tienen un método `main`.  En su lugar, los módulos especifican de forma declarativa la forma en que debe arrancar la aplicación. Este enfoque tiene varias ventajas:

- El proceso declarativo es más facil de comprender.
- Se puede empaquetar el código en módulos reusables.
- Los módulos pueden ser cargados en cualquier orden.
- Los test unitarios sólo tienen que cargar los módulos relevantes.

### Recomendaciones de configuración
Recomendaciones para estructurar una aplicación en varios módulos:

- Un módulo por cada característica.
- Un módulo por cada componente reusable, especialmente para directivas y filtros.
- Un módulo principal para la aplicación, que dependerá de los módulos anteriores y contendrá el código de inicialización.

## Carga de Módulos y Dependencias
Un módulo es una colección de bloques de configuración y ejecución, que serán aplicados a la aplicación durante el proceso de arranque:

- __Bloques `config` __: son ejecutados durante la fase de configuración y registro de `provider`. Sólo los `provider` (no instancias) y `constant` pueden ser injectados en los bloques `config` . Esto previene la instanciación accidental de los servicios antes de que éstos hayan sido configurados.
-  __Bloques `run` __:  son ejecutados después de que todos los servicios hayan sido configurados y el `injector` haya sido creado y usado para el inicio de la aplicación. Sólo las instancias (no `provider`)  y las `constant` pueden ser injectadas en los bloques `run`.  Así se evita, el intento de configuración del sistema mientras está arrancando.

```
angular.module('myModule', []).
config(function(injectables) { 

}).
run(function(injectables) {

});
```

### Dependencias

Los módulos pueden listar otros módulos como sus dependencias. Una dependencia sobre un módulo implica que el módulo requerido tiene que ser cargado antes que el módulo requeridor. Esto quiere decir, que los bloques `config` de los módulos requeridos serán ejecutados antes que los bloques `config` del módulo que los requiere. Lo mismo se aplica a los bloques`run`. Cada módulo será cargado sólo una vez aunque sea requerido por varios módulos. 

