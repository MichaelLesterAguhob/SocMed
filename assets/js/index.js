
let isEmailValid = false;

document.addEventListener("DOMContentLoaded", function()
{
  let first_input = document.getElementById('inputEmail');
  first_input.focus();
});
  
//VALIDATE ENTERED EMAIL
function validateEmail()
{
    let inputEmail = document.getElementById('inputEmail');
    let email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    let result = email_pattern.test(inputEmail.value);
    let emailLabel = document.querySelector('.form-floating .email-label');
    let emailMsg = document.querySelector('.form-floating .email-msg');
    
    if (inputEmail.value != "" && !result)
    {
        inputEmail.style.borderColor = 'red';
        emailLabel.style.color = 'red';
        emailMsg.style.display = 'block';
        isEmailValid = false;
    }
    else if(inputEmail.value != "" && result)
    {
        inputEmail.style.removeProperty('border-color');
        emailLabel.style.removeProperty('color');
        emailMsg.style.display = 'none';
        isEmailValid = true;
    }
    else
    {
        inputEmail.style.removeProperty('border-color');
        emailLabel.style.removeProperty('color');
        emailMsg.style.display = 'none';
        isEmailValid = false;
    }
}

// Showing and Hiding password 
let toDo = "Hidden";
let btnShowHide = document.getElementById('btnShowHide');
let popover = document.getElementById('popover');

btnShowHide.addEventListener('click', function()
{
  let icon = document.getElementById('eyeIcon');
  if(toDo == "Hidden")
  {
    icon.setAttribute('src', 'assets/bootstrap/icon/bootstrap-icons-1.11.3/eye-slash.svg');
    let input = document.getElementById('inputPassword');
    input.setAttribute('type','text')
    toDo = "Showed";
    popover.textContent = "Hide Password";
  }
  else
  {
    icon.setAttribute('src','assets/bootstrap/icon/bootstrap-icons-1.11.3/eye.svg');
    let input = document.getElementById('inputPassword');
    input.setAttribute('type','password')
    toDo = "Hidden";
    popover.textContent = "Show Password";
  }
  popover.style.display = 'none';
});

// Mouse hover and leave event 
btnShowHide.addEventListener('mouseover', function()
{
  popover.style.display = 'inline';
});
btnShowHide.addEventListener('mouseleave', function()
{
  popover.style.display = 'none';
});


// LOGIN ACCOUNT
function login()
  {
    validateEmail();
    //user inputs
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;

    if(isEmailValid)
      {
        if(email != "" && password != "")
          {
              let request = new XMLHttpRequest();
              request.open('POST', '../../backend/login.php');
              request.setRequestHeader('Content-Type', 'Application/x-www-form-urlencoded');
              
              request.onreadystatechange = function()
                {
                  let response;
                  if(request.readyState == 4 && request.status == 200)
                    {
                      // Handle invalid JSON format from backend response
                      try
                        {
                          response = JSON.parse(request.responseText);
                        }
                      catch(e)
                        {
                          console.log("Login Error Occurred: " + request.responseText);
                          return;
                        }
                    
                      // Handle response
                      if(response.status == "success")
                        {
                          email.value="";
                          password.value="";
                          showLoginModalMsg(response.msg, "Green", "Please Wait...", "NO", "none", 1000);
                          setTimeout(function()
                            {
                              window.location = "pages/home.php";
                            }, 1000);
                        }
                      else
                        {
                          let loginModalTextContent = "Check your input detail if there's typo. Click 'Forgot Password' if you can't remember your password";
                          showLoginModalMsg(response.msg, "red", loginModalTextContent, "YES", "inputPassword", 5000);
                        }
                    }
                };

              // data to be sent to backend
              let data = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password);
              request.send(data);
          }
        else
          { 
            showLoginModalMsg("Fill in the blank(s)", "red", "Check your inputs and fill in the blanks.", "NO", "inputEmail", 2500);
          }
      }
    else
      {
        showLoginModalMsg("Invalid!", "red", "Please Enter a Valid Email Address.", "NO", "inputEmail", 2500);
      }
  }

// HANDLE ENTER KEYDOWN ON EMAIL AND PASSWORD INPUT
document.getElementById('inputEmail').addEventListener('keydown', function(e)
  {
    if(e.key == "Enter")
      { 
        validateEmail();
        if(isEmailValid)
          {
            document.getElementById('inputPassword').focus();
          }
        else
          {
            showLoginModalMsg("Invalid!", "red", "Please Enter a Valid Email Address.", "NO", "inputEmail", 2500);
          }
      }
  });

document.getElementById('inputPassword').addEventListener('keydown', function(e)
  {
    if(e.key == "Enter")
    { 
      validateEmail();
      if(isEmailValid && document.getElementById('inputPassword').value != "")
        {
          document.getElementById('btnLogin').click();
        }
      else
        {
          showLoginModalMsg("Invalid!", "red", "Please Fill in the blank(s) or Enter a Valid Email Address.", "NO", "inputPassword", 2500);
        }
    }
  });

// Login modal message dialog
function showLoginModalMsg(title, titleColor, msgContent, showFooter, focusTo, duration)
  {
    let loginMsgTitle = document.getElementById('loginMsgTitle');
    let loginMsgContent = document.getElementById('loginMsgContent');
    let loginMsgFooter = document.getElementById('loginMsgFooter');

    loginMsgTitle.innerText = title;
    loginMsgTitle.style.color = titleColor;
    loginMsgContent.innerText = msgContent;

    // determine if need to show the modal footer
    setTimeout(function()
      {
        if(showFooter == "NO")
          {
            loginMsgFooter.style.display = "none";
          }
        else
          {
            loginMsgFooter.style.display = "flex";
          }
      }, 1);

    // showing login modal message
    $('#loginMsg').modal('show');

    // hiding login modal message
    setTimeout(function()
    {
      $('#loginMsg').modal('hide');

      // set where to focus after hiding modal
      if(focusTo != "none")
      {
        let element = document.getElementById(focusTo);
        element.focus();
      }
    }, duration);

  };