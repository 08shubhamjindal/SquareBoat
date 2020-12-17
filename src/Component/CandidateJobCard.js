import react, {useState} from 'react';
import './style.css'
function CandidateJobCard(props){
    const [loader, setloader] = useState(true);

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
        setloader(false);
        postData('https://jobs-api.squareboat.info/api/v1/candidates/jobs', {
            jobId : id
        }).then(data => {
              setloader(true);
              window.alert('You applied sucessfully');
              window.location = '/candidateDashboard'
              console.log(data);
        }).catch((err)=>{
            console.log(err)
        });
    }
    return(
        <div class="jobCard"> 
             <h4>{props.data.title}</h4>
             <p>{props.data.description}</p>
             <span><i className="fas fa-map-marker"></i> { props.data.location}</span>
             {!props.appliedORAll?<button id= "viewApplication" onClick={()=> handleApply(props.data.id)}>Apply</button> :<span></span>}
             <div class="loader" style={{display : loader ? 'none' : 'block'}}></div>
       </div>
    )
}
export default CandidateJobCard;