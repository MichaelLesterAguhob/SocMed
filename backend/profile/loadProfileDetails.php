<?php 
include_once('../../includes/connection.php');
session_start();
try
{
    $userID = $_SESSION['user_id'];

    $query = "SELECT * FROM user_accounts WHERE user_id = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $userID);
    $stmt->execute();
    
    $result = $stmt->get_result()->fetch_array();
    if($result)
    {
        echo json_encode([
                            'status'=>'success', 
                            'name'=>$result['user_name'], 
                            'email'=>$result['user_email']
                        ]);
    }
    else
    {
       echo "Unknown Problem Occurred.";
       return;
    }

    $stmt->close();
    $con->close();
}
catch(Exception $ex)
{
    die('Exception Occurred: ' . htmlspecialchars($ex));
}


?>