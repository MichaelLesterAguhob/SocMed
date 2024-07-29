
// FOCUS ON FIRST INPUT ELEMENT WHEN DOCUMENT IS LOADED
document.addEventListener("DOMContentLoaded", function () {
  let first_input = document.getElementById("input_fullName");
  first_input.focus();

});

let isEmailValid = false;
let isPasswordMatched = false;

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
       isEmailValid = false;
      } 
      else {
         input_email.style.removeProperty("border-color");
         email_label.style.removeProperty("color");
         email_warning.style.display = "none";
         isEmailValid = true;
      }
   }
   else{
      input_email.style.removeProperty("border-color");
      email_label.style.removeProperty("color");
      email_warning.style.display = "none";
      isEmailValid = false;
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
         isPasswordMatched = false
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
      isPasswordMatched = true;
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
      isPasswordMatched = false
     }
}

//SHOW PASSWORD AND HIDE PASSWORD
let isHidden = true;
function show_hide_pass(){
   let eye_icon = document.getElementById('eye_icon');
   let input_pass = document.querySelectorAll('.input-pass');

   if (isHidden){
      input_pass.forEach(function(input){
         input.setAttribute('type', 'text');
      })
      eye_icon.setAttribute('src', '../assets/bootstrap/icon/bootstrap-icons-1.11.3/eye-slash.svg');
      isHidden = false;
      document.getElementById('popover').innerText = "Hide Password";
      document.getElementById('popover').style.display = 'none';
   }
   else{
      input_pass.forEach(function(input){
         input.setAttribute('type', 'password');
      })
   
      eye_icon.setAttribute('src', '../assets/bootstrap/icon/bootstrap-icons-1.11.3/eye.svg');
      isHidden = true;
      document.getElementById('popover').innerText = "Show Password";
      document.getElementById('popover').style.display = 'none';
   }
}

//showing and hiding tooltip when eye icon is hovered
function showPassToolTip(){
   let tool_tip = document.getElementById('popover');
   tool_tip.style.display = 'inline';
}
function hidePassToolTip(){
   let tool_tip = document.getElementById('popover');
   tool_tip.style.display = 'none';
}

//VERIFY EMAIL
let verification_code = 0;
function verifyEmail(){
   let fullname = document.getElementById("input_fullName").value;
   let email = document.getElementById("input_signupEmail").value;
   let password = document.getElementById("input_signupPass").value;
   let password2 = document.getElementById('input_confirmSignupPass').value;

    // KNOW IF ALL REQUIRED INPUTS ARE NOT BLANKS BEFORE SIGNING UP
    if(fullname !== "" && email !== "" && password !== "" && password2 !== "")
      {
         if(isEmailValid)
            {
              if(isPasswordMatched)
               {
                  let request = new XMLHttpRequest();
                  request.open('POST', '../../backend/verify_email.php');
                  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
               
                  request.onreadystatechange = function()
                  {  
                     if(request.readyState == 4 && request.status == 200){
                        let response = JSON.parse(request.responseText);
                       if(response.status == "success")
                       {
                        verification_code = response.code;
                        document.querySelector('.receiver-email').textContent = email + " - " + verification_code;
                        $('#modal_verification').modal('show');
                       }
                       else
                       {
                        alert(response.msg);
                       }
                     }
                  }
                  let data = "email=" + encodeURIComponent(email);
                  request.send(data);
               } 
               else
               {
                  // MESSAGE IF PASS NOT MATCHED
                  document.getElementById('modal_siginup_title').innerText = "Password is not Matched!";
                  document.getElementById('modal_siginup_title').style.color = "red";
                  document.getElementById('signup_msg').innerText = "Check your Password and make sure they are matched!";
                  $('#modal_signup_msg').modal('show');
               }
            }
            else
            {
               // MESSAGE IF EMAIL IS INVALID
               document.getElementById('modal_siginup_title').innerText = "Email is Invalid!";
               document.getElementById('modal_siginup_title').style.color = "red";
               document.getElementById('signup_msg').innerText = "Check your Email address and make sure it is valid!";
               $('#modal_signup_msg').modal('show');
            }
      }
      else
      {
         // IF THERE'S A BLANK INPUT
          document.getElementById('modal_siginup_title').innerText = "Fill in the blanks!";
          document.getElementById('modal_siginup_title').style.color = "red";
          document.getElementById('signup_msg').innerText = "Make sure you filled out all required fields!";
          $('#modal_signup_msg').modal('show');
      }
  
}

