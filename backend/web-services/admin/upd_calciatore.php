<?php

require_once '../config/connect_local.php';
require_once '../config/post_data.php';

$id = mysqli_real_escape_string($con, trim($dati->id)); 
$nickname = mysqli_real_escape_string($con, trim($dati->nickname)); 

$sql = "UPDATE lista_calciatori SET nickname='{$nickname}' ";
$sql .="WHERE id_calciatore = {$id} LIMIT 1";
	
if(mysqli_query($con, $sql))
{
    echo json_encode(['data'=>'SUCCESS']);
}
else
{
    errorMessage('query errata: cambio nickname');
}



?>