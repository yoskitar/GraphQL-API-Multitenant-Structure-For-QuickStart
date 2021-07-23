
// For auth --> const {isAuthenticatedResolver} = require("../../../utils/permissions");
const crypto = require('../../../utils/cryptoFuncs');
const formatErrors = require ('../../../utils/utils');
const {GraphQLJSON, GraphQLJSONObject} = require('graphql-type-json');
const axios = require('axios').default;


const resolvers = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    Query: {
        getAll: (root, args) => {
            return {
                success:true,
                data: null,
                errors: []
            }
        },
    },
    Mutation: {
        addRenameMeModel: isAuthenticatedResolver.createResolver(async (root, args, ctx) => {
            const otherErrors = [];
            let dataResponse = null;
            try{

                if(otherErrors.length){
                    throw otherErrors;
                }
                
                return {
                    success:true,
                    data: dataResponse,
                    errors:[]
                }
            }catch(error){
                return {
                    success:false,
                    data: dataResponse,
                    errors: formatErrors(error, otherErrors)
                }
            }
        }),
    }
};

module.exports = resolvers;