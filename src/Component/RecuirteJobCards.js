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
             <span>{props.data.location}</span>
             <button onClick={()=>handleViewApplication(props.data.id)}>View Application</button>
       </div>
    )
}
export default RecuirteJobCards;