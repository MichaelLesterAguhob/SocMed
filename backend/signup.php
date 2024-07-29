<?php 
require_once('../includes/connection.php');

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $pass = $_POST['password'];
    $hashed_pass ;
    try
    {
        $query_txt = "INSERT INTO user_accounts VALUES('', 123, '$fullname', '$pass') ";
        $query = mysqli_query($con, $query_txt);
        if($query){
            echo "Successfully Created Account!";
        }else{
            echo "Unsucessful";
        }
    }
    catch(Exception $ex)
    {
        echo "Error Occurred" . $ex;
    }

}

?>