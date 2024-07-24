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
   xhr.open("POST","php file", true)


 }