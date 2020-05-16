const db=require('../dbconnection');  
    const Regschema=db.Schema({  
        Firstname:{type:String,required:true},  
        Lastname:{type:String,required:true},
        Phonenumber:{type:Number,required:true},
        Emailid:{type:String,required:true},
        Address:{type:String,required:true}
});  
  
module.exports=db.model('Registration',Regschema);