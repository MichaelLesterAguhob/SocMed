// Load the profile when document is fully loaded
let userName = "";
let imageSrc = "";
let selectedImage = document.getElementById("profilePictureInput");
let profilePicture = document.getElementById("profilePicture");
let postIdToDelete = "";
let reactToPostId;
let commentToPostId;
let file;

document.addEventListener("DOMContentLoaded", function () {
  loadProfile();
  addListenerToDynamicElements()
});

// show profile actions buttons
function showProfileActionBtn() {
  document.getElementById("btnUploadProfilePic").style.display = "inline-flex";
  document.getElementById("btnEditProfilePic").style.display = "none";

  let btn = document.querySelectorAll(".btnSaveDiscard");
  btn.forEach(function (button) {
    button.style.display = "inline-flex";
  });
}

// Hide profile actions buttons
function hideProfileActionBtn() {
  document.getElementById("btnUploadProfilePic").style.display = "none";
  document.getElementById("btnEditProfilePic").style.display = "inline-flex";

  let btn = document.querySelectorAll(".btnSaveDiscard");
  btn.forEach(function (button) {
    button.style.display = "none";
  });
  selectedImage.value = "";
}

// button edit profile will shows upload, save and discard buttons
document.getElementById("btnEditProfilePic").addEventListener("click", function () {
    showProfileActionBtn();
});

// button discard must hide all upload, save, and discard buttons and show only the edit button
document.getElementById("btnDiscardDp").addEventListener("click", function () {
  hideProfileActionBtn();
});

// functions to load the profile data
function loadProfile() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "../../backend/profile/loadProfileDetails.php");
  xhr.setRequestHeader("Content-Type", "Application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    let response;
    if (xhr.readyState == 4 && xhr.status == 200) {
      //catch the invalid JSON format responsed by the backend
      try {
        response = JSON.parse(xhr.responseText);
      } catch (e) {
        console.log(xhr.responseText);
        return;
      }

      if (response.status == "success") {
        userName = response.name;
        document.getElementById("userName").innerText = userName;

        // checkin if there's no user profile picture
        if (response.userPicture == null) {
          // set default image if no profile pict has uploaded
          profilePicture.src = "../assets/image/default_image.jpg";
        } else {
          imageSrc = response.userPicture;
          profilePicture.src = imageSrc;
        }
        loadPosts();
      }
    }
  };
  xhr.send();
}

// trigger the click on file input element with this upload button with icon
document.getElementById("btnUploadProfilePic").addEventListener("click", function () {
    document.getElementById("profilePictureInput").click();
});

// display the selected image of user
document.getElementById("profilePictureInput").addEventListener("change", function () {
    let previewFile = this.files[0];
    if (previewFile) {
      let fileReader = new FileReader();
      fileReader.onload = function (event) {
        let image = event.target.result;
        profilePicture.src = image;
      };

      fileReader.readAsDataURL(previewFile);
    }
  });

// SAVE UPLOADED FILE IN IMAGE FOLDER AND PATH IN DATABASE
document.getElementById("btnSaveProfilePict").addEventListener("click", function () {
    saveUploadedProfilePict();
});

function saveUploadedProfilePict() {
  let inputFile = document.getElementById("profilePictureInput");
  file = inputFile.files[0];

  // Check first if there is already selected file
  if (!file) {
        popupMessageModal("Invalid!", "red", "No file selected", "red")
        return;
    }

  let formData = new FormData();
  formData.append("file", file);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "../../backend/profile//uploadProfilePicture.php");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
            let response;
            try {
                response = JSON.parse(xhr.responseText);
            } catch (e) {
                console.log(xhr.responseText);
                return;
            }

            // IF JSON PARSING IS SUCCESSFUL
            if (response.status == "success") {
                showToastNotification(response.msg);
                hideProfileActionBtn();
                loadProfile();
                addListenerToDynamicElements();
            } else {
                console.log(response.msg);
            }
        }
    }
  };
  xhr.send(formData);
}

//Get the current date
function getDate() {
    const dateConfig = {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "Asia/Manila",
    };
    return new Date().toLocaleString("en-US", dateConfig);
  }

// Get the current time
function getTime() {
    const timeConfig = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Manila",
    };
    return new Date().toLocaleString("en-US", timeConfig);
  }

