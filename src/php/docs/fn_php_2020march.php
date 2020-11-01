<?php
/**************************************************************************************/ 
/********                  Function for all appliation                            *****/ 
/********                  V2.05.1       Mar. 8  2020    Michael                  *****/ 
/**************************************************************************************/ 
function db_connect() {
		$db = new mysqli('localhost','username','password','db_name') or die ("$connection Couldn't connect to server.");
  				if(mysqli_connect_errno())
       				{
           				die("$dbn Connection could not be established");       }
         return $db ;  				
           	} 
function onetoone_ob($tbn,$db,$fl0,$code,$fln) // Fuction 103   
{ 
  $query= "SELECT $fln FROM $tbn WHERE $fl0 = '$code' ";
    $r = $db->query($query);
    $row= $r->fetch_array(); 
    $rw=$row[0];
  return $rw;   
}
/*********/
function onetoall_db($tbn,$db,$fl0,$code )        // Fuction one item for all trans or detail 
{ 
  $query= "SELECT * FROM $tbn WHERE $fl0 = '$code'  ";
  $r = $db->query($query);
     $mtab = array() ;
    while( $row= $r->fetch_assoc() ) 
           { 
             array_push($mtab, $row);
                        } ; 
  return $mtab;   
}
/******************************************************************************************************/ 
/********                  Function for all appliation  II                                        *****/ 
/********                  V2.05.02      Oct. 31         2020    Michael                          *****/ 
/******************************************************************************************************/
function update_onerow($tbn,$fln,$val,$fn0,$code,$db) {               // Fuction Update  for    a flied in one row  
    $sql = "UPDATE $tbn SET $fln ='$val' WHERE $fn0 = '$code' ";
    $r = $db->query($sql);
}
/******************************************************************/
function one_sort_no($tbn,$db,$scol,$fln) // Fuction 103   
{ 
    $query= "SELECT $fln FROM $tbn order by $scol asc ";
    $r = $db->query($query);
    while( $row= $r->fetch_array() ) 
         { 
             $rw = $row[0];  
                }  
   return $rw;   
}
function acc_no_name($fln,$db) // Fuction 103   
{ 
    $query= "SELECT * FROM accounts WHERE type = $fln order by acc_no asc ";
    $r = $db->query($query);
    $mtab = array() ;
    while( $row= $r->fetch_assoc() ) 
         { 
          array_push($mtab, $row);  
                }  
   return $mtab;   
}
/******************************************************************************************************/ 
/********               Blance and income statement function    V2.05.1   Mar.18  2020   Michael  *****/ 
/******************************************************************************************************/
function group_balance($dts,$dte,$type,$db)
{
    $acnn =  acc_no_name($type,$db) ;
    $b = 1 ; 
      switch ($type) {
        case '1':
           $type_name = "Assets" ;
        break;
        case '2':
           $type_name = "Liabilities" ;
            $b = -1 ;
        break;
        case '3':
           $type_name = "Equity" ;
            $b = -1 ;
        break;
        case '4':
           $type_name = "Income" ;
           $b = -1 ;
        break;
        case '5':
           $type_name = "Expense" ;
        break;
                }
    $mtab = array();
      $ssum =0 ;
      $dt='2020-01-02';
    foreach ($acnn as  $value) {
      $maccno = $value['acc_no'];
      $maccname = $value['acc_name'];
      $asumm = subaccount_sum($maccno,$dts,$dte,$db) ;
        $md = round($b*$asumm['sum'],2);
        $value['acc_sum'] = number_format($md,2);
        $value['link'] = '/ledger/'.$maccno ;
        $ssum += $b*$asumm['sum'] ;
        array_push($mtab, $value)  ;
      }
      
    $bal_items['accs']  = $mtab ;
    $bal_items['total'] = $ssum ;
    $bal_items['tn']  = $type_name;
  return $bal_items;
 }
