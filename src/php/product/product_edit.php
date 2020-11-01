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
      $res['list'] = $data1 ;
      break;
    case "POST":
      $_POST = json_decode(file_get_contents('php://input'), true);
            foreach ($_POST as $val) {
            echo "$val <br> "; 
            }  
      $res['post'] =$val ;
      break;
    default:
    $res['feedback'] = " Nothing Happen here" ; 
  }
  $res['action'] = $act; 
  header("content-type: application/json");
  echo json_encode ($res) ;
  die() ; 
?>