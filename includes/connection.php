<?php 
$server = "localhost";
$username = "root";
$password = "";
$database = "socmed";

try{
    $con = mysqli_connect($server, $username, $password, $database);
 
}catch(Exception $ex){
    echo 'Connection Error Occurred' . $ex;
    exit;
}
?>