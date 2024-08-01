<?php
require_once('../includes/connection.php');

try
{
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    //GET USER ACCOUNT USING ITS EMAIL
    $commandText = "SELECT * FROM `user_accounts` WHERE user_email = ? ";
    $stmt = $con->prepare($commandText);

    // CHECK IF PREPARATION IS FAILED
    if($stmt === false)
    {
        die("Prepare Failed: " . htmlspecialchars($con->error));
    }

    $stmt->bind_param('s', $email);
    $stmt->execute();

    $result = $stmt->get_result()->fetch_array();

    if($result)
    {
        echo $result['user_email'] . "-" . $result['user_password'];
    }
    else
    {
        echo json_encode(['status'=>'failed', 'msg'=>'Noaccount found!']);
    }

    $stmt->close();
    $con->close();
}
catch(Exception $ex)
{
    echo "error";
    $stmt->close();
    $con->close();
}






?>