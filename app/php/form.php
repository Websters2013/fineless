<?php
$name = $_POST['name'];
$company = $_POST['company'];
$email = $_POST['phoneOrEmail'];

$name = htmlspecialchars($name);
$company = htmlspecialchars($company);
$email = htmlspecialchars($email);
$name = urldecode($name);
$company = urldecode($company);
$email = urldecode($email);
$name = trim($name);
$company = trim($company);
$email = trim($email);

//echo $fio;
//echo "<br>";
//echo $email;
if ( mail("einzweindrey@gmail.com", "Fineless", "Name:".$name.". E-mail: ".$email ,"From: einzweindrey@gmail.com \r\n" ) )
{
    echo "сообщение успешно отправлено";

} else {

    echo "при отправке сообщения возникли ошибки";

}?>
