<?php 
require_once 'php-mailer/PHPMailerAutoload.php';

    $msg_result = "";
	$errors = array();

	$phone = $_POST['phone'];
	$surprize = $_POST['surprize'];

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
 
// Настройки SMTP
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;
 
$mail->Host = 'ssl://smtp.mail.ru';
$mail->Port = 465;
$mail->Username = 'info@n-zori.ru';
$mail->Password = 'fgdf2132dsd!WE';
 
// От кого
$mail->setFrom('info@n-zori.ru', 'n-zori.ru');		
 
// Кому
$mail->addAddress('info@n-zori.ru', 'Иван Петров');
$mail->addAddress('kochurova@utta.ru', 'Иван Петров');

 
// Тема письма
$subject = 'Письмо с колеса фортуны';
$mail->Subject = $subject;
 

  if(empty($errors)){ // Отправляем форму если нет ошибок
		$phone = $_POST['phone'];
		$surprize =  $_POST['surprize'];
		// Тело письма
		$body = '<p>
		<b>Номер</b>: <p>' .$phone. '</p>
		<b>Подарок</b>: <p>' .$surprize. '</p>';

		$mail->msgHTML($body);   
		$mail->send();
		$msg_result = "Сообщение успешно отправлено!"; // Сообщение об успешной отправке
	} else { // Выводим ошибки
		$msg_result = "";
		foreach($errors as $all_error) {
			$msg_result .= $all_error."<br>";
		}
	}

	echo json_encode(array(
		"result" => $msg_result
	));
	print_r($_POST);
// Приложение
//$mail->addAttachment(__DIR__ . '/image.jpg');
 
?>

