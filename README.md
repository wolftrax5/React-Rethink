# React-Rethink
Practica para la interacción de la base de datos RethinkDB, Io, y React.
Objetivos:
* Login de usuarios
* Altas,Bajas,y Cambio de usuarios 
* Chat(Los usurarios conectados entre ellos )
### Requerimietos 
Tienes que iniciar tu servidor de bace de datos 
 #### [Rethinkdb](http://www.rethinkdb.com)
una ves instalado puedes correr el siguiente comando
```sh
$ rethinkdb
```
en localhost:8080/ veras que tu bace de datos esta corriendo correctamente 
al instalar las dependencias y coorrer la aplcacion esta creara en la bace de datos test una tabla llamada Users
en localhost:8080/#dataexplorer puedes correr los comandos que se aplican directamente a tu bace de datos 
una ves iniciada la aplicacion recomiendo entrar y colocar el comando 
* r.table("Users").insert({userName:"user", passWord:"password"})
esto genera un dato de prueba

### Instalacion
Puedes Clonar el repositorio :D 
```sh
$ git clone git@github.com:wolftrax5/React-Rethink.git
```
Nos colocamos en la carpeta 
```sh
$ cd React-Rethink
```
Instalamos las dependencias 
```sh
$ npm install 
```
Iniciamos nuestro servidor  
```sh
$ npm start  
```
### Desarrollo 
En cada cambio a los archivos de desarrollo, es necesario correr el comando antes de correr la aplicacion
```sh
$ npm run buid  
```
este es un comando descrito en el package.json, se esta usando: 
* [Browserify](http://browserify.org/)
* [Babelify](https://github.com/babel/babelify)

ya que se planea desarrollar sobre [ECMAScript 6](https://babeljs.io/docs/learn-es2015/#ecmascript-6-features)