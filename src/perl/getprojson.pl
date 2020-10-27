#!/usr/bin/perl -w
use strict;
use warnings;
use lib '/home2/gecontec/public_html/magento/mgc20/src/perl/webmod';
use webquery;
use URI::Escape;
use Time::Local;       ##// for convert to timestamp
webquery::newcookie();
use DBI;               ##// for convert to timestamp
#############################################################################
print"Content-type:text\html \n\n";
print"<html><body>";
## my $dbh = DBI->connect('localhost','gecontec','532_47BH5618.zm','gecontec_gs');
## $dbh->disconnect;
my $dbh = DBI->connect("DBI:mysql:gecontec_gs:localhost",'gecontec','532_47BH5618.zm');
my $query  = "SELECT close FROM stk_price_tock WHERE symbol = 'AAPL' and date =  '2020-03-04' ";
print " $query <br>" ;
my $sth = $dbh->prepare($query);
$sth->execute();
my $result = $sth->fetchrow_hashref();
print "Value returned: $result->{close}\n </br>";

my ($from, $to, $fdate, $tdate, $fnear, $tnear, $sub_clear, $sub_insert);
my ($query, $url, $content);
   $fdate= '21.09.2020  08:30:00';
my $time = gtimestamp($fdate) ;
my $now_string = localtime; 
    
my $ttx  =  date_iso($now_string) ;
my $time1 = gtimestamp($ttx) ;  
##########################################
my $paar;
my $ik = 0 ;
my $filename = '../jsn.json';
open(FH, '>', $filename) ;
print("File $filename opened successfully!\n");
print FH "[\n" ;
my $qq  = "SELECT * FROM gs_product WHERE remark > 100 order  by remark desc";
 ## print " $key  =>  $dd <br>" ;
my $cc ; 
my %sym2;
my $i = 0;
my %curr ;
my  $sth = $dbh->prepare($qq);
    $sth->execute();
   
   while (my $result = $sth->fetchrow_hashref()) {
          my $act = $result->{ptcode} ;
      
       print $result->{remark} ;
       print FH '{"ptcode":' ;
       print FH $result->{remark} ;
       print FH ',"ramark":' ;
       print FH $act ;
       print FH "},\n" ;
     
       $ik++ ;
       }
############################################################################# 
## my $jssn = encode_json $paar ;
## print $js ;
#####################################

print FH "\n]" ;
close(FH);
# Disconnect from the database.
$dbh->disconnect();   
print '</body>
      </html>';
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
