<?php
require_once '../config/connect_local.php';
require_once '../common/turno.php';
require_once '../config/decode.php';
require_once '../config/post_data.php';

$id_calendario = mysqli_real_escape_string($con, (int)($dati->id_calendario));
$casa = $dati->CASA;
$trasferta = $dati->TRASFERTA;

$id_squadra_t = mysqli_real_escape_string($con, (int)($trasferta->id_squadra));
$id_ris = mysqli_real_escape_string($con, (int)($trasferta->id_risultato));


$schieramento_t = $trasferta->schieramento;
$schieramento_c = $casa->schieramento;

$switchs = [];

//switchs
$sql1 = "SELECT l.id_calciatore,l.nome_calciatore,l.nickname,l.ruolo,l.icona ";
$sql1 .="FROM rose my ";
$sql1 .="INNER JOIN lista_calciatori l on l.id_calciatore = my.calciatore_id  ";
$sql1 .="WHERE my.squadra_id={$id_squadra_t} AND  my.calciatore_id not in  ";
$sql1 .="(SELECT f.calciatore_id FROM formazioni f  ";
$sql1 .="INNER JOIN risultati r  ON f.risultato_id = r.id_risultato  ";
$sql1 .="INNER JOIN calendario c ON c.id_calendario = r.calendario_id AND c.id_calendario = {$id_calendario} ) ";
$sql1 .="ORDER BY l.ruolo DESC,my.ordine ";

if($result = mysqli_query($con,$sql1))
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
        
     $lent=count($schieramento_t);
     $lenc=count($schieramento_c);
     $lens=count($switchs);
     //effettua il cambio
        
        for($i=0;$i<$lens;$i++){
        	$matchs=$switchs[$i];
            
        	 for($j=0;$j<$lent;$j++){
             	$matcht=$schieramento_t[$j];
                
                if($matcht->ruolo==$matchs['ruolo']){
                  for($x=0;$x<$lenc;$x++){
                      $matchc=$schieramento_c[$x];
                          if($matchc->id==$matcht->id){
                        
                              $schieramento_t[$j]->id = $matchs['id'];
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
    
$sh=1;
foreach($schieramento_t as $item) 
{
    $id_calciatore = mysqli_real_escape_string($con, (int)($item->id));
	
	$sql2 .= "REPLACE INTO formazioni(risultato_id, schieramento, calciatore_id) ";
	$sql2 .= "VALUES ({$id_ris}, {$sh}, {$id_calciatore}); ";
	$sh++;
}

if ($turno_['periodo'] != 2) 
{
	errorMessage('Non è possibile modificare formazioni per questa data!');
} 
else 
{
	if ($con->multi_query($sql2) === TRUE) 
	{
		$ritono = [
					 'stato' => $con->affected_rows,
                     'risposta' =>  'OK'
					];
		echo json_encode(['data'=>$ritono]);
	} 
	else 
	{
        errorMessage('valori sballati');
	}
}

?>