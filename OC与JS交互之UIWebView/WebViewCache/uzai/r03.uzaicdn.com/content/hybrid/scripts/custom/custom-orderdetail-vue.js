!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}([function(module,exports){"use strict";function initcompany(flag,ordersourcetype){flag?$(".main_detailed .n4").hide():(1===ordersourcetype?($(".main_detailed .n4").hide(),$(".main_m .title").html("U圈定制"),api.setLocalStorage("dingzhiurl","https://mhome.uzai.com/membercenter/udingzhi.html")):($(".main_detailed .n4").show(),$(".main_m .title").html("私人定制"),api.setLocalStorage("dingzhiurl","https://mdingzhi.uzai.com")),$(".main_detailed .n1").hide(),$(".main_detailed .n2").hide())}function orderstate(falg){falg?($(".headtitle .w_100 span").addClass("headtitle_cancel"),$(".main_m .title").addClass("title_cancel"),$(".main_m_t .n1").addClass("n1_cancel"),$(".main_m_t .n2").addClass("n2_cancel"),$(".main_m .adr").addClass("adr_cancel"),$(".foot").hide(),$(".main .cancel").show(),$(".customer").addClass("customer_"),$(".main").css("padding-bottom","0rem")):$(".main .cancel").hide()}function andriodGoBack(){window.location.href="../order/list.html"}api.__asyncLoadingCode__="0";var orderid=api.getQueryString("orderid");api.loginConfig.from="https://mdingzhi.uzai.com/order/index.html";var uid=api.getUserId(),OrderDetail=new Vue({el:"#body",data:{values:"",UzaiOrderId:""},methods:{DetailInit:function(){var _self=this,param=JSON.stringify({ID:orderid,UserId:uid});api.post({path:api.path.dingzhilogic,controller:"UzaiDingZhiOrder",action:"GetOrderEntityByOrderID",param:param,callback:function(obj){if(200===obj.ErrorCode||-3===obj.ErrorCode)if(-3===obj.ErrorCode)api.toast("网络连接失败,请重试～");else{if(_self.values=JSON.parse(obj.JsonResult),null===_self.values)return void api.toast(obj.ErrorMsg);_self.UzaiOrderId=JSON.parse(obj.JsonResult).ID,_self.values.IsCompany?initcompany(!0,_self.values.OrderSourceType):initcompany(!1,_self.values.OrderSourceType),1===_self.values.OrderSourceType&&(_self.values.ProName="U圈定制-定制单"),_self.values.IsDingZhiPro===!0&&$(".main_headtitle a").click(function(){return!1}),_self.values.StartCityName.indexOf("市")>0&&(_self.values.StartCityName=_self.values.StartCityName.replace(/市/g,"")),_self.values.StartCityName=_self.values.StartCityName+"出发","已取消"===_self.values.State?orderstate(!0):"已成交"===_self.values.State?($(".foot").hide(),$(".main").css("padding-bottom","0rem"),$(".main .cancel").hide()):orderstate(!1)}else api.toast(obj.ErrorMsg)}})},PopInit:function(){var _self=this;$(".confirm").click(function(){var param=JSON.stringify({UzaiOrderId:_self.UzaiOrderId,UserID:uid});api.post({path:api.path.dingzhilogic,controller:"UzaiDingZhiOrder",action:"OrderCancle",param:param,callback:function(obj){if(200===obj.ErrorCode||-3===obj.ErrorCode){if(-3===obj.ErrorCode)return api.toast("网络连接失败,请重试～"),void $(".layer_main, .layer").hide();orderstate(!0),$(".layer_main, .layer").hide()}else $(".layer_main, .layer").hide()}})}),$(".cancel_").click(function(){$(".layer_main, .layer").hide()})},cancel_order:function(){$(".layer_main, .layer").show()}}});OrderDetail.DetailInit(),OrderDetail.PopInit();var pages={returnUrl:function(){api.setLocalStorage("ProductListURL",window.location.href)}};window.androidGoBack=andriodGoBack,window.andriodGoBack=andriodGoBack,pages.returnUrl()}]);