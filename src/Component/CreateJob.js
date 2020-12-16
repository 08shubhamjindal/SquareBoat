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
        })
            .then(data => {
              console.log(data); 
        });
    }
    async function postData(url = '', data = {}) {
        console.log(data);
        const response = await fetch(url, {
          method: 'POST', 
          mode: 'cors', 
          cache: 'no-cache',
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNodWJoYW0wMTFAZ21haWwuY29tIiwibmFtZSI6InNodWJoYW0iLCJza2lsbHMiOiJoYWFhYSwgYWFhIiwidXNlclJvbGUiOjAsImNyZWF0ZWRBdCI6IjIwMjAtMTItMTZUMDI6NTg6MTcuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjAtMTItMTZUMDI6NTg6MTcuMDAwWiIsImlkIjoiMTJmMzFjMjktZjMwYi00Yzc1LTkxMzItMGE0MzgwMGNjMzg0IiwiaWF0IjoxNjA4MDkwMjIwfQ.9mBrq0iTh0Yr7IAj6t0brA5NVpiMOCVrH4WjXu225Nw" 
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