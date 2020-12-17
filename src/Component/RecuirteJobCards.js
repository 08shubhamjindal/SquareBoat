import react from 'react';
import './style.css'
function RecuirteJobCards(props){
    
    const handleViewApplication = (id)=>{
        props.handleViewApplication(id);
    }
    return(
        <div class="jobCard"> 
             <h4>{props.data.title}</h4>
             <p>{props.data.description}</p>
             <span><i className="fas fa-map-marker"></i> {props.data.location}
             <button id= "viewApplication" onClick={()=>handleViewApplication(props.data.id)}>View Application</button>
             </span>
       </div>
    )
}
export default RecuirteJobCards;