<?php 
session_start();

if(!$_SESSION['loggedin'])
    {
        header("location: ../index.php");
        exit();
    }




?>