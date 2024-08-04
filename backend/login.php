<?php
require_once('../includes/connection.php');
try
{
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    //GET USER ACCOUNT USING ITS EMAIL
    $query = "SELECT * FROM `user_accounts` WHERE user_email = ? ";
    $stmt = $con->prepare($query);

    // CHECK IF PREPARATION IS FAILED
    if($stmt === false)
    {
        die("Prepare Failed: " . htmlspecialchars($con->error));
    }
    // binding parameter
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_array();

    if($result)
    {
        $isPassCorrect = password_verify($password, $result['user_password']);
        if($isPassCorrect)
        {
            echo json_encode(['status'=>'success', 'msg'=>'Login Successfully']);
        }
        else
        {
            echo json_encode(['status'=>'failed', 'msg'=>"Account doesn't exist!"]);
        }
    }
    else
    {
        echo json_encode(['status'=>'failed', 'msg'=>'Account does not exist!']);
    }

    $stmt->close();
    $con->close();
}
catch(Exception $ex)
{
    $stmt->close();
    $con->close();
    die ('Login Error | ' . $ex);
}






?>