<?php

require_once '../config/connect_local.php';

$id_utente = $_GET['id_utente'];

$email='';
$pass='';

 // Validate.
if(trim($id_utente) === '' || $id_utente === 'undefined')
{
    errorMessage('Valori non prelevati!');
}
  
  
$subject = "Richiesta Password WorldWideFantashit";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <WorldWideFantashit@shitcup.com>' . "\r\n";


$sql = "select password,email from utenti where id_utente = '{$id_utente}' LIMIT 1"; 

$result = mysqli_query( $con , $sql );

if(!$result) 
{
         errorMessage('Utente inesistente!');
}
else
{
  
	while($row = mysqli_fetch_assoc($result))
	{
		$pass = $row['password'];
        $email = $row['email'];
	}
		
		$message = "
		<html>
		<head>
		<title>HTML email</title>
		</head>
		<body>
		<p>Richiesta password dimenticata!</p>
		<table>
		<tr>
		<th>La tua password</th>
		</tr>
		<tr>
		<td>".$pass."</td>
		</tr>
		</table>
		<br>
		<a href='".$base_link_cup."'>Visit WorldWideFantashit.com!</a>
		</body>
		</html>
		";
		
	if($pass!='')
	{
    	try {  			
                mail($email,$subject,$message,$headers);
                echo json_encode(['data'=>'ok']);
		} catch (Exception $e) {
                errorMessage($e->getMessage());
		}
    	       
	}else{
                errorMessage('Utente inesistente!');
    }
	
	
}
?>
