const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const renameMeModelSchema = new Schema({
    identifier: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    requiredStringField: {
        type: String,
        required: true
    },
    referenceToOtherDocumentById:{
        type:[{type: Schema.ObjectId, ref: "RenameMeOtherModel"}],
		default:[]
    },
    compoundLocationExampleField:{
        countryISOCode: {
            type: String,
            default: "ES/ESP"
        },
        city: String,
        zip: String,
        street: String,
        number: String,
        latitude: Number,
        longitude: Number
    }
},
{
    timestamps: true
});

renameMeModelSchema.methods.renameCompareMethod = async function(param) {
    const compare = await bcrypt.compare(param, this.password);
    return compare;
};

const useDbOptions = {
    //ensures connections to the same databases are cached
    useCache: true,
    //remove event listeners from the main connection
    noListener: true
}
const myDB = mongoose.connection.useDb('RenameMeModelDB', useDbOptions);

const RenameMeModel = myDB.model('RenameMeModel', renameMeModelSchema);
module.exports = RenameMeModel;



    