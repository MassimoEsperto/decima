<?php

require_once '../config/connect_local.php';
require_once '../config/post_data.php';

$inizio_giornata = mysqli_real_escape_string($con, trim($dati->inizio_giornata)); 
$prima_partita = mysqli_real_escape_string($con, trim($dati->prima_partita)); 
//$ultima_partita = mysqli_real_escape_string($con, trim($dati->ultima_partita)); 
//$fine_giornata = mysqli_real_escape_string($con, trim($dati->fine_giornata)); 
$serie_a= mysqli_real_escape_string($con, trim($dati->serie_a)); 
$fase = mysqli_real_escape_string($con, trim($dati->fase)); 
$is_upgrade = mysqli_real_escape_string($con, trim($dati->is_upgrade));

$giornata = mysqli_real_escape_string($con, trim($dati->giornata)); 

$precednte = (int)$giornata;
$precednte = $precednte-1;

$controllo  ="SELECT * FROM giornate WHERE id_giornata = {$giornata} ";
$controllo .="AND now() < ultima_partita AND is_upgrade != '{$is_upgrade}'";

$result = mysqli_query( $con , $controllo );

if(! $result ) 
{
 	errorMessage('query errata: count suadre');
}

if ($result->num_rows > 0) 
{
	errorMessage('Impossibile aggiornare il mercato se la giornata non è calcolata');
}

$sql  ="UPDATE giornate ";
$sql .="SET inizio_giornata='{$inizio_giornata}',prima_partita='{$prima_partita}',is_upgrade='{$is_upgrade}' ";
$sql .="WHERE id_giornata = {$giornata} LIMIT 1 ;";

$sql .="UPDATE giornate ";
$sql .="SET ultima_partita='{$inizio_giornata}',fine_giornata='{$inizio_giornata}' ";
$sql .="WHERE id_giornata  = {$precednte} LIMIT 1";

if ($con->multi_query($sql) === TRUE) 
{
     echo json_encode(['data'=>'SUCCESS']);
}
else
{
     errorMessage('query errata' . $sql);
}
		
?>