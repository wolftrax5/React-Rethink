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
/*+++++++++++++++Metodo para Iniciar Servidor de Archivos estaticos+++++++++++++++++++++*/
var startServer = ()=> {server.listen(port)}

/*+++++++++++++++Metodo para Iniciarl RethinkDB +++++++++++++++++++++*/
var initializeRTBD = (conn) => {
  r.table(config.rethinkdb.table).index('createdAt').run(conn)
    .then((result) => {
      startServer();
      conn.close()
        .then( () =>{
          console.log("RethinkDB connection closed");
        })
    })
     .error((error)=> {
      console.log("The table doesn't exist.");
      console.log("Initializing table: "+config.rethinkdb.table);
      r.tableCreate(config.rethinkdb.table).run(conn)
        .finally( ()=> {
          console.log("Initializing index: "+config.rethinkdb.tableIndex);
          r.table(config.rethinkdb.table).indexCreate(config.rethinkdb.tableIndex).run(conn)
            .finally(() => {
              console.log("DB Initialized");
              conn.closed()
                .then(() => {
                  console.log("RethinkDB connection closed");
                });
                startServer();
            })
        })
     })
};
/*+++++++++++++++Metodo para Conectar a la BD de RethinkDB +++++++++++++++++++++*/
r.connect(config.rethinkdb)
  .then((conn) => {
    r.dbList().run(conn)
      .then((dbList) => {
        if(dbList.indexOf(config.rethinkdb.db) > -1){
          //initializeRTBD(conn);
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




















