
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
        if(request.readyState == 4 && request.status == 200)
          {
            alert(request.responseText);
          }
        };
        let data = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password);
        request.send(data);
    }
    else
    {
      alert('Fill in the blank(s).');
    }
  }
  else
  {
    alert('invalid email');
  }
}