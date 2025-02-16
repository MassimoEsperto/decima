<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
// db credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'miagenda');
define('DB_PASS', '');
define('DB_NAME', 'my_miagenda');


// Connect with the database.
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

//error message
function errorMessage($emessage) {
  header("HTTP/1.1 500 Internal Server Error");
  header('Content-Type: application/json; charset=UTF-8');
  die(json_encode(array('message' => $emessage, 'code' => 400)));
}

$con = connect();

$base_link_cup = "https://miagenda.altervista.org/WorldWideFantashit/ShitCup";
$avatar_eliminato = "ELIMINATO";

define('LOOKUP', [
    'RUOLI' => [
        'GHOST' => 1,
        'PLAYER' => 2,
        'ADMIN' => 3
    ],
    'FASI' => [
        'ISCRIZIONE' => 1,
        'MERCATO' => 2,
        'COMPETIZIONE' => 3
    ],
    'TURNI' => [
        'GIRONI' => 1,
        'SPAREGGI' => 2,
        'OTTAVI' => 3,
        'QUARTI' => 4,
        'SEMIFINALE' => 5,
        'FINALE' => 6
    ],
    'SALDO' => [
        'DEBITO' => 1,
        'PAGANTE' => 2
    ],
    'STATI' => [
        'REGISTRATA' => 1,
        'ISCRITTA' => 2,
        'ELIMINATA' => 3,
        'VINCITRICE' => 4
    ],
    'FRAZIONI' => [
        'PREPARTITA' => 1,
        'INCORSO' => 2,
        'POSTPARTITA' => 3
    ],
    'MODULI' => [
        'DCCAA' => 1,
        'DDCAA' => 2,
        'DDCCA' => 3,
        'PDDCA' => 4,
        'PDCCA' => 5,
        'PDCAA' => 6,
        'NNNNN' => 7
    ],
    'CONDIZIONE_GIRONE' => [
        'QUALIFICATA' => 1,
        'SPAREGGIO' => 2,
        'ELIMINATA' => 3
    ]
]); //echo LOOKUP['RUOLI']['PLAYER']; 

