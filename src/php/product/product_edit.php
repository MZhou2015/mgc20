<?php
/**************************************************************************************/
require('../docs/fn_php_2020march.php'); 
  $db = db_connect();
/****************************************/
$act = "main" ;
if(isset($_GET['act'])) $acc  = $_GET['act']  ;
switch ($act) {
    case "main":
      echo "Your favorite color is red!";
      break;
    case "blue":
      echo "Your favorite color is blue!";
      break;
    case "green":
      echo "Your favorite color is green!";
      break;
    default:
      echo "Your favorite color is neither red, blue, nor green!";
  }

?>