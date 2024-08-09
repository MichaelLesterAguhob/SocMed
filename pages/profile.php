
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

            <div id="profile" class="col-lg-4">
                <img id="profilePicture" src="../assets/image/default_image.jpg" alt="Your Profile">
                <h2 id="userName" class="pt-4 pb-4">Your Name here</h2>

                <div id="socialsCont" class="mb-3">
                    <h6 class="text-muted">Social/Contact</h6>
                    <ul>
                        <li><a href="">Facebook</a></li>
                        <li><a href="">Instagram</a></li>
                        <li><a href="">Gmail</a></li>
                    </ul>
                </div>

                <div id="bioCont" class="mb-3">
                    <h6 class="text-muted">Bio</h6>
                    <p class="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam voluptatem in error corrupti quaerat, voluptates laudantium sed impedit iste mollitia ad soluta nobis expedita eligendi esse cumque optio sit explicabo!</p>
                </div>

                <button class="btn btn-warning">Edit Profile</button>
                <button class="btn btn-primary">Create Post</button>
            </div>


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
    <script src="../assets/js/home.js"></script>
</body>

</html>