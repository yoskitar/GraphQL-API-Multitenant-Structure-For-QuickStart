const { mergeResolvers } = require('@graphql-tools/merge');
const RenameMeModel = require("./RenameMeModel");
//En el caso de añadir nuevos resolvers para una nueva clase,
//podremos establecer una organización de éstos, unificando 
//su definición en lugar de tener los resolvers de cada clase 
//en un mismo archivo.
const resolversDefs = [RenameMeModel];
//Exportamos la definición de resolvers
module.exports = mergeResolvers(resolversDefs, {all:true});