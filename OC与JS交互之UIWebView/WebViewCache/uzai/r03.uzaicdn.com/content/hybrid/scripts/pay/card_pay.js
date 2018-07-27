!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}([function(module,exports){"use strict";!function(window){api.__asyncLoadingCode__="0";var $doc=document,$ordercode=api.getQueryString("ordercode"),$userid=void 0,$orderaccount=0,$orderid=api.getQueryString("orderid"),$flippedcardordercode="",$cardAccount=0;$userid=""!==api.getUser().userId&&null!==api.getUser().userId&&"undefined"!=typeof api.getUser().userId?api.getUser().userId:api.getQueryString("userid");var $consumeAccount=$doc.querySelector("#consumeaccount"),$validcode=$doc.querySelector("#validcode"),$submit=$doc.querySelector(".bot");window.$devicetype=api.getQueryString("devicetype")||"wap";var app=angular.module("flippedapp",[]);app.controller("flippedpay",function($scope,$http){var _this=this,params=JSON.stringify({OrderCode:$ordercode,userId:$userid});api.post($http,$scope,api.path.mpaylogic,"Payment","FlippedCardInfo",params,function(obj){return-3===obj.ErrorCode?(api.toast(obj.ErrorMsg),void($scope.backshow=!0)):void("undefined"!=typeof obj.JsonResult&&null!==obj.JsonResult&&($scope.orderdetail=JSON.parse(obj.JsonResult),$scope.ProductName=$scope.orderdetail.ProductName,$scope.FlippedCardAccount=$scope.orderdetail.FlippedCardAccount+" 元",$scope.OrderAccount="¥"+$scope.orderdetail.OrderAccount,$orderaccount=$scope.orderdetail.OrderAccount,$cardAccount=$scope.orderdetail.FlippedCardAccount,$flippedcardordercode=$scope.orderdetail.FlippedCardOrderCode))},0,!1);var _winHeight=window.screen.height;window.onresize=function(){var _height=_this.height;_height-_winHeight>50?document.body.style.height=_winHeight+"px":document.body.style.height="100%"},$submit.onclick=function(){setTimeout(function(){document.body.scrollTop=document.body.scrollHeight},500),setTimeout(function(){for(var $input=$doc.querySelectorAll("input"),y=0;y<$input.length;y++)$input[y].blur();if(""===$consumeAccount.value)return api.toast("使用金额不能为空!"),!1;if(""===$validcode.value)return api.toast("验证码不能为空!"),!1;if(parseInt($consumeAccount.value)<=0)return api.toast("使用金额填写有误!"),!1;if(parseInt($consumeAccount.value)>parseInt($cardAccount))return api.toast("使用金额填写有误!"),!1;if(parseInt($consumeAccount.value)>parseInt($orderaccount))return api.toast("使用金额填写有误!"),!1;var _reg=/^\+?[1-9][0-9]*$/;if(!_reg.test($consumeAccount.value))return api.toast("使用金额请输入整数!"),!1;var payparam=JSON.stringify({OutOrderCode:$flippedcardordercode,UserId:$userid,CardConsumeMoney:$consumeAccount.value,ValidateCode:$validcode.value});api.post($http,$scope,api.path.mpaylogic,"Payment","FlippedCardPay",payparam,function(obj){if(-3===obj.ErrorCode)api.toast(obj.ErrorMsg),$scope.backshow=!0,api.isApp()||(location.href="https://mpay.uzai.com/PayCallBack/FlippedPayResult/0");else if(200===obj.ErrorCode){if("验证码输入有误"===obj.ErrorMsg)return api.toast("验证码输入有误"),!1;if("验证码已过期，请重新获取"===obj.ErrorMsg)return api.toast("验证码已过期，请重新获取"),!1;"心动卡支付成功!"===obj.ErrorMsg&&(api.isApp()?(api.toast("支付成功",2e3),$ordercode.toLowerCase().indexOf("l")>-1?window.location.href="https://mhome.uzai.com/order/singleorderdetail.html?orderid="+$orderid:setTimeout(function(){bridge.openPayDetail($orderid,1,!1)},2e3)):location.href="https://mpay.uzai.com/PayCallBack/FlippedPayResult/1")}else api.isApp()?(api.toast(obj.ErrorMsg),$scope.backshow=!0):location.href="https://mpay.uzai.com/PayCallBack/FlippedPayResult/0"},0,!1)},1e3)};var yzm=$doc.querySelector(".yzm");yzm.onclick=function(){for(var $input=$doc.querySelectorAll("input"),y=0;y<$input.length;y++)$input[y].blur();if(""===$consumeAccount.value)return api.toast("使用金额不能为空!"),!1;$consumeAccount.disabled=!0,$doc.querySelector(".yzm_jine").classList.add("bge0e0e0");var codeparam=JSON.stringify({UserId:$userid,OrderAccount:$consumeAccount.value});yzm.classList.contains("yzm_h")||api.post($http,$scope,api.path.mpaylogic,"Payment","SendSms",codeparam,function(obj){if(-3===obj.ErrorCode)return api.toast(obj.ErrorMsg),void($scope.backshow=!0);if(api.toast(obj.ErrorMsg),"发送短信成功，请注意查收验证码"===obj.ErrorMsg&&!yzm.classList.contains("yzm_h")){yzm.classList.add("yzm_h"),yzm.innerHTML="60S";var t=59,time=setInterval(function(){yzm.innerHTML=t+"S",t--,-1===t&&(clearInterval(time),yzm.innerHTML="获取验证码",yzm.classList.remove("yzm_h"))},1e3)}},0,!1)}}),app.filter("trustHtml",function($sce){return function(input){return $sce.trustAsHtml(input)}}),window.is_weixin=function(){var ua=navigator.userAgent.toLowerCase();return"micromessenger"===ua.match(/MicroMessenger/i)},window.bindcard=function(){location.href="https://mhome.uzai.com/flippedcard/flippedcardbind.html?orderCode="+$ordercode},window.back=function(){var url="https://mpay.uzai.com/pay/index.html?orderCode="+$ordercode;$ordercode.indexOf("l")>-1&&(url="https://mpay.uzai.com/pay/individual-payment.html?ordercode="+$ordercode),location.href=url},window.goback=function(){var url="https://mpay.uzai.com/pay/index.html?orderCode="+$ordercode;$ordercode.indexOf("l")>-1&&(url="https://mpay.uzai.com/pay/individual-payment.html?ordercode="+$ordercode),location.href=url},window.androidGoBack=window.goback}(window)}]);