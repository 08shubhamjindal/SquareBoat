import React, { useState } from 'react';
import './style.css'
import {Redirect, Link} from 'react-router-dom';
function SignUp(){
    const [isCandidateORRecuirter, setZeroOROne] = useState(0);
    const candidate = ()=>{
        document.getElementById("candidate").style.backgroundColor = "#43AFFF";
        document.getElementById("recuriter").style.backgroundColor = "#A9AFBC"
        setZeroOROne(1);
    }
    const recuriter = ()=>{
        document.getElementById("recuriter").style.backgroundColor = "#43AFFF";
        document.getElementById("candidate").style.backgroundColor = "#A9AFBC";
        setZeroOROne(0);
    }
    const handledata = ()=>{
        const  email = document.getElementById("email").value;
        const  password = document.getElementById("pwd").value;
        const  confirmPassword = document.getElementById("cnfpwd").value;
        const  name = document.getElementById("name").value;
        const  skills = document.getElementById("skill").value;
        const  userRole = isCandidateORRecuirter;
        postData('https://jobs-api.squareboat.info/api/v1/auth/register', {
            email: email,
            userRole: userRole, 
            password: password,
            confirmPassword: confirmPassword,
            name: name,
            skills: skills
        })
            .then(data => {
              console.log(data);
              <Redirect to= '/login' />
        });
    }
    async function postData(url = '', data = {}) {
        console.log(data);
        const response = await fetch(url, {
          method: 'POST', 
          mode: 'cors', 
          cache: 'no-cache',
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow', 
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data)
        });
        return response.json(); 
      }
      
      
    return(
        <div class="SignUpCard"> 
        <h2>SignUp</h2>
        <div>
        <button id="candidate" onClick={candidate}>Candidate</button>
        <button id="recuriter" onClick={recuriter}>Recuirter</button>
        </div>
        <br/>
        <label for="name">Full Name:</label>
        <br/>
        <input type="text" id="name" name="name"/> 
        <br/>
        <label for="email">Enter Email:</label>
        <br/>
        <input type="email" id="email" name="email"/> 
        <br/>
        <label for="pwd">Password:</label>
        <br/>
        <input type="password" id="pwd" name="pwd"/>
        <br/>
        <label for="cnfpwd">Confirm Password:</label>
        <br/>
        <input type="password" id="cnfpwd" name="cnfpwd"/>
        <br/>
        <label for="skill">Skill</label>
        <br/>
        <input type="text" id="skill" name="skill"/> 
        <button class="submit" onClick = {handledata}>Submit</button> 
        <p class= "cardEndText">New to MyJobs? <span>Create an Account</span></p>
       </div>
    )
}
export default SignUp;