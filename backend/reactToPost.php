<?php
try {
    include_once('../includes/connection.php');
    session_start();
    $userID = $_SESSION['user_id'];
    $reactToPostId = $_POST['reactToPostId'];   
    $emojiReaction = $_POST['emojiReaction'];   

    // check first if user has already reacted to post if so, update the existing one, else create a new reaction
    $checkQuery = "SELECT * FROM `user_reacted_to_post` WHERE `user_id`= ? AND `post_id`= ?";
    $stmt1 = $con->prepare($checkQuery);
    $stmt1->bind_param('ss', $userID, $reactToPostId);
    if($stmt1 === false) {
        return json_encode(['status'=>'failed' ,'msg'=>'Problem Occurred ']);
    }
    $stmt1->execute();
    $result = $stmt1->get_result()->fetch_assoc();
    if(!$result) {
        // if has not yet reacted to post. Insert query will be executed
        // Save posts' reaction - get the reactions of user and save it to specific post
        $query = "INSERT INTO `user_posts_reactions`(`user_id`, `post_id`, `reactions`) VALUES(?,?,?)";
        $stmt2 = $con->prepare($query);
        $stmt2->bind_param('sss', $userID, $reactToPostId, $emojiReaction);

        // Save user reaction - get the details where user reacted and what reactions
        $query2 = "INSERT INTO `user_reacted_to_post`(`user_id`, `post_id`, `reaction`) VALUES(?,?,?)";
        $stmt3 = $con->prepare($query2);
        $stmt3->bind_param('sss', $userID, $reactToPostId, $emojiReaction);

        if($stmt2 === false || $stmt3 === false) {
            die( json_encode(['status'=>'failed' ,'msg'=>'stmt3 preparation failed']));
        }
        if($stmt2->execute() && $stmt3->execute()) {
            echo json_encode(['status'=>'success' ,'msg'=>'Reacted Successfully']);
        }else {
            echo json_encode(['status'=>'failed' ,'msg'=>'Problem Occurred']);
        }

        $stmt2->close();
        $stmt3->close();
        $con->close();
    }else {
        // if already reacted to post. update query will be executed
        $query3 = "UPDATE `user_reacted_to_post` SET reaction = ? WHERE user_id = ? AND post_id = ?";
        $stmt4 = $con->prepare($query3);
        $stmt4->bind_param('sss', $emojiReaction, $userID, $reactToPostId);

        $query4 = "UPDATE `user_posts_reactions` SET reactions = ? WHERE post_id = ? AND user_id = ?";
        $stmt5 = $con->prepare($query4);
        $stmt5->bind_param('sss', $emojiReaction, $reactToPostId, $userID);

        if($stmt4 === false || $stmt5 === false) {
            die( json_encode(['status'=>'failed' ,'msg'=>'stmt3 preparation failed']));
        }

        if($stmt4->execute() && $stmt5->execute()) {
            echo json_encode(['status'=>'success' ,'msg'=>'Reaction Updated']);
        }

        $stmt4->close();
        $stmt5->close();
        $con->close();
    }
}catch(Exception $ex) {
    die( json_encode(['status'=>'error', 'msg'=>$ex]));
}

?>


