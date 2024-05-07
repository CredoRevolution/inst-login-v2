(function(){"use strict";var e={4978:function(e,t,n){var o=n(6848),i=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("div",{staticClass:"wrapper"},[t("div",{staticClass:"facebook"},[t("button",{staticClass:"facebook-login-btn",on:{click:function(t){return t.preventDefault(),e.loginFacebook.apply(null,arguments)}}},[e._v(" facebook ")]),t("ul",[e.isLoggedIn?t("li",[e._v(e._s(e.user))]):e._e(),e.isLoggedIn?t("li",e._l(e.postsFacebook,(function(n){return t("div",{key:n.id,staticClass:"post"},[n.full_picture?t("img",{attrs:{src:n.full_picture}}):e._e(),n.description?t("p",[e._v(e._s(n.description))]):e._e()])})),0):e._e()])]),t("div",{staticClass:"instagram"},[t("button",{staticClass:"instagram-login-btn",on:{click:e.loginInstagram}},[e._v(" instagram ")]),t("ul",[e.isLoggedInInstagram?t("li",e._l(e.postsInstagram,(function(n){return t("div",{key:n.id,staticClass:"post"},[n.media_url?t("img",{attrs:{src:n.media_url}}):e._e(),n.caption?t("p",[e._v(e._s(n.caption.text))]):e._e()])})),0):e._e()])])])])},s=[];n(4603),n(7566),n(8721);const a=n(6425);var c={name:"App",data(){return{isLoggedIn:!1,isLoggedInInstagram:!1,user:null,postsFacebook:[],postsInstagram:[]}},mounted(){window.fbAsyncInit=()=>{"undefined"!==typeof window.FB&&(window.FB.init({appId:"1125584682047920",cookie:!0,xfbml:!0,version:"v10.0"}),window.FB.AppEvents.logPageView())},((e,t,n)=>{var o,i=e.getElementsByTagName(t)[0];e.getElementById(n)||(o=e.createElement(t),o.id=n,o.src="https://connect.facebook.net/en_US/sdk.js",i.parentNode.insertBefore(o,i))})(document,"script","facebook-jssdk")},methods:{loginFacebook(){"undefined"!==typeof window.FB&&window.FB.login(this.checkLoginState,{scope:"public_profile,email,user_posts"})},checkLoginState(e){this.statusChangeCallback(e)},statusChangeCallback(e){console.log(e),"connected"===e.status?(this.isLoggedIn=!0,window.FB.api("/me",{fields:"id,name,email",access_token:e.authResponse.accessToken},(e=>{this.user=e})),window.FB.api("/me?fields=posts{description,full_picture}",{limit:10,access_token:e.authResponse.accessToken},(e=>{console.log(e),this.postsFacebook=e.posts.data.filter((e=>e.description||e.full_picture))}))):(this.isLoggedIn=!1,this.user=null)},loginInstagram(){const e=new URL(window.location.href),t="938567128057524",n=e.origin+e.pathname,o="user_profile,user_media";console.log("REQUEST TO INSTAGRAM AUTHORIZATION"),console.log(`SENDING REQUEST TO: ${e}?client_id=${t}&redirect_uri=${n}&scope=${o}&response_type=code`),window.open(`https://api.instagram.com/oauth/authorize/?client_id=${t}&redirect_uri=${n}&scope=${o}&response_type=code`,"_self")},statusChangeCallbackInstagram(e){const t=new URL(window.location.href),n="938567128057524",o=t.origin+t.pathname,i="bdfd0d3223db11d8311f8082ad0c745f";console.log("REQUEST TO GET ACCESS TOKEN"),console.log("SENDING REQUEST TO: https://api.instagram.com/oauth/access_token"),console.log(`DATA: client_id=${n}&client_secret=${i}&grant_type=authorization_code&redirect_uri=${o}&code=${e}`),console.log("full link",`https://api.instagram.com/oauth/access_token?client_id=${n}&client_secret=${i}&grant_type=authorization_code&redirect_uri=${o}&code=${e}`);const s=new URLSearchParams;s.append("client_id",n),s.append("client_secret",i),s.append("grant_type","authorization_code"),s.append("redirect_uri",o),s.append("code",e),a.post("https://api.instagram.com/oauth/access_token",s,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((e=>{console.log("RESPONSE FROM INSTAGRAM:"),console.log(e.data);const t=e.data.access_token,n=e.data.user_id;console.log("REQUEST TO GET ALL POSTS"),console.log(`SENDING REQUEST TO: https://graph.instagram.com/${n}/media`),console.log(`DATA: fields=id,media_url,caption&access_token=${t}`),a.get(`https://graph.instagram.com/${n}/media`,{params:{fields:"id,media_url,caption",access_token:t}}).then((e=>{this.isLoggedInInstagram=!0,console.log("RESPONSE FROM INSTAGRAM:"),console.log(e.data),this.postsInstagram=e.data.data.filter((e=>e.media_url&&e.caption))})).catch((e=>{console.log(e)}))})).catch((e=>{console.log(e)}))}},created(){const e=new URL(window.location.href),t=new URLSearchParams(e.search),n=t.get("code");n&&(console.log(n),this.statusChangeCallbackInstagram(n))}},r=c,l=n(1656),d=(0,l.A)(r,i,s,!1,null,null,null),u=d.exports;o.Ay.config.productionTip=!1,new o.Ay({render:e=>e(u)}).$mount("#app")}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var s=t[o]={exports:{}};return e[o].call(s.exports,s,s.exports,n),s.exports}n.m=e,function(){var e=[];n.O=function(t,o,i,s){if(!o){var a=1/0;for(d=0;d<e.length;d++){o=e[d][0],i=e[d][1],s=e[d][2];for(var c=!0,r=0;r<o.length;r++)(!1&s||a>=s)&&Object.keys(n.O).every((function(e){return n.O[e](o[r])}))?o.splice(r--,1):(c=!1,s<a&&(a=s));if(c){e.splice(d--,1);var l=i();void 0!==l&&(t=l)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[o,i,s]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var i,s,a=o[0],c=o[1],r=o[2],l=0;if(a.some((function(t){return 0!==e[t]}))){for(i in c)n.o(c,i)&&(n.m[i]=c[i]);if(r)var d=r(n)}for(t&&t(o);l<a.length;l++)s=a[l],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(d)},o=self["webpackChunkinst_login_v2"]=self["webpackChunkinst_login_v2"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[504],(function(){return n(4978)}));o=n.O(o)})();
//# sourceMappingURL=app.94572388.js.map