<?php
include_once('../../includes/connection.php');
session_start();
$user_id = $_SESSION['user_id'];
$htmlFormatPost = '<h2>Your Posts</h2>';
try {
    $query = "SELECT * FROM `user_posts` WHERE `user_id` = ? ORDER BY `cnt` DESC";
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $user_id);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows <= 0) {
        die("NO POST(S) YET... <br> Try posting now by clicking create post button.");
    }
    while ($row = $result->fetch_assoc()) {
        $postId = $row['post_id'];
        $postedDate = $row['posted_date'];
        $postedTime = $row['posted_time'];
        // $postTime = $row['posted_time'];

        $query2 = "SELECT user_posts.*, user_posts_content.captions , user_reacted_to_post.reaction 
                    FROM `user_posts` 
                    LEFT JOIN user_posts_content
                        ON user_posts_content.post_id = user_posts.post_id 
                    LEFT JOIN user_reacted_to_post 
                        ON user_reacted_to_post.post_id = user_posts.post_id 
                        AND user_reacted_to_post.user_id = user_posts.user_id 
                    WHERE user_posts.post_id = ?";
        $stmt2 = $con->prepare($query2);
        $stmt2->bind_param("s", $postId);
        $stmt2->execute();

        $result2 = $stmt2->get_result();
        while ($row2 = $result2->fetch_assoc()) {
            $reactionImage;
            if($row2['reaction'] != null) {
                $reactionImage = ' <img src="../assets/image/'.$row2['reaction'].'.png" alt="icon">  ';
            } else {
                $reactionImage = ' <img src="../assets/bootstrap/icon/bootstrap-icons-1.11.3/emoji-neutral.svg" alt="icon">  ';
            }
            $htmlFormatPost .= '
                <!-- posts container -->
                <div class="post mt-3">
                    <div class="post-image-name">
                        <img class="postSmallImage" src="" alt="Photo">
                        <h5 class="postsNames">Your name here</h5>
                        <div class="btn-edit-delete-container">
                            <button type="button" postId="'.$postId.'" class="btn-edit-post btn-edit-delete-post">
                                <img src="../../assets/image/edit.png" alt="button">
                            </button>
                            <button type="button" postId="'.$postId.'" class="btn-delete-post btn-edit-delete-post">
                                <img src="../../assets/image/delete.png" alt="button">
                            </button>
                        </div>
                    </div>

                     <!-- Date and time -->
                    <div class="date-time"> 
                        <p class="date-time-content text-muted">' . $postedDate . ' at ' . $postedTime . '</p> 
                    </div>

                    <!-- post content -->   
                    <div class="post-captions">
                        <p class="post-captions-content">' . $row2['captions'] . '</p>
                    </div>

                    <div class="post-image-video">
                        <h5>This space is for image/video</h5>
                    </div>

                     <div class="post-reactions-comment-share">
                        <button postId="'.$postId.'" class="button-react btn-prcs reacted-emoji-'.$row2['reaction'].'" data-bs-toggle="modal" data-bs-target="#reactEmojiModal">
                            '.$reactionImage.'
                            React
                        </button>
                        <button postId="'.$postId.'" class="button-comment btn-prcs">
                            <img src="../assets/bootstrap/icon/bootstrap-icons-1.11.3/pencil.svg" alt="icon">
                            Comment
                        </button>
                        <button postId="'.$postId.'" class="button-share btn-prcs">
                            <img src="../assets/bootstrap/icon/bootstrap-icons-1.11.3/share.svg" alt="icon"> 
                            Share
                        </button>
                    </div>
                </div>
                
                ';
        }
    }
    // echo json_encode(['status'=>'success', 'html'=>$htmlFormatPost]);
    echo $htmlFormatPost;
    $stmt->close();
    $stmt2->close();
    $con->close();
} catch (Exception $ex) {
    die('Exception Occurred: ' . $ex);
}
