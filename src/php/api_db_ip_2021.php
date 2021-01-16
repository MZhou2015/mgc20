<?php
/**************************************************************************************/
/***                   Developed         by   Michael  Dec 15,2020                  ***/
/**************************************************************************************/
require('fn_php_2020march.php'); 
  $db = db_connect();
  if(isset($_GET['acc_at'])) $acc  = $_GET['acc_at']  ;
/****************************************************/  
if (!empty($_SERVER['HTTP_CLIENT_IP']))   
  {
    $ip_address = $_SERVER['HTTP_CLIENT_IP'];
  }
//whether ip is from proxy
elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))  
  {
    $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
  }
//whether ip is from remote address
else
  {
    $ip_address = $_SERVER['REMOTE_ADDR'];
  }
 $ptcode = "E17100" ;
if($acc == "pritem")  $ptcode = $_GET['pcode'] ;
$ip_server = $_SERVER['SERVER_ADDR']; 
/**********      one Product    ***/

 $clk =  onetoone_ob("gs_product",$db,"ptcode",$ptcode,"click"); 
 $clk = $clk+1;
 update_onerow("gs_product","click",$clk,"ptcode",$ptcode,$db);   
// Printing the stored address
/*********   stroe the viewer ip to database   *****/
$tdy = date("Y-m-d");
$tn = date("h:i:sa");
/*******************   check the user ip times     ***/
   $query= "SELECT * FROM gs_viewip WHERE ip = '$ip_address' and date = '$tdy' ";
   $r = $db->query($query);
   $rw = 0;
   while( $row= $r->fetch_array() ) 
         { 
             $rw = $row[0]; 
             $vs = $row['visits'] + 1 ;
                } 
    if($rw > 3) update_onerow("gs_viewip","visits",$vs,"item",$rw,$db);
         else {
           $qq = "INSERT INTO  gs_viewip (ip,time,date)  VALUES    ('$ip_address','$tn','$tdy')";
           $result   = $db->query($qq) ;   
            }
  
/***************************************************/
/***********************************************/  
   $user = "Gecon Test";
   $res['acc'] = $acc ;
   $res['get'] = $user ;
/*********************************************************************/  
header("content-type: application/json");
echo json_encode($res) ;
die() ;
?>