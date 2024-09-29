<?php

require_once '../config/connect_local.php';
require_once '../config/decode.php';
require_once '../config/post_data.php';

$id_squadra_del = mysqli_real_escape_string($con, trim($dati->id)); 

$count ="SELECT count(*) FROM risultati r WHERE r.squadra_id = {$id_squadra_del} ";

$result = mysqli_query( $con , $count );

if(! $result ) 
{
 	errorMessage('query errata: count squadre');
}

if ($result->num_rows > 0) 
{
	errorMessage('Impossibile eliminare una squadra inserita nel calendario');
}

//elimina rosa esistente
$sql =  "DELETE rose, squadre FROM rose JOIN squadre ";
$sql .= "ON rose.squadra_id = squadre.id_squadra WHERE rose.squadra_id = {$id_squadra_del}";

if(mysqli_query($con, $sql))
{
	echo json_encode(['data'=>'ok']);
}
else
{
     errorMessage('query elimina errata ' .$sql);
}

		
?>