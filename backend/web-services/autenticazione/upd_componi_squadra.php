<?php

require_once '../config/connect_local.php';
require_once '../config/decode.php';
require_once '../config/post_data.php';

$squadra = mysqli_real_escape_string($con, trim($dati->squadra)); 
$id_squadra = mysqli_real_escape_string($con, trim($dati->id_squadra)); 
$players = $dati->players;

//elimina rosa esistente
$sql1 = "DELETE FROM rose WHERE squadra_id = {$id_squadra} ";

if(mysqli_query($con, $sql1))
{
    
}
else
{
     errorMessage('query elimina errata');
}


foreach($players as $item) 
{

	$id_calciatore = mysqli_real_escape_string($con, trim($item->id));

	$sql2 .= "INSERT INTO rose (squadra_id,calciatore_id) VALUES ('{$id_squadra}','{$id_calciatore}');";

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