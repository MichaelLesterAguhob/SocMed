<?php 
$server = "";
$username = "";
$password = "";
$database = "";

try{
    $con = mysqli_connect($server, $username, $password, $database);

}catch(Exception $ex){
    echo "Connection Error";
    exit;
}



?>