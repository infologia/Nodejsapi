var mongoose=require('mongoose');
var mongoDB='mongodb+srv://sa:Infologia_1@grandcode-yvphn.mongodb.net/Infologiadb?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true  });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log("Created..");
module.exports=mongoose;  