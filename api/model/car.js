const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId ,
	name:{type:String , minlength:4 , maxlength:100 ,required:true },
	horsePower:{type:Number , min:60 , max:1600 , default:-1},
	engineSize:{type:Number , min:0 , required:true},
	productionYear:{type:Number , max:2020 , required:true}
	uniqueness:{type:String , required:true , unique:true} // Concatination of name and productionYear
});

module.exports = mongoose.model('Address' , addressSchema);