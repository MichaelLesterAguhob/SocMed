<?php 

try {
    include_once('../includes/connection.php');
    session_start();
    $userID = $_SESSION['user_id'];
    $commentToPostid = $_POST['commentToPostId'];
    $time = $_POST['date'];
    $date = $_POST['time'];
    $comment = $_POST['comment'];

    $query = "INSERT INTO `user_posts_comments` (`post_id`, `user_id`, `comments`, `date_commented`, `time_commented`) VALUES (?,?,?,?,?)";
    $stmt = $con->prepare($query);
    $stmt->bind_param('sssss', $userID, $commentToPostid, $comment, $date, $time);
    if($stmt === false) {
        die(json_encode(['status'=>'failed', 'msg'=>'Statement preparation failed.']));
    }

    if($stmt->execute()) {
        echo json_encode(['status'=>'success']);
    }

    $stmt->close();
    $con->close();
}catch(Exception $ex) {
    die(json_encode(['status'=>'error', 'msg'=>'Error Occurred: \n']));
}
?>