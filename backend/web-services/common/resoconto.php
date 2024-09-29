<?php
    
//dichiarazione variabili	
$resoconto_ = [];

//Query ed elaborazioni
$sql_resoconto = "SELECT t.qta,count(t.id_utente) as reg FROM ( ";
$sql_resoconto .="SELECT u.id_utente,count(s.id_squadra) as qta "; 
$sql_resoconto .="FROM utenti u ";
$sql_resoconto .="LEFT JOIN squadre s ON s.utente_id = u.id_utente ";
$sql_resoconto .="GROUP BY u.id_utente ";
$sql_resoconto .=") t GROUP BY t.qta ORDER BY t.qta DESC ";


if($result = mysqli_query($con,$sql_resoconto))
{
	$ele = 0;
    $resoconto_['iscritti'] = 0;
    
	while($row = mysqli_fetch_assoc($result))
	{
        $resoconto_['quantita'][$ele]['utenti'] = $row['reg'];
        $resoconto_['quantita'][$ele]['squadre'] = $row['qta'];
        $resoconto_['iscritti'] = $resoconto_['iscritti'] + (int)$row['reg'];
        $ele++;
	}

}

$sql_paganti = "SELECT count(*) pga FROM squadre s WHERE s.stato_id > 2 ";

if($result = mysqli_query($con,$sql_paganti))
{   
	while($row = mysqli_fetch_assoc($result))
	{
        $resoconto_['paganti'] = $row['pga'];
	}

}
    



?>