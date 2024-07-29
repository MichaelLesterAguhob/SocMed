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
                <div id="div_logo" class="col-md-6">
                    <img src="../assets/image/logo.png" alt="SocMed Logo" class="img-fluid">
                </div>

                <!-- SIGNUP COLUMN -->
                <div id="div_signup" class="col-md-6">
                    <h1 class="text-center">SignUp</h1>
                    <div class="form-floating">
                        <input type="text" id="input_fullName" class="form-control" placeholder="your name">
                        <label for="input_fullName">Enter Fullname</label>
                    </div>
                    <div class="form-floating">
                        <input type="email" id="input_signupEmail" class="form-control" placeholder="myEmail@gmail.com">
                        <label id="email-label" for="input_signupEmail">Enter Email</label>
                        <span id="email-warning" class="text-danger">Invalid Email</span>
                    </div>
                    <div class="form-floating">
                        <input type="password" id="input_signupPass" class="form-control input-pass" placeholder="Enter Password" onchange="isPassMatched()">
                        <label class="input-pass-label" for="input_signupPass">Create Password</label>
                        <span class="input-pass-msg text-danger"></span>
                    </div>
                    <div class="form-floating">
                        <input type="password" id="input_confirmSignupPass" class="form-control input-pass" placeholder="Confirm Password" onchange="isPassMatched()">
                        <label class="input-pass-label" for="input_confirmSignupPass">Confirm Password</label>
                        <span class="input-pass-msg text-danger"></span>

                        <button id="btn_show_hide" class="btn btn-sm" onmouseenter="showPassToolTip()" onmouseleave="hidePassToolTip()" onclick="show_hide_pass()">
                            <img id="eye_icon" src="../assets/bootstrap/icon/bootstrap-icons-1.11.3/eye.svg" alt="Show Password">
                        </button>
                        <span id="popover" class="text-muted">Show Password</span>
                    </div>

                    <div id="div_btn">
                        <button id="btn_signup" class="btn btn-success" onclick="verifyEmail()">SignUp</button>
                        <a href="../index.php">
                            <button id="btn_login" class="btn btn-primary">Login-></button>
                        </a>
                    </div>
                </div>


            </div>

        </div>
    </div>

    <div id="modal_verification" class="modal fade" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title fs-5">Enter Verification Code:</h3>
                    <button class="btn-close" aria-label="Close" data-bs-dismiss="modal" data-bs-target="#modal_verification"></button>
                  
                </div>
                <div class="modal-body">
                    <h6>Sent to:&nbsp;<span class="receiver-email text-primary"></span></h6>   
                    
                    <input type="number" id="inpt_vcode" class="form-control">
                </div>
                <div class="modal-footer" style="border: none;">
                    <button class="btn btn-success">Verify</button>
                </div>
            </div>
        </div>
    </div>

    <div id="modal_signup_msg" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modal_siginup_title" class="modal-title"></h3>
                    <button class="btn-close" aria-label="Close" data-bs-dismiss="modal" data-bs-target="#modal_signup_msg"></button>
                </div>
                <div class="modal-body">
                    <h4 id="signup_msg" class="text-"></h4>
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