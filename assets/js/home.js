 // Handle navigation button
document.getElementById('btnHome').addEventListener('click', function(event)
{
    event.preventDefault();
});
let allTabs = document.querySelectorAll('.tabs');
let currentNav = "";
function navClick(navClicked)
{
    if(currentNav != navClicked)
    {
        // allTabs.forEach(function(div)
        // {
        //     allTabs.style.display = "none";
        // })

       let tab = document.getElementById(navClicked);
       tab.style.display = "flex";
      
    }
    currentNav = navClicked;
}

// doing the tabs interaction