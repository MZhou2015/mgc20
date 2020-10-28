<?php
/**************************************************************************************/
require('../docs/fn_php_2020march.php'); 
  $db = db_connect();
/****************************************/
$act = "main" ;
if(isset($_GET['act'])) $acc  = $_GET['act']  ;
if($act == "POST") {
    $_POST = json_decode(file_get_contents('php://input'), true);
    foreach ($_POST as $val) {
    echo "$val <br> "; 
      }  
  $res['post'] =$val ;
 }
switch ($act) {
    case "main":
      echo "This is your Main stuff!";
      break;
    case "list":
      echo "Your list Here!";
      break;
    case "green":
      echo "Your favorite color is green!";
      break;
    default:
      echo "Your favorite color is neither red, blue, nor green!";
  }
  $res['action'] = $act; 
  header("content-type: application/json");
  echo json_encode ($res) ;
  die() ; 
?>