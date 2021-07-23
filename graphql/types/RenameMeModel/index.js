const schema = `

scalar JSON
scalar JSONObject

type Response {
    success: Boolean!
    data: JSONObject
    errors: [Error]
}

type Error {
    path: String!
    message: String!
}

input inputCompoundLocationExampleField {
    countryISOCode: String
    city: String
    zip: String
    street: String
    number: String
    latitude: Float
    longitude: Float
}

type Query {
    getAll: Response! 
}

type Mutation {
    addRenameMeModel(identifier: String!, password: String!, requiredStringField: String!, referenceToOtherDocumentById:[String], compoundLocationExampleField: inputCompoundLocationExampleField): Response!
}
`;

module.exports = schema;