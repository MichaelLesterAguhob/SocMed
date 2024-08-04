
// FOCUS ON FIRST INPUT ELEMENT WHEN DOCUMENT IS LOADED
document.addEventListener("DOMContentLoaded", function () 
{
  let firstInput = document.getElementById("inputFullname");
  firstInput.focus();
}); 

let isEmailValid = false;
let isPasswordMatched = false;
let secs = 30;

// INITIAL VALIDATION OF EMAIL | CHECKING ITS FORMAT
document.getElementById("inputEmail").addEventListener("change", function () 
{
      let inputEmail = document.getElementById("inputEmail");
      let emailLabel = document.getElementById("emailLabel");
      let emailWarning = document.getElementById("emailWarningMsg");

      if (document.getElementById("inputEmail").value != "")
      {
         let validate_email = document.getElementById("inputEmail").value;
         let email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
         let validation = email_pattern.test(validate_email);

         if (!validation) 
         {
         inputEmail.style = "border-color: red;";
         emailLabel.style = "color: red;";
         emailWarning.style = "display: block;";
         isEmailValid = false;
         } 
         else 
         {
            inputEmail.style.removeProperty("border-color");
            emailLabel.style.removeProperty("color");
            emailWarning.style.display = "none";
            isEmailValid = true;
         }
      }
      else
      {
         inputEmail.style.removeProperty("border-color");
         emailLabel.style.removeProperty("color");
         emailWarning.style.display = "none";
         isEmailValid = false;
      }
  });

// CHECK PASSWORD IF MATCHED 
function isPassMatched()
{
   let password = document.getElementById('inputPassword').value;
   let confirmPassword = document.getElementById('inputConfirmPassword').value;

   let inputPassword = document.querySelectorAll('.input-pass');
   let inputPasswordLabel = document.querySelectorAll('.input-pass-label');
   let inputPasswordMsg = document.querySelectorAll('.input-pass-msg');

   if (password != "" && confirmPassword != "")
   {
      if (password != confirmPassword)
      {
         //Let user know that password did not matched by changing color and showing message
         inputPassword.forEach(input =>
         {
            input.style.border = '1px solid red';
         });
         inputPasswordLabel.forEach(label =>
         {
            label.style.color = 'red';
         });   
         inputPasswordMsg.forEach(function(span)
         {
            span.style.display = 'block';
            span.textContent = "Password not matched!"
         });
         isPasswordMatched = false
     }
     else
     {
         //bring back the default of border, color of element in password inputs.
         inputPassword.forEach(input =>
         {
            input.style.removeProperty("border");
         });
         inputPasswordLabel.forEach(label =>
         {
            label.style.removeProperty("color");
         });
         inputPasswordMsg.forEach(function(span)
         {
            span.style.removeProperty('display');
            span.textContent = "";
         });
         isPasswordMatched = true;
      }
   }
   else
   {
      //bring back the default of border, color of element in password inputs.
      inputPassword.forEach(input =>
      {
         input.style.removeProperty("border");
      });
      inputPasswordLabel.forEach(label =>
      {
         label.style.removeProperty("color");
      });
      inputPasswordMsg.forEach(function(span)
      {
         span.style.removeProperty('display');
         span.textContent = "";
      });
      isPasswordMatched = false
     }
}

//SHOW PASSWORD AND HIDE PASSWORD
let isPasswordHidden = true;
function show_hide_pass()
{
   let eyeIcon = document.getElementById('eyeIcon');
   let inputPassword = document.querySelectorAll('.input-pass');

   if (isPasswordHidden)
   {
      inputPassword.forEach(function(input)
      {
         input.setAttribute('type', 'text');
      })
      eyeIcon.setAttribute('src', '../assets/bootstrap/icon/bootstrap-icons-1.11.3/eye-slash.svg');
      isPasswordHidden = false;
      document.getElementById('showHideToolTip').innerText = "Hide Password";
      document.getElementById('showHideToolTip').style.display = 'none';
   }
   else
   {
      inputPassword.forEach(function(input)
      {
         input.setAttribute('type', 'password');
      })
      eyeIcon.setAttribute('src', '../assets/bootstrap/icon/bootstrap-icons-1.11.3/eye.svg');
      isPasswordHidden = true;
      document.getElementById('showHideToolTip').innerText = "Show Password";
      document.getElementById('showHideToolTip').style.display = 'none';
   }
}

