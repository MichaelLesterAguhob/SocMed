

let btn_toggler = document.querySelector('.navbar-toggler');
let isToggled = 0;
btn_toggler.addEventListener('click', function()
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
    const media_query = window.matchMedia("(min-width: 575px)");

    const handleWidthChange = e => toggler.click();
    media_query.addEventListener('change', function(){
            if(media_query.matches && isToggled == 1) handleWidthChange();
        });
});

