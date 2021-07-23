const { createResolver} = require('apollo-resolvers');

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

const baseResolver = createResolver(
	null,
	(root, args, context, error) => error
);

const isAuthenticatedResolver = baseResolver.createResolver(
  // Extract the user from context (undefined if non-existent)
	(root, args, {user, apiKey}) => {
		try{
			if (!user && !apiKey) throw new Error("User not authenticated");
		}catch(error){
			return {
				success:false,
				data: null,
				errors: [{path:"Authentication",message:error.message}]
			}
		}
	}
);

module.exports = { isAuthenticatedResolver: isAuthenticatedResolver}