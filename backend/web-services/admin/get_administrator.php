<?php

require_once '../config/connect_local.php';
$tabelle = "lista_calciatori order by nome_calciatore,comunicazioni ORDER BY id_comunicazione DESC,ruoli,_stati_squadre"; 
require_once '../common/all_objects.php';
require_once '../common/utenti.php';
require_once '../common/giornate.php';
require_once '../common/rose.php';
require_once '../common/formazioni.php';
require_once '../common/squadre.php';
require_once '../common/resoconto.php';
    
//dichiarazione variabili	
$calcolato=[];
$recuperate=[];


//Query ed elaborazioni

//giornate calcolate
$sql4 = "SELECT turno_id,is_calcolata,id_giornata FROM giornate GROUP BY id_giornata ORDER BY id_giornata";

if($result = mysqli_query($con,$sql4))
{
	$incalcolate=[];
	$calcolate=[];
    $turno=[];
	$ele_c = 0;
    $ele_i = 0;
    $incalcolate[$ele_i] = 0;
    $turno[$ele_i] = 1;
	while($row = mysqli_fetch_assoc($result))
	{
    	if($row['is_calcolata']==1){
          $calcolate[$ele_c] = (int)$row['id_giornata'];
          $ele_c++;
        }else{
          $incalcolate[$ele_i] = (int)$row['id_giornata'];
          $turno[$ele_i] = (int)$row['turno_id'];
          $ele_i++;
        }
	}
	$calcolato['SI'] = $calcolate;
	$calcolato['NO'] = $incalcolate;
    $calcolato['TURNO'] = $turno[0];
    
}
else
{
	errorMessage('query errata: ultime formazioni inserite');
}



//risultato
$resoconto_['compilate'] = count($squadre_);
$myObj->comunicazioni = $oggetti_['comunicazioni ORDER BY id_comunicazione DESC'];
$myObj->utenti = $utenti_;
$myObj->lista_calciatori = $oggetti_['lista_calciatori order by nome_calciatore'];
$myObj->calcolato = $calcolato;
$myObj->formazioni = $formazioni_;
$myObj->rose = $rose_;
$myObj->giornate = $giornate_;
$myObj->ruoli = $oggetti_['ruoli'];
$myObj->stati_squadre = $oggetti_['_stati_squadre'];
$myObj->squadre = $squadre_;
$myObj->resoconto = $resoconto_;

$totObj=['data'=>$myObj];

$myJSON = json_encode($totObj);

echo $myJSON;

?>