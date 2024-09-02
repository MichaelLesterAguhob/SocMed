<?php 
try {
    include_once('../includes/connection.php');
    session_start();
    $userID = $_SESSION['user_id'];
    $reactionToRemovePostId = $_POST['reactionToRemove'];

    $checkQuery = "SELECT * FROM user_reacted_to_post WHERE post_id=? AND user_id = ?";
    $checkStmt = $con->prepare($checkQuery);
    $checkStmt->bind_param('ss', $reactionToRemovePostId, $userID);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    if($result->num_rows <= 0) {
        die (json_encode(['status'=>'Not reacted yet']));
    }

    $query = "DELETE FROM user_posts_reactions WHERE post_id=? AND user_id = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param('ss', $reactionToRemovePostId, $userID);
    
    $query2 = "DELETE FROM user_reacted_to_post WHERE post_id=? AND user_id = ?";
    $stmt2 = $con->prepare($query2);
    $stmt2->bind_param('ss', $reactionToRemovePostId, $userID);

    if($stmt === false || $stmt2 === false) {
        die(json_encode(['status'=>'Failed', 'msg'=>"Problem Occured | Failed preparation of statement"]));
    }

    if(!($stmt->execute()) || !($stmt2->execute())) {
        die(json_encode(['status'=>'Failed', 'msg'=>"Problem Occured | Failed execution of statement"]));
    }
    echo json_encode(['status'=>'success']);
}catch(Exception $ex) {
    die(json_encode(['status'=>'Failed', 'msg'=>"Error Occurred: " . $ex]));
}


?>