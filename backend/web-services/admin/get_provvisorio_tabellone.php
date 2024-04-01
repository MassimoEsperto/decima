<?php

require_once '../config/connect_local.php';

$tabellone_ = [];

$sql_tab = "SELECT g.id_giornata,g.fase_id,f.descrizione,f.partecipanti, ";
$sql_tab .="c.id_calendario,r.luogo,r.goals,s.squadra "; 
$sql_tab .="FROM giornate g  ";
$sql_tab .="INNER JOIN fasi f ON f.id_fase = g.fase_id ";
$sql_tab .="LEFT JOIN calendario c  ON c.giornata_id = g.id_giornata ";
$sql_tab .="LEFT JOIN risultati r  ON c.id_calendario = r.calendario_id ";
$sql_tab .="LEFT JOIN squadre s on s.id_squadra = r.squadra_id ";
$sql_tab .="WHERE g.fase_id > 2 ";
$sql_tab .="ORDER BY g.id_giornata,c.girone, c.id_calendario,r.luogo ";


if($result = mysqli_query($con,$sql_tab))
{
	$ele = -1;
    $tmp_fase = 0; 
    $tmp_giornate = 0; 
    $tmp_calendario = 0;
    $tmp_scontri = 0;
    $count_g = -1;
    
	while($row = mysqli_fetch_assoc($result))
	{
    	if($tmp_fase != $row['fase_id']){
        
        	$count_g++;
            
            $tmp_fase = $row['fase_id'];          
            $tmp_giornate = $row['id_giornata'];
            $tmp_scontri = $row['partecipanti']/2;
            
        	$tabellone_[$count_g]['id_fase'] = $row['fase_id'];
            $tabellone_[$count_g]['fase'] = $row['descrizione'];
            
            $ele = -1;
        }
 		if($tmp_giornate == $row['id_giornata'])
        {
          if($tmp_calendario != $row['id_calendario']){
            $tmp_calendario = $row['id_calendario'];
            $ele++;
          }
          if($tmp_calendario != null){

            $tabellone_[$count_g]['partite'][$ele][$row['luogo']]['goals'] = $row['goals'];
            $tabellone_[$count_g]['partite'][$ele][$row['luogo']]['squadra'] = $row['squadra'];
            
          }else{
          
          	for ($x_ = 0; $x_ < $tmp_scontri; $x_++) {
  				$tabellone_[$count_g]['partite'][$x_]['CASA']['goals'] = " ";
            	$tabellone_[$count_g]['partite'][$x_]['CASA']['squadra'] = "????";
            	$tabellone_[$count_g]['partite'][$x_]['TRASFERTA']['goals'] = " ";
            	$tabellone_[$count_g]['partite'][$x_]['TRASFERTA']['squadra'] = "????";
			}
           
          }
        }
	}
    
	echo json_encode(['data'=>$tabellone_]);
}
else
{
	errorMessage('query errata: tabellone ');
}


?>