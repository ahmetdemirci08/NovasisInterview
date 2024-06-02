const mongoose = require('mongoose');

const ConsultantSchema = new mongoose.Schema({
 name :String,
 email:String,
 password:String,
 role:{
  type:String,
  default:"Consultant"
 }
});

const ConsultantModel = mongoose.models.Client || mongoose.model('Consultant', ConsultantSchema);
module.exports = ConsultantModel;
