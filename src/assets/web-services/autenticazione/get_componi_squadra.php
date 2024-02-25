<?php
require_once '../config/connect_local.php';
require_once '../common/info_competizione.php';
require_once '../common/squadre.php';

$id_squadra = $_GET['id_squadra'];

//listone
$sql = "SELECT c.id_calciatore,c.nome_calciatore,c.nickname,c.ruolo,c.valore,r.calciatore_id,s.stato_id,s.squadra ";
$sql .="FROM lista_calciatori c  "; 
$sql .="LEFT JOIN rose r ON r.calciatore_id = c.id_calciatore AND r.squadra_id = {$id_squadra} ";
$sql .="LEFT JOIN squadre s ON s.id_squadra = r.squadra_id ";
$sql .="WHERE (c.valore > 1 OR c.ruolo = 'P') AND c.ruolo IN ('A','C','D','P') ORDER BY ruolo DESC,c.nickname ASC";

$listone = [];
$svincolati = [];
$rosa_attuale = [];
$squadra = "";

if($result = mysqli_query($con,$sql))
{
    $i = 0;
    $s = 0;
    
	while($row = mysqli_fetch_assoc($result))
	{
        $svincolati[$i]['id'] = $row['id_calciatore'];
        $svincolati[$i]['nome'] = $row['nome_calciatore'];
        $svincolati[$i]['nickname'] = $row['nickname'];
        $svincolati[$i]['ruolo'] = $row['ruolo'];
        $svincolati[$i]['valore'] = (int)$row['valore'];
        $svincolati[$i]['selected'] = $row['id_calciatore'] == $row['calciatore_id'];
        $svincolati[$i]['disabled'] = $row['stato_id'] > 1 ;
        
        if($row['id_calciatore'] == $row['calciatore_id']){
          	$rosa_attuale[$s]['id'] = $row['id_calciatore'];
          	$rosa_attuale[$s]['nome'] = $row['nome_calciatore'];
          	$rosa_attuale[$s]['nickname'] = $row['nickname'];
          	$rosa_attuale[$s]['ruolo'] = $row['ruolo'];
          	$rosa_attuale[$s]['valore'] = (int)$row['valore'];
          	$rosa_attuale[$s]['selected'] = false;
          	$rosa_attuale[$s]['disabled'] = $row['stato_id'] > 1 ;
            
          	if($row['squadra'] != null){
          		$squadra = $row['squadra'];
			}
            
          $s++;
        }
  
      	$ele++;
        $i++;
        
	}
}
else
{
	errorMessage('query errata: listone');
}

//crediti
$crediti = (int)$info_['CREDITI_DISPONIBILI'];




//risultato
$myObj->crediti = $crediti;
$myObj->squadre = $squadre_;
$myObj->squadra = $squadra;
$myObj->svincolati = $svincolati;
$myObj->rosa_attuale = $rosa_attuale;



$totObj=['data'=>$myObj];

$myJSON = json_encode($totObj);

echo $myJSON;

?>