<?php

// Dichiarazione variabili
$lookup_ = [];

$campi = [
    ["label" => "indice", "tipo" => "string"],
    ["label" => "num_p", "tipo" => "number"],
    ["label" => "num_d", "tipo" => "number"],
    ["label" => "num_c", "tipo" => "number"],
    ["label" => "num_a", "tipo" => "number"],
    ["label" => "bonus", "tipo" => "number"],
    ["label" => "partecipanti", "tipo" => "number"],
    ["label" => "quantita", "tipo" => "number"]
];

//$sql_lookup = "SELECT tipo, code, valore, indice, num_p, num_d, num_c, num_a, bonus, partecipanti ";
//$sql_lookup .= "FROM lookup ORDER BY tipo, code";

$sql_lookup = "SELECT id_ruolo as code,'ruoli' as tipo,valore,null as quantita,null as partecipanti,null as indice, ";
$sql_lookup .= "null as num_p,null as num_d,null as num_c,null as num_a,null as bonus FROM _ruoli ";
$sql_lookup .= "UNION ";
$sql_lookup .= "SELECT id_fase as code,'fasi' as tipo,valore,null,null,null,null,null,null,null,null from _fasi ";
$sql_lookup .= "UNION ";
$sql_lookup .= "SELECT id_turno as code,'turni' as tipo,valore,quantita,partecipanti,null,null,null,null,null,null from _turni ";
$sql_lookup .= "UNION ";
$sql_lookup .= "SELECT id_saldo as code,'saldo' as tipo,valore,null,null,null,null,null,null,null,null from _saldo ";
$sql_lookup .= "UNION ";
$sql_lookup .= "SELECT id_stato as code,'stati' as tipo,valore,null,null,null,null,null,null,null,null from _stati_squadre ";
$sql_lookup .= "UNION ";
$sql_lookup .= "SELECT id_frazione as code,'frazioni' as tipo,valore,null,null,null,null,null,null,null,null from _frazioni ";
$sql_lookup .= "UNION ";
$sql_lookup .= "SELECT id_modulo as code,'moduli' as tipo,valore,null,null,indice,num_p,num_d,num_c,num_a,bonus FROM _moduli ";
$sql_lookup .= "UNION ";
$sql_lookup .= "SELECT id_condizione as code,'condizione_girone' as tipo,valore,null,null,null,null,null,null,null,null FROM _condizione_girone  ";

// Esecuzione della query
if ($result = mysqli_query($con, $sql_lookup)) {
    $ele = -1;
    $tipo = '';
    
    // Iterazione sui risultati della query
    while ($row = mysqli_fetch_assoc($result)) {
        // Verifica cambiamento del tipo
        if ($row['tipo'] != $tipo) {
            $ele = 0;
            $tipo = $row['tipo'];
        }

        // Fissi
        $lookup_[$tipo][$ele]['code'] = (int) $row['code'];
        $lookup_[$tipo][$ele]['valore'] = $row['valore'];

        // Dinamici
        foreach ($campi as $campo) {
            if ($row[$campo["label"]] != null) {
                if ($campo["tipo"] == "number") {
                    $lookup_[$tipo][$ele][$campo["label"]] = (int) $row[$campo["label"]];
                } else {
                    $lookup_[$tipo][$ele][$campo["label"]] = $row[$campo["label"]];
                }
            }
        }

        // Incremento dell'indice
        $ele++;
    }
}

?>