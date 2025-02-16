<?php
require_once '../config/connect_local.php';
require_once '../common/turno.php';
require_once '../config/decode.php';
    
//dichiarazione variabili	
$risultati = [];
$match_in_corso;
$statistiche = [];
$schieramento = [];
$percorso = [];
$switchs = [];

for ($i = 0; $i <= 4; $i++)
{
	$schieramento['CASA']['formazione'][$i]['nome'] = "-";
    $schieramento['CASA']['formazione'][$i]['calciatore'] = "-";
    $schieramento['CASA']['formazione'][$i]['ruolo'] = "";
    $schieramento['CASA']['formazione'][$i]['voto'] = "";
    
    $schieramento['TRASFERTA']['formazione'][$i]['nome'] = "-";
    $schieramento['TRASFERTA']['formazione'][$i]['calciatore'] = "-";
    $schieramento['TRASFERTA']['formazione'][$i]['ruolo'] = "";
    $schieramento['TRASFERTA']['formazione'][$i]['voto'] = "";
}

//inizializzo a 0 nel caso fossero null
$match = 0;


//Query ed elaborazioni
if($turno_['periodo'] == 3)
{

  //risultati
  $sql1 = "SELECT g.id_giornata,DATE_FORMAT(g.prima_partita,'%d/%m/%Y') AS data_giornata,g.serie_a,g.turno_id, ";
  $sql1 .="c.girone,c.id_calendario,r.luogo,r.somma,r.goals,s.squadra,a.nome as avatar,g.is_calcolata "; 
  $sql1 .="FROM giornate g  ";
  $sql1 .="INNER JOIN calendario c  ON c.giornata_id = g.id_giornata ";
  $sql1 .="INNER JOIN risultati r  ON c.id_calendario = r.calendario_id ";
  $sql1 .="INNER JOIN squadre s on s.id_squadra = r.squadra_id ";
  $sql1 .="INNER JOIN utenti u on u.id_utente = s.utente_id ";
  $sql1 .="INNER JOIN avatar a on a.id_avatar = s.avatar_id ";
  $sql1 .="WHERE g.id_giornata = {$turno_['giornata']} ";
  $sql1 .="ORDER BY g.id_giornata,c.girone, c.id_calendario,r.luogo ";


  if($result = mysqli_query($con,$sql1))
  {
      $ele = -1;
      $tmp_giornata = 0; 
      $tmp_calendario = 0;

     while($row = mysqli_fetch_assoc($result))
     {
     	$risultati['giornata'] = $row['id_giornata'];
        $risultati['data'] = $row['data_giornata'];
        $risultati['serie_a'] = $row['serie_a'];
        $risultati['turno'] = $row['turno_id'];
        $risultati['calcolato'] = $row['is_calcolata'];

        if($tmp_calendario != $row['id_calendario']){
            $tmp_calendario = $row['id_calendario'];
            $ele++;
        }
        $risultati['partite'][$ele]['id_calendario'] = $tmp_calendario;
       	$risultati['partite'][$ele]['girone'] = $row['girone'];

       	$risultati['partite'][$ele][$row['luogo']]['somma'] = $row['somma'];
       	$risultati['partite'][$ele][$row['luogo']]['goals'] = $row['goals'];
        $risultati['partite'][$ele][$row['luogo']]['squadra'] = $row['squadra'];
        $risultati['partite'][$ele][$row['luogo']]['avatar'] = $row['avatar'];

      }
  }
  else
  {
      errorMessage('query errata: risultati ' .$sql1);
  }

}


