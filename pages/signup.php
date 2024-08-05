
<?php 
   session_start();
   if(isset($_SESSION['loggedin']))
    {
        if($_SESSION['loggedin'] == true)
            {
                header("location: home.php");
                exit();
            }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../assets/image/fav.ico">
    <title>SignUp | SocMed</title>
    <!-- BOOTSTRAP -->
    <link rel="stylesheet" href="../assets/bootstrap/bootstrap-5.3.3-dist/css/bootstrap.min.css">
    <!-- CSS -->
    <link rel="stylesheet" href="../assets/css/signup.css">
    <link rel="stylesheet" href="../assets/css/footer.css">
</head>
<body>

    <div class="main-container container-fluid">

        <div class="container">
            <div class="row"> 

                <!-- LOGO COLUMN -->
                <div id="divLogo" class="col-md-6">
                    <img src="../assets/image/logo.png" alt="SocMed Logo" class="img-fluid">
                </div>

                <!-- SIGNUP COLUMN -->
                <div id="divSignup" class="col-md-6">
                    <h1 class="text-center">SignUp</h1>
                    <div class="form-floating">
                        <input type="text" id="inputFullname" class="form-control" placeholder="your name">
                        <label for="inputFullname">Enter Fullname</label>
                    </div>
                    <div class="form-floating">
                        <input type="email" id="inputEmail" class="form-control" placeholder="myEmail@gmail.com">
                        <label id="emailLabel" for="inputEmail">Enter Email</label>
                        <span id="emailWarningMsg" class="text-danger">Invalid Email</span>
                    </div>
                    <div class="form-floating">
                        <input type="password" id="inputPassword" class="form-control input-pass" placeholder="Enter Password" onchange="isPassMatched()">
                        <label class="input-pass-label" for="inputPassword">Create Password</label>
                        <span class="input-pass-msg text-danger"></span>
                    </div>
                    <div class="form-floating">
                        <input type="password" id="inputConfirmPassword" class="form-control input-pass" placeholder="Confirm Password" onchange="isPassMatched()">
                        <label class="input-pass-label" for="inputConfirmPassword">Confirm Password</label>
                        <span class="input-pass-msg text-danger"></span>

                        <button id="btnShowHide" class="btn btn-sm" onmouseenter="showPassToolTip()" onmouseleave="hidePassToolTip()" onclick="show_hide_pass()">
                            <img id="eyeIcon" src="../assets/bootstrap/icon/bootstrap-icons-1.11.3/eye.svg" alt="Show Password">
                        </button>
                        <span id="showHideToolTip" class="text-muted">Show Password</span>
                    </div>

                    <div id="divBtnContainer">
                        <button id="btnSignup" class="btn btn-primary" onclick="verifyEmail()">SignUp</button>
                        <a href="../index.php">
                            <button id="btnGoToLogin" class="btn btn-warning">Login-></button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- This modal is input field for user's verification code -->
    <div id="modaVerification" class="modal fade" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title fs-5">Enter Verification Code</h3>
                    <button class="btn-close" aria-label="Close" data-bs-dismiss="modal" data-bs-target="#modaVerification"></button>
                  
                </div>
                <div class="modal-body">
                    <h5>Sent to:&nbsp;<span class="receiver-email"></span></h5>   
                    
                    <input type="number" id="inputVerificationCode" class="form-control"><br>
                    <span class="modalVerificationMsg text-danger mt-3"></span>
                </div>
                <div class="modal-footer" style="border: none;">
                    <button id="btnVerifySignup" class="btn btn-success" onclick="verifyAndSignup()">Verify</button>
                    <button id="btnResendCode" class="btn btn-warning" disabled>Resend&nbsp;<span id="resendCountdown"></span></button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for signup message -->
    <div id="modalSignupMsg" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modalSignupMsgTitle" class="modal-title"></h3>
                    <button class="btn-close" aria-label="Close" data-bs-dismiss="modal" data-bs-target="#modalSignupMsg"></button>
                </div>
                <div class="modal-body">
                    <h4 id="modalSignupMsgContent" class="text-"></h4>
                </div> 
                <div id="signupModalFooter" class="modal-footer">
                    <button class="btn btn-warning" data-bs-dismiss="modal" data-bs-target="#modalSignupMsg">Okay</button>    
                </div>
            </div>
        </div>
    </div>

    <!-- FOOTER -->
    <?php include('../includes/footer.php'); ?>
    <!-- JAVASCRIPT -->
    <script src="../assets/bootstrap/bootstrap-5.3.3-dist/js/bootstrap.min.js"></script>
    
    <script src="../assets/bootstrap/bootstrap-5.3.3-dist/js/jquery-3.7.1.js"></script>

    <script src="../assets/js/signup.js"></script>
</body>

</html>