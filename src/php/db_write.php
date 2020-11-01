<?php
/**************************************************************************************/
/***                  Function  A21  Connect to DataBase               V2.01        ***/
/***                   Log Out  for fill in tables           Michael  March  2014   ***/
/**************************************************************************************/
$db = new mysqli('localhost','user name','password ','db_name') or die ("$connection Couldn't connect to server.");
  if(mysqli_connect_errno())
       {
           die("$dbn Connection could not be established");       } 
/**************************************************************************************/  
$data = $_POST;
$_POST = json_decode(file_get_contents('php://input'), true);
  $col = "trans_no,date, acc_no,referance,debit,credit,cid,comment ";
  $tbn = "wacc_trans_item" ;  
foreach ($_POST as $val) {
   add_data($tbn,$val,$col,$db);  // load function  @line 27 # code...
 }  
     

/********************************  Function for this page     ********/ 
    function add_data($tbn,$val,$col,$db)    {
     
          $a1 = $val['No'] ;   
          $a2 = $val['date'] ; 
          $a3 = $val['acc_no'] ; 
          $a4 = $val['refer'] ;
          $a5 = $val['Credit'] ;   
          $a6 = $val['Debit'] ; 
          $a7 = $val['uid'] ;
          $a8 = $val['Comment'] ; 

         
        $qq = "INSERT INTO $tbn ($col) 
                         VALUES    ($a1,'$a2',$a3,'$a4',$a6,$a5,$a7,'$a8')";
        $result   = $db->query($qq) ;
                }
/**************************************************************************************/ 
   $mtab = array() ;
   $res['gt'] = $ga ;
    $res['rows'] = $mtab ; 
                    
 $db->close ;
  header("content-type: application/json");
  echo json_encode ($_POST) ;
  die() ;                    
?>
