
<?php include_once('../backend/session.php');?>

<!DOCTYPE html>
<html lang="en"> 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../assets/image/fav.ico">
    <title>SocMed</title>
    <!-- <link rel="stylesheet" href="../assets/css/index.css"> -->
    <link rel="stylesheet" href="../assets/bootstrap/bootstrap-5.3.3-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/header.css">
    <link rel="stylesheet" href="../assets/css/profile.css">
    <link rel="stylesheet" href="../assets/css/footer.css">
</head>
<body>

    <div class="main-container container-fluid">
        <!-- HEADER/ NAVIGATION BAR -->
       <?php include("../includes/header.php") ?>
       
        <!-- PROFILE -->
        <div id="profileContainer" class="row">

            <div id="profileColumn" class="col-lg-4">

                <!-- PROFILE PICTURE CONTAINER -->
                <div id="profilePicCont">
                    <!-- Profile Picture -->
                    <img id="profilePicture" src="../assets/image/default_image.jpg" alt="Your Profile">

                    <!-- Upload and edit Button -->
                     <div class="uploadEditPictureCont">
                         <button id="btnUploadProfilePic"></button>
                         <button id="btnEditProfilePic"></button>

                         <!-- save and cancel uploaded profile-->
                         <button class="btn btn-sm btn-success btnSaveDiscard" id="btnSaveDp" onclick="saveUploadedFile()">Save</button>
                         <button class="btn btn-sm btn-warning btnSaveDiscard" id="btnDiscardDp">Discard</button>
                    </div>
                </div>

                <!-- IMAGE FILE INPUT -->
                <input id="profilePictureInput" type="file" accept=".jpeg, .jpg">
                <!-- User name -->
                <h2 id="userName" class="pt-4 pb-4">Your Name here</h2>

                <!-- USER BIO -->
                <div id="bioCont">
                    <h6 class="text-primary bio-title">Bio</h6>
                    <p id="bioContent" class="text-muted">I am Web Developer</p>
                </div>

                <!-- PROFILE EDIT PROFILE AND CREATE POST CONTAINER -->
                <div id="btnCont">
                    <button class="btn btn-warning">Edit Profile</button>
                    <button class="btn btn-primary">Create Post</button>
                </div>
            </div>

            <!-- POST IN PROFILE PAGE -->
            <div id="profilePost" class="col-lg-8 pt-3">
                <h2>Post</h2>
                <div class="post mt-3" style="height: 300px; width: 100%; background-color: lightgray;">
                   <h4>Your Post</h4>
                </div>
                <div class="post mt-3" style="height: 300px; width: 100%; background-color: lightgray;">
                   <h4>Your Post</h4>
                </div>
                <div class="post mt-3" style="height: 300px; width: 100%; background-color: lightgray;">
                   <h4>Your Post</h4>
                </div>
            </div>

        </div>

    </div>

     <!-- FOOTER -->
    <?php include('../includes/footer.php'); ?>

    <!-- JAVASCRIPT -->
    <script src="../assets/bootstrap/bootstrap-5.3.3-dist/js/bootstrap.min.js"></script>
    <script src="../assets/js/header.js"></script>
    <script src="../assets/js/profile.js"></script>
</body>
</html>