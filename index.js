/*
 * Module dependencies
 */
 //Servidor 
import express from 'express';
import http from 'http'; // este ya viene cargado junto con Node asi que no hace falta instalarlo
import bodyParser from 'body-parser';
import r from 'rethinkdb';
import config from './config'; 

const port = config.express.port;
const app = express();

//Configuracion de la ruta de archivos estaticos 
app.use('/',express.static(__dirname + '/public'));

// respode con un envio de archivo cuando un GET request es hecho desde la homepage
app.get('/',(req,res) => {
	res.sendFile(__dirname + '/index.html');
})

//montage de la aplicacion en el servidor 
let server = http.createServer(app).listen(port,()=> {
	console.log(`Estamos en el puerto ${port}`);
});