<?php
require_once '../config/connect_local.php';
require_once '../common/turno.php';
require_once '../config/decode.php';

//variabili
$moduli = [];
$convovabili = [];
$indisponibili = [];
$switchs = [];
$id_risultato = 0;
$luogo = "";
$schierata = [];



$sql1 = "SELECT m.id_modulo,m.valore,m.bonus,m.indice ";
$sql1 .="FROM _moduli m ";

if($result = mysqli_query($con,$sql1))
{
	while($row = mysqli_fetch_assoc($result))
	{
		
         $moduli[$row['valore']]['id'] = $row['id_modulo'];
         $moduli[$row['valore']]['bonus'] = $row['bonus'];
		 $moduli[$row['valore']]['descrizione'] = $row['indice'];
	}
}
else
{
    errorMessage('query errata: moduli');
}

/*
$sql2 = "SELECT l.id_calciatore,l.nome_calciatore,l.nickname,l.ruolo,l.icona, ";
$sql2 .="r.modulo_id,r.luogo,f.schieramento,a.calciatore_id as inibito,r.id_risultato,my.ordine ";
$sql2 .="FROM rose my ";
$sql2 .="INNER JOIN lista_calciatori l on l.id_calciatore = my.calciatore_id ";
$sql2 .="INNER JOIN calendario c ON c.giornata_id = {$turno_['giornata']} ";
$sql2 .="INNER JOIN risultati r  ON c.id_calendario = r.calendario_id AND r.squadra_id=my.squadra_id ";
$sql2 .="LEFT JOIN formazioni f ON my.calciatore_id=f.calciatore_id AND f.risultato_id = r.id_risultato ";
$sql2 .="INNER JOIN risultati s  ON c.id_calendario = s.calendario_id AND s.squadra_id!=my.squadra_id ";
$sql2 .="LEFT JOIN rose a ON my.calciatore_id=a.calciatore_id AND a.squadra_id=s.squadra_id AND s.luogo = 'CASA' ";
$sql2 .="WHERE my.squadra_id={$id_squadra} ORDER BY l.ruolo DESC ";

if($result = mysqli_query($con,$sql2))
{
	$ele = 0;
    $ind = 0;
    $frm = 0;
	while($row = mysqli_fetch_assoc($result))
	{
		 if($row['inibito'] == null){
           $rosa[$ele]['id'] = $row['id_calciatore'];
           $rosa[$ele]['nome'] = $row['nome_calciatore'];
           $rosa[$ele]['nickname'] = $row['nickname'];
           $rosa[$ele]['icona'] = $row['icona'];
           $rosa[$ele]['tipo'] = $row['ruolo'];
           $rosa[$ele]['modulo'] = $row['modulo_id'];
           $rosa[$ele]['luogo'] = $row['luogo'];
           $rosa[$ele]['percentuale'] = '0%';  
           $rosa[$ele]['selected'] = $row['schieramento'] != null;
		   $rosa[$ele]['ordine'] = $row['ordine'];

           if($rosa[$ele]['selected']){
              $schierata[$frm]['id'] = $row['id_calciatore'];
              $schierata[$frm]['nome'] = $row['nome_calciatore'];
              $schierata[$frm]['nickname'] = $row['nickname'];
              $schierata[$frm]['icona'] = $row['icona'];
              $schierata[$frm]['tipo'] = $row['ruolo'];
              $frm++;
           }
           $ele++;
           
         }else{
         	$indisponibili[$ind]['id'] = $row['id_calciatore'];
            $indisponibili[$ind]['nome'] = $row['nome_calciatore'];
            $indisponibili[$ind]['nickname'] = $row['nickname'];
            $indisponibili[$ind]['icona'] = $row['icona'];
         	$indisponibili[$ind]['tipo'] = $row['ruolo'];
            $ind++;
         }
         $id_risultato = $row['id_risultato'];
	}
}
else
{
    errorMessage('query errata: convocabili ' .$sql2);
}
*/

$sql2 = "SELECT l.id_calciatore,l.nome_calciatore,l.nickname,l.ruolo,l.icona, ";
$sql2 .="r.modulo_id,r.luogo,f.schieramento,a.calciatore_id as doppione, ";
$sql2 .="r.id_risultato,my.ordine,r.luogo ";
$sql2 .="FROM rose my ";
$sql2 .="INNER JOIN lista_calciatori l on l.id_calciatore = my.calciatore_id ";
$sql2 .="INNER JOIN calendario c ON c.giornata_id = {$turno_['giornata']} ";
$sql2 .="INNER JOIN risultati r  ON c.id_calendario = r.calendario_id AND r.squadra_id=my.squadra_id ";
$sql2 .="LEFT JOIN formazioni f ON my.calciatore_id=f.calciatore_id AND f.risultato_id = r.id_risultato ";
$sql2 .="INNER JOIN risultati s  ON c.id_calendario = s.calendario_id AND s.squadra_id!=my.squadra_id ";
$sql2 .="LEFT JOIN rose a ON my.calciatore_id=a.calciatore_id AND a.squadra_id=s.squadra_id AND s.luogo = 'CASA' ";
$sql2 .="WHERE my.squadra_id={$id_squadra} ORDER BY l.ruolo DESC,my.ordine ASC";

if($result = mysqli_query($con,$sql2))
{
	$ele = 0;
    $frm = 0;
    $doppione="";
	while($row = mysqli_fetch_assoc($result))
	{
    	   $doppione = $row['doppione'] != null ? "*" : "";
           
           $rosa[$ele]['id'] = $row['id_calciatore'];
           $rosa[$ele]['nome'] = $row['nome_calciatore'];
           $rosa[$ele]['nickname'] = $row['nickname'] . $doppione;
           $rosa[$ele]['icona'] = $row['icona'];
           $rosa[$ele]['tipo'] = $row['ruolo'];
           $rosa[$ele]['modulo'] = $row['modulo_id'];
           $rosa[$ele]['luogo'] = $row['luogo'];
           $rosa[$ele]['percentuale'] = '0%';  
           $rosa[$ele]['selected'] = $row['schieramento'] != null;
		   $rosa[$ele]['ordine'] = $ele+1;
           $rosa[$ele]['duplicated'] = $row['doppione'] != null;

           if($rosa[$ele]['selected']){
              $schierata[$frm]['id'] = $row['id_calciatore'];
              $schierata[$frm]['nome'] = $row['nome_calciatore'];
              $schierata[$frm]['nickname'] = $row['nickname'] . $doppione;
              $schierata[$frm]['icona'] = $row['icona'];
              $schierata[$frm]['tipo'] = $row['ruolo'];
              $schierata[$frm]['duplicated'] = $row['doppione'] != null;
              $frm++;
           }
           $ele++;
           
         $id_risultato = $row['id_risultato'];
         $luogo = $row['luogo'];
	}
}
else
{
    errorMessage('query errata: convocabili ' .$sql2);
}




//risultato
$myObj->moduli = $moduli;
$myObj->rosa = $rosa;
$myObj->schierata = $schierata;
$myObj->id_risultato = $id_risultato;
$myObj->luogo = $luogo;


$totObj=['data'=>$myObj];

$myJSON = json_encode($totObj);
echo $myJSON;

?>