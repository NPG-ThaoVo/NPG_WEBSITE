<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

// Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and remove whitespace.
    // Get contact name
    $name = strip_tags(trim($_POST["contact_name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    
    // Get contact company
    $company = strip_tags(trim($_POST["contact_company"]));
    $company = str_replace(array("\r","\n"),array(" "," "),$company);
    
    // Get contact subject
    $subject = strip_tags(trim($_POST["contact_subject"]));
    $subject = str_replace(array("\r","\n"),array(" "," "),$subject);

    $email = filter_var(trim($_POST["contact_email"]), FILTER_SANITIZE_EMAIL);
    $message = nl2br(trim($_POST["contact_comment"]));

    // Check that data was sent to the mailer.
    if (empty($company) OR empty($subject) OR empty($name) OR empty($message)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(200);
        echo json_encode("_required_");
        exit();
    }
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
       // http_response_code(200);
        echo json_encode("_invalid_email_");
        exit();
    }
    $mail = new PHPMailer(true); 
    // Passing `true` enables exceptions
    try {
        //Server settings
        $mail->SMTPDebug = 0;                                 // Enable verbose debug output
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'mail92100.maychuemail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'contact@napaglobal.com';                 // SMTP username
        $mail->Password = 'napa@email2018';                           // SMTP password
        $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465;                                    // TCP port to connect to
    
        //Recipients
    
        $mail->setFrom($email, $name);
        $mail->addAddress('thao.vo@napaglobal.com', 'System');     // Add a recipient
    
        //Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = $subject; //Set subject
        $mail->setFrom($email, $name);
        $messageContent = "<strong>Email address: </strong>".$email.'<br>';
        $messageContent = $messageContent.'<strong>Full name:</strong> '.$name.'<br>';
        $messageContent = $messageContent."<strong>Company: </strong>".$company.'<br>';
        $messageContent = $messageContent."<strong>Subject: </strong>".$subject.'<br><br>';
        $messageContent = $messageContent.$message;
        $mail->Body    = $messageContent;
        
    
        $mail->send();
        http_response_code(200);
        echo json_encode('Success.');
        exit();
    } catch (Exception $e) {
        echo json_encode('Message could not be sent.');
        exit();
    }
} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo json_encode('There was a problem with your submission, please try again.');
    exit();
}
?>