//showing and hiding tooltip when eye icon is hovered
function showPassToolTip()
{
   let toolTip = document.getElementById('showHideToolTip');
   toolTip.style.display = 'inline';
}
function hidePassToolTip()
{
   let toolTip = document.getElementById('showHideToolTip');
   toolTip.style.display = 'none';
}

//VERIFY EMAIL
let verificationCode = 0;
function verifyEmail()
{
   let btnResendCode = document.getElementById('btnResendCode');
   btnResendCode.setAttribute('disabled', 'disabled');
   secs = 30;

   let fullName = document.getElementById("inputFullname").value;
   let email = document.getElementById("inputEmail").value;
   let password = document.getElementById("inputPassword").value;
   let confirmPassword = document.getElementById('inputConfirmPassword').value;

    // KNOW IF ALL REQUIRED INPUTS ARE NOT BLANKS BEFORE SIGNING UP
    if(fullName !== "" && email !== "" && password !== "" && confirmPassword !== "")
   {
      if(isEmailValid)
      {
         if(isPasswordMatched)
         {
            // IF ALL CONDITIONS WERE MET, SEND VERIFICATION CODE TO EMAIL
            let request = new XMLHttpRequest();
            request.open('POST', '../../backend/verify_email.php');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
         
            request.onreadystatechange = function()
            {  
               if(request.readyState == 4 && request.status == 200)
               {
                  let response;
                  // HANDLE THE ERROR IF BACKEND RESPOND WITH INVALID JSON FORMAT
                  try
                  {
                     response = JSON.parse(request.responseText);
                  }
                  catch(e)
                  {
                     console.log('Error Occurred :' + request.responseText);
                     return;
                  }
                  
                  if(response.status == "success")
                  {
                     verificationCode = response.code;
                     document.querySelector('.receiver-email').textContent = email;
                     $('#modaVerification').modal('show');
                     setTimeout(function()
                     {
                        document.getElementById('inputVerificationCode').focus();
                        startResendCountdown();
                     }, 500);
                  }
                  else
                  {
                     console.log(response.msg);
                  }
               }
            }
            let data = "email=" + encodeURIComponent(email) + "&fullName=" + encodeURIComponent(fullName);
            request.send(data);
         } 
         else
         {
            // MESSAGE IF PASS NOT MATCHED
            document.getElementById('modalSignupMsgTitle').innerText = "Password did not Matched!";
            document.getElementById('modalSignupMsgTitle').style.color = "red";
            document.getElementById('modalSignupMsgContent').innerText = "Check your Password and make sure they are matched!";
            $('#modalSignupMsg').modal('show');
         }
      }
      else
      {
         // MESSAGE IF EMAIL IS INVALID
         document.getElementById('modalSignupMsgTitle').innerText = "Invalid Email!";
         document.getElementById('modalSignupMsgTitle').style.color = "red";
         document.getElementById('modalSignupMsgContent').innerText = "Make sure you have entered a valid email!";
         $('#modalSignupMsg').modal('show');
      }
   }
   else
   {
      // IF THERE'S A BLANK INPUT
         document.getElementById('modalSignupMsgTitle').innerText = "Fill in the blanks!";
         document.getElementById('modalSignupMsgTitle').style.color = "red";
         document.getElementById('modalSignupMsgContent').innerText = "Make sure you filled out all required fields!";
         $('#modalSignupMsg').modal('show');
   }
}

//RESEND COUNTDOWN
function startResendCountdown()
{
      let countDownInterval = setInterval(function()
      {
         if(secs > 0)
         {
            secs--;
            document.getElementById('resendCountdown').innerText = secs.toString();
         }
         else
         {
            clearInterval(countDownInterval);
            let btnResendCode = document.getElementById('btnResendCode');
            btnResendCode.removeAttribute('disabled');
            document.getElementById('resendCountdown').innerText = "";
         }
      }, 1000);
}

//RESENDING VERIFICATION CODE
document.getElementById('btnResendCode').addEventListener('click', function()
{
   secs = 30;
   verifyEmail();

});

//Verify code inputted and successfully signed up the user
document.getElementById('btnVerifySignup').addEventListener('click', function()
{
   let VerificationCode = document.getElementById('inputVerificationCode');
   
   if(VerificationCode.value != "")
   {
      if(verificationCode == VerificationCode.value)
      {
         signUp();
      }
      else
      {
         $('.modalVerificationMsg').text('Incorrect Verification Code! Please Try Again.').fadeIn(100).fadeOut(5000);
      }
   }
   else
   {
      $('.modalVerificationMsg').text('Enter the verification code sent to your email address.').fadeIn(100).fadeOut(5000);
   }
});

