#!/usr/bin/perl -w
use strict;
use warnings;
use lib '/home2/gecontec/public_html/magento/mgc20/src/perl/webmod';
use webquery;
use URI::Escape;
use Time::Local;       ##// for convert to timestamp
webquery::newcookie();
use DBI;               ##// import modules for DataBase function
use JSON;              ## imports encode_json, decode_json, to_json and from_json.
#############################################################################
print"Content-type:text\html \n\n";
print"<html><body>";
## my $dbh = DBI->connect('localhost','gecontec','532_47BH5618.zm','gecontec_gs');
## $dbh->disconnect;
my $dbh = DBI->connect("DBI:mysql:gecontec_gs:localhost",'gecontec','532_47BH5618.zm');

my ($from, $to, $fdate, $tdate, $fnear, $tnear, $sub_clear, $sub_insert);
my ($query, $url, $content);
   $fdate= '21.09.2020  08:30:00';
my $time = gtimestamp($fdate) ;
my $now_string = localtime; 
 print "$time    Date:  $now_string <br>" ;    
my $ttx  =  date_iso($now_string) ;
my $time1 = gtimestamp($ttx) ;  
##############################################

my $paar;
my $ik = 0 ;
my @jd ;
my $filename = '../jsn.json';
open(FH, '>', $filename) ;

print FH "[\n" ;
my $qq  = "SELECT * FROM gs_product WHERE remark =98 order  by ptcode asc";
 ## print " $key  =>  $dd <br>" ;
my $cc ; 
my %sym2;
my $i = 0;
my %curr ;
my  $sth = $dbh->prepare($qq);
    $sth->execute();
   
   while (my $result = $sth->fetchrow_hashref()) {
          my $act = $result->{ptcode} ;
       $paar->{code}[$ik] = $act;
      my $res = getarowdb($act,$dbh) ;  ## load sub routering on line 72
       if($ik >0 ) { print FH ",\n"; }
       print FH '{"ptcode":"' ;
       print FH $result->{ptcode} ;
       print FH '","model":"' ;
       print FH $result->{model} ;
       print FH '","image":"' ;
       print FH $res->{image} ;
       print FH '","brief":"' ;
       print FH $res->{brief} ;
       print FH '","rprice":"' ;
       print FH $res->{rprice} ;
        print FH '",';
        print FH "\n";
       print FH '"description":"' ;
        
       print FH $res->{description} ;
       print FH '",';
         writedescrip($res->{description});
      print FH ",\n";
      print FH '"specification":"' ;  ## strart Specifications 
      print FH $res->{specification} ;
       print FH '",' ;
       print FH "\n";            ## End of  Specifications
       writespecify($res->{specification});
       print FH '"note":"' ;    ## strart note 
       print FH $res->{note} ;
       print FH '"}'; 
      
         $ik++ ;
       }
############################################################################# 
 my @arr = (1, 2, 'Hello');
 $arr[3] = "hello" ;
 print "<br>";
 my $jssn = encode_json $paar ;
 print $jssn ;
#####################################
print FH "\n]" ;
close(FH);
# Disconnect from the database.
$dbh->disconnect();   
print '</body>
      </html>';
################################
sub writedescrip{
    my $ds_string = shift ;
    my $string_len = length($ds_string);
        if ( $string_len > 3) {
             print FH  "\n";
           print FH '"descrp":{"here":true,"feature":[';
           my @ls = split('xx', $ds_string);
           my $jk = 0;
              foreach(@ls) {
                  if($jk >0 ) { print FH ","; }
                 print FH  '"';
                 print FH  "$_ ,";
                print FH  '"';
                 $jk++;
                   }
         print FH " ]}";
      } else {
          print FH '"descrp":{"here":false }';
          print "\n";  
    }
}
################################
sub writespecify{
    my $ds_string = shift ;
    my $string_len = length($ds_string);
     if ( $string_len > 6) {
           print FH '"speciff":{"here":true,"feature":[';
           my @ls = split('xx', $ds_string);
           my $jk = 0;
              foreach(@ls) {
                  if($jk >0 ) { print FH ","; }
                my @svl =   split('yy', $_);
                print FH "\n{";
                print FH '"name":"' ;
                print FH " $svl[0]";
                print FH '","sval":"';
                print FH "$svl[1] " ;
                 print FH '"}' ;
                  $jk++;
                   }
         print FH " ]},\n";
      }
}
################################
sub getarowdb{
  my $cdn = shift ;
  my $dbk = shift;
  my $qur  = "SELECT * FROM gs_product_info WHERE ptcode = '$cdn' ";
  my  $sth = $dbk->prepare($qur) or die "Couldn't prepare the query: $sth->errstr";
      $sth->execute() or die "Couldn't execute query: $dbh->errstr";;
  my $val ;
  while (my $result = $sth->fetchrow_hashref()) {
        $val =  $result ;
     }
  
   $sth->finish;
  return $val;
}

################################
sub gtimestamp {
  my $date = shift ;
  my ($mday,$mon,$year,$hour,$min,$sec) = split(/[\s.:]+/, $date);
  my $stamp = timelocal($sec,$min,$hour,$mday,$mon-1,$year);
  return $stamp ;
} 
################################
sub date_iso {
   my $ndate = shift ;
   my %months=(Jan=>'01', Feb=>'02', Mar=>'03', Apr=>'04', May=>'05', Jun=>'06', Jul=>'07', Aug=>'08', Sep=>'09', Oct=>10, Nov=>11, Dec=>12);
   my ($mday,$mon,$dd,$hour,$yy) = split(/[\s]+/, $ndate);
   my $mm = $months{$mon} ;
  
   my $ddt = $dd.".".$mm.".".$yy." $hour";
  return $ddt; 
}
