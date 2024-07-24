
document.addEventListener("DOMContentLoaded", function()
{
  let first_input = document.getElementById('input_email');
  first_input.focus();
});

// Showing and Hiding password 
let toDo = "Hidden";
let btn_show_hide = document.getElementById('btn_show_hide');
let popover = document.getElementById('popover');
btn_show_hide.addEventListener('click', function()
{
  let icon = document.getElementById('eye_icon');
  if(toDo == "Hidden")
    {
      icon.setAttribute('src', 'assets/bootstrap/icon/bootstrap-icons-1.11.3/eye-slash.svg');
      let input = document.getElementById('input_pass');
      input.setAttribute('type','text')
      toDo = "Showed";
      popover.textContent = "Hide Password";
    }
  else
    {
      icon.setAttribute('src','assets/bootstrap/icon/bootstrap-icons-1.11.3/eye.svg');
      let input = document.getElementById('input_pass');
      input.setAttribute('type','password')
      toDo = "Hidden";
      popover.textContent = "Show Password";
    }
    popover.style.display = 'none';
});

// Mouse hover and leave event 
btn_show_hide.addEventListener('mouseover', function()
  {
    popover.style.display = 'inline';
  });
btn_show_hide.addEventListener('mouseleave', function()
  {
    popover.style.display = 'none';
  });



// temporary
function login(){
  window.location.href="pages/home.php";
}