/******************************************************************************************************/ 
/********              a stock Transation   Function    V3.05.1  Aug 23  2020   Michael           *****/ 
/******************************************************************************************************/
function astock_trans($symbol,$dte,$db)          // Fuction fn_103.02_2020   get a  symbol  transations up to date     
{ 
  $qq = " SELECT * FROM stk_trans_items  WHERE description = '$symbol'  order by date  asc " ;
  $result   = $db->query($qq) ;
  $mstk = array();
   $avp = 0;
   $qty = 0 ;
   $gtt = 0;
     // $row= $result->fetch_array(); 
   while($row = $result->fetch_assoc()) 
      {   
        extract($row);
        if( $row['action']  =='DIV' ) { 
            $row['shares'] = $qty ;
            $row['cost'] = "   " ;
        } elseif( $row['action']  =='SELL' )
            { 
             $qty += $row['quantity'] ;
             $row['shares'] = $qty ;
             $row['cost']   = round(-1*$row['quantity']*($row['price'] -$avp),2) ;
             $gtt = $qty*$avp ;
                }
             else  {
             $qty += $row['quantity'] ;
             $gtt += -1*$row['NetAmt'] ;
             $row['cost']   = round($gtt/$qty , 3) ; 
              $avp = $row['cost'] ;
             $row['shares'] = $qty ;
               }
           
           array_push($mstk , $row)  ;
         
      }
   $symb = $mstk ;            
   return $symb ;
 }
/****************************************  Functions    Michael Zhou  Mar. 11 2020       **********************************************/ 
 function subaccount_sum($acc,$dts,$dte,$db) // Fuction fn_101.01_2020 get symbol price    
{ 
   $sum = 0 ;
   $mtab = array() ;
   $query= "SELECT * FROM wacc_trans_item WHERE acc_no = '$acc' and date >= '$dts' and date <= '$dte' order by date asc ";
   $result = $db->query($query);
      while($row = $result->fetch_assoc()) 
         {  
            $sum +=  $row['debit'] - $row['credit'] ;
            $row['balance'] =  number_format($sum,2) ;
            array_push($mtab, $row)  ;
          
            }
      $rt['record'] = $mtab ;
      $rt['sum']    = $sum ;
    return $rt ;   
}                
/********************************************************************************************************************************/ 
function getnumberformat($item,$kl) {
			$i = 0;	
      foreach ($item as $val) {
      	$item[$i][$kl]  = number_format($val[$kl], 2) ;
      	   	$i++ ;
      }
      return $item ;
   } 
/****************************************  Functions    Michael Zhou  May 25 2020       **********************************************/ 
 function subacc_income($acc,$dts,$dte,$db) // Fuction fn_101.01_2020 get symbol price    
{ 
  $sum = 0 ;
  $mtab = array() ;
  $query= "SELECT * FROM stk_trans_items WHERE account = '$acc' and date >= '$dts' and date <= '$dte' order by date asc ";
  $result = $db->query($query);
      while($row = $result->fetch_assoc()) 
         { 
             if($row['action'] == "DIV" or $row['action'] == "INT" ) 
             {   
                array_push($mtab, $row)  ;
                $sum  += $row[NetAmt]; 
                 }
         }
   $item['rows'] = $mtab;
   $item['gtotal'] = number_format($sum, 2) ;
 return $item ;
}
/********************************************************************************************************/ 
/********              Functions for Product list or details    V3.02.11   June 28 2020   Michael    ****/ 
/********************************************************************************************************/
function onetrans_db($tbn,$db,$fl0,$code ,$cond)        // Fuction one item for all trans or detail 
{ 
  $query= "SELECT * FROM $tbn WHERE $fl0 = '$code'AND $cond order by date desc limit 0,5 ";
  $r = $db->query($query);
    $mtab = array() ;
    while( $row= $r->fetch_assoc() ) 
           { 
              
              $row['un'] = onetoone_ob("gs_user",$db,"id",$row['customer_id'],"company") ;   //  fn_php_2020march.php  line 13
             array_push($mtab, $row);
                        } ; 
  return $mtab;   
                      }
?>
