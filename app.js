//Importamos los módulos de express, graphql y mongoose
//necesarios para la construcción de nuestro micro-servicio.
const express = require("express");
const expressGraphQL = require("express-graphql");

//const axios = require('axios').default;

const passport = require('passport');

//Importamos los schemas definidos 
const schema = require("./graphql");
const cors = require("cors");
const pkg = require("./package.json");
//Hacemos uso del módulo dotenv para obtener
//las variables de entorno definidas
require('dotenv').config();

const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

const {
  PORT,
  DB
} = process.env;

//Creamos la aplicación express
const app = express();
//Logger
app.use(expressLogger);
//Auth midleware
require('./middlewares/passport.middleware');

//Indicamos la ruta graphql donde podremos acceder
//a la API graphiql desde nuestro navegador, y 
//desde la que podremos otener documentación de los
//resolver definidos y ejecutarlos.
//Usaremos bodyparser como middleware para
//pasear solo las respuestas definidas como
//Conten-Type/json, además de que el body
//sea del tipo URL-encoded y que los objetos
//tengan valores de alguno de los tipos,
//y no simple string.
app.use(
  "/graphql",
  express.urlencoded({extended:true}),
  express.json(),
  cors(),
  (req, res, next) => {
    passport.authenticate('user-jwt', { session: false }, (err, token, info) => {
      if (info.name === 'TokenExpiredError') {
        return res.status(401).json({
				  success:false,
				  data: null,
				  errors: [{path:"Token",message:"JWT Expired"}]
			  });
      }else{
        req.user = null;
        if(token){
          req.rawToken = req.headers.authorization.split(" ")[1];
          if (token.user) {
            req.user = token.user;
          }
        }else{
          req.rawToken = null;
        }
        next();
      }
    })(req, res, next)
  },
  (req, res, next) => {
    passport.authenticate('apikey-jwt', { session: false }, (err, token, info) => {
      if (token) {
        if (token.user.apiKey) {
          req.apiKey = token.user.apiKey;
        }
      }
      next();
    })(req, res, next)
  },
  expressGraphQL((req)=>{
    return {
      schema,
      context:{
        user: req.user,
        apiKey: (req.apiKey)? req.apiKey:null,
        rawToken: req.rawToken,
      },
      graphiql: true
    }
  })
);

app.set("pkg", pkg);
// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to RenameMe Service",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

//Levantamos el servidor express en el puerto indicado
app.listen(PORT, async () => {
  logger.info(`🚀 Server ready at http://localhost:${PORT}`);
  mongoose.connect(DB,
    {
    //Indexación de los modelos para cada secuencia de
    //eventos disparada.
    useCreateIndex: true,
    //Necesario ya que el parser string por defecto
    //esta deprecated.
    useNewUrlParser: true,
    //Permite usar el nuevo motor de monitorización
    //y decubrimiento del servidor.
    useUnifiedTopology: true
    }
  ).then(() => {
    logger.info(new Date().toString() + ": " + "MongoDB connected");
  }).catch(err => console.log(err));
});

//Exportamos el módulo app para los test de integración
module.exports = app;