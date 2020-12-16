import React, { useState, useEffect } from "react";
import './style.css'
import CandidateJobCard from './CandidateJobCard';
function CandidateDashBoard(){
    const [planets, setPlanets] = useState([]);
    const [appliedORAll, setappliedORAll] = useState(true);
     function fetchData(url = '',) {
        const myHeaders = new Headers();
        const datafromLocalstorage = JSON.parse(localStorage.getItem('user'));
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', datafromLocalstorage.token);
        
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
        fetchData('https://jobs-api.squareboat.info/api/v1/candidates/jobs');
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
         <div class="upper">
              <span class="headingText">MyJobs</span>
              <button class='appliedORAll' onClick={getAppliedorAll}>{appliedORAll ?'All Jobs': 'Applied Jobs'}</button>
              <div class="allJobCard">
              {planets.map((d, index)=>{
                return <CandidateJobCard data= {d} key={index}/>
              })}
             </div>
         </div>
        </div>
    )
}
export default CandidateDashBoard