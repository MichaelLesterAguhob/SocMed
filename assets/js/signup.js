
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










//SignUp
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
