
function loadProfile(){

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../backend/profile/loadProfileDetails.php');
    xhr.setRequestHeader('Content-Type', 'Application/x-www-form-urlencoded');
    
    xhr.onreadystatechange = function()
      {
        let response;
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            try
            {
                response = JSON.parse(xhr.responseText);
            }
            catch(e)
            {
                console.log(xhr.responseText);
                return;
            }

            if(response.status == "success")
            {
                document.getElementById('userName').innerText = response.name;
            }
        }
    }
    xhr.send();
    
}