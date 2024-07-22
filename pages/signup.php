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
                        <label for="input_signupEmail">Enter Email</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" id="input_signupPass" class="form-control input-pass" placeholder="Enter Password">
                        <label for="input_signupPass">Create Password</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" id="input_confirmSignupPass" class="form-control input-pass" placeholder="Confirm Password">
                        <label for="input_confirmSignupPass">Confirm Password</label>
                    </div>

                    <div id="div_btn">
                        <button id="btn_signup" class="btn btn-success">SignUp</button>
                        <a href="../index.php">
                            <button id="btn_login" class="btn btn-primary">Login-></button>
                        </a>
                    </div>
                </div>


            </div>

        </div>
    </div>

    <!-- FOOTER -->
    <?php include('../includes/footer.php'); ?>
    <!-- JAVASCRIPT -->
    <script src="../assets/bootstrap/bootstrap-5.3.3-dist/js/bootstrap.min.js"></script>
    <script src="../assets/js/signup.js"></script>
</body>

</html>