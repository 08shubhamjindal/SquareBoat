import react,{useState} from 'react';
import './style.css'
function CreateJob(){

    const [title, settitle] = useState(false);
    const [des, setdes] = useState(false);
    const [locat, setlocat] = useState(false);
    const checktitle = (title)=>{
      if((title.length>=0 && title.length<3 )|| title.length>100){
        settitle(true)
        return false;
      }
      settitle(false);
      return true;
    }
    const checkDes = (description)=>{
      if((description.length>=0 && description.length<3) || description.length>100){
        setdes(true)
        return false;
      }
      setdes(false);
      return true;
    }
    const checklocation = (location)=>{
      if((location.length>=0 && location.length<3) || location.length>100){
        setlocat(true)
        return false;
      }
      setlocat(false);
      return true;
    }
    const handledata = () =>{
        const  title = document.getElementById("jobtitle").value;
        const  description = document.getElementById("des").value;
        const  location = document.getElementById("loc").value;
        const datafromLocalstorage = JSON.parse(localStorage.getItem('user'));
        if(checktitle(title) && checkDes(description)
           && checklocation(location) && datafromLocalstorage && datafromLocalstorage.userRole===0){
          postData('https://jobs-api.squareboat.info/api/v1/jobs/', {
            title: title,
            description: description,
            location : location
        }, datafromLocalstorage.token).then(data => {
              // setTimeout(()=>{
              //  window.location = '/recuirterDashboard'
              // }, 2000)
              console.log(data); 
        });
        }
        
    }
    async function postData(url = '', data = {}, token) {
        const response = await fetch(url, {
          method: 'POST', 
          mode: 'cors', 
          cache: 'no-cache',
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization':  token
          },
          redirect: 'follow', 
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data)
        });
        return response.json(); 
      }
    return(
        <div class="postJobform"> 
        <h2>Post Job</h2>
        <label for="jobtitle">Job Title:</label>
        <br/>
        <input type="text" id="jobtitle" name="jobtitle"/> 
        <br/>
        {title?<span class="errorfield">title should be greater than or equal to 3</span>:<span></span>}
        <br/>
        <label for="des">Description:</label>
        <br/>
        <input type="text" id="des" name="des"/> 
        <br/>
        {des?<span class="errorfield">Description should be greater than or equal to 3</span>:<span></span>}
        <label for="loc">Location:</label>
        <br/>
        <input type="text" id="loc" name="loc"/> 
        <br/>
        {locat?<span class="errorfield">Location should be greater than or equal to 3</span>:<span></span>}
        <br/>
        <button class="submit" onClick={handledata}>Submit</button> 
       </div>
    ) 
}
export default CreateJob