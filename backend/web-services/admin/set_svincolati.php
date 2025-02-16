<?php

require_once '../config/connect_local.php';
require_once '../config/post_data.php';

$sql="";
$svincolati = $dati->svincolati;
$vincolati = $dati->vincolati;
$val_min=6;

//inserisce i nuovi
foreach($svincolati as $item) 
{
	$ruolo = mysqli_real_escape_string($con, trim($item->ruolo)); 
    $nome = mysqli_real_escape_string($con, trim($item->nome));
    $nickname = mysqli_real_escape_string($con, trim($item->nickname));
    $ico = mysqli_real_escape_string($con, trim($item->icona));
    $valore = $ruolo != 'P' && $item->valore < $val_min ? $val_min : $item->valore;
    	
	$sql .= "INSERT INTO `lista_calciatori`(`nome_calciatore`,`nickname`,`ruolo`,`icona`,`acquisto`,`valore`) VALUES ";
	$sql .= "('{$nome}','{$nickname}','{$ruolo}','{$ico}',{$valore},{$valore}) ; ";
		
}

//aggiorna esistenti
foreach($vincolati as $item) 
{
	$ruolo = mysqli_real_escape_string($con, trim($item->ruolo)); 
    $nome = mysqli_real_escape_string($con, trim($item->nome));
    $valore = $ruolo != 'P' && $item->valore < $val_min ? $val_min : $item->valore;
    	
    $sql .="UPDATE lista_calciatori SET valore={$valore},ruolo='{$ruolo}' ";
	$sql .="WHERE nome_calciatore='{$nome}' ;";
}
    
	
if ($con->multi_query($sql) === TRUE) 
{
	echo json_encode(['data'=>'ok']);
    
}else{
	errorMessage('query errata: insert svincolati' . $sql);
}



?>