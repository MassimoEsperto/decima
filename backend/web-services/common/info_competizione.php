<?php

$info_= [];

$sql_info = "SELECT * FROM info_competizione";

if($result = mysqli_query($con,$sql_info))
{
	$valore = '';
    $ele=0;
    $cursore = '';
    
	while($row = mysqli_fetch_assoc($result))
	{
    	$valore = $row['tipo'] == "INT" ? (int) $row['valore'] : $row['valore'];
        
    	if($row['sub_tab'] != null){
        
        	if($row['isArray'] == 1){
            	$ele = $cursore == $row['sub_tab'] ? $ele : 0;
        		$info_[$row['tab']][$row['sub_tab']][$ele] = $valore;
                $cursore = $row['sub_tab'];
                $ele++;
            }else{
            	$info_[$row['tab']][$row['sub_tab']] = $valore;
            }
       
       }else{
        	$info_[$row['tab']] = $valore;
        }
	}

}


?>