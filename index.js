/*
 * Module dependencies
 */
 //Servidor 
import serverStatic from 'serve-static';
import multer from 'multer';
import express from 'express';
import http from 'http'; // este ya viene cargado junto con Node asi que no hace falta instalarlo
import bodyParser from 'body-parser';
import r from 'rethinkdb';
import engine from 'socket.io';
//Configuraciones Generales de RethinkDB y Express
import config from './config'; 

const port = config.express.port;
const app = express();
const server = http.Server(app);
const io = engine.listen(server);
/* Funcion para comprabar coneccion */
var IsConected = () => r.connect(config.rethinkdb)
.then(function(conn) {
    console.log(conn);
})
.error(function(error){
    console.log(error.message);
});

/*+++++++++++++++Metodo para Iniciar Servidor de Archivos estaticos+++++++++++++++++++++*/
var startServer = ()=> {server.listen(port)}

/*+++++++++++++++Metodo para Iniciarl RethinkDB +++++++++++++++++++++*/
var initializeRTBD = (conn) => {
  r.table(config.rethinkdb.table).indexWait('createdAt').run(conn)
   .then(
      startServer()
    )
    .error( (error) => {
      r.tableCreate(config.rethinkdb.table).run(conn)
       .finally(() => {
          r.table(config.rethinkdb.table).indexCreate(config.rethinkdb.tableIndex).run(conn)
           .finally(
              startServer()
            );
       }); 
    });
};
/*+++++++++++++++Metodo para Conectar a la BD de RethinkDB +++++++++++++++++++++*/
r.connect(config.rethinkdb)
  .then((conn) => {
    r.dbList().run(conn)
      .then((dbList) => {
        if(dbList.indexOf(config.rethinkdb.db) > -1){
          initializeRTBD(conn);
        } else {
            console.log("The DB doesn't exist.");
            console.log("Initializing DB "+config.rethinkdb.db);
            r.dbCreate(config.rethinkdb.db).run(conn)
            .then(initializeRTDB(conn))
          }
      })
  })
  .error( (error) =>{
    console.log("Could not open a connection to initialize the database "+config.rethinkdb.db);
    console.log(error.message);
    process.exit(1);
  })
/******************* Métodos que vamos a llamar con nuestros end-points.*******************************/  
//errores tipo 500:
var handleError = function(res) {
    return function(error){
        res.send(500,{error: error.message});
        conn.close();
    }
};

IsConected();


















