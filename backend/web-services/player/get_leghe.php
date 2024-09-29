<?php

require_once '../config/connect_local.php';


$leghe = [];

$sql  ="SELECT l.nome,l.account,l.calciatore_id,c.nome_calciatore,c.ruolo ";
$sql .="FROM leghe l ";
$sql .="LEFT JOIN lista_calciatori c on c.id_calciatore = l.calciatore_id ";
$sql .="ORDER BY l.nome,l.account,c.ruolo desc  ";



if($result = mysqli_query($con,$sql))
{
    $lega = '';
    $account = '';
    $count_l = -1;
    $count_a = -1;
    $count_r = -1;
    
	while($row = mysqli_fetch_assoc($result))
	{
   
    	if($lega != $row['nome']){
        
        	$count_l++;
            $count_a = -1;
            $count_r = -1;
            $account = '';
            
            $lega = $row['nome'];
            $leghe[$count_l]['nome'] = $row['nome'];
         }
            
         if($account != $row['account']){
        
         	$count_a++;
            $account = $row['account'];
            $leghe[$count_l]['rose'][$count_a]['account'] = $row['account'];
            $count_r = -1;
          }
            
          $count_r++;
          $leghe[$count_l]['rose'][$count_a]['calciatori'][$count_r]['id'] = $row['calciatore_id'];
          $leghe[$count_l]['rose'][$count_a]['calciatori'][$count_r]['nome'] = $row['nome_calciatore'];
          $leghe[$count_l]['rose'][$count_a]['calciatori'][$count_r]['ruolo'] = $row['ruolo'];  
          $leghe[$count_l]['rose'][$count_a]['calciatori'][$count_r]['selected'] = true;

           
    	} 
        
	echo json_encode(['data'=>$leghe]);
}
else
{
	errorMessage('query errata: tabellone ' . $sql);
}


?>