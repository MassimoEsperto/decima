<?php

require_once '../config/connect_local.php';
require_once '../config/post_data.php';

$num_tot_acc = sizeof($dati);
$num_met_acc = $num_tot_acc/2;

$y = 0;
for ($x = 0; $x < $num_met_acc; $x++) {
  echo " POS C $x : ";
  echo json_encode($dati[$x]);
  
  $y = $num_tot_acc - $x -1;
  
  
    echo " POS T $y : ";
  echo json_encode($dati[$num_tot_acc - $x -1]);
}



$myObj->size = $num_tot_acc;
$myObj->mezzo = $num_met_acc;
//$myObj->dati = $dati;
$totObj=['data'=>$myObj];
$myJSON = json_encode($totObj);
echo $myJSON;



/*
$id_squadra = mysqli_real_escape_string($con, trim($dati->id_squadra)); 
$lega = mysqli_real_escape_string($con, trim($dati->lega)); 
 


foreach($dati->lista as $item) 
{		
    $id_calciatore = mysqli_real_escape_string($con, trim($item->id_calciatore));
		
	$sql .= "INSERT INTO `rose`(`squadra_id`,`calciatore_id`) VALUES ('{$id_squadra}','{$id_calciatore}');";		
}
    
$sql .= "UPDATE squadre SET lega='{$lega}' WHERE id_squadra = {$id_squadra} LIMIT 1";
    
	
if ($con->multi_query($sql) === TRUE) 
{
	http_response_code(201);
}else{
	errorMessage('query errata: aggiorna rosa');
}
*/


?>