if($turno_['frazione'] != 3)
{

  //match in corso
  $sql2 = "SELECT c.id_calendario,c.giornata_id,r2.luogo,r2.squadra_id,s.squadra,a.nome,u.id_utente ";
  $sql2 .="FROM calendario c "; 
  $sql2 .="LEFT JOIN risultati r  ON c.id_calendario = r.calendario_id AND r.squadra_id = {$id_squadra} ";
  $sql2 .="LEFT JOIN risultati r2  ON c.id_calendario = r2.calendario_id AND r2.calendario_id =  r.calendario_id  ";
  $sql2 .="LEFT JOIN squadre s on s.id_squadra = r2.squadra_id ";
  $sql2 .="LEFT JOIN utenti u on u.id_utente = s.utente_id ";
  $sql2 .="LEFT JOIN avatar a on a.id_avatar = s.avatar_id ";
  $sql2 .="WHERE c.giornata_id = ({$turno_['giornata']}) ORDER BY r2.luogo ";


  if($result = mysqli_query($con,$sql2))
  {
      $ele = 0;
      
       $match_in_corso['CASA']['id_utente'] = 0;
       $match_in_corso['CASA']['id_squadra'] = 0;
       $match_in_corso['CASA']['squadra'] = '';
       $match_in_corso['CASA']['avatar'] = 'MERDINA';
       $match_in_corso['TRASFERTA']['id_utente'] = 0;
       $match_in_corso['TRASFERTA']['id_squadra'] = 0;
       $match_in_corso['TRASFERTA']['squadra'] = '';
       $match_in_corso['TRASFERTA']['avatar'] = 'MERDINA';
       $match_in_corso['ESISTENTE'] = false;
       $match_in_corso['CASA']['schieramento'] = [];
       $match_in_corso['TRASFERTA']['schieramento'] = [];
      
      while($row = mysqli_fetch_assoc($result))
      {

          $match_in_corso['id_calendario'] = $row['id_calendario'];
          $match_in_corso['giornata'] = $row['giornata_id'];
          
          if($row['squadra_id'] != null)
          {
            $match_in_corso[$row['luogo']]['id_squadra'] = $row['squadra_id'];
            $match_in_corso[$row['luogo']]['id_utente'] = $row['id_utente'];
            $match_in_corso[$row['luogo']]['squadra'] = $row['squadra'];
            $match_in_corso[$row['luogo']]['avatar'] = $row['nome'];

            $match_in_corso['ESISTENTE'] = true;
  		  }
          $match = $row['id_calendario'];
          $ele++;
      }

  }
  else
  {
      errorMessage('query errata: prossimo match ' . $sql2);
  }


 // if($turno_['periodo'] == 1)
 // {
    
    $sql3 = "SELECT c.girone,r.luogo,r.squadra_id,r.somma,r.goals,l.id_calciatore,l.nickname,l.ruolo,l.nome_calciatore, ";
    $sql3 .="m.descrizione,s.squadra,f.schieramento,f.voto,u.id_utente ";
    $sql3 .="FROM calendario c "; 
    $sql3 .="INNER JOIN risultati r  ON c.id_calendario = r.calendario_id  ";
    $sql3 .="LEFT JOIN formazioni f ON f.risultato_id = r.id_risultato ";
    $sql3 .="LEFT JOIN lista_calciatori l on l.id_calciatore = f.calciatore_id "; 
    $sql3 .="LEFT JOIN _moduli m on m.id_modulo = r.modulo_id ";
    $sql3 .="LEFT JOIN squadre s on s.id_squadra = r.squadra_id ";
    $sql3 .="LEFT JOIN utenti u on u.id_utente = s.utente_id ";
    $sql3 .="WHERE id_calendario = {$match} ORDER BY r.luogo,f.schieramento ";

    if($result = mysqli_query($con,$sql3))
    {

      $cs = 0;
      $tr = 0;
      $count = 0;
      while($row = mysqli_fetch_assoc($result))
      {

        $count = $row['luogo'] == 'CASA' ? $cs : $tr ;
        $cs = $row['luogo'] == 'CASA' ? $cs+1 : $cs ;
        $tr = $row['luogo'] == 'TRASFERTA' ? $tr+1 : $tr ;

        $schieramento[$row['luogo']]['id_squadra'] = $row['squadra_id'];
        $schieramento[$row['luogo']]['id_utente'] = $row['id_utente'];
        $schieramento[$row['luogo']]['somma'] = $row['somma'];
        $schieramento[$row['luogo']]['goals'] = $row['goals'];
        $schieramento[$row['luogo']]['squadra'] = $row['squadra'];
        $schieramento[$row['luogo']]['modulo'] = $row['descrizione'];
		if($row['nickname']!= ''){
          $schieramento[$row['luogo']]['formazione'][$count]['id_calciatore'] = $row['id_calciatore'];
          $schieramento[$row['luogo']]['formazione'][$count]['nome'] = $row['nickname'];
          $schieramento[$row['luogo']]['formazione'][$count]['calciatore'] = $row['nome_calciatore'];
          $schieramento[$row['luogo']]['formazione'][$count]['ruolo'] = $row['ruolo'];
          $schieramento[$row['luogo']]['formazione'][$count]['voto'] = $row['voto'];
        }

      }
		$match_in_corso['CASA']['schieramento'] = $schieramento['CASA']['formazione'];
        $match_in_corso['TRASFERTA']['schieramento'] = $schieramento['TRASFERTA']['formazione'];
    }
    else
    {
        errorMessage('query errata: schieramenti ' .$sql3);
    }

  //}
  
   if($turno_['frazione'] == 1)
 	{
   
    //switchs questa serve da un altra parte.. in questa parte servesolo tutta la rosa
    $sql6 = "SELECT l.id_calciatore,l.nome_calciatore,l.nickname,l.ruolo,l.icona ";
    $sql6 .="FROM rose my ";
    $sql6 .="INNER JOIN lista_calciatori l on l.id_calciatore = my.calciatore_id  ";
    $sql6 .="WHERE my.squadra_id={$id_squadra} AND  my.calciatore_id not in  ";
    $sql6 .="(SELECT f.calciatore_id FROM formazioni f  ";
    $sql6 .="INNER JOIN risultati r  ON f.risultato_id = r.id_risultato  ";
    $sql6 .="INNER JOIN calendario c ON c.id_calendario = r.calendario_id AND c.giornata_id = {$turno_['giornata']} ";
    $sql6 .="AND c.id_calendario IN (SELECT r.calendario_id FROM risultati r WHERE r.squadra_id = {$id_squadra})) ";
    $sql6 .="ORDER BY l.ruolo DESC,my.ordine ";

    if($result = mysqli_query($con,$sql6))
    {
        $ele = 0;
        while($row = mysqli_fetch_assoc($result))
        {
               $switchs[$ele]['id'] = $row['id_calciatore'];
               $switchs[$ele]['nome'] = $row['nome_calciatore'];
               $switchs[$ele]['nickname'] = $row['nickname'];
               $switchs[$ele]['icona'] = $row['icona'];
               $switchs[$ele]['ruolo'] = $row['ruolo'];  
               $ele++;
        }
        
        $lent=count($match_in_corso['TRASFERTA']['schieramento']);
        $lenc=count($match_in_corso['CASA']['schieramento']);
        $lens=count($switchs);
        //effettua il cambio
        for($i=0;$i<$lens;$i++){
        	$matchs=$switchs[$i];
        	 for($j=0;$j<$lent;$j++){
             	$matcht=$match_in_corso['TRASFERTA']['schieramento'][$j];
                if($matcht['ruolo']==$matchs['ruolo']){
                  for($x=0;$x<$lenc;$x++){
                      $matchc=$match_in_corso['CASA']['schieramento'][$x];
                          if($matchc['id_calciatore']==$matcht['id_calciatore']){
                              $match_in_corso['TRASFERTA']['schieramento'][$j] = $matchs;
                          }
                   }
                 }
        	 }
        }
        
    }
    else
    {
        errorMessage('query errata: switchs ');
    }
  }
}



