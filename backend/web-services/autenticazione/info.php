<?php

require_once '../config/connect_local.php';
require_once '../common/info_competizione.php';

/*
//ripescaggio
$pos_ripescabili = array(3,4); //ha diritto a un possibile ripescaggio
$pos_qualificate = array(1); //ha diritto al turno successivo
$pos_spareggi = array(2); // ha diritto allo spareggio
$num_ripescate = 5; // numero di squadre ripescate

$condizione_qualificata = 1;
$condizione_spareggio = 2;
$condizione_eliminata = 3;

$avatar_eliminato = "ELIMINATO";
*/


    
//info
//$myObj->versione = $info_['VERSIONE'];
//$myObj->whatsapp = $info_['WHATSAPP'];
$myObj->info = $info_;





$totObj=['data'=>$myObj];
$myJSON = json_encode($totObj);
echo $myJSON;

?>