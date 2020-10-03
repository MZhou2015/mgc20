<?php
/********************************************************************************************************/
/***                  Function  A3.11.02                               V3.11.02                       ***/
/***                   Read and write a file                                  Michael  Feb 17  2020   ***/
/********************************************************************************************************/
$data = file("http://www.luxkaraokeshop.com/test/dxvgi/activity.txt") ;
$trans = array();
$i = 0;
foreach ($data as  $value) {
  $dd = explode(",",$value);
   $d1 = explode("/",$dd[0]);
   $dt = $d1[2]."-".$d1[0]."-".$d1[1];
     $trans['key'][$i][0] = $dt;
     $trans['key'][$i][1] = $dd[1] ;
     if($dd[2] == "") $dd[2] = 0 ;
     if($dd[3] == "") $dd[3] = 0 ;
     $trans['key'][$i][2] = $dd[2] ;
     $trans['key'][$i][3] = $dd[3] ;
     $d2 = explode("\\",$dd[4]);
       $trans['key'][$i][4] = $d2[0] ;
     $i++ ;
    }
header("content-type: application/json");
 echo json_encode($trans) ;
?>

