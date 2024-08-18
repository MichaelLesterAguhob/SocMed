<?php 
include_once('../../includes/connection.php');
include_once('../../backend/session.php');

try
{
    $userID = $_SESSION['user_id'];

    $query = "SELECT user_accounts.*, user_profile.* 
            FROM user_accounts 
            LEFT JOIN user_profile 
            ON user_accounts.user_id = user_profile.user_id
            WHERE user_accounts.user_id = ? AND user_profile.in_use = 'yes' ";
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $userID);
    $stmt->execute();
    
    $result = $stmt->get_result()->fetch_array();
    if($result)
    {
        echo json_encode([
                            'status'=>'success', 
                            'name'=>$result['user_name'], 
                            'email'=>$result['user_email'],
                            'userPicture'=>$result['file_path']
                        ]);
    }

    $stmt->close();
    $con->close();
}
catch(Exception $ex)
{
    die('Exception Occurred: ' . htmlspecialchars($ex));
}


?>