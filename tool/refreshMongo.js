const mongoose = require("mongoose");
const refreshMongo = require("./mongoTool");

mongoose.connect('mongodb://localhost/exam', (err)=>{
   if(err){
     console.log('mongodb connect error');
   }else{
     refreshMongo(()=>{
       process.exit(0);
     })
   }
})