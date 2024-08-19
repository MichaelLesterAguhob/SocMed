<?php
    include_once('../../includes/connection.php');
    session_start();
    $user_id = $_SESSION['user_id'];
    $htmlFormatPost = '<h2>Your Posts</h2>';
    try
    {
        $query = "SELECT * FROM `user_posts` WHERE `user_id` = ? ORDER BY `cnt` DESC";
        $stmt = $con->prepare($query);
        $stmt->bind_param("s", $user_id);
        $stmt->execute();

        $result = $stmt->get_result();
        if($result->num_rows <= 0)
        {
            die("No post(s) yet");
        }
        while($row = $result->fetch_assoc())
        {   
            $postId = $row['post_id'];
            $postDateTime = $row['posted_date_time'];

            $query2 = "SELECT * FROM `user_posts_content` WHERE `post_id` = ?";
            $stmt2 = $con->prepare($query2);
            $stmt2->bind_param("s", $postId);
            $stmt2->execute();

            $result2 = $stmt2->get_result();
            while($row2 = $result2->fetch_assoc())
            {   
                $htmlFormatPost .= '
                <!-- posts container -->
                <div class="post mt-3">
                    <div class="post-image-name">
                        <img class="postSmallImage" src="" alt="Photo"><h5 class="postsNames">Your name here</h5>
                    </div>

                     <!-- Date and time -->
                    <div class="date-time"> 
                        <p class="date-time-content text-muted">'.$postDateTime.'</p> 
                    </div>

                    <!-- post content -->   
                    <div class="post-captions">
                        <p class="post-captions-content">'.$row2['captions'].'</p>
                    </div>

                    <div><h5 class="m-5">This space is for image/video</h5></div>
                </div>
                
                ';
            }
        }
        // echo json_encode(['status'=>'success', 'html'=>$htmlFormatPost]);
        echo $htmlFormatPost;
        $stmt->close();
        $stmt2->close();
        $con->close();
    }
    catch(Exception $ex)
    {
        die('Exception Occurred: ' . $ex);
    }

?>