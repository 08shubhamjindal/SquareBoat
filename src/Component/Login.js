import react, { useState } from 'react';
import './style.css'
import {Switch, Route, Redirect, Link} from 'react-router-dom';
function Login(){
    const [logindata, setLogindata] = useState({});
    const [redirect, setredirect] = useState();
    const [email, setemail] = useState(false);
    const [createPassword, setcreatePassword] = useState(false);
    const [loader, setloader] = useState(true);
    const checkEmail = (email)=>{
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(String(email).toLowerCase())){
        return true;
      }else{
        setemail(true);
        return false;
      }
    }

    const checkpassword = (password)=>{
        if(password.length>=0 && password.length<6){
          setcreatePassword(true)
          return false;
        }
        setcreatePassword(false);
        return true;
    }

    const handledata = ()=>{
        const  email = document.getElementById("email").value;
        const  password = document.getElementById("pwd").value;
        if(checkEmail(email) && checkpassword(password)){
            setloader(false);
            postData('https://jobs-api.squareboat.info/api/v1/auth/login', {
            email: email,
            password: password
        }).then(data => {
              setLogindata(data);
              setloader(true);
              if(data.data.userRole===1){
                localStorage.setItem('user', JSON.stringify(data.data));
                setredirect(<Redirect to='/candidateDashboard'/>)
              }else if(data.data.userRole===0){
                localStorage.setItem('user', JSON.stringify(data.data))
                setredirect(<Redirect to='/recuirterDashboard'/>)
              }
        }).catch((err)=>{
            console.log(err)
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
        <div class="loginCard"> 
        <h2>Login</h2>
        <label for="email">Enter Email:</label>
        <br/>
        <input type="email" id="email" name="email"/> 
        <br/>
        {email?<span class="errorfield">Email not in correct format</span>:<span></span>}
        <br/>
        
        <label for="pwd">Password:</label>
        <br/>
        <input type="password" id="pwd" name="pwd"/>
        {createPassword?<span class="errorfield">Password should be greater than or equal to 6</span>:<span></span>}
        <br/>
        <button class="submit" onClick={handledata}>Submit</button> 
        <p id="cardEndText">New to MyJobs? <span><Link id="newtoJobs" to="/signUp">Create an Account</Link></span></p>
        {redirect}
        <div class="loader" style={{display : loader ? 'none' : 'block'}}></div>
        </div>
    )
}
export default Login;