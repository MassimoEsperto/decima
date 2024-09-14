<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://leghe.fantacalcio.it/fittiziainfinita/rose',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'App_key: 0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a',
    'User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.15) Gecko/20080623 Firefox/2.0.0.15',
    'Cookie: FCLeague=0=63ofH%2bkfxEnjFbQ1Q66SkwLayHL9S8CCmm%2fvZhZJ5%2bOvB5v7jb36rV5EdthHILsO7hqyf3JxKBa3s828gy%2b4s8GSFqMi4WRRFghMTh2xcL1IYMkimpXA%2bZSUg1BqiNsXo1SZyAVBiU1moe%2fUW6zCl1ViAAUAq13I4avtWBp1fAFVdT3PCx0C3r6bQl5JQZD1GGHt3mqS76U%2bS672fwb2K%2b6NJCPaX%2fJoSB4y1LvE1c8L%2bpNkH9%2fKoe9TYJFNuUj%2bMtvIXWdkVaGrx9npwu6CoPszatpuwwM%2fPmj0rYU%2f0YojHwu2o5qMY7mVXO16z9qrcCNY2Z6RSRhiYk%2fDkWn8NOtStHGRk2E1YI9sPPu%2f5u0%2biXG1%2fEyZeuSixIk0Z9aKoSxhY2clKmUCnYrK%2f9yWidDTxSxt6Tb%2f4dzPc%2fzcHDNWBt67GP1FqYfhEZoMT3%2bjrdkNOsrqCW7H0hFAAnuP17Qrsp1mE4Kw; comp_fittiziainfinita_FCLeague=0=206774; AWSALB=DHKKY8TM8GyItWb26tFT8KcAYSdEXCBHzbr7CbOif+qpGU56ocKhsxajBoBmc3xTh+hUiuaUEY9UDHs7l4+RvEgXhdxNfsUDWL2P+mvnp/jkFlmdxXbjx8LkM9HO; AWSALBCORS=DHKKY8TM8GyItWb26tFT8KcAYSdEXCBHzbr7CbOif+qpGU56ocKhsxajBoBmc3xTh+hUiuaUEY9UDHs7l4+RvEgXhdxNfsUDWL2P+mvnp/jkFlmdxXbjx8LkM9HO'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
