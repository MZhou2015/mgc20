var register  = {
        template: '<h1> register module </h1>' 
      }
var routerObj = new VueRouter({
      routes: [
       { path:'/register' ,  component: register    },
       { path:'/accounting', component:Account      },
       { path:'/webaccount', component:Acctrans     },
       { path:'/webaccount/:pid', component:Acctrans ,    
                children:[
                  {path:'atransb', component: atransb },
                         ]
       },
       { path:'/abalance' ,   component:abalance     },
       { path:'/income' ,     component:income       },
       { path:'/ledger' ,     component:ledger       }, 
       { path:'/ledger/:pid', component:ledger  ,   
              children:[
                  {path:'atransa', component: atransa },
                        ]
       },
       { path:'/termdeposit' ,  component:termdeposit },
       { path:'/products' ,     component:product    },
       { path:'/preOrder' ,     component:preOrder   },
       { path:'/proEdit' ,      component:proEdit    },
       { path:'/proEdit/:pid' , component:proEdit    },
       { path:'/proDuct' ,      component:proDuct    },
       { path:'/proDuct/:pid',  component:proDuct    }
      
       ]
    }) 
/********************************************/
// new a Vue
  var app = new Vue({
        el: '#app' ,
        data: {
             message: 'Hello New app Vue !!' ,
             currentView:'Author',
             logn:true,
              jsdd:'',
              amp:'',
              a: 0.123  ,
              ab:'',
             chechedItem: [] ,
          } ,
        router: routerObj , 
        mounted: function(){
            this.message =  this.getCookie("username")
            if(this.message == "user618") {
                this.logn = false
            this.currentView = "gnav-bar"    
            }
                 //  console.log(this.currentView)
           },
        methods:{
            getCookie:function (cname) {
                 var name = cname + "=";
                 var ca = document.cookie.split(';');
                 for(var i = 0; i < ca.length; i++) {
                 var c = ca[i];
                 while (c.charAt(0) == ' ') {
                  c = c.substring(1);
                   }
                if (c.indexOf(name) == 0) {
                       return c.substring(name.length, c.length);
                    }
                  }
                  return "";
               }    
            }  // End of methods
          })
/***************************************************************************************/

