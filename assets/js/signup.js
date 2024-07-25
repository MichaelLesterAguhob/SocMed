
// FOCUS ON FIRST INPUT ELEMENT WHEN DOCUMENT IS LOADED
document.addEventListener("DOMContentLoaded", function () {
  let first_input = document.getElementById("input_fullName");
  first_input.focus();
});

// INITIAL VALIDATION OF EMAIL | CHECKING ITS FORMAT
document.getElementById("input_signupEmail").addEventListener("change", function () {
      let input_email = document.getElementById("input_signupEmail");
      let email_label = document.getElementById("email-label");
      let email_warning = document.getElementById("email-warning");

   if (document.getElementById("input_signupEmail").value != ""){
      let validate_email = document.getElementById("input_signupEmail").value;
      let email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
      let validation = email_pattern.test(validate_email);

    if (!validation) {
       input_email.style = "border-color: red;";
       email_label.style = "color: red;";
       email_warning.style = "display: block;";
      } 
      else {
         input_email.style.removeProperty("border-color");
         email_label.style.removeProperty("color");
         email_warning.style.display = "none";
      }
   }
   else{
      input_email.style.removeProperty("border-color");
      email_label.style.removeProperty("color");
      email_warning.style.display = "none";
   }
  });

// CHECK PASSWORD IF MATCHED 
function isPassMatched(){
   let pass1_entered = document.getElementById('input_signupPass').value;
   let pass2_entered = document.getElementById('input_confirmSignupPass').value;

   let input_pass = document.querySelectorAll('.input-pass');
   let input_pass_label = document.querySelectorAll('.input-pass-label');
   let input_pass_msg = document.querySelectorAll('.input-pass-msg');

   if (pass1_entered != "" && pass2_entered != ""){
     if (pass1_entered != pass2_entered){
         input_pass.forEach(input =>{
            input.style.border = '1px solid red';
         });
         input_pass_label.forEach(label =>{
            label.style.color = 'red';
         });   
         input_pass_msg.forEach(function(span){
            span.style.display = 'block';
            span.textContent = "Password not matched!"
         });
     }
     else{
      input_pass.forEach(input =>{
         input.style.removeProperty("border");
      });
      input_pass_label.forEach(label =>{
         label.style.removeProperty("color");
      });
      input_pass_msg.forEach(function(span)
      {
         span.style.removeProperty('display');
         span.textContent = "";
      });
     }
   }
   else{
      input_pass.forEach(input =>{
         input.style.removeProperty("border");
      });
      input_pass_label.forEach(label =>{
         label.style.removeProperty("color");
      });
      input_pass_msg.forEach(function(span)
      {
         span.style.removeProperty('display');
         span.textContent = "";
      });
     }
}


//SHOW PASSWORD AND HIDE PASSWORD
let show_hide = 0;







//REGISTER NUMBER IF EMAIL VERIFICATION CODE IS CORRECT
function signUp() {
  let fullname = document.getElementById("input_fullName").value;
  let email = document.getElementById("input_signupEmail").value;
  let password = document.getElementById("input_signupPass").value;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "../../backend/signup.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      alert(xhr.responseText);
    }
  };

  let data ="fullname=" + encodeURIComponent(fullname) +
            "&email=" +encodeURIComponent(email) +
            "&password=" +encodeURIComponent(password);

  xhr.send(data);
}
