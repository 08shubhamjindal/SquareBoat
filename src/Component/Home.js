import react from 'react';
import './style.css'
import {Link} from 'react-router-dom';
function Home(){
    return(
       <div>
       <div class="upper">
          <span class="headingText">MyJobs</span>
          <Link className="loginSignUp" to="/login">Login/SignUp</Link>
          <br/>
       </div>
       </div>
    )
}
export default Home;