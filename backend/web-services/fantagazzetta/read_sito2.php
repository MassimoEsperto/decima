<?php

function leggiSito($domain) {

//variabili
$ui = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 PostmanRuntime/7.28.4';
$username='messomale';
$password='mantovani';
$result='';


$headers = [
    'App_key: 0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a',
	'User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.15) Gecko/20080623 Firefox/2.0.0.15',
 	'Host: leghe.fantacalcio.it',
];


//step1 inizializza
$ch = curl_init(); //start

//step2 Impostiamo le opzioni di questa sessione Curl
curl_setopt($ch,CURLOPT_URL,$domain); //url da chiamare con Curl. La chiamata avverrà in GET
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true); //settato a "True" ci consente di catturare in una stringa la risposta 
curl_setopt($ch,CURLOPT_HEADER, false); //per ignorare gli Header di risposta
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT,10); // tempo massimo, in secondi, entro cui la connessione al server dovrà avvenire
curl_setopt($ch, CURLOPT_TIMEOUT,30); //tempo massimo, in secondi, di esecuzione della chiamata al server
curl_setopt($ch, CURLOPT_USERAGENT, $ui);//Viene utilizzato per impostare uno user agent se ci si vuole "camuffare" da utente reale.
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); //per seguire eventuali redirect
curl_setopt($ch, CURLOPT_MAXREDIRS, 10); //per definire il numero massimo di redirect da seguire
curl_setopt($ch, CURLOPT_FAILONERROR, true); //ritorna stringa di errore
 // digli dove abbiamo trovato il collegamento a questo posto 
//curl_setopt($ch, CURLOPT_REFERER, "https://fanta-asta-live.fantacalcio.it");
//curl_setopt($ch, CURLOPT_ENCODING, 'gzip, deflate, br');
  //curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLINFO_HEADER_OUT, true);



//step3 esecuzione
$call = curl_exec($ch); //effettuare la chiamata

$info = curl_getinfo($ch);



 
if($call === false)
{
    $result = "Errore: ". curl_error($ch)." - Codice errore: ".curl_errno($ch);
}
else
{
    //step5
    $result = $call;
}

echo json_encode(['result'=>$result,'info'=>$info]);

//step4
curl_close($ch); //Chiudiamo la sessione cURL

