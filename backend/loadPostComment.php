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
        $query2 = "SELECT user_accounts.*, user_profile.file_name 
                    FROM `user_accounts` 
                    INNER JOIN user_profile
                        ON user_accounts.user_id = user_profile.user_id AND user_profile.in_use = 'yes'
                    WHERE user_accounts.user_id=?
                    ";
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
        $commentorDetails = $result2->fetch_assoc();
        $addClassname = "";
        if($commentorDetails['user_id'] == $user_id) {
            $addClassname = "own-comment";
        }
        $htmlFormatComments .= '
            <div class="user-comments-container border mb-3 '.$addClassname.'">
                <div class="user-comments-name-date">
                    <img src="../uploads/profile_picture/'.$commentorDetails['file_name'].'" alt="photo" style="width: 23px; height: 23px; border-radius: 50%; margin-right: 7px;">
                    <h6>'.$commentorDetails['user_name'].'</h6>
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