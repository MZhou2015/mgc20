var  Account = Vue.component('Account' , 
 { 
  props: ['cab','prod'] ,
  template:  ` <div class="fd1"> 
        <h3> Company Accounting Ledger Entries </h3>  
       
  <!--     <router-link to="#/accInvoice/2"> invocie 2<router-link> <router-link to="#/accInvoice/1"> invocie 1<router-link>    -->
               <br><br>
          <table  class="account" v-if="tm"> <tr><td>Trans No</td><td>Date</td><td>Account</td><td>Reference</td><td>Debit</td><td>Credit</td><td>Comment</td><td>Customer Id</td></tr>
                      <tr v-for='(val, index) in trans'><td> {{val.No}} </td><td> {{val.date}} </td><td> {{val.acc_no}} </td><td> {{val.refer}} </td>
                                      <td> {{val.Debit}} </td><td> {{val.Credit}} </td><td> {{val.Comment}} </td><td> {{val.uid}} </td>
                        </tr>

          </table>
<!--                Template #22  Setting  ********************************************************      -->
    
       <label >Account No:  &nbsp;&nbsp; </label>
                <select class="form1"  v-model='cno'  v-on:change="onChange" >
                <option v-for='(val, index) in acl' :value='val.acc_no' >{{val.acc_name}}</option>
                </select> 
                <label >Reference No:   &nbsp;&nbsp; </label>  <input type="text" class="form1" v-model="title" placeholder="Edit me here">
                <label >Entry Date:  &nbsp;&nbsp;    </label>  <input type="date" class="form1" v-model="dt0">
                 <label >Customer Name:  &nbsp;&nbsp; </label>
                <select class="form1"  v-model='uid'>
                <option v-for='(value, key) in customer.rows' :value='value.id' >{{value.company}}</option>
                </select> 
      <table class="account">
                  <tr><td>Account</td><td>Debit</td><td>Credit</td><td>Comment</td></tr>
                  <tr v-for="(Value, index) in ldn" ><td>{{Value.accName}}</td><td>  <input type="text" v-model="Value.Debit" > </td><td> <input type="text" v-model="Value.Credit" >
                    </td><td><input type="text" v-model="Value.Commnet" ></td></tr>
                  <tr><td> &nbsp;&nbsp;</td><td><button class="btn_pt" v-on:click="btnUpdate('M')">Update</button> </td><td> &nbsp;&nbsp;</td><td><button class="btn_pt" v-on:click="btnSBM('My Words is here !')">Submit</button> </td></tr>
              </table> 
    <table class="account">
          <tr v-for= "(item, index ) in b.key "><td v-for= "val  in item"> {{val}}</td><td> &nbsp; {{index}} <button v-on:click="btnClick2(index)">Select</button></td></tr>
        </table>
<!--       *************         Div  class  of acc22       *****************************************************      -->      
        <div class="acc22"> 
            <div class="acc01">
                 <label >Start Date:  &nbsp;&nbsp;    </label>  <input type="date" class="form1" v-model="dts">&nbsp;&nbsp;&nbsp;&nbsp;
                 <label >End   Date:  &nbsp;&nbsp;    </label>  <input type="date" class="form1" v-model="dte"> <br><br>
                 <button  class="btn_pt2" v-on:click="laoddate()">Data Preset</button> <br>
              </div>
            <div class="acc02">  
                 <router-link to="accInvoice/1" class="btn_pt2">Invoice 1 </router-link><br>  <br>
                 <button v-on:click="testread()">Test Clcick</button>&nbsp;&nbsp;
                 <button class="btncls" v-on:click="testread()">Test PHP </button><br>
                 <button class="btncls" v-on:click="testread()">Clcick PHP </button>&nbsp;&nbsp; <button v-on:click="testread()">Clcick Test </button>
                 </div>
        </div>
                <table class="account">
                 <tr><th>Item</th><th>Date</th><th>Trans No.</th><th>referance</th><th>acc_no</th><th>Debit</th><th>Credit</th><th>cid</th><th>Comment</th></tr>
                 <tr v-for= "(trn, index ) in cab.allledg "><td>{{index+1}}</td><td>{{trn.date}}</td><td>{{trn.trans_no}}</td><td>{{trn.referance}}</td><td>{{trn.acc_no}}</td><td>{{trn.debit}}</td><td>{{trn.credit}}</td>
                        <td>{{trn.cid}}</td><td>{{trn.comment}}</td></tr>
                 </table>
               <table class="account">
                <caption>Purchase Invoice for Gecon </caption>
                <tr><th>Item</th><th>Date</th><th>Invoice No.</th><th>Type</th><th>Amount</th><th>Customer</th><th>Select</th></tr>
                 <tr v-for= "(item, index ) in prod.order "><td>{{index+1 }}</td><td>{{item[0]}}</td><td>{{item[2]}}</td><td>{{item[3]}}</td>
                                 <td>{{item[4]}}</td><td>{{item[5]}}</td> <td> &nbsp;<button v-on:click="btnClick3(index)">Select</button></td></tr>
                 </table>

      </div>  `  ,
  
	data() {
    	return {  
              tm:  false,
              checked: false, 
              title: 'General Entries' ,
              tno: 101,
              cno: 30200,
              acl:'',
              b: 54 ,
              ledger22:{},
              uid:109,
              dt0:'2020-02-25',
              dts:'2020-01-01',
              dte:'2020-03-30',
              customer:{},
              ledger:{},
              ldn:[],
              trans:[],
              stat1:''
            }
   },
  mounted: function(){
      console.log("mounted") ;
      this.b   = JSON.parse(localStorage.getItem('defult'))
      this.dts = this.b.startdt
      this.dte = this.b.enddate
      this.dt0  = this.dte
      this.allRecords() ;
      this.b        = JSON.parse(localStorage.getItem('tdbacc'));
      this.ledger22 = JSON.parse(localStorage.getItem('accounts'));
      this.acl = this.ledger22.rows
      this.customer = JSON.parse(localStorage.getItem('gs_user'));
       // console.log( this.ledger22) ;
          axios.get('http://www.gecontech.com/magento/mgc20/src/php/product/product.php?acc=invoice').then(function(response){
                   console.log(response.data) ;
                   app.jsdd = response.data ;
                           }) .catch(function(error){ console.log(error) ;  }) ;
        // console.log( this.ledger22) ;
          axios.get('http://www.gecontech.com/magento/mgc20/src/php/api_db_2020.php?action=alltrans').then(function(response){
                      app.amp = response.data ;       console.log(app.amp) ;  }) .catch(function(error){ console.log(error) ;  }) ;
        },
  methods:{
    get_trNo: function() {
         let records  = JSON.parse(localStorage.getItem('wacc_trans_item')) ;
           let n = records.rows.length ;
          //  this.tno =  Number(records.rows[n-1].trans_no)  +1; 
            this.tno =  this.prod.transs
             console.log(this.tno) ;
    } ,
    allRecords: function (){
      axios.get('http://www.gecontech.com/magento/mgc20/src/php/file_rw.php').then(function(response){
          // console.log(response) ;
       
        localStorage.setItem('tdbacc',JSON.stringify(response.data));
      }) .catch(function(error){
          console.log(error) ;
        }) ;
    } ,
    laoddate: function(pname1) {
            let para = "gs_user" ;
            this.getdb(para) ;
            para = "accounts" ;
            this.getdb(para) ;
             para = "wacc_trans_item" ;
            this.getdb(para) ;
            para = "defult" ;
            let dateset = {startdt:this.dts,enddate:this.dte}
             localStorage.setItem(para,JSON.stringify(dateset));
                },
    onChange:function() {
              let  result = this.ledger22.rows.find( ({ acc_no }) => acc_no === this.cno );
              let mv = {};
               console.log(this.cno) ;
               console.log(result) ;
              mv.acc   = result.acc_no;
              mv.accName   = result.acc_name;
                var cc   = 0;
                var dc = 0;
                var d =  0;
               let n = this.ldn.length ;
                if( n > 0) {
                 
                    for (var i = 0; i < n ; i++ ) {
                      cc += Number(this.ldn[i].Credit) ;
                      dc += Number(this.ldn[i].Debit);
                    };
                    d = dc + cc ;
                            if (dc > cc) {
                                      mv.Debit  = 0;
                                      mv.Credit = dc-cc } else {
                                      mv.Debit  = cc-dc;
                                      mv.Credit = 0;
                                            } 
                         mv.Commnet = this.ldn[0].Commnet ;
                        }
                        
              this.ldn.push(mv);
             } ,
    btnClick2: function(pname2) {
              let mv   = {};
              mv.acc   = "10180";
              mv.accName = "TD Bank Account";
              mv.Credit  = Number(this.b.key[pname2][2]);
              mv.Debit   = Number(this.b.key[pname2][3]);
              mv.Commnet = this.b.key[pname2][1];
              this.dt0   = this.b.key[pname2][0];
                 this.b.key.shift() ;
                 this.ldn.push(mv);
                     },
    btnClick3: function(pname2) {
              let mv   = {};
              let ty  = this.prod.order[pname2][3] ;
              if( ty === "invs") {
                  mv.acc   = "40100"; 
                  mv.Debit   = 0.00 ;
                  mv.Credit  = this.prod.order[pname2][4] ;
                  mv.accName = "Sales for Inventry";
                     } else { 
                    mv.acc   = "50215" ;
                    mv.Debit   = this.prod.order[pname2][4] ;
                    mv.Credit  = 0.00;
                    mv.accName = "Purchase Local";
                     }
                 let ctm = JSON.parse(localStorage.getItem('gs_user')); ;
                 let cmp = ctm.rows.find( ({id}) => id == this.prod.order[pname2][1])  
                 console.log(cmp.company);
                mv.Commnet  = cmp.company
                this.uid    = this.prod.order[pname2][1] ;
                this.dt0    = this.prod.order[pname2][0] ;
                this.title  = this.prod.order[pname2][2] ;
                this.ldn.push(mv);
                  let gst = 0 ;
                  mv   = {};
                if( ty === "invs") {
                  mv.acc   = "20230"; 
                  mv.Debit   = 0.00 ;
                  mv.Credit  = 0.05*this.prod.order[pname2][4] ;
                  mv.accName = "GST Charge for Sales";
                     } else { 
                    mv.acc   = "20210" ;
                    mv.Debit   = 0.05*this.prod.order[pname2][4] ;
                    mv.Credit  = 0.00;
                    mv.accName = "GST Paid on Purchase";
                     }
                   mv.Commnet  = cmp.company
                   this.ldn.push(mv);
                   console.log(ty);
               },
    getdb: function(para){
              console.log(para) ;
              let url = './src/php/api_db_rw_2020.php?table='+ para
            axios.get(url).then(function(response){
              let vr = response.data.rows ;
             // Account.ledger22.push(vr) ; 
              localStorage.setItem(para,JSON.stringify(response.data));
            //console.log(Account.ledger22) ;
           //vm.testdata = response.data ;
           //  vm.users = response.data ;
            }) .catch(function(error){
                 console.log(error) ;
          }) ;
         } , 
    btnSBM: function(mn){ 
                let url = './src/php/db_write.php'; 
                let passdata = this.trans ;
                axios.post(url, JSON.stringify(passdata)).then(function (response) {
                                console.log(response.data);
                              }).catch(function (error) {
                                console.log(error);
                                    });
            this.tm = false ; 
            this.stat1 = "New Transation completed !" ;
            console.log(mn) ;
    },
    btnUpdate:function(){
            this.tm = true ; 
            this.stat1 = "new transation:" ;
            this.get_trNo() ;
           let midvar = {} ;
            midvar.No     = this.tno ;
            midvar.date   = this.dt0; 
            midvar.Debit  = "6855484"; 
            midvar.Credit = "5355484";
            this.trans.push(midvar);
         console.log(this.tno) ;
           let n = this.ldn.length ;
                if( n > 0) { 
                   this.trans = [] ;
                    for (var i = 0; i < n ; i++ ) {
                       let midvar1 = {} ;
                      midvar1.No     = this.tno ;
                      midvar1.date   = this.dt0; 
                      midvar1.acc_no  = this.ldn[i].acc;
                      midvar1.refer  = this.title;
                      midvar1.Debit  = this.ldn[i].Debit; 
                      midvar1.Credit = this.ldn[i].Credit;
                      midvar1.Comment = this.ldn[i].Commnet;
                       midvar1.uid = this.uid;
                      this.trans.push(midvar1);
                    }
                }   
          }
  }
   
 }) 
 /*******************************************************************************************************************/
 /***********                    Component   Balance  of accounting      June 24 , 2020                       ********************/
 /*******************************************************************************************************************/
 var  abalance = Vue.component('abalance' , 
 { 
  props: ['bacd'] ,
  template:  ` <div class="fd1" >
    {{checked}}
      <table  class="account" >
                        <caption>Balance Sheet  <br> {{ dt_e}}</caption>
              <tr><th> {{bacd.ase}} </th></tr>
                <tr v-for= "(trn, index ) in bacd.bal "><td>{{index+1 }}</td><td><router-link :to="trn.link"  >{{trn.acc_no}} </router-link></td><td>{{trn.acc_name}}</td><td>{{trn.date}}</td><td>{{trn.acc_sum}}</td></tr>
                <tr><th></th><th></th><th>Total in  {{bacd.ase}} :</th><th>&nbsp;&nbsp; </th><th> {{bacd.assatTotal}} </th></tr>
              <tr><th> {{bacd.lbname}} </th></tr>
                <tr v-for= "(trn, index ) in bacd.liab"><td>{{index+1}}</td><td><router-link :to="trn.link"  >{{trn.acc_no}} </router-link></td><td>{{trn.acc_name}}</td><td>{{trn.date}}</td><td>{{trn.acc_sum}}</td></tr>
                <tr><th></th><th></th><th>Total in  {{bacd.lbname}} :</th><th>&nbsp;&nbsp; </th><th> {{bacd.liabTotal}} </th></tr>
                <tr><th> {{bacd.Equity}} </th></tr>
                <tr v-for= "(trn, index ) in bacd.rows"><td>{{index+1}}</td><td><router-link :to="trn.link"  >{{trn.acc_no}} </router-link></td><td>{{trn.acc_name}}</td><td>{{trn.date}}</td><td>{{trn.acc_sum}}</td></tr>
                <tr><th></th><th></th><th>Total in  {{bacd.Equity}} :</th><th>&nbsp;&nbsp; </th><th> {{bacd.EqyTotal}} </th></tr>
                <tr><th colspan="2" ></th><th></th><th> &nbsp;&nbsp;</th><th>  &nbsp;&nbsp; </th></tr>
                  <tr><th colspan="2" ></th> <th>Net Liabilities and Equity :</th><th>&nbsp;&nbsp; </th><th>{{bacd.equliab}} </th></tr>

             </table>           
     </div> `  ,
  data() {
      return {  
          checked: false,
          dt_s:'',
          dt_e:'',
           data:'' 
      }
    } ,
    mounted: function(){
    this.data = JSON.parse(localStorage.getItem('defult'))
    this.dt_s = this.data.startdt
    this.dt_e = this.data.enddate
    let mx = '&dte=' + this.dt_e 
    let url = 'http://www.gecontech.com/magento/mgc20/src/php/api_db_2020.php?action=balance&' + mx 
              axios.get(url).then(function(response){
                      app.ab = response.data ;     }) .catch(function(error){ console.log(error) ;  }) ;
   
  }
})
/*******************************************************************************************************************/
/*******************************************  Component income for accounting      June 2020     *******************/

