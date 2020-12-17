import react,{useState} from 'react';
import './style.css'
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import RecuirteJobCards from './RecuirteJobCards'
import CandidateWHoAppliedforRecuriter from './CandidateWhoAppliedforRecuriter';

function RecuirterDashBoard(){
    const [jobPostedByRecuritUser, setjobPostedByRecuritUser] = useState([]);
    const [allCandidateApplyOnParticularJob, setallCandidateApplyOnParticularJob] = useState([]);
    const [isModelshow, setisModelshow] = useState(true);

    function fetchData(url = '', token) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token);
        
       fetch(url, {
        method: 'GET',
        headers: myHeaders,
       }).then((response) => response.json())
      .then((data) => {
         console.log(data);
         setjobPostedByRecuritUser(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    async function getCandidateDataofParticularJob(url = '', data = {}) {
        const myHeaders = new Headers();
        const datafromLocalstorage = JSON.parse(localStorage.getItem('user'));
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', datafromLocalstorage.token);
        const res =  await fetch(url, {
                                 method: 'GET',
                                 headers: myHeaders,
                                 });
        return res.json();
    }

    const handleViewApplication = (id)=>{
        getCandidateDataofParticularJob('https://jobs-api.squareboat.info/api/v1/recruiters/jobs/'+id + '/candidates').then(data => {
              console.log(data);
              if(data.data){
                setallCandidateApplyOnParticularJob(data.data)
              }
              setisModelshow(false);
        }).catch((err)=>{
            console.log(err)
        });
    }
    const closeModel = ()=>{
        setisModelshow(true);
    }
    const logOut = ()=>{
      setTimeout(()=>{
        localStorage.clear();
        window.location = '/'
      }, 2000);

    }
    useEffect(() => {
      const datafromLocalstorage = JSON.parse(localStorage.getItem('user'));
        if(datafromLocalstorage && datafromLocalstorage.userRole===0){
          fetchData('https://jobs-api.squareboat.info/api/v1/recruiters/jobs', datafromLocalstorage.token);
        }else{
          window.location = '/'
        }
    }, []);

    return(
         <div>
         <div class="upper">
         <button class='logout' onClick={logOut}>Logout</button>
         <Link className="loginSignUp" to="/createJob">Post a Job</Link>
         <br/>
         <div class="allJobCard">
              {jobPostedByRecuritUser.map((d, index)=>{
                return <RecuirteJobCards data= {d} key={index} handleViewApplication = {handleViewApplication}/>
              })}
         </div>
         <div class="modal" style={{ display : isModelshow ? 'none' : 'block'}}>
         <div class="modal-content">
         <span class="close" onClick={closeModel}>&times;</span>
         <p id="applicantsLine">Applicants for this Job</p>
         <br/>
         <div class="candWhoApplied">
          {allCandidateApplyOnParticularJob.map((d, index)=>{
            return <CandidateWHoAppliedforRecuriter data= {d} key={index}/>
          })}
        </div>
         </div>
         </div>
         </div>
         </div>
    )
}
export default RecuirterDashBoard