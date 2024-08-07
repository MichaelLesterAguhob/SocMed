
let allTabs = document.querySelectorAll('.tabs');
let currentNav = "";
function navClick(navClicked)
{
    if(currentNav != navClicked)
    {
        allTabs.forEach(function(div)
        {
            div.style.display = "none";
        })

       let tab = document.getElementById(navClicked);
       tab.style.display = "flex";
      
    }
    currentNav = navClicked;
}
