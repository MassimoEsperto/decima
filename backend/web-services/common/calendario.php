<?php

    
$calendario_ = [];

$sql_calendario = "SELECT g.id_giornata,g.serie_a,g.turno_id,u.id_utente, ";
$sql_calendario .="c.girone,c.id_calendario,r.luogo,s.squadra,r.id_risultato,s.id_squadra "; 
$sql_calendario .="FROM giornate g  ";
$sql_calendario .="INNER JOIN calendario c  ON c.giornata_id = g.id_giornata ";
$sql_calendario .="INNER JOIN risultati r  ON c.id_calendario = r.calendario_id ";
$sql_calendario .="INNER JOIN squadre s on s.id_squadra = r.squadra_id ";
$sql_calendario .="INNER JOIN utenti u on u.id_utente = s.utente_id ";
$sql_calendario .="ORDER BY g.id_giornata,c.girone, c.id_calendario,r.luogo ";


if($result = mysqli_query($con,$sql_calendario))
{
	$ele = -1;
    $tmp_giornata = 0; 
    $tmp_calendario = 0;
    $count_g = -1;
    
	while($row = mysqli_fetch_assoc($result))
	{
    	if($tmp_giornata != $row['id_giornata']){
        	$count_g++;
            $tmp_giornata = $row['id_giornata'];
            $calendario_[$count_g]['giornata'] 	= (int)$row['id_giornata'];
        	$calendario_[$count_g]['serie_a'] 	= (int)$row['serie_a'];
        	$calendario_[$count_g]['turno'] 	= (int)$row['turno_id'];
            $ele = -1;
        }
 		
        if($tmp_calendario != $row['id_calendario']){
          $tmp_calendario = $row['id_calendario'];
          $ele++;
        }
		
		$calendario_[$count_g]['partite'][$ele]['id_calendario'] 					= (int)$tmp_calendario;
		$calendario_[$count_g]['partite'][$ele]['girone'] 							= $row['girone'];
		$calendario_[$count_g]['partite'][$ele][$row['luogo']]['squadra'] 			= $row['squadra'];
        $calendario_[$count_g]['partite'][$ele][$row['luogo']]['id_squadra'] 		= (int)$row['id_squadra'];
        $calendario_[$count_g]['partite'][$ele][$row['luogo']]['id_utente'] 		= (int)$row['id_utente'];
        $calendario_[$count_g]['partite'][$ele][$row['luogo']]['id_risultato'] 		= (int)$row['id_risultato'];
 
	}
    
}



?>