// posting created post
document.getElementById("btnPost").addEventListener("click", function () {
  uploadPost();
});

function uploadPost() {
  let postCaptions = document.getElementById("postCaptions");
  
  if(postCaptions.value == "") {
    return;
  }

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "../../backend/createPost.php");
  xhr.setRequestHeader("Content-Type", "Application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
            let response;
            try {
                response = JSON.parse(xhr.responseText);
            }catch(error) {
                console.log(error + " \n \n " + xhr.responseText);
                return;
            }

            if(response.status == "success") {
                showToastNotification(response.msg);
                document.getElementById("postCaptions").value = "";
                document.getElementById("btnDiscardPost").click();
                loadPosts();
                addListenerToDynamicElements();
            }else {
                console.log(response.msg)
            }
        }
    }
  };
  xhr.send(
        "date=" + encodeURIComponent(getDate()) +
        "&time=" + encodeURIComponent(getTime()) +
        "&postCaptions=" + encodeURIComponent(postCaptions.value)
    );
}

// Loading all posts
async function loadPosts() {
  await new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../../backend/profile/loadPosts.php");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status == 200) {
          document.getElementById("profilePost").innerHTML = xhr.responseText;

          setTimeout(function () {
                let postsImages = document.querySelectorAll(".postSmallImage");
                let postsNames = document.querySelectorAll(".postsNames");

                // Setting the names in every post
                postsNames.forEach(function (h6) {
                    h6.innerHTML = userName;
                });

                // Setting the images in every post
                if (imageSrc != null || imageSrc != "") {
                    postsImages.forEach(function (img) {
                        img.src = imageSrc;
                    });
                } else {
                // Setting the default mages in every post
                postsImages.forEach(function (img) {
                    img.src = "../assets/image/default_image.jpg";
                });
                }

                resolve();
            }, 300);
        } else {
          reject(xhr.responseText);
        }
      }
    };
    xhr.send();
  });
}

// Adding listener to dynamic html element (Generated by php backend into DOM) ==========
function addListenerToDynamicElements() {
  addListenerToBtnEditPost();
  addListenerToBtnDeletePost();
  addButtonReactListener();
  addButtonCommentListener();
  addButtonShareListener();
}

// Adding listener to button delete post when they loaded in document
async function addListenerToBtnDeletePost() {
    try {
        await loadPosts();
        document.querySelectorAll('.btn-delete-post').forEach(function(button) {
            button.addEventListener('click', function() {
                postIdToDelete = this.getAttribute('postId');
                confirmationModal("Please confirm","red","Are you sure you want to edit this post?", "red");
            });
        });
    }catch(error) {
        console.log(error);
    }
}

// Adding listener to button edit post when they loaded in document
async function addListenerToBtnEditPost() {
    try {
        await loadPosts();
        document.querySelectorAll('.btn-edit-post').forEach(function(button) {
            button.addEventListener('click', function() {
                let postId = this.getAttribute('postId');
                // pop up an edit post modal
            });
        });
    }catch(error) {
        console.log(error);
    }
}

// Adding event listener mouseEnter and mouseLeave on React Button
let reactedEmoji;
async function addButtonReactListener() {
  let hoveredTime;
  try {
    await loadPosts();
    let reactButton = document.querySelectorAll(".button-react");
    reactButton.forEach(function (button) {

      // Get the postId and save it to global variable when react button of post is click
      button.addEventListener("click", function () {
        reactToPostId = this.getAttribute('postId');
        reactedEmoji = button.className.split(' ').pop();
        unhighlightReactedButtons();
        highlighReactedEmoji(reactedEmoji);
      });
    
      button.addEventListener("mouseenter", function () {
            reactToPostId = this.getAttribute('postId');
            reactedEmoji = button.className.split(' ').pop();
            hoveredTime = setTimeout(function () {
            $("#reactEmojiModal").modal("show");
            unhighlightReactedButtons();
            highlighReactedEmoji(reactedEmoji);   
            }, 500);
        });

      button.addEventListener("mouseleave", function () {
            clearTimeout(hoveredTime);
        });
    });
  } catch (error) {
        console.error("Error adding listener to react button:", error);
        return;
  }
}

