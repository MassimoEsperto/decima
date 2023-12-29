<?php

require_once '../config/connect_local.php';
require_once '../config/post_data.php';


$id_squadra = mysqli_real_escape_string($con, trim($dati->id_squadra)); 

$count ="count(*) FROM risultati r WHERE r.squadra_id = {$id_squadra} ";
$sql =  "DELETE rose, squadre FROM rose JOIN squadre ";
$sql .= "ON rose.squadra_id = squadre.id_squadra WHERE rose.squadra_id = {$id_squadra}";

$result = mysqli_query( $con , $count );

if(! $result ) 
{
 	errorMessage('query errata: count suadre');
}

if ($result->num_rows > 0) 
{
	errorMessage('Impossibile eliminare una squadra inserita nel calendario');
}


if(mysqli_query($con, $sql))
{
	echo json_encode(['data'=>'ok']);
}
else
{

	errorMessage('query errata: del suadra');
}

?>