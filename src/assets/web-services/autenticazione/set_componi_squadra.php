<?php

require_once '../config/connect_local.php';
require_once '../config/decode.php';
require_once '../config/post_data.php';

$squadra = mysqli_real_escape_string($con, trim($dati->squadra));  
$players = $dati->players;

$sql1 .= "INSERT INTO squadre (utente_id,squadra,lega,account,tipo) ";
$sql1 .= "VALUES ('{$id_utente}',UPPER('{$squadra}'),'interna','shitcup','LOCALE') ";


$controllo1 = "SELECT * FROM squadre WHERE squadra = '{$squadra}' ";

$result = mysqli_query( $con , $controllo1 );

if(! $result ) 
{
   errorMessage('query errata: controllo squadra');
}

if ($result->num_rows > 0) 
{
	 errorMessage('Nome squadra gia presente');
}


	
if ($con->multi_query($sql1) === TRUE) 
{
	$last_id = $con->insert_id;
}
else
{
	errorMessage('query errata: inserimento squadra' . $sql1);
}


foreach($players as $item) 
{

	$id_calciatore = mysqli_real_escape_string($con, trim($item->id));

	$sql2 .= "INSERT INTO rose (squadra_id,calciatore_id) VALUES ('{$last_id}','{$id_calciatore}');";

}

if ($con->multi_query($sql2) === TRUE)
{
	echo json_encode(['data'=>'ok']);
}
else
{
	errorMessage('query errata: inserimento rosa' . $sql2);
}


?>