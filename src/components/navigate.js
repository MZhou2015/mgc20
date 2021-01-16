Vue.component('gnav-bar', {
  props: ['nlink'] ,
  template: `<div id="gnav"><ul id="nav" > 
               <li v-for="item in links"> <a v-bind:href="item.ul">{{item.title}}</a>
               <ul >   <li v-for="lk in item.sub"> <a v-bind:href="lk.url">{{lk.name}}</a> </li>  </ul>
                </li></ul></div> `  ,
  data() {
    return { 
        checked: false, 
        links: [
                      { title:'Home', ul:'./',sub:[{name:'Book Keeping', url:'#/accounting'} ,
                                                   {name:'Income Statement', url:'#/income'} ,
                                                   {name:'Balance Sheet', url:'#/abalance'} ,
                                                   {name:'General Entries', url:'#/compacc'}]},
                      { title:'Products', ul:'#/products', sub:[{name:'Product List', url:'#/prolist'},
                                                                {name:'Pre-Order', url:'#/preOrder'},
                                                                {name:'Proinfo Edit', url:'#/proEdit'} ]} ,
                      { title:'GoPHP', ul:'./src/php/getPrice.php', sub:[{name:'Price Update PERL', url:'./src/perl/two.pl'} ,
                                                                         {name:'Get JSON file', url:'./src/perl/getprojson.pl'} ,
                                                                         {name:'View IPlist', url:'#/viewIP'}]} ,
                      { title:'Portfolio', ul:'#/portfolio', sub:[{name:'Portfolio Total', url:'#/portfo'} ,
                                                                  {name:'Portfolio Zhou',  url:'#/portfo/1'} ,
                                                                  {name:'Portfolio Fan',   url:'#/portfo/2'} ,
                                                                  {name:'Dividend Income',  url:'#/portfo/3'} ,
                                                                  {name:'TermDep', url:'#/termdeposit'} ,{name:'Activity', url:'#/portfolio/2'}]} ,
                      { title:'Login', ul:'#/login',sub:[{name:'Register', url:'#/register'} ,{name:'Gecon Admin Beta', url:'./pre_index.php'}]} 
                    ]  ,
        title: 'Check me' 
        
    }
  }
})