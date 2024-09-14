<?php

require_once '../config/connect_local.php';
require_once '../config/post_data.php';


$formazioni = $dati->formazioni; 
$lega = mysqli_real_escape_string($con, trim($dati->lega)); 

$sql = "DELETE FROM leghe WHERE nome = '{$lega}'; ";	
  
foreach($formazioni as $rosa) 
{		
  $squadra = $rosa->squadra; 
  $account = $rosa->utente; 

  foreach($squadra as $item) 
  {		
      $id_calciatore = mysqli_real_escape_string($con, trim($item->id_calciatore));

      $sql .= "INSERT INTO `leghe`(`nome`,`account`,`calciatore_id`) VALUES ";		
      $sql .= "('{$lega}','{$account}','{$id_calciatore}');";		
  }

}



if ($con->multi_query($sql) === TRUE) 
{
	echo json_encode(['data'=>$formazioni]);
    
}else{
	errorMessage('query errata: inserisci lega');
}



?>