return $result;

 /*
$username='messomale';
$password='mantovani';


   	 
    $ch = curl_init();
   	curl_setopt($ch, CURLOPT_URL, $domain);
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($ch, CURLOPT_FAILONERROR, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
    
    
    
     
       curl_setopt($ch, CURLOPT_HEADER, true);
       curl_setopt($ch, CURLOPT_HTTPHEADERS,array('Content-Type:text/html; charset=utf-8','User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36','Cookie: comp_fittiziainfinita_FCLeague=0=206774; _fbp=fb.1.1724100537920.934778758847633837; euconsent-v2=CQDmW4AQDmW4AFgAGAITBBFsAP_gAAAAABCYKYtV_G__bXlr8X736ftkeY1f9_h77sQxBhfJk-4FzLvW_JwX32EzNA36tqYKmRIAu3bBIQNlHJDUTVCgaogVrzDMak2coTtKJ6BkiFMRe2dYCF5vmwtj-QKY5vr_93d52R-t_dr83dzyz4Vnv3a9_-a1WJCdA5-tDfv_bROb-9IO9_58v4v8_N_rE2_eT1l_tevp7D9-ctv7_XX-9_fff79Pn_-uB_--CmMAAAoJABgACCmIaADAAEFMREAGAAIKYioAMAAQUxGQAYAAgpiOgAwABBTEhABgACCmJKADAAEFMSkAGAAIKYloAMAAQUxA.f_wAAAAAAAAA; pubtech-cmp-pcstring=0-XXX; _scor_uid=b705be1dd8c84e31a4009eb4a32b7c38; cacheid=1724100557122.82731545069177537; _pbjs_userid_consent_data=4706996264980622; _cc_id=90d6a415e78bdf4a54316a776226965b; panoramaId_expiry=1724705361017; panoramaId=681fe61d58d405a572be89ddb701185ca02ce5cd9f80622be356af28559c77a9; panoramaIdType=panoDevice; tncid=4f9d3da5-1995-4170-b164-588930e33646; _lr_sampling_rate=0; _au_1d=AU1D-0100-001724100896-CDK5RU9T-UQPW; _au_last_seen_iab_tcf=1724100896588; _ga=GA1.2.407366069.1724100897; _gid=GA1.2.396424314.1724100897; FCLeague=0=63ofH%2bkfxEnjFbQ1Q66SkwLayHL9S8CCmm%2fvZhZJ5%2bOvB5v7jb36rV5EdthHILsO7hqyf3JxKBa3s828gy%2b4s5bkIYhFkdHyj5vkaegIKvLgDN%2bpPE80RSRekuQKtR%2bK5BH0MBmcHg9QT2BORMcSy8cXGvOsm8D65nuyl9uJnp%2fI9IMBp6mxlky5jnw1m2FrUCogILXOAm4%2bS672fwb2K%2b6NJCPaX%2fJoSB4y1LvE1c8L%2bpNkH9%2fKoe9TYJFNuUj%2bMtvIXWdkVaGrx9npwu6CoPszatpuwwM%2fPmj0rYU%2f0YojHwu2o5qMY7mVXO16z9qrcCNY2Z6RSRhiYk%2fDkWn8NOtStHGRk2E1YI9sPPu%2f5u0%2biXG1%2fEyZeuSixIk0Z9aKoSxhY2clKmUCnYrK%2f9yWidDTxSxt6Tb%2f4dzPc%2fzcHDNWBt67GP1FqYfhEZoMT3%2bjrdkNOsrqCW7H0hFAAnuP17Qrsp1mE4Kw; comp_fantantonio_FCLeague=0=36365; cto_bidid=YEtbtl9Oa1RYYVZIUzltWjN5MVdyWXVwZHhSb1A1WiUyQnhoV1dReVNvcjJ4QnkxZVBBMkdxWnNtbGdOWU9MQXBTVCUyRlBmUVA1aDRBVEFMWmlDcGdmQVptOWt5TXclM0QlM0Q; AWSALB=P+qK2UeY8RpYF2b1XDmL5y3agDRMQ3G5uUsJFXWEvm156z+eAUEtUxodGH908PaR6rjlg9WR/56IOAUHOWHbKXluwipKkeN+woRqSDdPpYmmtpIjjz4lF51f2HXH; AWSALBCORS=P+qK2UeY8RpYF2b1XDmL5y3agDRMQ3G5uUsJFXWEvm156z+eAUEtUxodGH908PaR6rjlg9WR/56IOAUHOWHbKXluwipKkeN+woRqSDdPpYmmtpIjjz4lF51f2HXH; cto_bundle=QYg4bF9SUWRwcUJvUXklMkJFWEg2eXhTS05Xa29YVVZMUGt0NCUyQkpuZ0djbiUyRmcySVVteWwlMkJQaiUyRmxmNEIlMkZ3cjdxVTRnNW9DOGZiNzJleXNtMXclMkJJbExSckxpTiUyQk1yMzlGJTJGNFNIam94ME9xV1U1VVZWNFc5TkZlYkslMkJ3WDNJNEl2VkVFMEty; __gads=ID=648ac6cc1bed0323:T=1724100557:RT=1724105929:S=ALNI_Ma6UXHVx2hcA1aONOgT32p9mX4X8Q; __gpi=UID=00000e9cb436b3fe:T=1724100556:RT=1724105929:S=ALNI_Mbdl5uv3FnZWmA7Kdamz1FPf18nZg; __eoi=ID=edd27ee653dc5b58:T=1724100556:RT=1724105929:S=AA-AfjYFbZymZb_yFBAByjrkSLWe'));

    
     curl_setopt($ch, CURLOPT_AUTOREFERER, true);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 PostmanRuntime/7.28.4');
	curl_setopt($ch, CURLOPT_TIMEOUT, 30); //timeout after 30 seconds
    
    curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
    
    
    
    //curl_setopt($ch, CURLOPT_HTTPHEADER, array('Host: leghe.fantacalcio.it', 'Content-Type: application/json', 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36') );
 
    $ch = curl_init($domain);
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($ch, CURLOPT_AUTOREFERER, true);
    
   // curl_setopt($ch, CURLOPT_HTTPHEADER, array('Host: leghe.fantacalcio.it', 'Content-Type: application/json', 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36') );
    curl_setopt($ch, CURLOPT_FAILONERROR, true);
    //curl_setopt($ch , CURLOPT_REFERER , $domain);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch , CURLOPT_MAXREDIRS , 0);
    curl_setopt($ch , CURLOPT_HEADER , true);
    curl_setopt($ch, CURLOPT_FORBID_REUSE, true);
    curl_setopt($ch , CURLOPT_FRESH_CONNECT , true);
    curl_setopt($ch , CURLOPT_RETURNTRANSFER , true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36');
  
   	$response_sito = curl_exec($ch);
    $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);   //get status code
    echo $status_code;
    $info_sito = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);

   if ($response_sito) {
    	curl_close($ch);
   		return $response_sito;
   }else{
    	$error_sito = curl_error($ch);
        $last = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
        curl_close($ch);
        return $error_sito;
   }
      */
  
  

}

$sito_fanta='https://leghe.fantacalcio.it/fittiziainfinita/area-gioco/inserisci-formazione';
$leggi_fanta='';

$leggi_fanta = leggiSito($sito_fanta);


//echo $leggi_fanta;
	

?>