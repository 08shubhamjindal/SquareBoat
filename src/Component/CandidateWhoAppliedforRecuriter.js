import react from 'react';
function CandidateWHoAppliedforRecuriter(props){
     return(
         <div>
             <h4>{props.data.name}</h4>
             <h5>{props.data.email}</h5>
             <strong>Skills</strong>
             <p>{props.data.skills}</p>
         </div>
     )
}
export default CandidateWHoAppliedforRecuriter