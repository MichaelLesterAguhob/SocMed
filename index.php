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
                <div id="div_logo" class="col-md-6">
                    <img src="assets/image/logo.png" alt="SocMed Logo" class="img-fluid">
                </div>

                <!-- LOGIN COLUMN -->
                <div id="div_login" class="col-md-6">
                    <h1 class="text-center">Login</h1>
                    <div class="form-floating">
                        <input type="email" id="input_email" class="form-control" placeholder="myEmail@gmail.com">
                        <label for="input_email">Email</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" id="input_pass" class="form-control" placeholder="Enter Password">
                        <label for="input_pass">Password</label>

                        <button id="btn_show_hide" class="btn btn-sm">
                            <img id="eye_icon" src="assets/bootstrap/icon/bootstrap-icons-1.11.3/eye.svg" alt="Show Password">
                        </button>
                        <span id="popover" class="text-muted">Show Password</span>
                    </div>

                    <div id="div_btn">
                        <button id="btn_login" class="btn btn-primary" onclick="login()">Login</button>
                        <a href="pages/signup.php">
                            <button id="btn_signup" class="btn btn-warning">SignUp-></button>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- FOOTER -->
    <?php include("includes/footer.php");?>



    <!-- JAVASCRIPT -->
    <script src="assets/bootstrap/bootstrap-5.3.3-dist/js/bootstrap.min.js"></script>
    <script src="assets/js/index.js"></script>
</body>

</html>