//statistiche
$sql4 = "select count(*) as total,s.stato_id,  ";
$sql4 .="sum(if(r.punti = 3, 1, 0)) as win,sum(if(r.punti = 1, 1, 0)) as par, ";
$sql4 .="sum(if(r.punti = 0, 1, 0)) as lose,sum(r.goals) as goals, ";
$sql4 .="((AVG(r.goals)*3)+AVG(r.punti))*10 as ranking ";
$sql4 .="FROM giornate g  ";
$sql4 .="INNER JOIN calendario c  ON c.giornata_id = g.id_giornata ";
$sql4 .="INNER JOIN risultati r  ON c.id_calendario = r.calendario_id AND r.squadra_id = {$id_squadra} ";
$sql4 .="INNER JOIN squadre s on s.id_squadra = r.squadra_id ";
$sql4 .="INNER JOIN utenti u on u.id_utente = s.utente_id ";
$sql4 .="WHERE is_calcolata = 1 ";


if($result = mysqli_query($con,$sql4))
{

	while($row = mysqli_fetch_assoc($result))
	{
    	if($row['total'] != 0)
        {
          $statistiche['total'] 	= (int)$row['total'];
          $statistiche['stato'] 	= (int)$row['stato_id'];
          $statistiche['win'] 		= (int)$row['win'];
          $statistiche['par'] 		= (int)$row['par'];
          $statistiche['lose'] 		= (int)$row['lose'];
          $statistiche['goals'] 	= (int)$row['goals'];
          $statistiche['ranking'] 	= (int)$row['ranking']>10?str_replace(".","",substr($row['ranking'],0,3)):1;
		}else
        {
          $statistiche['total'] 	= 0;
          $statistiche['stato'] 	= 2;
          $statistiche['win'] 		= 0;
          $statistiche['par'] 		= 0;
          $statistiche['lose'] 		= 0;
          $statistiche['goals'] 	= 0;
          $statistiche['ranking'] 	= 0;
          
        }
	}
    
}
else
{
	errorMessage('query errata: statistiche ' .$sql4);
}


