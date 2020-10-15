<?php
/**************************************************************************************/
require('../docs/fn_php_2020march.php'); 
  $db = db_connect();
  if(isset($_GET['acc'])) $acc  = $_GET['acc']  ;
/**************************************************************************************/
 $dt120   = "2020-01-01";
 $dt90    = date('Y-m-d', strtotime("- 91 days"));
 $dt61    = date('Y-m-d', strtotime("- 30 days"));
 $dtnow   = date('Y-m-d') ;

 $tbn32  = "wacc_trans_item";
 $scol = "date" ;
 $fln  = $scol ;
 $y_test = one_sort_no($tbn32,$db,$scol,$fln) ;   // Fuction 103 @ fn_php_2020march.php  line 21   
 $dt3    = date('Y-m-d', strtotime("$y_test - 7 days"));

  $scol = "trans_no" ;
  $fln  = $scol ;
  $ytrn = one_sort_no($tbn32,$db,$scol,$fln) ;// Fuction 103  

 $ods = array() ;
if($acc == "invoice") {
      $qq = "SELECT * FROM gs_orders WHERE date > '$dt3' AND (type = 'invs' OR type = 'buy_local' ) order by date";
      $result   = $db->query($qq) ;
       while($row = $result->fetch_assoc()) 
      {   
        extract($row);
        $cName = onetoone_ob("gs_user",$db,"id",$customer_id,"company") ; //  fn_php_2020march.php  line 13  
        array_push($ods ,[$date,$customer_id ,$reference,$type,$amount, $cName])  ;
            }
  }; 
 if($acc == "prolist") {
      /*****************************************************/
     $tbn = "gs_product" ; 
   //  $qq = "select *  from  gs_product order by profit_tot desc limit 0,20 ";
     $psum = array() ;
     $code = array() ;
     $qq = "SELECT ptcode,type FROM gs_inquire_order_items WHERE date > '$dt120' AND date < '$dtnow' ";
    $result   = $db->query($qq) ;
         $mydata = array() ;
         $tc = 1;
      while($row = $result->fetch_assoc()) 
      {   
          extract($row);
            if($type == "sales_s")  
             $code[$ptcode] += 1 ; 
               }
      $tt4m = 0;
      $tt3m = 0;   
      $lnk = 'proDuct/';
     foreach ($code as $key => $value) {
          $ey      = trim($key) ;
          $md      = onetoone_ob($tbn,$db,"ptcode" ,$key,"model" ) ;
          $lkk = $lnk.$key ;
          $instock = onetoone_ob("gs_stock",$db,"ptcode" ,$key,"instock" ) ;
          $gacc =  product_summary($key,$dt120,$dtnow,$db) ;
          $ga90 =  product_summary($key,$dt90,$dtnow,$db) ;
          $ga61 =  product_summary($key,$dt61,$dtnow,$db) ;
          array_push( $gacc ,  $md )  ;
          array_push( $gacc , $ga90[2] );
          array_push( $gacc , $ga61[2] );
          array_push( $gacc , $instock );
          array_push( $gacc , $lkk );
          array_push( $psum , $gacc)  ;
          $tt4m += $gacc[1] ;
          $tt3m += $ga90[1] ;
         }    
    $pcode =  "E23069" ;
    $tbn2 = "gs_product" ;
   usort($psum, 'compare');
      $kl = 1 ;
      $psum =  getnumberformat($psum,$kl) ;
      $tt4m = number_format($tt4m,2) ;
      $tt3m = number_format($tt3m,2) ;
        } // End of if acc= "prolist"
