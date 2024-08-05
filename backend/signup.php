<?php 
require_once('../includes/connection.php');
require_once('../backend/welcome_mail_message.php');

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $fullName = trim($_POST['fullName']);
    $email = trim($_POST['email']);
    $plainPassword = trim($_POST['password']);
    $hashedPassword = password_hash($plainPassword, PASSWORD_DEFAULT);

    $UniqueUserId = generateUniqueUserID($con);
    try
    {
        $queryCommandTxt = "INSERT INTO user_accounts (user_id, user_name, user_email, user_password) VALUES(?, ?, ?, ?) ";
        $stmt = $con->prepare($queryCommandTxt);        
       
        if($stmt == false)
        {
            die("Prepare Failed: " . htmlspecialchars($con->error));
        }

        $stmt->bind_param("ssss", $UniqueUserId, $fullName, $email, $hashedPassword);

        if($stmt->execute())
        {
            echo json_encode(['status'=>'success','msg'=>'Successfully Created Account!']);
            sendGreetings($email, $fullName);
        }
        else
        {
            echo json_encode(['status'=>'failed','msg'=>'Unknown Error Occurred.']);
        }

        $con->close();
        $stmt->close();
    }
    catch(Exception $ex)
    {
        echo 'Error Occurred' . $ex;
        exit;
    }
}

// generates unique user id
function generateUniqueUserID($con)
{
    try
    {
        $isUserIdUnique = false;

        while(!$isUserIdUnique)
        {
            $UniqueUserId = uniqid('user_') . date('Y');
            $stmt2 = $con->prepare("SELECT user_id FROM user_accounts WHERE user_id=? ");
            $stmt2->bind_param('s', $UniqueUserId);
            if($stmt2 == false)
            {
                die("Prepare failed : " . htmlspecialchars($con->error)); 
            }
            $stmt2->execute();
            $result = $stmt2->get_result()->fetch_array();
            if(!$result)
            {
                $isUserIdUnique = true;
                return $UniqueUserId;
            }
        }
    }   
    catch(Exception $ex)
    {
        echo 'Error Occurred' . $ex;
        exit;
    }
}

?>