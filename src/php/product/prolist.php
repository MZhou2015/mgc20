<?php
/**************************************************************************************/
require('../docs/fn_php_2020march.php'); 
  $db = db_connect();
  $act = "defult" ;
  if(isset($_GET['act'])) $act  = $_GET['act']  ;
/**************************************************************************************/
 $dt120   = "2020-01-01";
 $dt90    = date('Y-m-d', strtotime("- 91 days"));
 $dt61    = date('Y-m-d', strtotime("- 30 days"));
 $dtnow   = date('Y-m-d') ;
 if($act == "prolist") {
     $qq = "SELECT * FROM gs_category WHERE cat_id < 100 order by cat_id asc ";
     $result   = $db->query($qq) ;
     $mrx = array() ;
     $i = 23;
     $tbn ="gs_category" ;
      while($row = $result->fetch_assoc()) 
        {
             $uc = $row['cat_id'];
             $cond= "WHERE up_cat = $uc order by cat_id asc" ;
             $row['subcd'] = getonemax($tbn, $cond,$db);
             $row['ccd'] ="cnt".$i ;
             $i++;
             array_push($mrx, $row);
          }
 }
/*****************************************************************************************/
   $user = "14hgtl";
   $res['cate']   = $mrx; 
   $res['acc']   = $act; 
 $db->close ;
  header("content-type: application/json");
  echo json_encode ($res) ;
  die() ; 
/**************************************************************************************/ 
/********                  Function for this page                                 *****/ 
/********                  V2.03.1       Mar. 8  2020    Michael                  *****/ 
/**************************************************************************************/ 
function getonemax($tbn, $cond,$db)    {
     $qq = "SELECT * FROM $tbn $cond ";
     $result   = $db->query($qq) ;
          $mrx =array() ;
        while($row = $result->fetch_assoc()) 
         {
            $cat = $row['cat_id'] ;
             $quary  = "SELECT * FROM gs_product WHERE catalog = $cat  order by ptcode asc ";
             $result2   = $db->query($quary) ;
                 $mm = array() ;
             while($rr2 = $result2->fetch_assoc()) 
                  {
                       array_push($mm, $rr2);
                  }
            $row['pinfo'] =$mm ;      
            array_push($mrx, $row);
          }
    return $mrx ;  
    
        }
/**************************************************************************************/ 
function add_data($tbn,$val,$col,$db)    {
       $qq = "INSERT INTO $tbn ($col) VALUES $val ";
       $result   = $db->query($qq) ;
      
    
        }
/**************************************************************************************/ 
function product_summary($pcode,$dt,$dn,$db) {
      $qq = "SELECT * FROM gs_inquire_order_items WHERE ptcode = '$pcode' AND date > '$dt' AND date <= '$dn' ";
      $result   = $db->query($qq) ;
         $i = 0 ;
         $profit = 0.00;
         $qty = 0;
      while($row = $result->fetch_assoc()) 
      {   
        extract($row);
        if($type == "sales_s")
          {
            $profit += $quantity*($price_CAD - $cost_RMB) ;
            $qty    += $quantity ; 
           
        }
       
        $i++ ;
            }
      
      return [$pcode,$profit, $qty] ;
    }   
function compare($x, $y) {
    if ($x[1] < $y[1]) {
        return 1;
    } else if ($x[1] > $y[1]) {
        return -1;
    } else {
        return 0;
    }

}  
/**************************************************/
 function pro_size($size)    {
 $pl = explode("x", $size);
 $vol = $pl[0]*$pl[1]*$pl[2] ;
 $vol = round($vol/1000000000,4) ; 
 return $vol ;
 }
/*****/ 
?>
