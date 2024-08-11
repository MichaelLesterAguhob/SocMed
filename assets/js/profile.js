
document.addEventListener('DOMContentLoaded', function()
{
    loadProfile();
});

function loadProfile(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../backend/profile/loadProfileDetails.php');
    xhr.setRequestHeader('Content-Type', 'Application/x-www-form-urlencoded');
    
    xhr.onreadystatechange = function()
      {
        let response;
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            // CATCH PARSING ERROR WHEN BACKEND RESPONSE WITH INVALID JSON
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

// CLICKING UPLOAD ICON WILL TRIGGER CLICKED ON INPUT ELEMENT TYPE FILE 
document.getElementById('btnUploadProfilePic').addEventListener('click', function()
{
    document.getElementById('profilePictureInput').click();
});

