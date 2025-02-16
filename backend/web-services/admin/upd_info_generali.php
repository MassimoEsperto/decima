<?php

require_once '../config/connect_local.php';
require_once '../config/post_data.php';

$crediti_disponibili = mysqli_real_escape_string($con, trim($dati->crediti_disponibili)); 
$fase_competizione = mysqli_real_escape_string($con, trim($dati->fase)); 
$anno = mysqli_real_escape_string($con, trim($dati->anno)); 

$sql = "UPDATE info_competizione SET valore={$fase_competizione} ";
$sql .="WHERE id_info = 12 LIMIT 1; ";

$sql .="UPDATE info_competizione SET valore='{$anno}' ";
$sql .="WHERE id_info = 4 LIMIT 1; ";

$sql .="UPDATE info_competizione SET valore={$crediti_disponibili} ";
$sql .="WHERE id_info = 11 LIMIT 1; ";

if ($con->multi_query($sql) === TRUE)
{
	echo json_encode(['data'=>'SUCCESS']);
}
else
{
	 errorMessage('query errata: upd info generali' . $sql);
}





?>