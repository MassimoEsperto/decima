<?php

require_once '../config/connect_local.php';

$lega = 'fittiziainfinita';// $_GET['lega'];

if(trim($lega) === '')
{
    die('valori non prelevati'. mysqli_error($con));
}

$url_fanta = 'https://leghe.fantacalcio.it/servizi/V1_LegheFormazioni/Pagina?id_comp=375876&r=12&f=12_1700842832932.json' ;

require_once 'read_sito.php';


if(trim($sito_fanta) === '')
{
    die('sito irrangiungibile'. mysqli_error($con));
}


$partecipanti = 0;
$indice = 0;
$formazioni = [];


 echo $sito_fanta;

$home = explode("no-current-competition-team", $sito_fanta);

$page = explode("list-rosters-item", $home[0]);

$arr_length = count($page);

for($i=2;$i<$arr_length;$i++)
{
    
    $singolo_tmp = explode("capitalize", $page[$i]);

    $nome_tmp = explode("media-heading", $singolo_tmp[0]);
    $nome = explode("</", $nome_tmp[1]);
  
  	if(count($singolo_tmp)>1)
    {
   	$formazioni[$indice]['team']=str_replace('">','',str_replace(' ','',$nome[0]));
    
   	for($j=1;$j<count($singolo_tmp);$j++)
   	{
         $singolo = explode("</", $singolo_tmp[$j]);
         
         $player = str_replace('">','',$singolo[0]);
         $player = str_replace('&#39;','',$player);
         $player = str_replace('.','',$player);
         $player = strtoupper($player);
         
         $formazioni[$indice]['lista'][$j-1]=$player;
    }
    
    $indice++;
    
    }
}
//per mariano
//$formazioni[7]['lista'][30]="PEDRO";
//$formazioni[7]['lista'][31]="BONAZZOLI";
echo json_encode(['data'=>$formazioni]);

?>