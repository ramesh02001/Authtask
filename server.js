const express =require('express');
const bodyparser=require('body-parser');
// const { default: mongoose } = require('mongoose');
require('dotenv').config();
const app= express();

app.use(bodyparser.json());

const PORT=3000;

// const DB_URL="mongodb://localhost:27017/shop"; //mongodblink

//connect to mongodb
// mongoose.connect(DB_URL,{}).
// then(()=> console.log("Mongoose is connect")).
// catch((err)=>console.log("Mongoose is not connect",err)
// );
 

//logRequest

function logRequest(req,res,next){
    console.log(`Received ${req.method} request for ${req.url} at ${new Date().toISOString()}`);
    next();
}

//sampleAuthentication

function sampleAuthentication(req,res,next) {
    if(req.query.token==='mentorToken'){
        req.user={id:1,name:"ramkirsh"};
        next();
    } else  if(req.query.token==='studentToken'){
        req.user={id:2,name:"priya"};
        next();

    }else{
        res.status(400).send("unauthorized");

    }
    
}


app.use('/secure',sampleAuthentication);
app.use(logRequest);

app.get('/secure/profile',(req,res)=>{
  res.send(`hello, ${req.user.name}`)
});

app.get('/mentor',(req,res)=>{
    res.send(`hello, mentor///`)
  });

app.get('/student',(req,res)=>{
    res.send(`hello, student///`)
  });
    

  app.listen(PORT,()=>{
    console.log(`surver is connect:${PORT}`)
})