// Adding event listener click on Comment Button
async function addButtonCommentListener() {
  try {
        await loadPosts();
        let commentButton = document.querySelectorAll(".button-comment");
            commentButton.forEach(function (button) {
            button.addEventListener("click", function () {
                commentToPostId = this.getAttribute('postId');
                document.getElementById('userComments').innerHTML = "....";
                $("#writeCommentModal").modal("show");
                setTimeout(function() {
                  loadPostComment();
                }, 1000);
            });
        });
    } catch (error) {
        console.error("Error adding listener to comment button:", error);
        return;
    }
}

// Adding event listener click on share Button
async function addButtonShareListener() {
  try {
        await loadPosts();
        let shareButton = document.querySelectorAll(".button-share");
            shareButton.forEach(function (button) {
            button.addEventListener("click", function () {
                
            });
        });
    } catch (error) {
        console.error("Error loading posts:", error);
        return;
    }
}

// Deleting the post
document.getElementById('btnDeletePost').addEventListener('click', function() {
    try {
      // creating ajax
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '../../backend/profile/deletePost.php');
      xhr.setRequestHeader('Content-Type', 'Application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE) {
          if(xhr.status == 200) {
            let response;
            try {
              response = JSON.parse(xhr.responseText);
            }catch(error) {
              console.log(error +"\n"+ xhr.responseText);
              return;
            }

            if(response.status == "success") {
                popupMessageModal('Deleted', 'darkorange', response.msg, 'darkorange');
                loadPosts();
                addListenerToDynamicElements();
            }else {
              console.log(response.msg);
            }
            
          }
        }
      }
      xhr.send('postIdToDelete=' + encodeURIComponent(postIdToDelete));
    } catch(error) {
      console.log(error);
    }
});

// Reaction to a post
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll(".btnReact").forEach(function (button) {
    button.addEventListener("click", function () {
            let emojiReaction = this.getAttribute('emojiReaction');
            let postIdToReact = reactToPostId;
            let response;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '../../backend/reactToPost.php');
            xhr.setRequestHeader('Content-Type', 'Application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
              if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status == 200) {
                  try {
                    response = JSON.parse(xhr.responseText);
                  }catch(error) {
                    console.log(error + "\n" + xhr.responseText);
                    return;
                  }

                  if(response.status == "success") {
                    $("#reactEmojiModal").modal("hide");
                    loadPosts();
                    addListenerToDynamicElements();
                  }else {
                    console.log(response.msg);
                  }
                }
              }
            }    
            xhr.send('reactToPostId=' + encodeURIComponent(postIdToReact) + '&emojiReaction=' + encodeURIComponent(emojiReaction));
    });
  });
});

// to delete reaction
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.btn-delete-reaction').forEach(function(imgBtn) {
    imgBtn.addEventListener('mouseenter', function() {
      imgBtn.style.cursor = "pointer";
    });
    imgBtn.addEventListener('click', function() {
      removeReaction(reactToPostId);
    });
  });
});

// Delete the reaction to a post
function removeReaction(reactionToRemove) {
  try {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '../../backend/removeReaction.php');
      xhr.setRequestHeader('Content-Type', 'Application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
        if(xhr.readyState == XMLHttpRequest.DONE) {
          if(xhr.status == 200) {
            let response;
            try {
              response = JSON.parse(xhr.responseText);
            }catch(error) {
              console.log(error + "\n" + xhr.responseText);
              return;
            }

            if(response.status == 'success') {
              $("#reactEmojiModal").modal("hide");
              loadPosts();
              addListenerToDynamicElements();
            }
        
          }
        }
      }
      xhr.send('reactionToRemove=' + encodeURIComponent(reactionToRemove));
  }catch(error) {
    console.log(error)
  }
}

