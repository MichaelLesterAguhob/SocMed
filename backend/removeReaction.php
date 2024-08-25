<?php 
try {
    include_once('../includes/connection.php');
    session_start();
    $userID = $_SESSION['user_id'];
    $reactionToRemovePostId = $_POST['reactionToRemove'];
    $query = "DELETE FROM user_posts_reactions WHERE post_id=? AND user_id = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param('ss', $reactionToRemovePostId, $userID);
    
    $query2 = "DELETE FROM user_reacted_to_post WHERE post_id=? AND user_id = ?";
    $stmt2 = $con->prepare($query2);
    $stmt2->bind_param('ss', $reactionToRemovePostId, $userID);

    if($stmt === false || $stmt2 === false) {
        die("Problem Occured | Failed preparation of statement");
    }

    if(!($stmt->execute()) || !($stmt2->execute())) {
        die("Problem Occured | Failed execution of statement");
    }
}catch(Exception $ex) {
    die("Error Occurred: " . $ex );
}


?>