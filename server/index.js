const express=require('express')
const mongoose =require('mongoose')
const cors=require('cors')
const app=express()
const MONGB_UR='mongodb://localhost:27017/signup'
const PORT=5000;
//const bcryptjs=require('bcryptjs');

//mdwillre
// app.use(cors())
app.use(cors({
    origin:["https://sign-up-pagep-frontend.vercel.app"],
    methods:["POST","GET"],
    credentials:true
}    ));
app.use(express.json());

mongoose.connect('mongodb+srv://sam:sam1712@user.lqnkuu8.mongodb.net/?retryWrites=true&w=majority&appName=User');
const db=mongoose.connection;

db.on('error',(err)=>{
console.error("Mongo Db connection error",err)
});
db.once('open',()=>{
    console.log("MONGO DB CONNECTION SUCCESULL")
});
app.get("/", (req, res) => {
    res.json("Hello");
})
const userSchema= new mongoose.Schema({
    name: String,
    email: String,
    dob:{ type:Date,
    default: new Date("<YYYY-mm-ddTHH:MM:ssZ>")},
    password: String,


});
const User=mongoose.model('User',userSchema)

app.post('/register',async(req,res)=>{
    // if(req.name.length>0)alert('ok');
    try{
      //  const hasspassword=await bcryptjs.hashSync(req.body.password,10);
        const newUser=new User({
            name: req.body.name,
            email: req.body.email,
            dob:req.body.dob,
            password:req.body.password,            
        });
        const savedUser=await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(error){
        console.error('Error during registration',error)
        res.status(500).json({
            error:"inter server error"
        });
    }
});
 app.listen(PORT)