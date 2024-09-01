<?php 

try {
    include_once('../includes/connection.php');
    session_start();
    $userID = $_SESSION['user_id'];
    $commentID = generateUniqueCommentId($con);
    $commentToPostid = $_POST['commentToPostId'];
    $time = $_POST['date'];
    $date = $_POST['time'];
    $comment = $_POST['comment'];

    $query = "INSERT INTO `user_posts_comments` (`comment_id`, `post_id`, `user_id`, `comments`, `date_commented`, `time_commented`) VALUES (?,?,?,?,?,?)";
    $stmt = $con->prepare($query);
    $stmt->bind_param('ssssss', $commentID, $commentToPostid, $userID, $comment, $time, $date);
    if($stmt === false) {
        die(json_encode(['status'=>'failed', 'msg'=>'Statement preparation failed.']));
    }

    if($stmt->execute()) {
        echo json_encode(['status'=>'success']);
    }

    $stmt->close();
    $con->close();
}catch(Exception $ex) {
    die(json_encode(['status'=>'error', 'msg'=>'Error Occurred: ' . $ex]));
}

// generate unique id for user comment
function generateUniqueCommentId($con) {
    try {
        $uniqueCommentID = "";
        $isCommentIdUnique = false;
        while(!$isCommentIdUnique) {
            $uniqueCommentID = uniqid('cmtID_').date('Y');
            $query = "SELECT `comment_id` FROM `user_posts_comments` WHERE `comment_id` = ?";
            $stmt = $con->prepare($query);
            $stmt->bind_param('s', $uniqueCommentID);
            
            if($stmt === false) {
                die(json_encode(['status'=>'failed', 'msg'=>'Preparation failed.']));
            }
            $stmt->execute();
            $result = $stmt->get_result()->fetch_assoc();
            if(!$result) {
                $isCommentIdUnique = true;
                return $uniqueCommentID;
            }
        }
        $stmt->close();
        $con->close();
    }catch(Exception $ex) {
        die(json_encode(['status'=>'error', 'msg'=>'Error Occurred: ' . $ex]));
    }
}
?>