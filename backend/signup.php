<?php 
require_once('../includes/connection.php');

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $fullname = trim($_POST['fullname']);
    $email = trim($_POST['email']);
    $plain_password = trim($_POST['password']);
    $hashed_password = password_hash($plain_password, PASSWORD_DEFAULT);
    try
    {
        $query_txt = "INSERT INTO user_accounts VALUES('', 123, '$fullname','$email', '$hashed_password') ";
        $query = mysqli_query($con, $query_txt);
        if($query)
        {
            echo json_encode(['status'=>'success','msg'=>'Successfully Created Account!']);
        }
        else{
            echo json_encode(['status'=>'failed','msg'=>'Unknown Error Occurred.']);
        }
    }
    catch(Exception $ex){
        echo json_encode(['status'=>'failed','msg'=>' Error Occurred.' . $ex ]);
    }

}

?>