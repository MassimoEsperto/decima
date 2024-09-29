<?php
require_once '../config/connect_local.php';
require_once '../config/decode.php';
require_once '../common/turno.php';
$tabelle = "lista_calciatori order by nome_calciatore"; 
require_once '../common/all_objects.php';

//variabili
$squadre_utente = [];
$squadre_fanta = [];
$sel_l = "(''";
$sel_a = "(''";

$sql1 = "SELECT id_squadra,squadra,account,lega,stato_id,tipo FROM squadre WHERE utente_id = {$id_utente} ";

if($result = mysqli_query($con,$sql1))
{
	$ele = 0;		
    $sep = ",";
	while($row = mysqli_fetch_assoc($result))
	{
		
          $squadre_utente[$ele]['id_squadra'] = $row['id_squadra'];
          $squadre_utente[$ele]['squadra'] = $row['squadra'];
          $squadre_utente[$ele]['account'] = $row['account'];
          $squadre_utente[$ele]['lega'] = $row['lega'];
          $squadre_utente[$ele]['stato'] = $row['stato_id'];
          $squadre_utente[$ele]['tipo'] = $row['tipo'];
          
          $ele++;
          
          
          $sel_a .=$sep . "'" . $row['account'] . "'";
          $sel_l .=$sep . "'" . $row['lega'] . "'";
          //$sep = ",";
	}
}
else
{
    errorMessage('query errata: squadre ' . $sql1);
}

$sel_a .=")";
$sel_l .=")";

$sql2  ="SELECT l.nome,l.account,l.calciatore_id,c.nome_calciatore,c.ruolo ";
$sql2 .="FROM leghe l ";
$sql2 .="LEFT JOIN lista_calciatori c on c.id_calciatore = l.calciatore_id ";
$sql2 .="WHERE l.nome in {$sel_l} AND l.account in {$sel_a} ";
$sql2 .="ORDER BY l.nome,l.account,c.ruolo desc ";

if($result = mysqli_query($con,$sql2))
{
	$ele = 0;		
	while($row = mysqli_fetch_assoc($result))
	{
        
          $squadre_fanta[$ele]['calciatore_id'] = $row['calciatore_id'];
          $squadre_fanta[$ele]['nome_calciatore'] = $row['nome_calciatore'];
          $squadre_fanta[$ele]['ruolo'] = $row['ruolo'];
          $squadre_fanta[$ele]['account'] = $row['account'];
          $squadre_fanta[$ele]['selected'] = true;
         
          
          $ele++;
	}
}
else
{
    errorMessage('query errata: calciatori attuali');
}


//risultato
$myObj->squadre = $squadre_utente;
$myObj->fanta = $squadre_fanta;
$myObj->turno = $turno_;
$myObj->lista_calciatori = $oggetti_['lista_calciatori order by nome_calciatore'];

$totObj=['data'=>$myObj];

$myJSON = json_encode($totObj);
echo $myJSON;

?>