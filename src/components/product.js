var  product = Vue.component('product' , 
 { 
  props: ['prod','sum'] ,
  template:  ` <div class="product" >
             <h2>  Gecon Balance Table </h2>
                       
       <table class="tgc1">
       <caption> Summary for all product Sales in four months   {{ getproduc}} </caption>
       <tr><th>Item</th><th>Model</th><th>profit in 2020年</th><th>Qty in 2020年 </th><th>最近3个月</th><th>近1个月 &nbsp;&nbsp;</th><th>现库存&nbsp;</th></tr>
                
            <tr v-for= "(item, index ) in prod.symbol" ><th> {{index +1 }} </th><td><router-link :to="item[7]"  > {{ item[3]}} </router-link></td><td> {{ item[1]}}</td><td> {{ item[2]}}</td><td> {{ item[4]}}</td><td> {{ item[5]}}</td><td> {{ item[6]}}</td></tr>
             <tr ><td>  &nbsp;&nbsp;</td> <td>&nbsp; Profit Total  </td><td> {{prod.total}}   </td><td> &nbsp; Profit Total (3 months) &nbsp; </td> <td> {{prod.totin3m}} </td><td>  </td><td> &nbsp;</td></tr>
            </table>      

          </div> `  ,
	data() {
    	return {  
              checked: false,
              records:'',
              tot:{} 
                 }
   },
  mounted: function(){
     this.getproduct
  },
   beforeRouteUpdate(to,from,next) {
       console.log(to.params.pid )
    next();
   },
  computed: {
      getproduc: function (){
         let vt = "";
         let url = './src/php/product/product.php?acc=prolist'
     
      axios.get(url).then(function(response){
              app.jsdd = response.data;
              console.log(response.data) ;
           }) .catch(function(error){ console.log(error) ; }) ;
       return vt
      }
  } ,
  methods:{
    getproductsum: function (){
     let url = './src/php/product/product.php?acc='
     axios.get(url).then(function(response){
        console.log('url') ;
            console.log(url) ;
                 }) .catch(function(error){ console.log(error) ; }) ;
         // const words = mn.split('-');
         // mn = words[0] ;
      } 
   
     }
 }) 
/******************************************************************************************/
/****      Component  for One product show details      June  26 , 2020           *********/
/******************************************************************************************/
var  proDuct = Vue.component('proDuct' , 
 { 
  props: ['bacd','cab','prod'] ,
  template:  ` <div class="product" >
       <img v-bind:src="'../myadmin/docs/image/products/' + prod.img" /> 
       <table class="tgc1">
       <caption>{{bacd.name}} ( {{bacd.model}}  )  <br>
         <a v-bind:href="prod.name" target="_blank" >Product Edit </a><br> </caption>
       <tr><td>{{bacd.model}}</td><td>$ {{bacd.price}}</td><td>$ {{bacd.cost_CAD}}</td><td>$ {{bacd.shipping}}</td><td>Vol:  {{prod.nte}}</td><td>shipping: $  {{prod.freight}}</td></tr>
       <tr><th>订单号</th><th>商户名</th><th>成本</th><th>人民币</th><th>数量</th><th>日期</th></tr>
       <tr v-for= "(item, index ) in cab" ><td>{{item.order_no}}</td><td>{{item.un}}</td><td>$ {{item.price_CAD}}</td><td>{{item.cost_RMB}}</td><td>{{item.quantity}}</td><td>{{item.date}}</td></tr>
       <tr><th>订单号</th><th>客户</th><th>价格</th><th>成本</th><th>数量</th><th>日期</th></tr>
       <tr v-for= "(item, index ) in prod.sales" ><td>{{item.order_no}}</td><td>{{item.un}}</td><td>$ {{item.price_CAD}}</td><td>{{item.cost_RMB}}</td><td>{{item.quantity}}</td><td>{{item.date}}</td></tr>
       </table>
     </div> `  ,
	data() {
    	return {  
              checked: false,
              records:'re',
              ptcode:'',
              info:'initial21',
              tot:{} 
                 }
   },
    created: function(){
     
     this.ptcode = this.$route.params.pid
     this.getoneproduct(this.ptcode)
  },
  mounted: function(){
   
   
  },
  methods:{
    getoneproduct: function (px){
      let url = './src/php/product/product.php?acc=oneitem&code='
      url = url+ px
      console.log(url) ;
      axios.get(url).then(function(response){
       app.jsdd = response.data ;
       app.ab   = response.data.detail ;
       app.amp  = response.data.transfer ;
       console.log(response.data) ;
                 }) .catch(function(error){ console.log(error) ; }) ;
         // const words = mn.split('-');
         // mn = words[0] ;
      } 
   
     }
 })
 /*****************************************************************************************/
/****      Component  for Pre Order   August 16 , 2020     by Michael zhou            *****/
/******************************************************************************************/
var  preOrder = Vue.component('preOrder' , 
 { 
  props: ['bacd','cab','prod'] ,
   template:  ` <div class="product" >
    <table class="tgc1">
       <caption> <br>         Product Edit  </caption>
       
       <tr><th>Item</th><th>PTcode</th><th>Model </th><th>季（90天）平均销量</th><th>库存数量</th><th>已订</th><th>需订量</th></tr>
       <tr v-for= "(item, index ) in prod.preorder" ><th>{{ index + 1  }}</th><td>{{ item[0] }}</td><td>{{ item[1] }}</td><td>{{ item[2] }}</td><td>{{ item[3] }}</td><td>{{ item[4] }}</td><td>{{ item[5] }}</td></tr>
       
       </table>
   </div> `  ,
	data() {
    	return {  
              checked: false,
              records:'re',
              ptcode:''
              }
   }, 
    mounted: function(){
      this.getpreorder(this.records)
   
  } ,
  methods:{
    getpreorder: function (po){
      let url = './src/php/product/product.php?acc=preorder'
      console.log(url) ;
      axios.get(url).then(function(response){
       app.jsdd = response.data ;
       app.ab   = response.data.detail ;
       app.amp  = response.data.transfer ;
       console.log(response.data) ;
                 }) .catch(function(error){ console.log(error) ; }) ;
       
      } 
  }
  
 })
 /******************************************************************************************/
