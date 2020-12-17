import react from 'react';
function CandidateWHoAppliedforRecuriter(props){
     return(
         <div class ="jobCard applictioncard">
             <h4>{props.data.name}</h4>
             <span><i class="fas fa-envelope-square"></i> {props.data.email}</span>
             <br/>
             <strong>Skills</strong>
             <p>{props.data.skills}</p>
         </div>
     )
}
export default CandidateWHoAppliedforRecuriter