<?php
/**************************************************************************************/
require('../docs/fn_php_2020march.php'); 
  $db = db_connect();
/****************************************/
$act = "main" ;
if(isset($_GET['act'])) $act = $_GET['act']  ;

switch ($act) {
    case "main":
      echo "This is your Main stuff!";
      break;
    case "list":
      $tbn = "gs_product" ;
      $fl0 = "remark" ;
      $code =  112 ;
      $data1 = onetoall_db($tbn,$db,$fl0,$code ) ;       // Fuction one index for all @ line 22 fn_php2020march .php 
      $tbn2 = "gs_product_info" ;
      $i = 0 ;
   foreach ( $data1 as $value) {
      $cd1 =  $value['ptcode'] ;
      $fln = "image" ;
      $v1  =  onetoone_ob($tbn2,$db,"ptcode", $cd1,$fln) ;
      $v2  =  onetoone_ob($tbn2,$db,"ptcode", $cd1,"brief") ;
      $v3  =  onetoone_ob($tbn2,$db,"ptcode", $cd1,"note" ) ;
      $data1[$i]['image'] = $v1 ;
      $data1[$i]['"brief'] = $v2 ;
      $data1[$i]['note'] = $v3 ;
      $i++;
          }  
  $res['list'] = $data1 ;
  break;
case "POST":
  $_POST = json_decode(file_get_contents('php://input'), true);
   $code = $_POST['ptcode'] ;
   $tbn ="gs_product" ;
        foreach ($_POST as $key =>$val) {
        update_onerow($tbn,$key,$val,"ptcode",$code,$db) ;    //  @ line 37  fn_php2020march .php 
        }  
  $res['post'] ="data  updated!" ;
      break;
    default:
    $res['feedback'] = " Nothing Happen here" ; 
  }
  $res['action'] = $act; 
  header("content-type: application/json");
  echo json_encode ($res) ;
  die() ; 
?>