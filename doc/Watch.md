#Watcher

##$watch
El servicio `$watch` resgitra un `listener` que será ejecutado cuando la expresión a observar cambie.

```
$watch(watchExpression, listener, [objectEquality]);
```
Parámetros:
- La `watchExpression`: `function()|string` es llamada sobre cada ciclo $digest y debe devolver el valor que será observado.
- El `listener`: `function(newVal,oldVal,scope)` es llamado sólo cuando el valor actual de `watchExpression` y el valor anterior de `watchExpression` no son iguales. La inigualdad es determinada de acuerdo a la `strict comparison` vía el operador de JavaScrip `!==` a no ser que `objectEquality == true`.
- Cuando `objectEquality == true` la inigualdad de `watchExpression` es determinada de acuerdo a la función `angular.equals`. Para guardar el valor del objeto para comparaciones posteriores es utilizada la función `angular.copy`. Esto quiere decir que observar con $watch objetos complejos puede tener efectos adversos sobre la memoria y el rendimiento.
- El `listener` puede cambiar el modelo, lo que disparará otra vez el listener. Esto se consigue reejecutando los observadores hasta que no se detecten cambios. El número de reejecuciones está limitado a 10 para evitar
caer en un bucle infinito.

Después de registar un `watchExpression` con el servicio `$watch` en el scope, el `listener` será llamado asíncronamente para inizializar el `watcher`. En algunos casos, puede ser un problema que se ejecute el `listener` cuando el resultado de `watchExpression` no haya cambiado. Para detectar este escenario, en la función del `listener`, podemos comparar el `newVal` con el `oldVal`. Si estos dos valores son identicos (`===`) entonces sabemos que el listener fue llamado debido a la inicialización.

**Ejemplo**

```
sadfasdf
```

##$watchGroup
$watchGroup es una variante de $watch que observa un array de `watchExpressions`. Si alguna de las expresiones en la colección cambia el listener será ejecutado.

```
$watchGroup(watchExpressions, listener);
```

Parámetros:
- Los items en el array `watchExpressions` : `Array.<string|function(scope)>` son observados por medio de la operación $watch y son examinados sobre cada ciclo $digest para ver si algún item ha cambiado.
- El `listener`: `function(newValues,oldValues,scope)` es llamado cuando alguna expresión en el array `watchExpressions` cambia.
- 