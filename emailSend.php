<?php 

if($_POST['phone']){
    $phone = $_POST['phone'];
    $surprize = $_POST['surprize'];

 
    $phone = htmlspecialchars($phone);
    $surprize = htmlspecialchars($surprize);
    
    $ip = $_SERVER['REMOTE_ADDR'];
    $agent = isset($_SERVER['HTTP_USER_AGENT'])? substr($_SERVER['HTTP_USER_AGENT'], 0, 99):'';
}

function mail_utf8($to, $from, $subject, $message)
{
    $subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $headers  = "MIME-Version: 1.0\r\n"; 
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: $from\r\n";
    $headers .= "Reply-To: info@utta.ru" . '\r\n';
    
    return mail($to, $subject, $message, $headers);
}
mail_utf8('info@utta.ru','utta.ru' , 'utta', 
 "<html> 
<head> 
</head> 
<body> 
<h3>Заявка с сайта <a href='http://utta.ru' style='color:blue;margin: 0 auto;display: contents;text-decoration: none;'>utta.ru</a></h3>
<p>Cегодня ".date("d.m.Y, H:i:s")."</p>
<p>Телефон: $phone.</p>
<p>Приз: $surprize.</p>
</body> 
</html>");  

echo 'ok';




?>