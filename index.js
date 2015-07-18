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
var handleError = (res) => {
    return function(error){
        res.send(500,{error: error.message});
        conn.close();
    }
};
/* Devuelve un array con todos los datos en esa tabla, 
usa el index createdAt para mostrarlos en el orden en que fueron creados*/
var list = (request, res, next) => {
  r.connect(config.rethinkdb)
   .then((conn) => {
      r.table(config.rethinkdb.table).orderBy({index: config.rethinkdb.tableIndex }).run(conn)
       .then((data) => {
          if (data._responses[0]){
            var query = data._responses[0].r;
            res.send(query);
          }
          conn.close()
       })
         . error(handleError(res))
   });
}
/*inserta un nuevo elemento en la tabla, usa la función now() para guardar
 el momento en que fue creado el elemento en el key createdAt, 
 este dato se usa como index de la tabla*/
var add = (request, res, next) => {
  var element = request.body;
      element.createdAt = r.now();
  r.connect(config.rethinkdb)
   .then((conn) => {
      r.table(config.rethinkdb.table).insert(element).run(conn)
       .then(() => {
          conn.close()
       })
       .error(handleError(res))
   });    
}
/*borra todos los elementos de la tabla*/
var empty = (request, res, next) => {
  r.connect(config.rethinkdb)
   .then((conn) => {
      r.table(config.rethinkdb.table).delete({returnChanges: true}).run(conn)
       .then( (changes) => {
          console.log(changes);
          conn.close()
                })
       .error(handleError(res))
   });
}
/***********************************************************************************/

/*************** Emicion de los datos a los clientes *************/
io.on('connection',(socket) =>{
  this.socket = socket;
  var webSocket = this.socket;
  //envía una notificación para verificar que la conexión fue establecida y lo transmite en checkConnection.
  webSocket.emit('checkConnection',{result: 'Web Socket OK'});
  r.connect(config.rethinkdb.table)
   .then((conn)=>{
    r.table(config.rethinkdb.table).changes({squash:1}).run(conn,(error,cursor)=> {
      cursor.on("data",(change) => {
        webSocket.emit('change',{change:change});
      });
      cursor.on("error",(error) =>{
        webSocket.emit('error',{error:error});
        cursor.close();
      })
    })
   })
})
/******************************************************************************/
// Data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
//Define main routes
app.route('/Users/list').get(() => list()); //Mostrará todos los elementos
app.route('/Users/add').put(() => add()); //Agregará un nuevo elemento.
app.route('/Users/empty').post(() => empty()); //Eliminará todos los elementos.
// Static files server
app.use(serverStatic('./public'));