var  income = Vue.component('income' , 
 { 
  props: ['prod'] ,
  template:  ` <div class="fd1" >

             <h2> Income Statement  </h2>
            {{checked}}
        <table  class="account" >
                         <caption>Profit & Loss  <br> From  {{dt_s}} to {{dt_e}}</caption>
                <tr><th> {{prod.sort}} </th></tr>
                <tr v-for= "(trn, index ) in prod.inc"><td>{{index}}</td><td><router-link :to="trn.link"  >{{trn.acc_no}} </router-link></td><td>{{trn.acc_name}}</td><td>{{trn.date}}</td><td>{{trn.acc_sum}}</td></tr>
                <tr><th></th><th></th><th>Total in  {{prod.sort}} :</th><th>  &nbsp;&nbsp; </th><th> {{prod.icTotal}} </th></tr>
                <tr><th> {{prod.lib}} </th></tr>
                <tr v-for= "(trn, index ) in prod.rows"><td>{{index}}</td><td><router-link :to="trn.link"  >{{trn.acc_no}} </router-link></td><td>{{trn.acc_name}}</td><td>{{trn.date}}</td><td>{{trn.acc_sum}}</td></tr>
                <tr><th></th><th></th><th>Total in  {{prod.lib}} :</th><th> {{prod.libTotal}} </th></tr>
                 <tr><th colspan="2" ></th><th></th><th> &nbsp;&nbsp;</th><th>  &nbsp;&nbsp; </th></tr>
                  <tr><th colspan="2" ></th> <th>Net Income</th><th>&nbsp;&nbsp; </th><th> {{prod.net}} </th></tr>
        </table>
      
          </div> `  ,
  data() {
      return {  
              stb:  false,
              checked: false,
              dt_s:'',
              dt_e:'',
              data:'' 
             
                }
   },
  mounted: function(){
    this.data = JSON.parse(localStorage.getItem('defult'))
    this.dt_s = this.data.startdt
    this.dt_e = this.data.enddate
    let mx = 'dts=' + this.dt_s+'&dte=' + this.dt_e 
    
    this.getIncome(mx) ;
    this.stb = this.prod
  },
  beforeRouteUpdate(to,from,next) {
     this.detail = this.getInvoice(to.params.sid) ;
     this.profile = '/accInvoice/'+ to.params.sid +'/profile' ;
     this.stats = '/accInvoice/'+ to.params.sid +'/stats' ;
     next();
  },
  methods:{
      getIncome(mx) {
                console.log("method Income 1") ;
                let url = 'http://www.gecontech.com/magento/mgc20/src/php/api_db_2020.php?action=income&' + mx 
              axios.get(url).then(function(response){
                      app.jsdd = response.data ;   }) .catch(function(error){ console.log(error) ;  }) ;

         }
     }
 }) 
 /*******************************************  Component income for accounting      June 2020     *******************/