/**************************************************************************************/
 if($acc == "oneitem")  {
    $pcode   =  $_GET['code'] ;
    $lnk = "../myadmin/?hm=product&stask=editone&code=" ;
    $res['name'] =$lnk. $pcode ; 
    $tbn = "gs_product" ;
    $pinfo =  onetoall_db($tbn,$db,"ptcode",$pcode ) ;     //  fn_php_2020march.php  line 22  
    $res['detail']   = $pinfo[0];
    $tbn = "gs_inquire_order_items" ;
    $cond = "( type = 'buy_s' OR type = 'buy_local')  ";
    $trans =  onetrans_db($tbn,$db,"ptcode",$pcode,$cond ) ;      //  fn_php_2020march.php  line 22
    $res['transfer']   = $trans;
    $cond = "type = 'sales_s' ";
    $trans =  onetrans_db($tbn,$db,"ptcode",$pcode,$cond ) ;      //  fn_php_2020march.php  line 22
    $res['sales']   = $trans;
    $res['img'] = onetoone_ob("gs_product_info",$db,"ptcode",$pcode,"image") ;   //  fn_php_2020march.php  line 13
    $size = onetoone_ob("gs_product_info",$db,"ptcode",$pcode,"note") ;   //  fn_php_2020march.php  line 13
    if ($size) {
      $res['nte'] = pro_size($size); 
      $res['freight'] = round(300*$res['nte'] ,2) ;
        
    } else 
      {
        $res['nte'] = "None" ;
         }
 } ;
  $url  = "http://www.gecontech.com/magento/myadmin/docs/image/products/" ;
 /**************************************************************************************/
 if($acc == "catlist1")  {
      $qq = "SELECT * FROM gs_product WHERE remark > 100 order by profit_tot desc ";
      $result   = $db->query($qq) ;
        $mrx = array() ;
     while($row = $result->fetch_assoc()) 
      {   
        extract($row);
       // if($type == "sales_s")
      
       $imgl = onetoone_ob("gs_product_info",$db,"ptcode",$ptcode,"image") ;   //  fn_php_2020march.php  line 13
       $row['pict'] = $url.$imgl ;
       $row['toto'] ="/detail/".$row['ptcode'] ;
        array_push($mrx, $row);
      }
    $res['clist'] = $mrx; 
 };
 /**************************************************************************************/
 /*****     July 6 , 2020                                                       ********/
 /**************************************************************************************/
 if($acc == "detail")  {
      $pcode   =  $_GET['code'] ;
      $qq = "SELECT * FROM gs_product_info WHERE ptcode = '$pcode' ";
      $result   = $db->query($qq) ;
      $mrx = array() ;
     while($row = $result->fetch_assoc()) 
      {   
        extract($row);
       // if($type == "sales_s")
       $url  = "http://www.gecontech.com/magento/myadmin/docs/image/products/" ;
       $imgl = onetoone_ob("gs_product_info",$db,"ptcode",$ptcode,"image") ;   //  fn_php_2020march.php  line 13
       $row['pict'] = $url.$imgl ;
       $row['toto'] ="/detail/".$row['ptcode'] ;
            $pieces = explode("xx", $description);
       $row['description']    = $pieces ; 
      $res['detail'] = $row; 
      }
    
 };
 /**************************************************************************************/
 /*****  for Pre Order   Aug 16 2020         By Michael                         ********/
 /**************************************************************************************/
 if($acc == "preorder")  {
  $qq = "SELECT * FROM gs_stock order by avg_sales desc ";
  $result   = $db->query($qq) ;
      $mydata = array() ;
      $tc = 1;
      $i = 0 ;
      while($row = $result->fetch_assoc()) 
      {   
        extract($row);
        if($avg_sales > 0) {
            $k = 1-$beta ;
         $md  = onetoone_ob("gs_product",$db,"ptcode" ,$ptcode,"model" ) ;
         $mydata[$i][0] = $ptcode ;
         $mydata[$i][1] = $md ;
         $mydata[$i][2] = $avg_sales ; 
         $mydata[$i][3] = $instock ; 
         $mydata[$i][4] = $onway ;
         $demand = round(($k*$avg_sales - $instock - $onway),0) ;
          if($demand < 0)  $demand = 0;
         $mydata[$i][5] = $demand ; 
         $i++ ;   }
               }
    $res['preorder']   = $mydata;      
 }            
 /****************************************************************************************************/
    $user = "14hgtl";
    if($acc == "invoice")  {
    $res['order']  = $ods ; 
    $res['transs']  = $ytrn +1 ; 
     } else {
    $res['totin3m']  = $tt3m ;
    $res['total']    = $tt4m ;
    $res['symbol']   = $psum; 
                    }
 $db->close ;
  $res['acc']   = $acc; 
 header("content-type: application/json");
  echo json_encode ($res) ;
  die() ; 
/**************************************************************************************/ 
/********                  Function for this page                                 *****/ 
/********                  V2.03.1       Mar. 8  2020    Michael                  *****/ 
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