//REGISTER NUMBER IF EMAIL VERIFICATION CODE IS CORRECT
function signUp() 
{
   let fullName = document.getElementById("inputFullname").value;
   let email = document.getElementById("inputEmail").value;
   let password = document.getElementById("inputPassword").value;
   let confirmPassword = document.getElementById('inputConfirmPassword').value;

   // KNOW IF ALL REQUIRED INPUTS ARE NOT BLANKS BEFORE SIGNING UP
   if(fullName !== "" && email !== "" && password !== "" && confirmPassword !== "")
   {
      if(isEmailValid)
      {
         if(isPasswordMatched)
         {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "../../backend/signup.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function () 
            {
               if (xhr.readyState == 4 && xhr.status == 200) 
               {
                  let response;
                  try
                  {
                     response = JSON.parse(xhr.responseText);
                  }
                  catch(e)
                  {
                     console.log('Error Occurred :' + xhr.responseText)
                     return;
                  }
            
                  if(response.status == "success")
                  {
                     let inputsElements = document.querySelectorAll('#divSignup .form-control');
                     inputsElements.forEach(function(input)
                     {
                        input.value = "";
                     });

                     document.getElementById('inputVerificationCode').value = "";
                     $('#modaVerification').modal('hide');

                     setTimeout(function()
                     {        
                        document.getElementById('modalSignupMsgTitle').innerText = response.msg;
                        document.getElementById('modalSignupMsgTitle').style.color = "Green";
                        document.getElementById('modalSignupMsgContent').innerText = "You will be redirected to Login page.";
                        $('#modalSignupMsg').modal('show');
                     }, 300);

                     setTimeout(function()
                     {        
                        $('#modalSignupMsg').modal('hide');
                     }, 2000);
                     
                     setTimeout(function()
                     {
                        window.location.href='../index.php';
                     }, 3000);
                  }
                  else
                  {
                     console.log(response.msg);
                  }
               }
            };
            let data ="fullName=" + encodeURIComponent(fullName) + "&email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password);
            xhr.send(data);
         } 
         else
         {
            // MESSAGE IF PASS NOT MATCHED
            document.getElementById('modalSignupMsgTitle').innerText = "Password did not Matched!";
            document.getElementById('modalSignupMsgTitle').style.color = "red";
            document.getElementById('modalSignupMsgContent').innerText = "Check your Password and make sure they are matched!";
            $('#modalSignupMsg').modal('show');
         }
      }
      else
      {
            // MESSAGE IF EMAIL IS INVALID
         document.getElementById('modalSignupMsgTitle').innerText = "Invalid Email!";
         document.getElementById('modalSignupMsgTitle').style.color = "red";
         document.getElementById('modalSignupMsgContent').innerText = "Make sure you have entered a valid email!";
         $('#modalSignupMsg').modal('show');
      }
   }
   else
   {
      // IF THERE'S A BLANK INPUT
      document.getElementById('modalSignupMsgTitle').innerText = "Fill in the blanks!";
      document.getElementById('modalSignupMsgTitle').style.color = "red";
      document.getElementById('modalSignupMsgContent').innerText = "Make sure you filled out all required fields!";
      $('#modalSignupMsg').modal('show');
   }
}

//HANDLE ENTER KEY
document.getElementById('inputVerificationCode').addEventListener('keydown', function(e)
{
   if(e.key == 'Enter')
   {
      document.getElementById('btnVerifySignup').click();
      document.getElementById('inputVerificationCode').focus();
   }
});

//DETECT IF ENTER KEY IS PRESSED AND CHANGE THE FOCUS TO NEXT INPUT
document.getElementById('inputFullname').addEventListener('keydown', function(e)
{
   if(e.key === 'Enter')
   {
      document.getElementById('inputEmail').focus();
   }
});

//email input
document.getElementById('inputEmail').addEventListener('keydown', function(e)
{
   if(e.key === 'Enter')
   {
      document.getElementById('inputPassword').focus();
   }
});

//input 1st pass
document.getElementById('inputPassword').addEventListener('keydown', function(e)
{ 
   if(e.key === 'Enter')
   {
      document.getElementById('inputConfirmPassword').focus();
   }
});

//input 2nd pass
document.getElementById('inputConfirmPassword').addEventListener('keydown', function(e)
{
   if(e.key === 'Enter')
   {
      document.getElementById('btnSignup').focus();
   }
});
