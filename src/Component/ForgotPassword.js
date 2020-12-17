import react, { useState } from 'react';
function ForgotPassword(){
    const [email, setemail] = useState(false);

    const checkEmail = (email)=>{
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(email).toLowerCase())){
          return true;
        }else{
          setemail(true);
          return false;
        }
    }
    async function postData(url = '', data = {}) {
        const response = await fetch(url);
        return response.json(); 
    } 
    const handledata = ()=>{
        const  email = document.getElementById("email").value;
        if(checkEmail(email)){
            setloader(false);
            postData('https://jobs-api.squareboat.info/api/v1/auth/resetpassword?email='+email)
            .then(data => {
                setloader(true);
                 window.location = '/login'
          }).catch((err)=>{
              console.log(err)
          });
        }
    }

    const [loader, setloader] = useState(true);
    return(
        <div class="loginCard"> 
        <h2>Forgot Password</h2>
        <label for="email">Email Address:</label>
        <br/>
        <p id="forgetpasswordcontent">Enter the Email Associated with your account and 
          we'll send you instruction to reset you password</p>
        <br/>
        <input type="email" id="email" name="email"/> 
        <br/>
        {email?<span class="errorfield">Email not in correct format</span>:<span></span>}
        <br/>
        <button class="submit" onClick={handledata}>Submit</button> 
        <div class="loader" style={{display : loader ? 'none' : 'block'}}></div>
        </div>
    )
}
export default ForgotPassword