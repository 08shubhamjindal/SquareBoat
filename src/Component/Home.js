import react from 'react';
import './style.css'
import {Link} from 'react-router-dom';
function Home(){
    return(
       <div>
          <span class="headingText">MyJobs</span>
          <Link className="loginSignUp" to="/login">Login/SignUp</Link>
           <div class="homeInsideContent">
              <div class="homepageHeading">
                 <h1>Welcome to MyJobs</h1>
                 <Link id="getStartedButton" to="/signUp">Get Started</Link>
              </div>
           </div>
          <br/>
       </div>
    )
}
export default Home;