//percorso
$sql5 = "SELECT g.id_giornata,g.turno_id, ";
$sql5 .="c.id_calendario,r2.luogo,r2.somma,r2.goals,s.squadra,s.id_squadra,a.nome as avatar,u.id_utente "; 
$sql5 .="FROM giornate g  ";
$sql5 .="INNER JOIN calendario c  ON c.giornata_id = g.id_giornata ";
$sql5 .="INNER JOIN risultati r  ON c.id_calendario = r.calendario_id AND r.squadra_id = {$id_squadra} ";
$sql5 .="INNER JOIN risultati r2  ON c.id_calendario = r2.calendario_id AND r2.calendario_id =  r.calendario_id ";
$sql5 .="INNER JOIN squadre s on s.id_squadra = r2.squadra_id ";
$sql5 .="INNER JOIN utenti u on u.id_utente = s.utente_id ";
$sql5 .="INNER JOIN avatar a on a.id_avatar = s.avatar_id ";
$sql5 .="WHERE g.is_calcolata = 1 ORDER BY g.turno_id,g.id_giornata,c.id_calendario,r.luogo ";


if($result = mysqli_query($con,$sql5))
{
	$ele = -1;
    $tmp_turno = 0; 
    $tmp_calendario = 0;
    $count_g = -1;
    
	while($row = mysqli_fetch_assoc($result))
	{
    	if($tmp_turno != $row['turno_id']){
        	$count_g++;
            $tmp_turno = $row['turno_id'];
        	$percorso[$count_g]['turno'] = $row['turno_id'];
            $ele = -1;
        }
 		
        if($tmp_calendario != $row['id_calendario']){
          $tmp_calendario = $row['id_calendario'];
          $ele++;
        }
		
        $percorso[$count_g]['partite'][$ele]['giornata'] = $row['id_giornata'];
     
        $percorso[$count_g]['partite'][$ele][$row['luogo']]['somma'] = $row['somma'];
        $percorso[$count_g]['partite'][$ele][$row['luogo']]['goals'] = $row['goals'];
        $percorso[$count_g]['partite'][$ele][$row['luogo']]['squadra'] = $row['squadra'];
        $percorso[$count_g]['partite'][$ele][$row['luogo']]['avatar'] = $row['avatar'];
        $percorso[$count_g]['partite'][$ele][$row['luogo']]['is_player'] = $row['id_utente'] == $id_utente;
 
	}
}
else
{
	errorMessage('query errata: percorso ' .$sql5);
}
    
    

//risultato
$myObj->turno = $turno_;
$myObj->risultati = $risultati;
$myObj->match = $match_in_corso;
$myObj->statistiche = $statistiche;
$myObj->percorso = $percorso;

//da eliminare
$myObj->id_squadra = $id_squadra;



$totObj=['data'=>$myObj];

$myJSON = json_encode($totObj);
echo $myJSON;

?>