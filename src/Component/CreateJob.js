import react from 'react';
import './style.css'
function CreateJob(){
    
    const handledata = () =>{
        const  title = document.getElementById("jobtitle").value;
        const  description = document.getElementById("des").value;
        const  location = document.getElementById("loc").value;
        postData('https://jobs-api.squareboat.info/api/v1/jobs/', {
            title: title,
            description: description,
            location : location
        }).then(data => {
              setTimeout(()=>{
               window.location = '/recuirterDashboard'
              }, 2000)
              console.log(data); 
        });
    }
    async function postData(url = '', data = {}) {
      const datafromLocalstorage = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(url, {
          method: 'POST', 
          mode: 'cors', 
          cache: 'no-cache',
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization':  datafromLocalstorage.token
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
        <label for="des">Description:</label>
        <br/>
        <input type="text" id="des" name="des"/> 
        <br/>
        <label for="loc">Location:</label>
        <br/>
        <input type="text" id="loc" name="loc"/> 
        <button class="submit" onClick={handledata}>Submit</button> 
       </div>
    ) 
}
export default CreateJob