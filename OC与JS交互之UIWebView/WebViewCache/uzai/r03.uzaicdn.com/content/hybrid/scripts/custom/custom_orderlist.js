"use strict";function onFinishRenderDirective($timeout){return{restrict:"AE",link:function(scope){scope.$first===!0,scope.$last===!0&&$timeout(function(){my_scroll()})}}}function my_scroll(){"undefined"==typeof myScroll?(window.myScroll=null,myScroll=new IScroll("#wrapper",{mouseWheel:!0,click:!0,disableMouse:!0,disablePointer:!0})):myScroll.refresh()}function andriodGoBack(){var gourl=document.referrer,url=api.getLocalStorage("dingzhiurl");if(gourl.indexOf("mdingzhi.uzai.com/order/index.html?udingzhitype=1")>-1)return void(window.location.href="https://mdingzhi.uzai.com/order/index.html?udingzhitype=1");if("https://mdingzhi.uzai.com"===gourl||"http://mdingzhi.uzai.com"===gourl)window.location.href="https://mdingzhi.uzai.com";else if(null!=url&&"undefined"!=typeof url&&""!=url)if(api.isApp()&&api.getQueryString("appVersion")>"5.4.8"){var backParam={ClassInfo:{},GA:api.getLocalStorage("GA")};"ios"==devicetype?backParam.ClassInfo={ClassName:"",isLastPage:"1",isRootPage:"0"}:"android"==devicetype&&(backParam.ClassInfo={ClassName:"",isLastPage:"1",isRootPage:"0"}),api.invoke("go.back",encodeURI(JSON.stringify(backParam)))}else window.location.href=url;else window.location.href="https://mdingzhi.uzai.com/"}var devicetype=api.getQueryString("devicetype");api.__asyncLoadingCode__="0",api.loginConfig.from="https://mdingzhi.uzai.com";var busy=!1,myModule=angular.module("MyModule",[]);myModule.controller("MyCtrl",["$scope","$http",function($scope,$http){$scope.openOrderList=function(){"ios"==devicetype?api.invoke("action.openorderlist",""):"android"==devicetype?window.action.exec("openorderlist",""):location.href="https://u.uzai.com/mobile/order"};var PageIndex=1,uid=api.getUserId(),Phone=api.getValue("Mobile",api.getCookie("user"));""!=Phone&&null!=Phone||(Phone=api.getValue("Email",api.getCookie("user")));var param=JSON.stringify({userid:uid,PageIndex:PageIndex,PageSize:10});api.post($http,$scope,api.path.dingzhilogic,"UzaiDingZhiOrder","GetOrderList",param,function(obj){if(200==obj.ErrorCode||-3==obj.ErrorCode){if(-3==obj.ErrorCode)return api.toast("网络连接失败,请重试～"),!1;$scope.values=JSON.parse(obj.JsonResult),0==$scope.values.length&&api.toast("没有更多订单啦～",3e3);for(var i=$scope.values.length-1;i>=0;i--)1==$scope.values[i].OrderSourceType&&($scope.values[i].ProName="U圈定制-定制单"),$scope.values[i].Enable<7&&($scope.values[i].Enable=0),7==$scope.values[i].Enable&&($scope.values[i].Enable=1),9==$scope.values[i].Enable&&($scope.values[i].Enable=2,$scope.values[i].aa=2)}else console.log(obj.ErrorMsg)}),$scope.loadMore=function(){if(!busy){PageIndex++;var param=JSON.stringify({userid:api.getUserId(),PageIndex:PageIndex,PageSize:10});api.post($http,$scope,api.path.dingzhilogic,"UzaiDingZhiOrder","GetOrderList",param,function(obj){if(200!=obj.ErrorCode&&-3!=obj.ErrorCode)return!1;if(-3==obj.ErrorCode)return api.toast("网络连接失败,请重试～"),!1;if(0==JSON.parse(obj.JsonResult).length)return busy=!0,api.toast("没有更多订单啦～",3e3),!1;busy=!1;for(var i=0;i<JSON.parse(obj.JsonResult).length;i++)1==JSON.parse(obj.JsonResult)[i].OrderSourceType&&(JSON.parse(obj.JsonResult)[i].ProName="U圈定制-定制单"),$scope.values.push(JSON.parse(obj.JsonResult)[i])})}},$scope.dingzhiurl=function(){andriodGoBack()}}]),myModule.directive("onFinishRender",onFinishRenderDirective),myModule.directive("whenScrolled",function(){return function(scope,elm,attr){var myScroll=new IScroll("#wrapper",{mouseWheel:!0,click:!0,disableMouse:!0,disablePointer:!0});myScroll.on("scrollEnd",function(){-this.y+$("#wrapper").height()-$(".main").innerHeight()>=0&&scope.$apply(attr.whenScrolled)})}}),window.androidGoBack=andriodGoBack,window.andriodGoBack=andriodGoBack;