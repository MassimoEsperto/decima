<?php

require_once '../config/connect_local.php';
require_once '../common/fasi.php';
require_once '../common/giornate.php';
require_once '../common/utenti.php';
require_once '../common/calendario.php';
require_once '../common/squadre.php';
require_once '../common/turno.php';



$myObj->utenti = $utenti_;
$myObj->fasi = $fasi_;
$myObj->giornate = $giornate_;
$myObj->calendario = $calendario_;
$myObj->squadre = $squadre_;
$myObj->turno = $turno_;



$totObj=['data'=>$myObj];

$myJSON = json_encode($totObj);

echo $myJSON;

?>