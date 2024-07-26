<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Random\Engine\Secure;

require ('../includes/PHPMailer/src/PHPMailer.php');
require ('../includes/PHPMailer/src/SMTP.php');
require ('../includes/PHPMailer/src/Exception.php');
require_once('../includes/connection.php');

$verification_code = 0;

try
{
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $pass = $_POST['password'];
        
    $verification_code = rand(10000, 99999);
    
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'hrep.icts.bulletin@gmail.com';
    $mail->Password = 'wzcr lkxe ihiz ihlo';
    $mail->SMTPSecure = "ssl";
    $mail->Port = 465;
    
    $mail->setFrom('hrep.icts.bulletin@gmail.com');
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->Subject = "Verification Code";
    $mail->Body = "Your verification code: " . $verification_code;
    
    $mail->send();
    echo "Code Sent";
}
catch (Exception $ex)
{
    echo "Error Occurred : " . $ex;
}











// if($_SERVER['REQUEST_METHOD'] == 'POST'){
//     $fullname = $_POST['fullname'];
//     $email = $_POST['email'];
//     $pass = $_POST['password'];
    // try{
    //     $query_txt = "INSERT INTO user_accounts VALUES('', 123, '$fullname', '$pass') ";
    //     $query = mysqli_query($con, $query_txt);
    //     if($query){
    //         echo "Successfully Created Account!";
    //     }else{
    //         echo "Unsucessful";
    //     }
    // }catch(Exception $ex){
    //     echo "Error Occurred" . $ex;
    // }

// }




?>