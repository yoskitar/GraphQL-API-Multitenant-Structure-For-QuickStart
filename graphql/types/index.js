const { mergeTypeDefs } = require('@graphql-tools/merge');
const RenameMeModel = require("./RenameMeModel"); 
//En el caso de añadir nuevas clases, podremos establecer una
//organización de éstas, unificando la definición de tipos,
//en lugar de tener las diferentes definiciones en un mismo
//archivo
const typeDefs = [RenameMeModel];
//Exportamos las definiciones de tipos
module.exports = mergeTypeDefs(typeDefs, { all: true });