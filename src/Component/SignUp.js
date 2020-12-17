import React, { useState } from 'react';
import './style.css'
import {Redirect, Link} from 'react-router-dom';
function SignUp(){
    const [isCandidateORRecuirter, setZeroOROne] = useState(0);
    const [email, setemail] = useState(false);
    const [fullname, setfullName] = useState(false);
    const [fullnamelength, setfullNamelength] = useState(false);
    const [createPassword, setcreatePassword] = useState(false);
    const [confirmPassword, setconfirmPassword] = useState(false);
    const [checkPassword, setcheckPassword] = useState(false);
    const [skills, setskills] = useState(false);
    const [loader, setloader] = useState(true);

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

    const checkEmail = (email)=>{
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(String(email).toLowerCase())){
        return true;
      }else{
        setemail(true);
        return false;
      }
    }
    const checkName = (name)=>{
      console.log(name)
       if(name.length>=3 && name.length<=100){
        setfullName(false);
        setfullNamelength(false);
        return true;
       }else if((name.length>0 && name.length <=2) || name.length>100){
         setfullName(false);
         setfullNamelength(true);
         return false;
       }else{
         setfullName(true);
         setfullNamelength(false);
        return false;
       }
    }
    const checkSkills = (skills)=>{
      if(skills.length>=3 && skills.length<=150){
        setskills(false);
        return true;
      }else{
        setskills(true);
        return false;
      }
    }
    const checkpassword = (password, checkpassword)=>{
      console.log(password);
      console.log(checkpassword);
        if(password.length>=0 && password.length<6){
          setcreatePassword(true)
          return false;
        }else if(checkpassword.length>=0 && checkpassword.length<6){
          setconfirmPassword(true);
          return false;
        }else if(password.length>=6 &&  checkpassword.length>=6 && checkpassword!==password){
          setcreatePassword(false)
          setconfirmPassword(false);
          setcheckPassword(true);
          return false;
        }else{
          setcreatePassword(false);
          setconfirmPassword(false);
          setcheckPassword(false);
          return true;
        }
    }
    const handledata = ()=>{
        const  email = document.getElementById("email").value;
        const  password = document.getElementById("pwd").value;
        const  confirmPassword = document.getElementById("cnfpwd").value;
        const  name = document.getElementById("name").value;
        const  skills = document.getElementById("skill").value;
        const  userRole = isCandidateORRecuirter;

        if(checkEmail(email) && checkName(name) && checkpassword(password, confirmPassword) && checkSkills(skills)){
          setloader(false);
          postData('https://jobs-api.squareboat.info/api/v1/auth/register', {
            email: email,
            userRole: userRole, 
            password: password,
            confirmPassword: confirmPassword,
            name: name,
            skills: skills
        }).then(data => {
              setloader(true);
              if(data.data){
                window.location = '/login'
                window.alert('sucessfully registered')
              }else{
                window.alert('already register')
              }
        }).catch(err =>{
          console.log('hereeeeeee')
        });
        }
        
    }
    async function postData(url = '', data = {}) {
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
        <label for="Iam">I am a:</label>
        <br/>
        <button id="candidate" onClick={candidate}>Candidate</button>
        <button id="recuriter" onClick={recuriter}>Recuirter</button>
        <br/>
        <label for="name">Full Name:</label>
        <br/>
        <input type="text" id="name" name="name"/> 
        <br/>
        {fullname?<span class="errorfield">This field is required</span>:<span></span>}
        {fullnamelength?<span class="errorfield">Name should be greater 3 and lesss than 100</span>:<span></span>}
        <br/>
        <label for="email">Enter Email:</label>
        <br/>
        <input type="email" id="email" name="email"/> 
        <br/>
        {email?<span class="errorfield">Email not in correct format</span>:<span></span>}
        <br/>
        <label for="pwd">Password:</label>
        <br/>
        <input type="password" id="pwd" name="pwd"/>
        <br/>
        {createPassword?<span class="errorfield">Password should be greater than or equal to 6</span>:<span></span>}
        <br/>
        <label for="cnfpwd">Confirm Password:</label>
        <br/>
        <input type="password" id="cnfpwd" name="cnfpwd"/>
        <br/>
        {confirmPassword?<span class="errorfield">ConfirmPassword should be greater than 6</span>:<span></span>}
        <br/>
        {checkPassword?<span class="errorfield">Password and Confirm Password should Match</span>:<span></span>}
        <br/>
        <label for="skill">Skill</label>
        <br/>
        <input type="text" id="skill" name="skill"/> 
        {skills?<span class="errorfield">skills should be greater 3 and lesss than 150</span>:<span></span>}
        <br/>
        <button class="submit" onClick = {handledata}>Submit</button> 
        <p class= "cardEndText">Have an Account? <span><Link id="newtoJobs" to="/login">Login</Link></span></p>
        <div class="loader" style={{display : loader ? 'none' : 'block'}}></div>
       </div>
    )
}
export default SignUp;