 document.addEventListener('DOMContentLoaded',function(){
    let first_input = document.getElementById('input_fullName');
    first_input.focus();
 });

 //SignUp
 function signUp(){
   let fullname = document.getElementById('input_fullName').value;
   let email = document.getElementById('input_signupEmail').value;
   let password = document.getElementById('input_signupPass').value;

   let xhr = new XMLHttpRequest();
   xhr.open("POST", "../../backend/signup.php", true);
   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

   xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200){
         alert(xhr.responseText);
      }
   };

   let data = "fullname="+encodeURIComponent(fullname)
               + "&email="+encodeURIComponent(email)
               + "&password="+encodeURIComponent(password)
   ;  

   xhr.send(data);
 }