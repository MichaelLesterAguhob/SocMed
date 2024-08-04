
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
  // modal
  let loginMsgTitle = document.getElementById('loginMsgTitle');
  let loginMsgContent = document.getElementById('loginMsgContent');
  let loginMsgFooter = document.getElementById('loginMsgFooter');
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
           
            if(response.status == "success")
            {
              loginMsgFooter.style.display = "none";
              loginMsgTitle.innerText = response.msg;
              loginMsgTitle.style.color = "Green";
              loginMsgContent.innerText = "Please Wait...";
              $('#loginMsg').modal('show');

              setTimeout(function()
              {
                $('#loginMsg').modal('hide');
                loginMsgFooter.style.display = "flex";
              }, 1000);

            }
            else
            {
              loginMsgFooter.style.display = "none";
              loginMsgTitle.innerText = response.msg;
              loginMsgTitle.style.color = "red";
              loginMsgContent.innerText = "Check your input detail if there's typo. Click 'Forgot Password' if you can't remember your password";
              $('#loginMsg').modal('show');

              setTimeout(function()
              {
                $('#loginMsg').modal('hide');
                loginMsgFooter.style.display = "flex";
              }, 7000);
            }
          }
        };
        let data = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password);
        request.send(data);
    }
    else
    {
      loginMsgTitle.innerText = "Fill in the blank(s)."
      loginMsgTitle.style.color = "red";
      loginMsgContent.innerText = "Check your inputs and fill in the blanks.";
      $('#loginMsg').modal('show');
    }
  }
  else
  {
    loginMsgTitle.innerText = "Invalid Email Address."
    loginMsgTitle.style.color = "red";
    loginMsgContent.innerText = "Make sure you enter a Valid Email Address";
    $('#loginMsg').modal('show');
  }
}

document.getElementById('inputEmail').addEventListener('keydown', function(e)
{
  let email = document.getElementById('inputEmail');
  if(e.key == "Enter")
  {
    if(isEmailValid)
    {
      alert('valid');
    }
    else
    {
      alert('sadas');
    }
  }
});