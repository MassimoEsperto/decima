<?php

$tabellone_ = [];

$sql_tab = "SELECT g.id_giornata,g.fase_id,f.descrizione,f.partecipanti, ";
$sql_tab .="c.id_calendario,r.luogo,s.id_squadra,s.squadra, sum(r.goals) as gol "; 
$sql_tab .="FROM giornate g  ";
$sql_tab .="INNER JOIN fasi f ON f.id_fase = g.fase_id ";
$sql_tab .="LEFT JOIN calendario c  ON c.giornata_id = g.id_giornata ";
$sql_tab .="LEFT JOIN risultati r  ON c.id_calendario = r.calendario_id ";
$sql_tab .="LEFT JOIN squadre s on s.id_squadra = r.squadra_id ";
$sql_tab .="WHERE g.fase_id > 2 ";
$sql_tab .="GROUP BY s.id_squadra,g.fase_id ";
$sql_tab .="ORDER BY g.fase_id, c.id_calendario,r.luogo DESC ";


if($result = mysqli_query($con,$sql_tab))
{
	$ele = -1;
    $tmp_fase = 0;  
    $tmp_calendario = 0;
    $tmp_scontri = 0;
    $count = -1;
    
	while($row = mysqli_fetch_assoc($result))
	{
    	if($tmp_fase != $row['fase_id']){
            
            $tmp_fase = $row['fase_id'];          
            $tmp_scontri = $row['partecipanti']/2;
            $count++;
             
        	$tabellone_[$count]['id_fase'] = $row['fase_id'];
            $tabellone_[$count]['fase'] = $row['descrizione'];
           
            $ele = -1;
        }
 		
        if($tmp_calendario != $row['id_calendario']){
            $tmp_calendario = $row['id_calendario'];
            $ele++;
        }
         
        if($tmp_calendario != null){

           $tabellone_[$count]['partite'][$ele][$row['luogo']]['goals'] = $row['gol'];
           $tabellone_[$count]['partite'][$ele][$row['luogo']]['squadra'] = $row['squadra'];
            
         }else{
          
          	for ($x_ = 0; $x_ < $tmp_scontri; $x_++) {
  				$tabellone_[$count]['partite'][$x_]['CASA']['goals'] = " ";
            	$tabellone_[$count]['partite'][$x_]['CASA']['squadra'] = "????";
            	$tabellone_[$count]['partite'][$x_]['TRASFERTA']['goals'] = " ";
            	$tabellone_[$count]['partite'][$x_]['TRASFERTA']['squadra'] = "????";
			}
           
          }
	}
    
}
