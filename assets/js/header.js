let btnToggler = document.querySelector('.navbar-toggler');
let isToggled = 0;
btnToggler.addEventListener('click', function()
{
    if(isToggled == 0)
    {
        isToggled = 1;
    }
    else
    {
        isToggled = 0;
    }
});

//CLOSING THE COLLAPSIBLE MENU ONCE IT WAS LEFT TOGGLED
document.addEventListener("DOMContentLoaded", function()
{
    const toggler = document.querySelector('.navbar-toggler');
    const mediaQuery = window.matchMedia("(min-width: 575px)");

    const handleWidthChange = e => toggler.click();
    mediaQuery.addEventListener('change', function()
    {
        if(mediaQuery.matches && isToggled == 1) handleWidthChange();
    });
});

 // Handle preventing the default action of a tag
 let btnHome = document.getElementById('btnHome');
 btnHome.addEventListener('click', function(event)
 {
     event.preventDefault();
 });
 let btnFriends = document.getElementById('btnFriends');
 btnFriends.addEventListener('click', function(event)
 {
     event.preventDefault();
 });
 let btnMessage = document.getElementById('btnMessage');
 btnMessage.addEventListener('click', function(event)
 {
     event.preventDefault();
 });
 let btnProfile = document.getElementById('btnProfile');
 btnProfile.addEventListener('click', function(event)
 {
     event.preventDefault();
 });