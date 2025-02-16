<?php
    
//dichiarazione variabili	
$squadre_ = [];

//Query ed elaborazioni
//all squadre
$sql_squadre = "SELECT u.id_utente,u.username,s.id_squadra,s.squadra,s.avatar_id,s.lega,u.email, ";
$sql_squadre .="s.account,s.is_default,r.id_ruolo,r.valore as ruolo, ";
$sql_squadre .="s.stato_id,ss.valore as stato,s.saldo_id,o.valore as saldo  ";
$sql_squadre .="FROM utenti u ";
$sql_squadre .="INNER JOIN squadre s ON s.utente_id = u.id_utente ";
$sql_squadre .="LEFT JOIN _ruoli r ON u.ruolo_id = r.id_ruolo ";
$sql_squadre .="LEFT JOIN _stati_squadre ss ON s.stato_id = ss.id_stato ";
$sql_squadre .="LEFT JOIN _saldo o ON s.saldo_id = o.id_saldo ";

$sql_squadre .="ORDER BY id_utente ASC,s.id_squadra ASC ";


if($result = mysqli_query($con,$sql_squadre))
{
	$ele = 0;
	while($row = mysqli_fetch_assoc($result))
	{
		$squadre_[$ele]['id_squadra'] = (int)$row['id_squadra'];
		$squadre_[$ele]['squadra'] = $row['squadra'];
		$squadre_[$ele]['id_avatar'] = (int)$row['avatar_id'];
		$squadre_[$ele]['lega'] = $row['lega'];
		$squadre_[$ele]['account'] = $row['account'];
		$squadre_[$ele]['is_default'] = $row['is_default'];
		$squadre_[$ele]['id_utente'] = (int)$row['id_utente'];
        $squadre_[$ele]['username'] = $row['username'];
        $squadre_[$ele]['email'] = $row['email'];
        
        $squadre_[$ele]['id_ruolo'] = (int)$row['id_ruolo'];
		$squadre_[$ele]['ruolo'] = $row['ruolo'];
        $squadre_[$ele]['id_stato'] = (int)$row['stato_id'];
        $squadre_[$ele]['stato'] = $row['stato'];
        $squadre_[$ele]['id_saldo'] = (int)$row['saldo_id'];
        $squadre_[$ele]['saldo'] = $row['saldo'];
       
		$ele++;
	}
   
}


?>