<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Random\Engine\Secure;

require ('../includes/PHPMailer/src/PHPMailer.php');
require ('../includes/PHPMailer/src/SMTP.php');
require ('../includes/PHPMailer/src/Exception.php');
$verification_code = 0;
try
{
    $email = trim($_POST['email']);
    $fullname = trim($_POST['name']);
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

    $mail_design = '<div style="font-family: "Courier New", Courier, monospace; padding: 10px; height: 95vh; word-wrap: break-word;">
        <h1 style="color: blue; font-size: 3rem;">SocMed | Verification Code: </h1>
        <div style="width: auto; display: flex; justify-content: center;">
            <h1 style="color: maroon;">'. $verification_code .'</h1>
        </div>
        <br>
        <h2>Hi! &nbsp;'.$fullname.',&nbsp;Enter this Verification Code to Create Your Account on SocMed</h2>
        <br>
        <h3 style="margin-top: 50%; width: 100%; text-align: center;">Thank you for using SocMed! Have a great day!</h3>
        <h2 style="width: 100%; text-align: center; color: blue;">SOCMED © 2024</h2>
        <h3 style="width: 100%; text-align: center; color: maroon;">Developer: Michael Lester Aguhob</h3>
        <br>
    </div>';

    $mail->Body = $mail_design;
    
    //send mail
    $mail->send();
    echo json_encode(['status'=>'success', 'msg'=>"Verification Code Sent!",'code'=>$verification_code]);
}
catch (Exception $ex)
{
    echo 'Error Occurred' . $ex;
    exit;
}

?>