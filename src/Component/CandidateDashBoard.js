import React, { useState, useEffect } from "react";
import './style.css'
import CandidateJobCard from './CandidateJobCard';
function CandidateDashBoard(){
    const [planets, setPlanets] = useState([]);
    const [appliedORAll, setappliedORAll] = useState(true);
     function fetchData(url = '', token) {
        const myHeaders = new Headers();
        
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token);
        
       fetch(url, {
        method: 'GET',
        headers: myHeaders,
       }).then((response) => response.json())
      .then((data) => {
        setPlanets(data.data);
        setappliedORAll(value => !value);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    useEffect(() => {
        const datafromLocalstorage = JSON.parse(localStorage.getItem('user'));
        if(datafromLocalstorage && datafromLocalstorage.userRole===1){
          fetchData('https://jobs-api.squareboat.info/api/v1/candidates/jobs', datafromLocalstorage.token);
        }else{
          window.location = '/'
        }
    }, []);

    const getAppliedorAll = ()=>{
        if(appliedORAll===false){
            fetchData('https://jobs-api.squareboat.info/api/v1/candidates/jobs/applied');
        }else{
            fetchData('https://jobs-api.squareboat.info/api/v1/candidates/jobs');
        }
    }
    return(
        <div>
              <span class="headingText">MyJobs</span>
              <button class='appliedORAll' onClick={getAppliedorAll}>{appliedORAll ?'All Jobs': 'Applied Jobs'}</button>
              <br/>
              <div class="allJobCard">
              {planets.map((d, index)=>{
                return <CandidateJobCard data= {d} key={index}/>
              })}
             </div>
        </div>
    )
}
export default CandidateDashBoard