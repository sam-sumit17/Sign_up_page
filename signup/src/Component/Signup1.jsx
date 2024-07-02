import React,{useState} from "react"
import axios from 'axios'
function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }
  function isPass(value) {
    return ((typeof value === "string" && value.trim().length < 8));
  }

export default function signup(){
    const [value,setValue]=useState({
        name:"",
        email:"",
        dob:"",
        password:"",  
   
    });
    const handlechange=(e)=>{
        setValue({
            ...value,
            [e.target.name]:e.target.value,
        });
    }
    axios.defaults.withCredentials=true;
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
          
        if(isEmpty(value.name)){alert('Invalid name');return ;}
        if(isEmpty(value.email)){alert('Invalid Email');return ;}
        if(isEmpty(value.dob)){alert('Invalid Date of Birth');return ;}
        if(isEmpty(value.password)){alert('Invalid Password');return ;}
        if(isPass(value.password)){alert('Password length should be minimum 8 characters');return ;}

        const register=await axios.post("https://sign-up-backend.vercel.app/register",value);
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
