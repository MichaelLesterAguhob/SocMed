<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Random\Engine\Secure;

require ('../includes/PHPMailer/src/PHPMailer.php');
require ('../includes/PHPMailer/src/SMTP.php');
require ('../includes/PHPMailer/src/Exception.php');
// require_once('../includes/connection.php');

$verification_code = 0;

try
{
    $email = trim($_POST['email']);
    $verification_code = rand(10000, 99999);
    
    //mail configuration
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = "ssl";
    $mail->Port = 465;

    //system email access
    $mail->Username = 'systememailmichael@gmail.com';
    $mail->Password = 'koef cdlo lisb hpxc';
 
    // Email sender - send to - subject - body
    $mail->setFrom('systememailmichael@gmail.com');
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->Subject = "Verification Code";
    $mail->Body = "Your verification code: " . $verification_code;
    
    //send mail
    $mail->send();
    echo json_encode(['status'=>'success', 'msg'=>"Verification Code Sent!",'code'=>$verification_code]);

}
catch (Exception $ex)
{
    echo json_encode(['status'=>'failed', 'msg'=>"Error Occurred! : " . $ex]);
}

?>