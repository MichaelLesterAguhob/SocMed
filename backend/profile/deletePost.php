<?php 
try {
    include_once('../../includes/connection.php');
    $postIdToDelete = $_POST['postIdToDelete'];

    $query = 'DELETE FROM user_posts WHERE post_id = ?';
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $postIdToDelete);

    $query2 = 'DELETE FROM user_posts_content WHERE post_id = ?';
    $stmt2 = $con->prepare($query2);
    $stmt2->bind_param('s', $postIdToDelete);

    if($stmt === false || $stmt2 === false) {
        die(json_encode(['status'=>'failedPrep', 'msg'=>'Preparation Failed']));
    }
    if($stmt->execute() && $stmt2->execute()) {
        echo json_encode(['status'=>'success', 'msg'=>'Deleted Successfully...']);
    }

    $stmt->close();
    $stmt2->close();
    $con->close();
}catch(Exception $ex) {
    die(json_encode(['status'=>'exception', 'msg'=>'Exception Occurred: ' . $ex]));
}



?>