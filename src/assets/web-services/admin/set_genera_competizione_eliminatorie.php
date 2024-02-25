<?php

require_once '../config/connect_local.php';
require_once '../config/post_data.php';


$squadre= $dati->squadre;
$fase= $dati->id_fase;

//aggiungi un controllo che verifichi se gia esiste nel calendario quella fase

$sql_gio_andata ="(SELECT id_giornata FROM giornate WHERE fase_id = {$fase} ORDER BY id_giornata ASC LIMIT 1)";
$sql_gio_ritorno ="(SELECT id_giornata FROM giornate WHERE fase_id = {$fase} ORDER BY id_giornata DESC LIMIT 1)";
$sql_calendario ="(SELECT MAX(id_calendario) FROM calendario)";

//andata 
foreach($squadre as $squadra) 
{		
    $id_casa = $squadra->casa->id;
    $id_trasferta = $squadra->trasferta->id;
		
    $sql .= "INSERT INTO calendario(giornata_id) VALUES ({$sql_gio_andata});";
	$sql .= "INSERT INTO risultati(luogo,squadra_id,calendario_id) VALUES ('CASA',{$id_trasferta},{$sql_calendario});";
	$sql .= "INSERT INTO risultati(luogo,squadra_id,calendario_id) VALUES ('TRASFERTA',{$id_casa},{$sql_calendario});";
}

//ritorno 
foreach($squadre as $squadra) 
{		
    $id_casa = $squadra->casa->id;
    $id_trasferta = $squadra->trasferta->id;
		
    $sql .= "INSERT INTO calendario(giornata_id) VALUES ({$sql_gio_ritorno});";
	$sql .= "INSERT INTO risultati(luogo,squadra_id,calendario_id) VALUES ('CASA',{$id_casa},{$sql_calendario});";
	$sql .= "INSERT INTO risultati(luogo,squadra_id,calendario_id) VALUES ('TRASFERTA',{$id_trasferta},{$sql_calendario});";
}

if ($con->multi_query($sql) === TRUE) 
{
	$ritono = [
				  'stato' => $con->affected_rows,
				  'risposta' => 'ok'
				];
	echo json_encode(['data'=>$ritono]);
} 
else 
{
	errorMessage('query errata: eliminatorie ');
}

?>