// highlight the pop react button if selected
function highlighReactedEmoji(reactedEmoji) {
    let likeEmoji = document.getElementById('btnReactLike');
    let dislikeEmoji = document.getElementById('btnReactDislike');
    let hahaEmoji = document.getElementById('btnReactHaha');
    let loveEmoji = document.getElementById('btnReactLove');
    let inloveEmoji = document.getElementById('btnReactInlove');
    let wowEmoji = document.getElementById('btnReactWow');
    let angryEmoji = document.getElementById('btnReactAngry');

    let likeEmojiImage = document.querySelector('#btnReactLike img');
    let dislikeEmojiImage = document.querySelector('#btnReactDislike img');
    let hahaEmojiImage = document.querySelector('#btnReactHaha img');
    let loveEmojiImage = document.querySelector('#btnReactLove img');
    let inloveEmojiImage = document.querySelector('#btnReactInlove img');
    let wowEmojiImage = document.querySelector('#btnReactWow img');
    let angryEmojiImage = document.querySelector('#btnReactAngry img');
  
    // highlight the reacted emoji
    if(reactedEmoji == "reacted-emoji-like") {
      likeEmoji.setAttribute("isSelected", "true");
      likeEmoji.style.backgroundColor = "rgb(218, 235, 244)";
      likeEmoji.style.height = "40px";
      likeEmoji.style.width = "40px";

      likeEmojiImage.style.height = "30px";
      likeEmojiImage.style.width = "30px";
      document.querySelector('#btnReactLike .react-text').style.display = "block";
    }else if(reactedEmoji == "reacted-emoji-dislike") {
      dislikeEmoji.setAttribute("isSelected", "true");
      dislikeEmoji.style.backgroundColor = "rgb(218, 235, 244)";
      dislikeEmoji.style.height = "40px";
      dislikeEmoji.style.width = "40px";

      dislikeEmojiImage.style.height = "30px";
      dislikeEmojiImage.style.width = "30px";
      document.querySelector('#btnReactDislike .react-text').style.display = "block";
    }else if(reactedEmoji == "reacted-emoji-haha") {
      hahaEmoji.setAttribute("isSelected", "true");
      hahaEmoji.style.backgroundColor = "rgb(218, 235, 244)";
      hahaEmoji.style.height = "40px";
      hahaEmoji.style.width = "40px";

      hahaEmojiImage.style.height = "30px";
      hahaEmojiImage.style.width = "30px";
      document.querySelector('#btnReactHaha .react-text').style.display = "block";
  }else if(reactedEmoji == "reacted-emoji-love") {
      loveEmoji.setAttribute("isSelected", "true");
      loveEmoji.style.backgroundColor = "rgb(218, 235, 244)";
      loveEmoji.style.height = "40px";
      loveEmoji.style.width = "40px";

      loveEmojiImage.style.height = "30px";
      loveEmojiImage.style.width = "30px";
      document.querySelector('#btnReactLove .react-text').style.display = "block";
  }else if(reactedEmoji == "reacted-emoji-inlove") {
      inloveEmoji.setAttribute("isSelected", "true");
      inloveEmoji.style.backgroundColor = "rgb(218, 235, 244)";
      inloveEmoji.style.height = "40px";
      inloveEmoji.style.width = "40px";

      inloveEmojiImage.style.height = "30px";
      inloveEmojiImage.style.width = "30px";
      document.querySelector('#btnReactInlove .react-text').style.display = "block";
  }else if(reactedEmoji == "reacted-emoji-wow") {
    wowEmoji.setAttribute("isSelected", "true");
    wowEmoji.style.backgroundColor = "rgb(218, 235, 244)";
    wowEmoji.style.height = "40px";
    wowEmoji.style.width = "40px";

    wowEmojiImage.style.height = "30px";
    wowEmojiImage.style.width = "30px";
    document.querySelector('#btnReactWow .react-text').style.display = "block";
  }else if(reactedEmoji == "reacted-emoji-angry") {
    angryEmoji.setAttribute("isSelected", "true");
    angryEmoji.style.backgroundColor = "rgb(218, 235, 244)";
    angryEmoji.style.height = "40px";
    angryEmoji.style.width = "40px";

    angryEmojiImage.style.height = "30px";
    angryEmojiImage.style.width = "30px";
    document.querySelector('#btnReactAngry .react-text').style.display = "block";
  }
}

// Unhighlight the reacted button in pop reaction window
function unhighlightReactedButtons() {
  document.querySelectorAll('.reactEmojiModalBody .btnReact').forEach(function(reactButton) {
    reactButton.style.border = "none";
    reactButton.style.backgroundColor = "transparent";
    reactButton.style.borderRadius = "50%";
    reactButton.style.height = "unset";
    reactButton.style.width = "unset";
  });
  document.querySelectorAll('.reactEmojiModalBody .btnReact img').forEach(function(reactButtonImg) {
    reactButtonImg.style.height = "30px";
    reactButtonImg.style.width = "30px";
  });
  document.querySelectorAll('.reactEmojiModalBody .btnReact .react-text').forEach(function(reactButtonSpan) {
    reactButtonSpan.style.display = "none";
  });
}

