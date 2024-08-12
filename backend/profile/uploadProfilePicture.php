<?php 
try
{

    include_once('../../includes/connection.php');
    include_once('../../backend/session.php');
    
    $user_id = $_SESSION['user_id'];
    
    if($_SERVER['REQUEST_METHOD'] === "POST")
    {
        if(isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK)
        {
            $fileInTempPath = $_FILES['file']['tmp_name'];
            $fileName = $_FILES['file']['name'];
            $fileSize = $_FILES['file']['size'];
            $fileType = $_FILES['file']['type'];
            $fileNameInArray = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameInArray));
            
        if($fileExtension !== "jpeg" && $fileExtension !== "jpg")
        {
            echo json_encode(['status'=>'failed', 'msg'=>"Invalid file type. Only JPEG or JPG allowed."]);
            return;
        }
        
        $uploadDestination = "../../uploads/profile_picture/" . $fileName;
        if(move_uploaded_file($fileInTempPath, $uploadDestination))
        {
            $query = "INSERT INTO user_profile(`user_id`, `file_path`, `file_name`, `file_size`) VALUES(?,?,?,?)";
            $stmt = $con->prepare($query);
            $stmt->bind_param('sssi', $user_id, $uploadDestination, $fileName, $fileSize);
            $stmt->execute();
            
            echo json_encode(['status'=>'success', 'msg'=>"Uploaded Successfully"]);
        }
        else
        {
            echo json_encode(['status'=>'failed', 'msg'=>"There was a problem in uploading image."]);
        }
    }
}
}
catch(Exception $ex)
{
    echo json_encode(['status'=>'exception', 'msg'=>$ex]);
    return;
}



?>