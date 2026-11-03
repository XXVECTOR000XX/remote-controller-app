# App de control remoto

Esta app sera encargada de poder interpretar teclado y mouse, del computador por un tercero.
La persona tercera que va a manejar el computador principal debera conectarse a este sitio web, [https://remote-controller-frontend](https://xxvector000xx.github.io/remote-controller-frontend/).

Para que el computador aparezca, se debera instalar la [app](Remote%20Setup%20Installer.exe) y posteriormente ejecutarla.

Si no quiere instalar la app, instale las dependencias con bun y compile.

```bash
bun install && bun dist
```

Esto generara un archivo instalador nsis en la carpeta 
~~~
/dist/
~~~

Despues de esto, podra ejecutar la app desde el menu, y la podra detener o monitorear en el administrador de tareas.