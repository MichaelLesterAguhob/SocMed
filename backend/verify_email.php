<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Random\Engine\Secure;

require ('../includes/PHPMailer/src/PHPMailer.php');
require ('../includes/PHPMailer/src/SMTP.php');
require ('../includes/PHPMailer/src/Exception.php');
require('../includes/connection.php');

try
{
    $email = trim($_POST['email']);

     // CHECK IF EMAIL IS ALREADY EXISTS
    $stmt2 = $con->prepare("SELECT user_email FROM user_accounts WHERE user_email=? ");
    $stmt2->bind_param('s', $email);
    if($stmt2 == false)
    {
        die("Prepare failed : " . htmlspecialchars($con->error)); 
    }
    $stmt2->execute();
    $result = $stmt2->get_result()->fetch_array();
    if($result)
    {
        echo json_encode(['status'=>'existing','msg'=>'Email is already exists. If you forgot your account, just click Forgot Password']);
        return;
    }

    // SEND VERIFICATION ONCE THE EMAIL IS UNIQUE
    $fullName = trim($_POST['fullName']);
    $verificationCode = rand(10000, 99999);
    
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

    $mail->addEmbeddedImage('../assets/image/logo.png','logo');
    $mailMsgDesign = '<div style="font-family: "Courier New", Courier, monospace; padding: 10px; height: 95vh; word-wrap: break-word;">
        <img src="cid:logo" alt="socmed logo" style="max-width: 330px; max-height:105px; margin: auto;">
        <h1 style="color: blue;">Verification Code: </h1>
        <div style="width: auto; display: flex; justify-content: center;">
            <h1 style="color: maroon;">'. $verificationCode .'</h1>
        </div>
        <br>
        <h2>Hi! &nbsp;'.$fullName.',&nbsp;Enter this Verification Code to Create Your Account on SocMed</h2>
        <br>
        <h3 style="margin-top: 50%; width: 100%; text-align: center;">Thank you for using SocMed! Have a great day!</h3>
        <h2 style="width: 100%; text-align: center; color: blue;">SOCMED © 2024</h2>
        <h3 style="width: 100%; text-align: center; color: maroon;">Developer: Michael Lester Aguhob</h3>
        <br>
    </div>';

    $mail->Body = $mailMsgDesign;
    
    //send mail
    $mail->send();
    echo json_encode(['status'=>'success', 'msg'=>"Verification Code Sent!",'code'=>$verificationCode]);
}
catch (Exception $ex)
{
    echo 'Error Occurred' . $ex;
    exit;
}

?>