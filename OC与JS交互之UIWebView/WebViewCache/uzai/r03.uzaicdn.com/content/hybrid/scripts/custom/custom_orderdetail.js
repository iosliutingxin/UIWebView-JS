"use strict";function initcompany(flag,ordersourcetype){flag?$(".main_detailed .n4").hide():(1==ordersourcetype?($(".main_detailed .n4").hide(),$(".main_m .title").html("U圈定制"),api.setLocalStorage("dingzhiurl","https://mhome.uzai.com/membercenter/udingzhi.html")):($(".main_detailed .n4").show(),$(".main_m .title").html("私人定制"),api.setLocalStorage("dingzhiurl","https://mdingzhi.uzai.com")),$(".main_detailed .n1").hide(),$(".main_detailed .n2").hide())}function orderstate(falg){falg?($(".headtitle .w_100 span").addClass("headtitle_cancel"),$(".main_m .title").addClass("title_cancel"),$(".main_m_t .n1").addClass("n1_cancel"),$(".main_m_t .n2").addClass("n2_cancel"),$(".main_m .adr").addClass("adr_cancel"),$(".foot").hide(),$(".main .cancel").show(),$(".customer").addClass("customer_"),$(".main").css("padding-bottom","0rem")):$(".main .cancel").hide()}function andriodGoBack(){window.location.href="../order/list.html"}api.__asyncLoadingCode__="0";var myModule=angular.module("MyModule",[]),orderid=api.getQueryString("orderid");api.loginConfig.from="https://mdingzhi.uzai.com/order/index.html";var uid=api.getUserId();myModule.controller("OrderDetail",["$scope","$http",function($scope,$http){var param=JSON.stringify({ID:orderid,UserId:uid});api.post($http,$scope,api.path.dingzhilogic,"UzaiDingZhiOrder","GetOrderEntityByOrderID",param,function(obj){if(200==obj.ErrorCode||-3==obj.ErrorCode){if(-3==obj.ErrorCode)return void api.toast("网络连接失败,请重试～");$scope.values=JSON.parse(obj.JsonResult),$scope.UzaiOrderId=JSON.parse(obj.JsonResult).ID,$scope.values.IsCompany?initcompany(!0,$scope.values.OrderSourceType):initcompany(!1,$scope.values.OrderSourceType),1==$scope.values.OrderSourceType&&($scope.values.ProName="U圈定制-定制单"),$scope.values.IsDingZhiPro===!0&&$(".main_headtitle a").click(function(){return!1}),$scope.values.StartCityName.indexOf("市")>0&&($scope.values.StartCityName=$scope.values.StartCityName.replace(/市/g,"")),$scope.values.StartCityName=$scope.values.StartCityName+"出发","已取消"==$scope.values.State?orderstate(!0):"已成交"==$scope.values.State?($(".foot").hide(),$(".main").css("padding-bottom","0rem"),$(".main .cancel").hide()):orderstate(!1)}else-2==obj.ErrorCode&&api.toast("您没有这个订单，请确认。",3e3),console.log(obj.ErrorMsg)}),$scope.cancel_order=function(){$(".layer_main, .layer").show(),$(".confirm").click(function(){var param=JSON.stringify({UzaiOrderId:$scope.UzaiOrderId,UserID:uid});api.post($http,$scope,api.path.dingzhilogic,"UzaiDingZhiOrder","OrderCancle",param,function(obj){if(200==obj.ErrorCode||-3==obj.ErrorCode){if(-3==obj.ErrorCode)return api.toast("网络连接失败,请重试～"),void $(".layer_main, .layer").hide();orderstate(!0),$(".layer_main, .layer").hide()}else $(".layer_main, .layer").hide(),console.log(obj.ErrorMsg)})}),$(".cancel_").click(function(){$(".layer_main, .layer").hide()})}}]);var pages={Telephone_init:function(){$("#Telephone").attr("href","tel:4009982060")},returnUrl:function(){api.setLocalStorage("ProductListURL",window.location.href)}};window.androidGoBack=andriodGoBack,window.andriodGoBack=andriodGoBack,pages.returnUrl();