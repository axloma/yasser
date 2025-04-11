const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
// const xss = require('xss-clean')
require('dotenv').config({ path: "./config.env"})


console.log(process.env.ATLAS_URI)
const db = process.env.ATLAS_URI 
const port = process.env.PORT || 3000
const app = express()
app.use(express.json());
app.use(cors());

function main(){

    mongoose.connect(db).then(() => console.log('connectd to db')).catch(err => console.log('couldnotconnect',err));

    app.listen(port,console.log("listen on port "))

 
}


const msgschema = new mongoose.Schema({
    email:{
        type: String,
        require: true

    },
    msg:{
        type: String,
        require: true
    },
    date:{
        type:Date,
        default: Date.now,
        require:true
    }
   
})

//Create the Model Using the Schema
const MSG = mongoose.model('Msg',msgschema)

const fmsg = new MSG({
    email:"yasseremad556@gmail.com",
    msg:"HI FROM WEB"

});
// fmsg.save()
app.get('/login',async (req,res)=>{

    const data = await MSG.find();

    res.status(200).json(data)
    
    
})
app.post('/msg',async(req,res)=>{
    const {email,msg} = req.body;
    // console.log(body)
    console.log(email,msg,"THIS NEW ")

    
    if (email.trim() != "" && msg.trim() != ""){
        
        const newmsg = new MSG({
            email: email,
            msg: msg
        });
        
        newmsg.save();
        res.status(200).send("MESAGE SENT SUCCEFULY ")
    }else{
        res.status(202).send("ERROR IN EMAIL OR MSG ")
    }

})
app.delete('/login/:id',async(req,res)=>{
    
    console.log(req.params.id)
    const delted = await MSG.findOneAndDelete({_id:req.params.id})
    res.status(200).json(delted);
})
main()