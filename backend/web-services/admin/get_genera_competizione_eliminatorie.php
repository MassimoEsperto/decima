<?php

require_once '../config/connect_local.php';
require_once '../common/fasi.php';
require_once '../common/classifica_ranking.php';
    
$sorteggiabili = [];

foreach($ranking_ as $row) 
{
	if($row['eliminato']==true){
    	continue;
    }
    
    $item = [];
    $item['descrizione'] = '(' . $row['id_utente'] .')' . $row['squadra'];
    $item['id'] = $row['id_squadra'];
    $item['id_utente'] = $row['id_utente'];
    $item['selected'] = false;
    $item['posizione'] = $row['posizione'];
    $item['girone'] = $row['girone'];
    
    array_push($sorteggiabili, $item);
}


$myObj->fasi = $fasi_;
$myObj->sorteggiabili = $sorteggiabili;
$totObj=['data'=>$myObj];

$myJSON = json_encode($totObj);
echo $myJSON;

?>