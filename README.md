# Iniciar el proyecto

Para iniciar el proyecto debes hacer correr esta instruccion

```JavaScript
npm run start:dev
```

Si lo estas haciendo correr por primera ves debes primero debes descargar los paquetes necesarios con

```JavaScript
npm install
```

Luego ejecutar las migraciones con

```JavaScript
npm run m:run
```

## Otras instrucciones

Si hiciste algun cambio en la base de datos y quieres crear la migracion debes ejecutar la siguente instruccion

```JavaScript
npm run m:gen ./src/migrations/"Nombre de la migracion"
```
