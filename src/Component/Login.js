import react, { useState } from 'react';
import './style.css'
import {Switch, Route, Redirect, Link} from 'react-router-dom';
function Login(){
    const [logindata, setLogindata] = useState({});
    const [redirect, setredirect] = useState();
    const handledata = ()=>{
        const  email = document.getElementById("email").value;
        const  password = document.getElementById("pwd").value;
        postData('https://jobs-api.squareboat.info/api/v1/auth/login', {
            email: email,
            password: password
        }).then(data => {
              setLogindata(data);
              console.log(data);
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
        <label for="pwd">Password:</label>
        <br/>
        <input type="password" id="pwd" name="pwd"/>
        <button class="submit" onClick={handledata}>Submit</button> 
        <p class= "cardEndText">New to MyJobs? <span>Create an Account</span></p>
        {redirect}
       </div>
    )
}
export default Login;