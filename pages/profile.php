
<?php include_once('../backend/session.php');?>

<!DOCTYPE html>
<html lang="en"> 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"> -->
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
                <!-- Profile Picture Container -->
                <div id="profilePicCont">
                    <!-- Profile Picture -->
                    <img id="profilePicture" src="../assets/image/default_image.jpg" alt="Your Profile">

                    <!-- Upload adn edit Button -->
                    <button id="btnUploadProfilePic"></button>
                    <button id="btnEditProfilePic"></button>
                </div>
                <!-- image file input -->
                <input id="profilePictureInput" type="file">
                <!-- User name -->
                <h2 id="userName" class="pt-4 pb-4">Your Name here</h2>

                <!-- USER BIO -->
                <div id="bioCont">
                    <h6 class="text-muted">Bio</h6>
                    <p id="bioContent" class="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam voluptatem in error corrupti quaerat, voluptates laudantium sed impedit iste mollitia ad soluta nobis expedita eligendi esse cumque optio sit explicabo!</p>
                </div>

                <div id="btnCont">
                    <button class="btn btn-warning">Edit Profile</button>
                    <button class="btn btn-primary">Create Post</button>
                </div>
            </div>

            <!-- POST IN PROFILE PAGE -->
            <div id="profilePost" class="col-lg-8 pt-3">
                <h2>Post</h2>
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