// highlight or unhigkight emojis when hovered and unhovered
emojisWhenHovered();
function emojisWhenHovered() {
  document.querySelectorAll('.btnReact').forEach(btnReact => {
    btnReact.addEventListener('mouseenter', function() {
      let btnID = this.getAttribute('id');

      btnReact.style.backgroundColor = "rgb(218, 235, 244)";
      btnReact.style.borderRadius = "50%";
      btnReact.style.width = "40px";
      btnReact.style.height = "40px";

      let img = document.querySelector('#'+btnID+ ' img');
      img.style.width = "30px";
      img.style.height = "30px";

      let textSpan = document.querySelector('#'+btnID+ ' span');
      textSpan.style.display = "block";
    });

    // when mouse leave the react button
    btnReact.addEventListener('mouseleave', function() {
      let btnID = this.getAttribute('id');
      let isSelected = this.getAttribute('isSelected');
      if(!isSelected) {
        btnReact.style.backgroundColor = "transparent";
        btnReact.style.borderRadius = "50%";
        btnReact.style.width = "unset";
        btnReact.style.height = "unset";
  
        let img = document.querySelector('#'+btnID+ ' img');
        img.style.width = "unset";
        img.style.height = "unset";
  
        let textSpan = document.querySelector('#'+btnID+ ' span');
        textSpan.style.display = "none";
      }
    });
  });
  
}

// Add and save comment to a post
function commentToPost() {
  let comment = document.getElementById('inputComment');

  if(comment.value == "") {
    return;
  }

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '../../backend/commentToPost.php');
  xhr.setRequestHeader('Content-Type', 'Application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if(xhr.readyState == XMLHttpRequest.DONE) {
      let response;
      if(xhr.status == 200) {
        try {
          response = JSON.parse(xhr.responseText);
        }catch(error) {
          console.log(xhr.responseText);
          return;
        }

        if(response.status != "success") {
          console.log(response.msg);
        }
        comment.value = "";
        loadPostComment();
      }
    }
  }
  xhr.send('commentToPostId=' + encodeURIComponent(commentToPostId) + '&comment=' + encodeURIComponent(comment.value) + '&time=' + encodeURIComponent(getTime()) + '&date=' + encodeURIComponent(getDate()));
}

// Load all comments to a specific post
function loadPostComment() {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '../../backend/loadPostComment.php');
  xhr.setRequestHeader('Content-Type', 'Application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if(xhr.readyState == XMLHttpRequest.DONE) {
      if(xhr.status == 200) {
        document.getElementById('userComments').innerHTML = xhr.responseText;
      }
    }
  }
  xhr.send('postID=' + encodeURIComponent(commentToPostId));
}


// MODALS and TOAST =========================================
// popup message modal
function popupMessageModal(title, titleColor, popupMessage, textColor) {
    let modalTitle = document.querySelector('.popupMessageTitle');
    modalTitle.innerText = title;
    modalTitle.style.color = titleColor;

    let message = document.getElementById('popupMessageBody');
    message.innerText = popupMessage;
    message.style.color = textColor;
    $('#popupMessgaeModal').modal('show');
    setTimeout(function() {
        $('#popupMessgaeModal').modal('hide');
    },1500);
}

// confirmation modal
function confirmationModal(title, titleColor, confirmationMessage, textColor) {
    let modalTitle = document.querySelector('.confirmationModalTitle');
    modalTitle.innerText = title;
    modalTitle.style.color = titleColor;

    let message = document.getElementById('confirmationModalBody');
    message.innerText = confirmationMessage;
    message.style.color = textColor;
    $('#confirmationModal').modal('show');
}

// toast
function showToastNotification(toastMessage) {
  const toastElement = document.getElementById("myToast");
  const toast = new bootstrap.Toast(toastElement);
  document.getElementById("toastMessage").innerText = toastMessage;
  toast.show();
}
