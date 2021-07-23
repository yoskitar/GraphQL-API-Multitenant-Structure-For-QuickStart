const NodeRSA = require('node-rsa');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const crypto = {
  getSecretKey: ()=>{
    const prvKeyVar = fs.readFileSync(path.join(__dirname,'/keys','private.rsa'),"utf8");
    return prvKeyVar.toString();
  },
  decryptMsg: function (msg){
    const prvKeyVar = fs.readFileSync(path.join(__dirname,'/keys','private.rsa'),"utf8");
    var key = new NodeRSA(prvKeyVar.toString());
    key.setOptions({encryptionScheme: 'pkcs1'});
    const decry = key.decrypt(msg,'utf8');
    return decry;
  },
  encryptMsg: function(msg){
    const pubKeyVar = fs.readFileSync(path.join(__dirname,'/keys','public.rsa'),"utf8");
    var key = new NodeRSA(pubKeyVar.toString());
    key.setOptions({encryptionScheme: 'pkcs1'});
    const encryptedMsg = key.encrypt(msg.toString(),'base64');
    return encryptedMsg;
  },
  getPubKey: ()=>{
    const pubKeyVar = fs.readFileSync(path.join(__dirname,'/keys','public.rsa'),"utf8");
    return pubKeyVar.toString();
  },
}

module.exports = crypto;