
// Load the profile when document is fully loaded
let selectedImage = document.getElementById('profilePictureInput');
let file;
document.addEventListener('DOMContentLoaded', function()
{
    loadProfile();
});

//Get the date and time
function getDateTime()
{
    const dateTimeConfig = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "Asia/Manila"
    }
    const dateTime = new Date();
    const formattedDateTime = dateTime.toLocaleString("en-US", dateTimeConfig).replace("at", " | ").replace("AM", "am").replace("PM", "pm");
    return formattedDateTime;
} 

// show profile actions buttons
function showProfileActionBtn()
{
    document.getElementById('btnUploadProfilePic').style.display = "inline-flex";
    document.getElementById('btnEditProfilePic').style.display = "none";

    let btn = document.querySelectorAll('.btnSaveDiscard');
    btn.forEach(function(button)
    {
        button.style.display = "inline-flex"
    });
} 


// Hide profile actions buttons
function hideProfileActionBtn()
{
    document.getElementById('btnUploadProfilePic').style.display = "none";
    document.getElementById('btnEditProfilePic').style.display = "inline-flex";

    let btn = document.querySelectorAll('.btnSaveDiscard');
    btn.forEach(function(button)
    {
        button.style.display = "none"
    });
    selectedImage.value = "";
} 


// button edit profile will shows upload, save and discard buttons
document.getElementById('btnEditProfilePic').addEventListener('click', function()
{
    showProfileActionBtn()
});


// button discard must hide all upload, save, and discard buttons and show only the edit button
document.getElementById('btnDiscardDp').addEventListener('click', function()
{
    hideProfileActionBtn();
});

// trigger the click on file input element with this upload button with icon
document.getElementById('btnUploadProfilePic').addEventListener('click', function()
{
    document.getElementById('profilePictureInput').click();
});

// display the selected image of user
document.getElementById('profilePictureInput').addEventListener('change', function()
{
    let previewFile = this.files[0];

    if(previewFile)
    {
        let fileReader = new FileReader();
        fileReader.onload = function(event)
        {
            let image = event.target.result;
            let profilePicture = document.getElementById('profilePicture');
            profilePicture.src = image;
        };

        fileReader.readAsDataURL(previewFile);
    }
});


// functions to load the profile data
function loadProfile(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../backend/profile/loadProfileDetails.php');
    xhr.setRequestHeader('Content-Type', 'Application/x-www-form-urlencoded');
    
    xhr.onreadystatechange = function()
      {
        let response;
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            //catch the invalid JSON format responsed by the backend
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
                let profilePicture = document.getElementById('profilePicture');
                if(response.userPicture == null)
                {
                    profilePicture.src = "../assets/image/default_image.jpg";
                }
                else
                {
                    profilePicture.src = response.userPicture;
                    
                }
            }
        }
    }
    xhr.send();
}


document.getElementById('btnSaveProfilePict').addEventListener("click", function()
{
    saveUploadedFile();
});

// SAVE UPLOADED FILE IN IMAGE FOLDER AND PATH IN DATABASE
function saveUploadedFile()
{
    let inputFile = document.getElementById('profilePictureInput');
    file = inputFile.files[0];

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
                let response;
                try
                {
                    response = JSON.parse(xhr.responseText);
                }
                catch(e)
                {
                    console.log(xhr.responseText);
                    return;
                }

                // IF JSON PARSING IS SUCCESSFUL
                if(response.status == "success")
                {
                    console.log(response.msg);
                    hideProfileActionBtn();
                    loadProfile();
                }
                else
                {
                    console.log(response.msg);
                }
            } 
        }
    }
    xhr.send(formData);
} 

// posting created post
function uploadPost()
{
    const dateTimeNow = getDateTime();
    let postCaptions = document.getElementById('postCaptions').value;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../backend/createPost.php');
    xhr.setRequestHeader('Content-Type', 'Application/x-www-form-urlencoded');

    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == XMLHttpRequest.DONE)
        {
            if(xhr.status == 200)
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send('dateTime=' + encodeURIComponent(dateTimeNow) + '&postCaptions=' + encodeURIComponent(postCaptions));
}

document.getElementById('btnPost').addEventListener('click', function()
{
    uploadPost();
});