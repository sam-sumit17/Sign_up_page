import React,{useState} from "react"
import axios from 'axios'

export default function signup(){
    const [value,setValue]=useState({
        name:"",
        email:"",
        dob:"",
        password:"",  
   
    });

    // console.log(value);

    const handlechange=(e)=>{
        setValue({
            ...value,
            [e.target.name]:e.target.value,
        });
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const register=await axios.post("http://localhost:5000/register",value);
   
        setValue({
            name:"",
            email:"",
            dob:"",
            password:"", 
        });
        alert("Account Created successfully");
    }


    return <>
    <div className="container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handlechange} value={value.name} placeholder="Name" name="name" />
            <input type="text"  onChange={handlechange} value={value.email} name="email" placeholder="Email"  />
            <input type="date" name="dob" onChange={handlechange} value={value.dob}  />
            <input type="password"  onChange={handlechange} value={value.password} name="password" placeholder="Password" />
           
<button type="submit">Sign Up</button>
        </form>
    </div>
    </>
}