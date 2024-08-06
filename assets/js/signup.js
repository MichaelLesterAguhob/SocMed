
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
   let btnSignup = document.getElementById('btnSignup');
   btnSignup.setAttribute('disabled', 'disabled');

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
                        btnSignup.removeAttribute('disabled');
                     }, 500);
                  }
                  else if(response.status == "existing")
                  {
                     showSignupModalMsg("Already Exists!", "red", response.msg, true, 2000, "inputEmail");
                     btnSignup.removeAttribute('disabled');
                  }
                  else
                  {
                     console.log(response.msg);
                     btnSignup.removeAttribute('disabled');
                  }
               }
            }
            let data = "email=" + encodeURIComponent(email) + "&fullName=" + encodeURIComponent(fullName);
            request.send(data);
         } 
         else
         {
            // MESSAGE IF PASS NOT MATCHED
            showSignupModalMsg("Password did not Matched!", "red", "Check your Password and make sure they are matched!", true, 2000, "inputConfirmPassword");
            btnSignup.removeAttribute('disabled');
         }
      }
      else
      {
         // MESSAGE IF EMAIL IS INVALID
         showSignupModalMsg("Invalid Email!", "red", "Make sure you have entered a valid email!", true, 2000, "inputEmail");
         btnSignup.removeAttribute('disabled');
      }
   }
   else
   {
      // IF THERE'S A BLANK INPUT
      showSignupModalMsg("Fill in the blank(s)", "red", "Make sure you filled out all required fields!", true, 2000, "inputFullname");
      btnSignup.removeAttribute('disabled');
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
function verifyAndSignup()
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
         $('.modalVerificationMsg').text('Incorrect Verification Code! Please Try Again.').fadeIn(100).fadeOut(3000);
      }
   }
   else
   {
      $('.modalVerificationMsg').text('Enter the verification code sent to your email address.').fadeIn(100).fadeOut(5000);
   }
}

//REGISTER NUMBER IF EMAIL VERIFICATION CODE IS CORRECT
function signUp() 
{
   let fullName = document.getElementById("inputFullname").value;
   let email = document.getElementById("inputEmail").value;
   let password = document.getElementById("inputPassword").value;
   // let confirmPassword = document.getElementById('inputConfirmPassword').value;

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
   
         //IF SIGNUP SUCCESSFULLY
         if(response.status == "success")
         {
            clearInputs();
            document.getElementById('inputVerificationCode').value = "";
            $('#modaVerification').modal('hide');

            // Message after successful signup
            showSignupModalMsg(response.msg, "green", "You will be redirected to Login page.", true, 300, "none");
            
            setTimeout(function()
            {
               window.location.href='../index.php';
            }, 2000);
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

// SIGNUP MODAL MESSAGE DIALOG
function showSignupModalMsg(msgTitle, msgTitleColor, msgContent, showFooter, msgDuration, focusTo)
   {
      document.getElementById('modalSignupMsgTitle').innerText = msgTitle;
      document.getElementById('modalSignupMsgTitle').style.color = msgTitleColor;
      document.getElementById('modalSignupMsgContent').innerText = msgContent;

      if(!showFooter)
         {
            document.getElementById('signupModalFooter').style.display = "none";
         }
      else
         {
            document.getElementById('signupModalFooter').style.display = "flex";
         }

      $('#modalSignupMsg').modal('show');
      setTimeout(function()
         {
            $('#modalSignupMsg').modal('hide');
            if(focusTo != "none")
            {
               document.getElementById(focusTo).focus();
            }
         }, msgDuration);
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
      document.getElementById('btnSignup').click();
   }
});

function clearInputs()
   {
      let inputFields = document.querySelectorAll('.form-control');
      inputFields.forEach(function(input)
         {
            input.value = "";
         });
   }