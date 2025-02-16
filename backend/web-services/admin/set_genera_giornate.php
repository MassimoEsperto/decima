<?php
require_once '../config/connect_local.php';
require_once '../config/post_data.php';


$sql = "";

foreach($dati as $item) 
{
	$id_giornata = mysqli_real_escape_string($con, (int)$item->id_giornata);
	$id_fase = mysqli_real_escape_string($con, (int)$item->id_fase);
    $serie_a = mysqli_real_escape_string($con, (int)$item->serie_a);
	
	$sql .= "REPLACE INTO giornate(id_giornata, fase_id, serie_a) ";
	$sql .= "VALUES ({$id_giornata}, {$id_fase}, {$serie_a}); ";
}



if ($con->multi_query($sql) === TRUE) 
{
	$ritono = [
				  'stato' => $con->affected_rows,
				  'risposta' => 'ok'
				];
	echo json_encode(['data'=>$sql]);
} 
else 
{
    errorMessage('valori sballati');
}


?>