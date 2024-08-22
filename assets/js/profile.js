
// Load the profile when document is fully loaded
let userName = "";
let imageSrc = "";
let selectedImage = document.getElementById('profilePictureInput');
let profilePicture = document.getElementById('profilePicture');

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
                userName = response.name;
                document.getElementById('userName').innerText = userName;
  
                // checkin if there's no user profile picture
                if(response.userPicture == null)
                {
                    // set default image if no profile pict has uploaded
                    profilePicture.src = "../assets/image/default_image.jpg";
                }
                else
                {
                    imageSrc = response.userPicture;
                    profilePicture.src = imageSrc;
                }
                loadPosts();
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
                document.getElementById('postCaptions').value = "";
                document.getElementById('btnDiscardPost').click();
                loadPosts();
            }
        }
    }
    xhr.send('dateTime=' + encodeURIComponent(dateTimeNow) + '&postCaptions=' + encodeURIComponent(postCaptions));
}

document.getElementById('btnPost').addEventListener('click', function()
{
    uploadPost();
});


// Loading all posts
async function loadPosts()
{
    await new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../../backend/profile/loadPosts.php');
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE) {
                if(xhr.status == 200) {
                    document.getElementById('profilePost').innerHTML = xhr.responseText;
                    
                    setTimeout(function() {
                        let postsImages = document.querySelectorAll('.postSmallImage');
                        let postsNames = document.querySelectorAll('.postsNames');

                        // Setting the names in every post
                        postsNames.forEach(function(h6) {
                            h6.innerHTML = userName;
                        });

                        // Setting the images in every post
                        if(imageSrc != null || imageSrc != "") {
                            postsImages.forEach(function(img) {
                                img.src = imageSrc;
                        });
                        }
                        else {
                            // Setting the default mages in every post
                            postsImages.forEach(function(img) {
                                img.src = "../assets/image/default_image.jpg";
                            });
                        }

                        resolve();
                    }, 300);
                    
                }
                else
                {
                  reject(xhr.responseText);
                }
            }
        }
        xhr.send();
    });
}

// Adding event listener mouseEnter and mouseLeave on React Button
async function addButtonReactListener() {
    let hoveredTime;
    try {
        await loadPosts();
        let reactButton = document.querySelectorAll('.button-react');
        reactButton.forEach(function(button) {
            button.addEventListener('mouseenter', function() {
                hoveredTime = setTimeout(function() {
                    $('#reactEmojiModal').modal('show');
                }, 1000);
            });

            button.addEventListener('mouseleave', function() {
                clearTimeout(hoveredTime);
            });
        });
    }
    catch(error) {
        console.error('Error loading posts:', error);
    }
}
addButtonReactListener();

// Adding event listener mouseEnter and mouseLeave on Comment Button
async function addButtonCommentListener() {

    try {
        await loadPosts();
        let commentButton = document.querySelectorAll('.button-comment');
        commentButton.forEach(function(button) {
            button.addEventListener('click', function() {
                $('#writeCommentModal').modal('show');
            });

        });
    }
    catch(error) {
        console.error('Error loading posts:', error);
    }
}
addButtonCommentListener();


// Close the react modal when emoji is selected
document.querySelectorAll('.btnReact').forEach(function(button) {
    button.addEventListener('click', function() {
        $('#reactEmojiModal').modal('hide');
    });
});