<?php

require_once '../config/connect_local.php';
//require_once '../config/validate.php';
require_once '../common/info_competizione.php';
require_once '../common/classifica_ranking.php';
require_once '../common/tabellone.php';
    
//dichiarazione variabili	
$gironi = [];

//ripescaggio
$pos_ripescabili = $info_["posizione_girone"]["RIPESCABILE"]; //ha diritto a un possibile ripescaggio
$pos_qualificate = $info_["posizione_girone"]["QULIFICATE"]; //ha diritto al turno successivo
$pos_spareggi = $info_["posizione_girone"]["SPAREGGI"]; // ha diritto allo spareggio

$tmp_ripescabili = [];
$ripescate = [];
$num_ripescate =  $info_["numero_ripescate"];

$condizione_qualificata = LOOKUP['CONDIZIONE_GIRONE']['QUALIFICATA'];
$condizione_spareggio = LOOKUP['CONDIZIONE_GIRONE']['SPAREGGIO'];
$condizione_eliminata = LOOKUP['CONDIZIONE_GIRONE']['ELIMINATA'];

$avatar_eliminato = $info_["avatar_eliminato"];

//Query ed elaborazioni
//gironi
$sql1 = "SELECT r.squadra_id as id,sum(r.goals) as tot_goal,sum(r.punti) as tot_pt,c.girone, ";
$sql1 .="AVG(r.ranking)*10 as ranking,s.squadra,a.nome as avatar,u.id_utente ";
$sql1 .="FROM giornate g ";
$sql1 .="JOIN calendario c ON c.giornata_id = g.id_giornata  ";
$sql1 .="JOIN risultati r ON r.calendario_id = c.id_calendario ";
$sql1 .="JOIN squadre s ON s.id_squadra = r.squadra_id ";
$sql1 .="JOIN utenti u ON u.id_utente = s.utente_id ";
$sql1 .="JOIN avatar a ON a.id_avatar = s.avatar_id ";
$sql1 .="WHERE g.turno_id = 1 and (g.is_calcolata = 1 or g.id_giornata = 1) ";
$sql1 .="GROUP BY r.squadra_id ORDER BY c.girone,tot_pt DESC,ranking DESC ";


if($result = mysqli_query($con,$sql1))
{
	$ele = -1;
    $item = [];
    $teams = [];
    $gir=" ";
	while($row = mysqli_fetch_assoc($result))
	{
 		if($gir!=$row['girone']){
        	if($ele>=0){
              $gironi[$ele]['girone']=$gir;
              $gironi[$ele]['teams']=$teams;
              $teams = [];
            }
            $gir=$row['girone'];
            $ele++;
        }
		
		$item['id_squadra'] = $row['id'];
        $item['id_utente'] = $row['id_utente'];
        $item['squadra'] = $row['squadra'];
		$item['punti'] = $row['tot_pt'];
		$item['gol'] = $row['tot_goal'];
        $item['avatar'] = $row['avatar'];
        $item['ranking'] = $row['ranking'];
        $item['posizione'] = count($teams) + 1;
        $item['condizione'] =  in_array($item['posizione'], $pos_qualificate) ? $condizione_qualificata : $condizione_eliminata;
		$item['condizione'] =  in_array($item['posizione'], $pos_spareggi) ? $condizione_spareggio : $item['condizione'];

 
        array_push($teams, $item);
        
        if (in_array($item['posizione'], $pos_ripescabili)) {
             array_push($tmp_ripescabili, $item);
        }
	}
    
      $gironi[$ele]['girone']=$gir;
      $gironi[$ele]['teams']=$teams;

}
else
{
	errorMessage('query errata: classifica gironi ');
}





//aggiorna la posizione del ripescaggio

function DescSort($val1,$val2)
{
  #check if both the values are equal
    if ($val1['ranking'] == $val2['ranking']) return 0;
  #check if not equal, then compare values
    return ($val1['ranking'] < $val2['ranking']) ? 1 : -1;
}

usort($tmp_ripescabili,'DescSort');

for($x=0;$x<$num_ripescate;$x++)
{
 	array_push($ripescate, $tmp_ripescabili[$x]['id_squadra']);
}

for($i=0;$i<count($gironi);$i++)
{
 	for($y=0;$y<count($gironi[$i]['teams']);$y++)
	{
       if (in_array($gironi[$i]['teams'][$y]['id_squadra'], $ripescate)) {
               //$gironi[$i]['teams'][$y]['posizione'] = 2;
               $gironi[$i]['teams'][$y]['condizione'] = $condizione_spareggio;
          }
	}
 
}





//risultato
$myObj->gironi = $gironi;
$myObj->ranking = $ranking_;
$myObj->info = $info_;
$myObj->tabellone = $tabellone_;

$totObj=['data'=>$myObj];

$myJSON = json_encode($totObj);
echo $myJSON;

?>