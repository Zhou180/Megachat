(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"546f":function(t,e,a){"use strict";a("58c1")},"58c1":function(t,e,a){},"713b":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{attrs:{view:"lHh Lpr lFf"}},[a("q-header",{attrs:{elevated:""}},[a("q-toolbar",{staticClass:"bg-orange-5 text-white"},[t.$route.fullPath.includes("/chat")?a("q-btn",{directives:[{name:"go-back",rawName:"v-go-back.single",modifiers:{single:!0}}],attrs:{color:"amber",icon:"arrow_back",label:"back"}}):t._e(),a("q-toolbar-title",{staticClass:"absolute-center"},[t._v("\n        "+t._s(t.title)+"\n      ")]),a("q-space"),t.userDetails.userID?a("q-btn",{staticClass:"q-pr-sm absolute-right",attrs:{icon:"account_circle","no-caps":"",flat:"",dense:""},on:{click:t.logoutUser}},[t._v("\n        Logout"),a("br"),t._v("\n        "+t._s(t.userDetails.name)+"\n      ")]):a("q-btn",{staticClass:" q-pr-sm absolute-right",attrs:{to:"/auth",icon:"account_circle",label:"Login","no-caps":"",flat:"",dense:""}})],1)],1),a("q-page-container",[a("router-view")],1)],1)},r=[],n=a("ded3"),i=a.n(n),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-item",{attrs:{clickable:"",tag:"a",target:"_blank",href:t.link}},[t.icon?a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:t.icon}})],1):t._e(),a("q-item-section",[a("q-item-label",[t._v(t._s(t.title))]),a("q-item-label",{attrs:{caption:""}},[t._v("\n      "+t._s(t.caption)+"\n    ")])],1)],1)},o=[],c={name:"EssentialLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},link:{type:String,default:"#"},icon:{type:String,default:""}}},u=c,b=a("2877"),p=Object(b["a"])(u,l,o,!1,null,null,null),h=p.exports,m=a("2f62"),d=a("e883"),f={name:"MainLayout",mixins:[d["a"]],components:{EssentialLink:h},data(){return{leftDrawerOpen:!1}},computed:i()(i()({},Object(m["d"])("store",["userDetails"])),{},{title(){let t=this.$route.fullPath;return"/"==t?"mega":t.includes("/chat")?this.otherUserDetails.name:"/auth"==t?"Auth":void 0}}),methods:i()({},Object(m["b"])("store",["logoutUser"]))},g=f,_=(a("546f"),Object(b["a"])(g,s,r,!1,null,null,null));e["default"]=_.exports},e883:function(t,e,a){"use strict";e["a"]={computed:{otherUserDetails(){return this.$store.state.store.users[this.$route.params.otherUserID]?this.$store.state.store.users[this.$route.params.otherUserID]:{}}}}}}]);