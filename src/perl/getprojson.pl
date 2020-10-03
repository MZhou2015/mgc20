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
my $query  = "SELECT close FROM stk_price_tock WHERE symbol = 'AAPL' and date =  '2020-03-04'   ";
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
my @symbol =('MFC.TO','BCE.TO','HBM.TO','ENB','SQ','DAL','WFC','MCD','DIA','XDV.TO','CCL','UBER','AAPL','TPR','IRBT','PPL.TO','BA','AB','FB','BMO');
my $site = "https://query1.finance.yahoo.com/v7/finance/download/";

my $sitend = "&interval=1d&events=history";
my @symbol =('MFC.TO','HBM.TO','FB','BMO','SPXS') ;
     ## $time  = 1559071077;## $time1 = 1590693477;

 foreach my $stk (@symbol) {
    $url = $site.$stk."?period1=".$time."&period2=".$time1.$sitend ;
    $content=webquery::getpage("$url");
     
########################################################################3
while( $content =~/(\d\d\d\d-\d\d.*?),(.*?),(.*?),(.*?),(.*?),.*?     #1                                          /xsg)
  { 
print "$1 xx $2 YY $3 ZZ $4 WW $5 \n </br>" ;
 $query  = "INSERT INTO stk_price_tock (symbol,date,open,high,low,close) VALUES ('$stk','$1',$2,$3,$4,$5) ";
 print "$query <br>" ;
 ## $sth = $dbh->prepare($query);
 my $c = $dbh->do( $query) ;
 ## $sth->execute();

}
#####################################
   }
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