var  ledger = Vue.component('ledger' , 
 { 
  props: ['prod','cab'] ,
  template: ` <div class="fd1"> module {{$route.params.sid}}  <br> From {{dt_s }}  to {{dt_e}}

                    <table  class="account" >
                    <caption> General Ledger <br>Acoount: {{prod.gt}}</caption>
                      <tr><th>Trans No.</th><th>Date</th><th>Referance</th<th>Debit</th><th>Credit</th><th>Comment</th><th>Balance</th></tr>
                      <tr v-for= "(trn, index ) in prod.trnn"><td><router-link :to="trn.rlink" > {{trn.trans_no}} </router-link></td><td>{{trn.date}}</td><td>{{trn.referance}}</td><td>{{trn.debit}}</td><td>{{trn.credit}}</td>
                        <td>{{trn.comment}}</td><td>{{trn.balance}}</td></tr>
                          </table>
                <router-link :to="onelg" class="btn_pt2"> balance</router-link> &nbsp;&nbsp;
                <router-view :pbc="b" :subd="prod"></router-view> 
                          
                    </div>  ` ,
  data() {
      return {  
              tm:  false,
              acclink:'/sdef',
              onelg:'',
              data:'',
              dt_s:'',
              dt_e:'',
              b: 54 
                }
   },
mounted: function(){
   this.data = JSON.parse(localStorage.getItem('defult'))
   this.dt_s = this.data.startdt
   this.dt_e = this.data.enddate
   let mrx = 'dts=' + this.dt_s+'&dte=' + this.dt_e + '&acc_no=' + this.$route.params.pid
   this.getLedger(mrx)
    this.onelg = '/ledger/'+'45567'+'/atransa' ;     
      },
      
beforeRouteUpdate(to,from,next) {
        let mrx = 'dts=' + this.dt_s+'&dte=' + this.dt_e + '&acc_no=' + from.params.pid
            this.getLedger(mrx)
   
            this.checked = true
           // this.onelg = '/ledger/'+ from.params.pid +'/atransa' ;     
             console.log("beforeRouteUpdate ledge") 
            next();
  } ,
methods:{
     getLedger(mrx) {
      let url = 'http://www.gecontech.com/magento/mgc20/src/php/api_db_2020.php?action=ledger&' + mrx
      axios.get(url).then(function(response){
                app.jsdd = response.data ;   
                console.log(app.jsdd) ;  }) .catch(function(error){ console.log(error) ;  }) ;

   }
 }

}) 
/****************************************************************************************************************/
/***                                    Component atransa  for accounting     August   2020     Michael       ***/
/*****************************************************************************************************************/
var  atransa  = Vue.component('atransa' , 
 { 
  props: ['subd','pbc'] ,
  template: ` <div class="fd1"> <br>module <br>
    {{ tno}}
          <table  class="account" >
                    <caption> General Ledger <br>Acoount: {{subd.gt}}</caption>
                      <tr><th>Trans No.</th><th>Date</th><th>Referance</th<th>Debit</th><th>Credit</th><th>Comment</th><th>Balance</th></tr>
                      <tr v-for= "(trn, index ) in subd.oneledg"><td>{{trn.trans_no}} </td><td>{{trn.date}}</td><td>{{trn.referance}}</td><td>{{trn.debit}}</td><td>{{trn.credit}}</td>
                        <td>{{trn.comment}}</td><td>{{trn.balance}}</td></tr>
                          </table>
    
                    </div>  ` ,
  data() {
      return {  
              tm:  false,
              tno:123,
              acclink:'',
              data:'',
              dt_s:'',
              dt_e:'',
              b: 54 
                }
   },
mounted: function(){
      console.log(this.$route.params.pid)
      this.tno = this.$route.params.pid 
      let url = 'http://www.gecontech.com/magento/mgc20/src/php/api_db_2020.php?action=onetrans&tt_no=' + this.tno
      axios.get(url).then(function(response){
                app.jsdd = response.data ;   
                console.log(app.jsdd) ;  }) .catch(function(error){ console.log(error) ;  }) ;
      
     }

}) 
/****************************************************************************************************************/
