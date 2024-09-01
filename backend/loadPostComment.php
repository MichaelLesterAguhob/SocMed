<?php 
try {
    include_once('../includes/connection.php');
    session_start();
    $user_id = $_SESSION['user_id'];
    $postID = $_POST['postID'];

    $query = "SELECT * FROM `user_posts_comments` WHERE `post_id` = ? ORDER BY `cnt` DESC";
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $postID);

    if($stmt === false) {
        die("There's a problem on loading comments.");
    }
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows <= 0) {
        die("Be the first to comment on this post.");
    }

    $htmlFormatComments = '';
    while($rows = $result->fetch_assoc()) {
        $date = new DateTime($rows['date_commented']);
        $formattedDate = $date->format('m/d/y');
        $query2 = "SELECT * FROM `user_accounts` WHERE `user_id`=?";
        $stmt2 = $con->prepare($query2);
        $stmt2->bind_param('s', $rows['user_id']);

        if($stmt2 === false) {
            die("There's a problem on getting names of commentors.");
        }
        $stmt2->execute();
        $result2 = $stmt2->get_result();
    
        if($result2->num_rows <= 0) {
            die("Can't get names of commentors.");
        }
        $commentorName = $result2->fetch_assoc();

        $htmlFormatComments .= '
            <div class="user-comments-container border mb-3">
                <div class="user-comments-name-date">
                    <h6>'.$commentorName['user_name'].'</h6>
                    <small>'.$formattedDate.'&nbsp; '.$rows['time_commented'].'</small>
                </div>
                <p>'.$rows['comments'].'</p>
            </div> 
        ';
    }
    echo $htmlFormatComments;

}catch(Exception $ex) {
    die("Error Occurred: " . $ex);
}

?>