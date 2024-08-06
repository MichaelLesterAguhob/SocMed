
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
    <link rel="stylesheet" href="../assets/css/home.css">
    <link rel="stylesheet" href="../assets/css/footer.css">
</head>
<body>

    <div class="main-container container-fluid">
 
        <!-- HEADER/ NAVIGATION BAR -->
       <?php include("../includes/header.php") ?>
        
        <!-- FEED | HOME-->
        <div id="feedTab" class="pt-4 pb-4 tabs">
            <div class="feed"><h1>feed1</h1></div>
            <div class="feed"><h1>feed2</h1></div>
            <div class="feed"><h1>feed3</h1></div>
            <div class="feed"><h1>feed4</h1></div>
        </div>

        <!-- FRIENDS -->
        <div id="friendsTab" class="pt-4 pb-4 hidden-tab tabs">
            <h1>Friends tab</h1>
        </div>
       
        <!-- MESSAGES -->
        <div id="messagesTab" class="pt-4 pb-4 hidden-tab tabs">
            <h1>message tab</h1>
        </div>
       
        <!-- PROFILE -->
        <div id="profileTab" class="pt-4 pb-4 hidden-tab tabs">
            <h1>profile tab</h1>
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