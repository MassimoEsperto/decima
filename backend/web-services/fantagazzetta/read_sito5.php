<?php

$sito_fanta='https://leghe.fantacalcio.it/fittiziainfinita/rose';

$fp = fsockopen ($sito_fanta, 443, $errno, $errstr, 30);
if (!$fp) {
    echo "$errstr ($errno)<br>\n";
} else {
    fputs ($fp, "GET / HTTP/1.0\r\nHost: leghe.fantacalcio.it\r\n\r\n");
    while (!feof($fp)) {
        echo fgets ($fp,128);
    }
    fclose ($fp);
}
?>