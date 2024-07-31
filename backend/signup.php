<?php 
require_once('../includes/connection.php');
require_once('../backend/welcome_mail_message.php');
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $fullName = trim($_POST['fullName']);
    $email = trim($_POST['email']);
    $plainPassword = trim($_POST['password']);
    $hashedPassword = password_hash($plainPassword, PASSWORD_DEFAULT);
    try
    {
        $queryCommandTxt = "INSERT INTO user_accounts VALUES('', 123, '$fullName','$email', '$hashedPassword') ";
        $query = mysqli_query($con, $queryCommandTxt);
        if($query)
        {
            echo json_encode(['status'=>'success','msg'=>'Successfully Created Account!']);
            sendGreetings($email, $fullName);
        }
        else
        {
            echo json_encode(['status'=>'failed','msg'=>'Unknown Error Occurred.']);
        }
    }
    catch(Exception $ex)
    {
        echo 'Error Occurred' . $ex;
        exit;
    }
}

?>