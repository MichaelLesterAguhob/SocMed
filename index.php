<!DOCTYPE html>
<html lang="en"> 
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SocMed</title>
        <link rel="stylesheet" href="../assets/css/bootstrap-5.3.3-dist/css/bootstrap.min.css">
    </head>
    <body class="bg-light">

        <!-- <?php include_once("includes/header.php")?> -->
        <!-- <a href="pages/home.php">Home</a><br> -->
        <!-- <a href="includes/footer.php">Footer</a> -->

        <div class="container-fluid">
            <div class="row mt-5">
                <!-- LOGO -->
                    <div class="col-12 col-lg-6 mb-5">
                        <div class="m-auto align-items-center" style="height: 70%; width: 80%;">
                            <img src="assets/image/logo.png" alt="SocMed Logo" class="img-fluid mt-5">
                        </div>
                    </div>
                    
                <!-- LOGIN -->
                    <div id="LoginForm" class="col-12 col-lg-6 text-center">
                        <div class="m-auto border" style="width: 90%; padding-bottom: 100px;"">
                              <h1 class="text-primary mt-5">Login</h1>
                            <div class="form-floating m-auto mt-5 mb-3" style="width: 80%;">
                                <input type="email" id="InputEmail" class="form-control" placeholder="yourEmail@gmail.com">
                                <label for="InputEmail">Email Address</label>
                            </div>
                            <div class="form-floating m-auto mb-3" style="width: 80%;">
                                <input type="password" id="InputPass" class="form-control" placeholder="Enter Password">
                                <label for="InputPass">Password</label>

                                <div class="d-flex justify-content-between align-items-center">
                                    <button class="btn " style="font-size: small;">Show password</button>
                                    <a href="#" style="font-size: small;">Forgot password?</a>
                                </div>
                            </div>
                            <div class="d-grid gap-2 mt-5 d-inline-flex text-center" style="width: 80%;">
                                <button id="BtnLogin" class="btn btn-primary btn-md m-auto" style="width: 50%;">Login</button>
                                <button id="BtnGoSignup" class="btn btn-warning btn-md m-auto" style="width: 50%;" onclick="goToSignUp()">Signup →</button>
                            
                            </div>
                        </div>
                    </div>

                    <!-- SIGNUP -->
                    <div id="SignupForm" class="col-12 col-lg-6 text-center" style="display: none;">
                        <div class="m-auto border" style="width: 90%; padding-bottom: 100px;">
                              <h1 class="text-primary mt-5">Signup</h1>
                            <div class="form-floating m-auto mt-5 mb-3" style="width: 80%;">
                                <input type="email" id="InputCreateEmail" class="form-control" placeholder="yourEmail@gmail.com">
                                <label for="InputCreateEmail">Enter Email</label>
                            </div>
                            <div class="form-floating m-auto mb-3" style="width: 80%;">
                                <input type="password" id="InputCreatePass" class="inputPass form-control" placeholder="Create Password">
                                <label for="InputCreatePass">Create Password</label>                        
                            </div>
                            <div class="form-floating m-auto mb-3" style="width: 80%;">
                                <input type="password" id="InputComfirmPass" class="inputPass form-control" placeholder="Confirm Password">
                                <label for="InputComfirmPass">Confirm Password</label>

                                <div class="d-flex justify-content-between align-items-center">
                                    <button class="btn " style="font-size: small;" onclick="showHideSignupPass()">Show password</button>
                                </div>
                            </div>
                            <div class="d-grid gap-2 mt-5 d-inline-flex text-center" style="width: 80%;">
                                <button id="BtnSignup" class="btn btn-warning btn-md m-auto" style="width: 50%;" onclick="">Signup</button>
                                <button id="BtnGoLogin" class="btn btn-primary btn-md m-auto" style="width: 50%;" onclick="goToLogIn()">← Login</button>
                  
                            </div>
                        </div>
                    </div>
            </div>

        </div>





        <?php include_once("includes/footer.php") ?>
        <!-- JS -->
        <script src="../assets/css/bootstrap-5.3.3-dist/js/bootstrap.min.js"> </script>
        <script src="assets/js/index.js"></script>
    </body>
</html>