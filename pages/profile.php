
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
        <div id="profileTab" class="container-fluid pt-2 pb-2 hidden-tab tabs">
            <!-- <h1>profile tab</h1> -->
            <div id="profileContainer" class="row">
                <div id="profile" class="col-lg-4 border">
                    <img id="profilePicture" src="../assets/image/logo.png" alt="Your Profile">

                </div>
                <div id="profilePost" class="col-lg-8 border">9asdasdsadasdsa</div>
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