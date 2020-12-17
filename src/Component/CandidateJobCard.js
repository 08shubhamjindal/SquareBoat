import react from 'react';
import './style.css'
function CandidateJobCard(props){
    async function postData(url = '', data = {}) {
        const datafromLocalstorage = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(url, {
          method: 'POST', 
          mode: 'cors', 
          cache: 'no-cache',
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': datafromLocalstorage.token
          },
          redirect: 'follow', 
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data)
        });
        return response.json(); 
    }

    const handleApply = (id)=>{
        postData('https://jobs-api.squareboat.info/api/v1/candidates/jobs', {
            jobId : id
        }).then(data => {
              console.log(data);
        }).catch((err)=>{
            console.log(err)
        });
    }
    return(
        <div class="jobCard"> 
             <h4>{props.data.title}</h4>
             <p>{props.data.description}</p>
             <span>{props.data.location}</span>
             <button id= "viewApplication" onClick={()=> handleApply(props.data.id)}>Apply</button>
       </div>
    )
}
export default CandidateJobCard;