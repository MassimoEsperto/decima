<?php

require_once '../config/connect_local.php';
require_once '../config/post_data.php';


$squadre= $dati->squadre;
$fase= $dati->id_fase;

$sql_gio_andata ="(SELECT id_giornata FROM giornate WHERE fase_id = {$fase} ORDER BY id_giornata ASC LIMIT 1)";
$sql_gio_ritorno ="(SELECT id_giornata FROM giornate WHERE fase_id = {$fase} ORDER BY id_giornata DESC LIMIT 1)";
$sql_calendario ="(SELECT MAX(id_calendario) FROM calendario)";

//andata 
foreach($squadre as $squadra) 
{		
    $id_casa = $squadra->casa->id;
    $id_trasferta = $squadra->trasferta->id;
		
    $sql .= "REPLACE INTO calendario(giornata_id) VALUES ({$sql_gio_andata});";
	$sql .= "REPLACE INTO risultati(luogo,squadra_id,calendario_id) VALUES ('CASA',{$id_trasferta},{$sql_calendario});";
	$sql .= "REPLACE INTO risultati(luogo,squadra_id,calendario_id) VALUES ('TRASFERTA',{$id_casa},{$sql_calendario});";
}

//ritorno 
foreach($squadre as $squadra) 
{		
    $id_casa = $squadra->casa->id;
    $id_trasferta = $squadra->trasferta->id;
		
    $sql .= "REPLACE INTO calendario(giornata_id) VALUES ({$sql_gio_ritorno});";
	$sql .= "REPLACE INTO risultati(luogo,squadra_id,calendario_id) VALUES ('CASA',{$id_casa},{$sql_calendario});";
	$sql .= "REPLACE INTO risultati(luogo,squadra_id,calendario_id) VALUES ('TRASFERTA',{$id_trasferta},{$sql_calendario});";
}

echo $sql;

?>