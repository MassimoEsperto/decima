<?php

require_once '../config/connect_local.php';
//require_once '../config/validate.php';
require_once '../common/classifica_ranking.php';
require_once '../common/info_competizione.php';
    
//dichiarazione variabili	
$gironi = [];

//ripescaggio
$pos_ripescabili = $info_["POSIZIONE_GIRONE"]["RIPESCABILE"]; //ha diritto a un possibile ripescaggio
$pos_qualificate = $info_["POSIZIONE_GIRONE"]["QULIFICATE"]; //ha diritto al turno successivo
$pos_spareggi = $info_["POSIZIONE_GIRONE"]["SPAREGGI"]; // ha diritto allo spareggio

$tmp_ripescabili = [];
$ripescate = [];
$num_ripescate =  $info_["NUMERO_RIPESCATE"];

$condizione_qualificata = $info_["CONDIZIONE_GIRONE"]["QUALIFICATA"];
$condizione_spareggio = $info_["CONDIZIONE_GIRONE"]["SPAREGGIO"];
$condizione_eliminata = $info_["CONDIZIONE_GIRONE"]["ELIMINATA"];

$avatar_eliminato = $info_["AVATAR_ELIMINATO"];

//Query ed elaborazioni
//gironi
$sql1 = "SELECT r.squadra_id as id,sum(r.goals) as tot_goal,sum(r.punti) as tot_pt,c.girone, ";
$sql1 .="((AVG(r.goals)*3)+AVG(r.punti))*10 as factory,s.squadra,a.nome as avatar,u.id_utente ";
$sql1 .="FROM giornate g ";
$sql1 .="JOIN calendario c ON c.giornata_id = g.id_giornata  ";
$sql1 .="JOIN risultati r ON r.calendario_id = c.id_calendario ";
$sql1 .="JOIN squadre s ON s.id_squadra = r.squadra_id ";
$sql1 .="JOIN utenti u ON u.id_utente = s.utente_id ";
$sql1 .="JOIN avatar a ON a.id_avatar = s.avatar_id ";
$sql1 .="WHERE g.fase_id = 1 and (g.is_calcolata = 1 or g.id_giornata = 1) ";
$sql1 .="GROUP BY r.squadra_id ORDER BY c.girone,tot_pt DESC,factory DESC ";


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
        $item['factory'] = $row['factory'];
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
    if ($val1['factory'] == $val2['factory']) return 0;
  #check if not equal, then compare values
    return ($val1['factory'] < $val2['factory']) ? 1 : -1;
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

$totObj=['data'=>$myObj];

$myJSON = json_encode($totObj);
echo $myJSON;

?>