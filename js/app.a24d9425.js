(function(){"use strict";var t={8521:function(t,n,e){var o=e(6848),i=function(){var t=this,n=t._self._c;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"wrapper"},[n("div",{staticClass:"facebook"},[n("button",{staticClass:"facebook-login-btn",on:{click:function(n){return n.preventDefault(),t.loginFacebook.apply(null,arguments)}}},[t._v(" facebook ")]),n("ul",[t.isLoggedIn?n("li",[t._v(t._s(t.user))]):t._e(),t.isLoggedIn?n("li",t._l(t.postsFacebook,(function(e){return n("div",{key:e.id,staticClass:"post"},[e.full_picture?n("img",{attrs:{src:e.full_picture}}):t._e(),e.description?n("p",[t._v(t._s(e.description))]):t._e()])})),0):t._e()])]),n("div",{staticClass:"instagram"},[n("button",{staticClass:"instagram-login-btn",on:{click:function(n){return n.preventDefault(),t.loginInstagram.apply(null,arguments)}}},[t._v(" instagram ")]),n("ul",[t.isLoggedInInstagram?n("li",t._l(t.postsInstagram,(function(e){return n("div",{key:e.id,staticClass:"post"},[e.images?n("img",{attrs:{src:e.images.thumbnail.url}}):t._e(),e.caption?n("p",[t._v(t._s(e.caption.text))]):t._e()])})),0):t._e()])])])])},s=[];e(6425);var r={name:"App",data(){return{isLoggedIn:!1,isLoggedInInstagram:!1,user:null,postsFacebook:[],postsInstagram:[]}},mounted(){window.fbAsyncInit=()=>{"undefined"!==typeof window.FB&&(window.FB.init({appId:"1664478101039678",cookie:!0,xfbml:!0,version:"v10.0"}),window.FB.AppEvents.logPageView())},((t,n,e)=>{var o,i=t.getElementsByTagName(n)[0];t.getElementById(e)||(o=t.createElement(n),o.id=e,o.src="https://connect.facebook.net/en_US/sdk.js",i.parentNode.insertBefore(o,i))})(document,"script","facebook-jssdk")},methods:{loginFacebook(){"undefined"!==typeof window.FB&&window.FB.login(this.checkLoginState,{scope:"public_profile,email,user_posts"})},checkLoginState(t){this.statusChangeCallback(t)},statusChangeCallback(t){console.log(t),"connected"===t.status?(this.isLoggedIn=!0,window.FB.api("/me",{fields:"id,name,email",access_token:t.authResponse.accessToken},(t=>{this.user=t})),window.FB.api("/me?fields=posts{description,full_picture}",{limit:10,access_token:t.authResponse.accessToken},(t=>{console.log(t),this.postsFacebook=t.posts.data.filter((t=>t.description||t.full_picture))}))):(this.isLoggedIn=!1,this.user=null)},loginInstagram(){window.location.href="https://api.instagram.com/oauth/authorize/?client_id=773337728107206&appsecret=d73fb062456e9ff67b314f315c95b1fd&redirect_uri=https://credorevolution.github.io/inst-login-v2/callback&scope=user_profile,user_media&response_type=code"},statusChangeCallbackInstagram(t){t.accessToken?(this.isLoggedInInstagram=!0,window.location.href="https://credorevolution.github.io/inst-login-v2/#"+t.accessToken):(this.isLoggedInInstagram=!1,this.user=null)}}},a=r,c=e(1656),l=(0,c.A)(a,i,s,!1,null,"05c16e01",null),u=l.exports;o.Ay.config.productionTip=!1,new o.Ay({render:t=>t(u)}).$mount("#app")}},n={};function e(o){var i=n[o];if(void 0!==i)return i.exports;var s=n[o]={exports:{}};return t[o].call(s.exports,s,s.exports,e),s.exports}e.m=t,function(){var t=[];e.O=function(n,o,i,s){if(!o){var r=1/0;for(u=0;u<t.length;u++){o=t[u][0],i=t[u][1],s=t[u][2];for(var a=!0,c=0;c<o.length;c++)(!1&s||r>=s)&&Object.keys(e.O).every((function(t){return e.O[t](o[c])}))?o.splice(c--,1):(a=!1,s<r&&(r=s));if(a){t.splice(u--,1);var l=i();void 0!==l&&(n=l)}}return n}s=s||0;for(var u=t.length;u>0&&t[u-1][2]>s;u--)t[u]=t[u-1];t[u]=[o,i,s]}}(),function(){e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,{a:n}),n}}(),function(){e.d=function(t,n){for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)}}(),function(){var t={524:0};e.O.j=function(n){return 0===t[n]};var n=function(n,o){var i,s,r=o[0],a=o[1],c=o[2],l=0;if(r.some((function(n){return 0!==t[n]}))){for(i in a)e.o(a,i)&&(e.m[i]=a[i]);if(c)var u=c(e)}for(n&&n(o);l<r.length;l++)s=r[l],e.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return e.O(u)},o=self["webpackChunkinst_login_v2"]=self["webpackChunkinst_login_v2"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=e.O(void 0,[504],(function(){return e(8521)}));o=e.O(o)})();
//# sourceMappingURL=app.a24d9425.js.map