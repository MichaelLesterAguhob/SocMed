<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="assets/image/fav.ico">
    <title>Login|SocMed</title>

    <!-- BOOTSTRAP --> 
    <link rel="stylesheet" href="assets/bootstrap/bootstrap-5.3.3-dist/css/bootstrap.min.css">
    <!-- CSS -->
    <link rel="stylesheet" href="assets/css/index.css">
    <link rel="stylesheet" href="../assets/css/footer.css">
</head>
<body> 

    <div class="main-container container-fluid">

        <div class="container">
            <div class="row">

                <!-- LOGO COLUMN -->
                <div id="divLogo" class="col-md-6">
                    <img src="assets/image/logo.png" alt="SocMed Logo" class="img-fluid">
                </div>

                <!-- LOGIN COLUMN -->
                <div id="divLogin" class="col-md-6">
                    <h1 class="text-center">Login</h1>
                    <div class="form-floating">
                        <input type="email" id="inputEmail" class="form-control" placeholder="myEmail@gmail.com" onchange="validateEmail()">
                        <label class="email-label" for="inputEmail">Email</label>
                        <span class="email-msg text-danger" style="display: none;">Invalid Email</span>
                    </div>
                    <div class="form-floating">
                        <input type="password" id="inputPassword" class="form-control" placeholder="Enter Password">
                        <label for="inputPassword">Password</label>

                        <button id="btnShowHide" class="btn btn-sm">
                            <img id="eyeIcon" src="assets/bootstrap/icon/bootstrap-icons-1.11.3/eye.svg" alt="Show Password">
                        </button>
                        <span id="popover" class="text-muted">Show Password</span>
                    </div>

                    <div id="divBtn">
                        <button id="btnLogin" class="btn btn-primary" onclick="login()">Login</button>
                        <a href="pages/signup.php">
                            <button id="btnSignup" class="btn btn-warning">SignUp-></button>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div id="loginMsg" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="loginMsgTitle" class="modal-title">Title</h3>
                    <button class="btn-close" aria-label="Close" data-bs-dismiss="modal" data-bs-target="#loginModal"></button>
                </div>
                <div class="modal-body">
                    <h5 id="loginMsgContent">Message</h5>
                </div>
                <div id="loginMsgFooter" class="modal-footer">
                    <button class="btn btn-warning" data-bs-dismiss="modal" data-bs-target="#loginMsg">Close</button>
                </div>
            </div>
        </div>
    </div>

    
    <!-- FOOTER -->
    <?php include("includes/footer.php");?>

    <!-- JAVASCRIPT -->
    <script src="assets/bootstrap/bootstrap-5.3.3-dist/js/bootstrap.min.js"></script>
    <script src="assets/bootstrap/bootstrap-5.3.3-dist/js/jquery-3.7.1.js"></script>
 
    <script src="assets/js/index.js"></script>
</body>

</html>