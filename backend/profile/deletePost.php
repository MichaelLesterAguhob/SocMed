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

    $query3 = 'DELETE FROM user_posts_reactions WHERE post_id = ?';
    $stmt3 = $con->prepare($query3);
    $stmt3->bind_param('s', $postIdToDelete);

    $query4 = 'DELETE FROM user_reacted_to_post WHERE post_id = ?';
    $stmt4 = $con->prepare($query4);
    $stmt4->bind_param('s', $postIdToDelete);

    if($stmt === false || $stmt2 === false || $stmt3 === false || $stmt4 === false) {
        die(json_encode(['status'=>'failedPrep', 'msg'=>'Preparation Failed']));
    }
    if($stmt->execute() && $stmt2->execute() && $stmt3->execute() && $stmt4->execute()) {
        echo json_encode(['status'=>'success', 'msg'=>'Deleted Successfully...']);
    }

    $stmt->close();
    $stmt2->close();
    $stmt3->close();
    $stmt4->close();
    $con->close();
}catch(Exception $ex) {
    die(json_encode(['status'=>'exception', 'msg'=>'Exception Occurred: ' . $ex]));
}



?>