//Verify code inputted and successfully signed up the user
document.getElementById('btn_verify_signup').addEventListener('click', function()
{
    let inputted_verification = document.getElementById('inpt_vcode');
    if(inputted_verification.value != "")
    {
      if(verification_code == inputted_verification.value)
      {
         signUp();
      }
      else
      {
         $('.modal_verification_inpt_code_msg').text('Incorrect Verification Code! Try Again.').fadeIn(100).fadeOut(5000);
      }
         
    }
    else
    {
      $('.modal_verification_inpt_code_msg').text('Enter the verification code sent to your email address.').fadeIn(100).fadeOut(5000);
    }

});

//REGISTER NUMBER IF EMAIL VERIFICATION CODE IS CORRECT
function signUp() 
{
   let fullname = document.getElementById("input_fullName").value;
   let email = document.getElementById("input_signupEmail").value;
   let password = document.getElementById("input_signupPass").value;
   let password2 = document.getElementById('input_confirmSignupPass').value;

   // KNOW IF ALL REQUIRED INPUTS ARE NOT BLANKS BEFORE SIGNING UP
   if(fullname !== "" && email !== "" && password !== "" && password2 !== "")
      {
         if(isEmailValid)
            {
              if(isPasswordMatched)
               {
                  let xhr = new XMLHttpRequest();
                  xhr.open("POST", "../../backend/signup.php", true);
                  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                  xhr.onreadystatechange = function () {
                     if (xhr.readyState == 4 && xhr.status == 200) {
          
                        let response = JSON.parse(xhr.responseText);
                        if(response.status == "success")
                        {
                           let inputs_elements = document.querySelectorAll('#div_signup .form-control');
                           inputs_elements.forEach(function(input){
                              input.value = "";
                           });
                           document.getElementById('inpt_vcode').value = "";
                           $('#modal_verification').modal('hide');

                           setTimeout(function(){        
                              document.getElementById('modal_siginup_title').innerText = response.msg;
                              document.getElementById('modal_siginup_title').style.color = "Green";
                              document.getElementById('signup_msg').innerText = "You will be redirected to Login page.";
                              $('#modal_signup_msg').modal('show');
                           }, 500)

                           setTimeout(function(){        
                                $('#modal_signup_msg').modal('hide');
                           }, 3800)
                           
                           setTimeout(function(){
                              window.location.href='../index.php';
                           }, 5000);
             
                        }
                        else{
                           alert(response.msg);
                        }
                     }
                  };
                  let data ="fullname=" + encodeURIComponent(fullname) +
                              "&email=" +encodeURIComponent(email) +
                              "&password=" +encodeURIComponent(password);
                  xhr.send(data);
               } 
               else
               {
                   // MESSAGE IF PASS NOT MATCHED
                   document.getElementById('modal_siginup_title').innerText = "Password is not Matched!";
                   document.getElementById('modal_siginup_title').style.color = "red";
                   document.getElementById('signup_msg').innerText = "Check your Password and make sure they are matched!";
                   $('#modal_signup_msg').modal('show');
               }
            }
            else
            {
                // MESSAGE IF EMAIL IS INVALID
               document.getElementById('modal_siginup_title').innerText = "Email is Invalid!";
               document.getElementById('modal_siginup_title').style.color = "red";
               document.getElementById('signup_msg').innerText = "Check your Email address and make sure it is valid!";
               $('#modal_signup_msg').modal('show');
            }
      }
      else
      {
         // IF THERE'S A BLANK INPUT
         document.getElementById('modal_siginup_title').innerText = "Fill in the blanks!";
         document.getElementById('modal_siginup_title').style.color = "red";
         document.getElementById('signup_msg').innerText = "Make sure you filled out all required fields!";
         $('#modal_signup_msg').modal('show');
      }
}


