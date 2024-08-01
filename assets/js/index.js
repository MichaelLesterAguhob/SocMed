
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

  if (!result)
  {
   inputEmail.style.borderColor = 'red';
   emailLabel.style.color = 'red';
   emailMsg.style.display = 'block';
  }
  else
  {
    inputEmail.style.removeProperty('border-color');
    emailLabel.style.removeProperty('color');
    emailMsg.style.display = 'none';
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



// temporary
function login()
{
  window.location.href="pages/home.php";
}