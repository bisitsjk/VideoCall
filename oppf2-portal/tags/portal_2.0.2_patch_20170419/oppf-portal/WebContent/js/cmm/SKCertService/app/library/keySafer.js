var keySafer=function(t,e,n){var i=function(t){var i,d=t;switch(d){case"kings":i=new s(e,n.kings);break;case"npk":i=new u(e,n.nProtect);break;case"ahnlab":i=new a(e,n.ahnlab);break;case"touchen":i=new o(e,n.touchen);break;case"transkey":i=new c(e,n.transkey);break;case"ahnlabOld":i=new f(e,n.ahnlabOld);break;case"xkeypad":i=new h(e,n.xkeypad);break;default:i=new r(e)}return i},r=function(t){var e="undefined",n=0,i=t,r=!1,s="";this.init=function(t){t()},this.getPassword=function(t){t(i.val())},this.initalizeCheck=function(){return r},this.getType=function(){return e},this.getNumber=function(){return n},this.getScript=function(){return[]},this.isCert=function(){return!1},this.clearPassword=function(){},this.disableElement=function(t){},this.getPath=function(){return s}},s=function(t,e){var n="kings",i=1,r=t,s=!1,u=e.path,a=e.fileName;this.init=function(t){KOS.registerElementWithKey(r,"none","data-kdf-e2e-pubkey",t.publicKey),s=!0},this.initalizeCheck=function(){return s},this.getType=function(){return n},this.getNumber=function(){return i},this.getScript=function(){return a},this.getPassword=function(e){var n=KOS.getInputSessionKey(r),s=KOS.getProtectedValue(r);e(""==n||"undefined"==n||null==n?t.value:{type:i,value:{session:n,value:s}})},this.isCert=function(){return!0},this.clearPassword=function(){},this.disableElement=function(t){},this.getPath=function(){return u}},u=function(t,e){var n="npk",i=2,r=!1,s=e.path,u=e.fileName;this.init=function(){t.setAttribute("npkencrypt","re"),t.setAttribute("name","passwordInput"),t.setAttribute("data-keypad-type","alpha"),npPfsStartup(document.passwordForm,e.param2,e.param3,e.param4,e.param5,"npkencrypt","re"),r=!0},this.getPassword=function(e){bh.doFocusOut("passwordInput"),e({type:i,value:{table:npPfsCtrl.GetResultField("passwordForm",t.getAttribute("name")),data:npPfsCtrl.GetReplaceField("passwordForm",t.getAttribute("name"))}})},this.initalizeCheck=function(){return r},this.getType=function(){return n},this.getNumber=function(){return i},this.getScript=function(){return u},this.isCert=function(){return!1},this.clearPassword=function(){},this.disableElement=function(t){},this.getPath=function(){return s}},a=function(t,e){function n(t,e){$ASTX2.init(function(){return $_astxu.log("ASTX.init() success"),t?t():void 0},function(){return!1})}var i="anlab",r=3,s=t,u=!1,a=e.path,o=e.fileName;this.init=function(){s.setAttribute("autocomplete","off"),s.setAttribute("e2e_type","11"),n(function(){$ASTX2.initE2E(2189),u=!0})},this.getPassword=function(t){t({type:r,value:{pageID:$ASTX2.getE2EPageID()+"",inputID:$ASTX2.getE2EInputID(s)}})},this.initalizeCheck=function(){return u},this.getType=function(){return i},this.getNumber=function(){return r},this.getScript=function(){return o},this.isCert=function(){return!1},this.clearPassword=function(){u&&$ASTX2.clearE2EText(t)},this.disableElement=function(t){},this.getPath=function(){return a}},o=function(t,e){var n="touchen",i=8,r=!1,s="",u=e.path,a=e.fileName;window.TNK_SR="d53b7efe1ae05d1e0a4dc9ec56ffa049",this.init=function(e){t.setAttribute("name","passwordInput"),t.setAttribute("data-enc","on"),TK_EnqueueList("passwordForm","passwordInput"),s="-----BEGIN CERTIFICATE-----",s+=e.publicKey,s+="-----END CERTIFICATE-----",r=!0},this.getPassword=function(t){TK_GetEncYT("passwordForm","passwordInput",s,function(e){t({type:i,value:{data:e}})})},this.initalizeCheck=function(){return r},this.getType=function(){return n},this.getNumber=function(){return i},this.getScript=function(){return a},this.isCert=function(){return!0},this.clearPassword=function(){},this.disableElement=function(t,e){t.attr("data-security","off"),e.attr("data-DefaultSecurity","off")},this.getPath=function(){return u}},c=function(t,e){var n="transkey",i=8,r=!1,s="",u=e.path,a=e.fileName;window.transkey_yettie=!0,this.init=function(n){o(),t.setAttribute("data-tk-kbdType","qwerty"),t.setAttribute("data-tk-isCrt","true"),t.setAttribute("data-tk-cssName","crt"),t.setAttribute("data-tk-keyboard","qwerty_crt"),t.setAttribute("data-tk-kbdxy",e.position.x+" "+e.position.y),initTranskey(),r=!0,s="-----BEGIN CERTIFICATE-----",s+=n.publicKey,s+="-----END CERTIFICATE-----"},this.getPassword=function(t){t({type:i,value:{data:tk_GetencdataYT(s,"passwordInput")}})},this.initalizeCheck=function(){return r},this.getType=function(){return n},this.getNumber=function(){return i},this.getScript=function(){return a},this.isCert=function(){return!0},this.clearPassword=function(){},this.getPath=function(){return u};var o=function(){var t=document.createElement("link");t.setAttribute("rel","stylesheet"),t.setAttribute("type","text/css"),t.setAttribute("href",u+"transkey.css"),document.getElementsByTagName("head")[0].appendChild(t)}},f=function(t,e){var n="anlabOld",i=4,r=!1,s=e.path,u=e.fileName;this.init=function(){document.getElementById("passwordForm").setAttribute("onsubmit",aos_copy_to_form(document.getElementById("passwordForm"))),aos_set_auth_server(location.hostname),aos_set_authinfo("aosmgr_smbc.html"),aos_set_option("uimode",!0),aos_set_option("asyncmode",!1),aos_set_option("mkd_protect_level","default"),aos_write_object(),aos_start("40"),r=!0},this.getPassword=function(){func(aos_get_text2(elemen))},this.initalizeCheck=function(){return r},this.getType=function(){return n},this.getNumber=function(){return i},this.getScript=function(){return u},this.isCert=function(){return!1},this.clearPassword=function(){},this.disableElement=function(t){},this.getPath=function(){return s}},h=function(t,e){function n(t,e){var n=parent.document.getElementById("yettie_iframe");n.width=t+"px",n.height=e+"px",n.style.marginTop="-"+e/2+"px",n.style.marginLeft="-"+t/2+"px"}function i(){var t=document.createElement("input");t.setAttribute("id","xkindexed"),t.setAttribute("name","xkindexed"),t.setAttribute("type","hidden"),c.appendChild(t)}var r,s,u,a="xkeypad",o=7,c=t,f=!1,h=e.path,d=e.fileName;this.init=function(t){u=t.getE2EInfoFun,r=t.sessionID,s=new Array(1),s[0]=new XKModule,s[0].setTheme("white"),i();var e={option:1,left:0,top:512},a="xk_dialog_0",o=a+"_button_span",h=document.getElementById(o);null!=h&&h.parentNode.removeChild(h),h=document.createElement("SPAN"),h.id=o,c.parentNode.appendChild(h),s[0].initialize(a,h,c,180,"qwertynew",!1,0,e,t.indexTable,XK_NEW_ConfigPlugin.sessionTimeout),s[0].setCloseCallback(function(t,e){if("XK_START"==t);else if("KEY_SIZE"==t){var i=e.split(",");n(430<i[0]?i[0]:430,512+1*i[1])}else"REFRESH_START"==t?u(function(t){r=t.sessionID,s[0].refresh(t.indexTable)}):"XK_CLOSE"!=t&&"XK_ENTER"!=t||n(430,520)}),c.setAttribute("disabled",!0),f=!0},this.getPassword=function(t){var e=s[0].get_sessionInfo();t({type:o,value:{session:r,data:e.input}})},this.initalizeCheck=function(){return f},this.getType=function(){return a},this.getNumber=function(){return o},this.getScript=function(){return d},this.isCert=function(){return!0},this.clearPassword=function(){},this.disableElement=function(t){},this.getPath=function(){return h}};return i(t,e)};