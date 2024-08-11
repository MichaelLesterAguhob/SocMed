
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

// SAVE UPLOADED FILE IN IMAGE FOLDER AND PATH IN DATABASE
function saveUploadedFile()
{
    let inputFile = document.getElementById('profilePictureInput');
    let file = inputFile.files[0];

    // Check first if there is already selected file
    if(!file)
    {
        alert("No file selected");
        return;
    }

    let formData = new FormData();
    formData.append('file', file);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../backend/profile//uploadProfilePicture.php');
    
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState === XMLHttpRequest.DONE)
        {
            if(xhr.status === 200)
            {
                let response = JSON.parse(xhr.responseText);

                if(response.status == "success")
                {
                    console.log(response.file);
                }
            } 
        }
    }
    xhr.send(formData);
} 