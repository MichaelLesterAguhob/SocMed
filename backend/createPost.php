<?php 
include_once('../includes/connection.php');
session_start();
try
{
    $dateTime = $_POST['dateTime'];
    $postCaptions = $_POST['postCaptions'];
    $userId = $_SESSION['user_id'];
    $posId = generatePostId();

    // inserting into user posts
    $query1 = "INSERT INTO user_posts (`user_id`, `post_id`, `posted_date_time`) VALUES (?,?,?)";
    $stmt1 = $con->prepare($query1);
    $stmt1->bind_param('sss', $userId, $posId, $dateTime);

    // Inserting into user post content
    $query2 = "INSERT INTO user_posts_content (`post_id`, `captions`) VALUES (?,?)";
    $stmt2 = $con->prepare($query2);
    $stmt2->bind_param('ss', $posId, $postCaptions);

    // determine if preparation was successfull
    if($stmt1 === false || $stmt2 === false)
    {
        die('Preparation Failed: ' . htmlspecialchars($con->error));
    }

    if($stmt1->execute() && $stmt2->execute())
    {
        echo "Posted Successfully.";
    }
    else
    {
        echo "Problem Occurred.";
    }


    $stmt1->close();
    $stmt2->close();
    $con->close();
}
catch(Exception $ex)
{
    die('Exception Occurred: ' . htmlspecialchars($ex));
}


// Function to generate unique post ID 
function generatePostId()
{
    global $con;
    $uniquePostId = uniqid('postID_') . date('Y');

    $query = "SELECT * FROM `user_posts` WHERE `post_id`=?";
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $uniquePostId);
    
    if($stmt === false)
    {
        die('Preparation Failed: ' . htmlspecialchars($con->error));
    }
    $stmt->execute();

    $result = $stmt->get_result()->fetch_assoc();
    if(!$result)
    {
        return $uniquePostId;
    }
    else
    {
        generatePostId();
    }

    $stmt->close();
    $con->close();
}








?>