<?php

$ranking_ = [];

$sql_ranking = "SELECT r.squadra_id as id,AVG(r.ranking)*10 as ranking, ";
$sql_ranking .="s.squadra,a.nome as avatar,s.stato_id,u.id_utente,c.girone ";
$sql_ranking .="FROM giornate g  ";
$sql_ranking .="JOIN calendario c ON c.giornata_id = g.id_giornata  ";
$sql_ranking .="JOIN risultati r ON r.calendario_id = c.id_calendario ";
$sql_ranking .="JOIN squadre s ON s.id_squadra = r.squadra_id ";
$sql_ranking .="JOIN utenti u ON u.id_utente = s.utente_id ";
$sql_ranking .="JOIN avatar a ON a.id_avatar = s.avatar_id ";
$sql_ranking .="WHERE g.is_calcolata = 1 GROUP BY r.squadra_id ORDER BY ranking DESC ";


if($result = mysqli_query($con,$sql_ranking))
{
	$ele = 0;

	while($row = mysqli_fetch_assoc($result))
	{
   		$ranking_[$ele]['posizione'] = $ele + 1;
		$ranking_[$ele]['id_squadra'] = (int)$row['id'];
        $ranking_[$ele]['id_utente'] = (int)$row['id_utente'];
      	$ranking_[$ele]['squadra'] = $row['squadra'];
        $ranking_[$ele]['ranking'] = $row['ranking']>10?str_replace(".","",substr($row['ranking'],0,3)):1;
      	$ranking_[$ele]['avatar'] = $row['stato_id'] == 4 ? $avatar_eliminato : $row['avatar'];
       	$ranking_[$ele]['eliminato'] = $row['stato_id'] == 4 ;
        $ranking_[$ele]['girone'] = $row['girone'];
        $ele++;
       
	}
    
}



?>