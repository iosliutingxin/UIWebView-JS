!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}([function(module,exports,__webpack_require__){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_paycommon=__webpack_require__(1),$uzai=angular.module("uzai",[]),$doc=document,orderId="",orderType="",isSonOrder=!1,orderCode=api.getQueryString("orderCode"),userId="",devicetype=api.getQueryString("devicetype")||"wap";api.backUrl="javascript:loadingBack(false)";var scope=void 0;window.pId="",window.isbindbankcard="0",function(window,$doc,$uzai){$uzai.controller("Payment",function($http,$scope,$compile,$filter,$timeout){var $paycommon=new _paycommon.PayCommon($http,$scope);angular.element($doc).ready(function(){api.router($http,$scope,$compile,"1")}),""!==api.getUser().userId&&null!==api.getUser().userId&&"undefined"!=typeof api.getUser().userId?userId=api.getUser().userId:api.login(location.href,"https://mpay.uzai.com/pay/individual-payment.html?orderCode="+orderCode),$scope.getBanksAndPreferentials=function(){var parameters=JSON.stringify({userid:userId,orderCode:orderCode,terminaltype:devicetype||"wap"});$paycommon.GetBankPreferentialList(parameters,function(paymentInfo){var notapplepay=function(element,index,array){return 88!==element.BankID};paymentInfo.Banks=paymentInfo.Banks.filter(notapplepay),$scope.paymentInfo=paymentInfo,$scope.orderPrepayMent=paymentInfo.OrderDetail.UzaiOrder.PrepayMent,orderId=paymentInfo.OrderDetail.UzaiOrder.OrderId,orderType=paymentInfo.OrderDetail.UzaiOrder.OrderType,$scope.Timecountdown(),$scope.agreeContract=!1,document.getElementsByTagName("title")[0].text=paymentInfo.OrderDetail.UzaiOrder.ProductName+"订单支付-众信旅游悠哉网",document.getElementsByName("keywords")[0].setAttribute("content",paymentInfo.OrderDetail.UzaiOrder.ProductName+"订单支付"),document.getElementsByName("description")[0].setAttribute("content",paymentInfo.OrderDetail.UzaiOrder.ProductName+"订单支付-众信旅游悠哉网"),$scope.showAllBanks=!$scope.paymentInfo.IsPayPreferential||$scope.paymentInfo.PrefIsExpired||$scope.paymentInfo.Banks.every(function(bank){return!bank.PayPreferentials||!bank.PayPreferentials[0]||!bank.PayPreferentials[0].IsCheck}),$scope.currentBank=$scope.paymentInfo.Banks&&$scope.paymentInfo.Banks.filter(function(bank){return bank.PayPreferentials&&bank.PayPreferentials[0]&&bank.PayPreferentials[0].IsCheck})[0],void 0!==$scope.currentBank&&null!==$scope.currentBank.PayPreferentials&&($scope.orderPrepayMent=(100*$scope.paymentInfo.OrderDetail.UzaiOrder.PrepayMent-100*$scope.currentBank.PayPreferentials.map(function(item){return item.PreferentialMoney}).reduce(function(a,b){return a+b},0))/100),$paycommon.gaStatistics($scope.paymentInfo,orderCode)})},setTimeout(function(){"ios"===devicetype?userId=api.getQueryString("userId"):api.getUser().userId,$scope.getBanksAndPreferentials(),scope=$scope},0),$scope.setShowAllBanks=function(showAllBanks){$scope.showAllBanks=showAllBanks},$scope.changeBank=function(bankId){window.lastBank=$scope.preBank=$scope.currentBank,window.newBank=$scope.currentBank=$scope.paymentInfo.Banks.filter(function(bank){return bank.BankID===bankId})[0],$scope.showAllBanks&&($scope.showAllBanks=!1)},$scope.setBankClass=function(bank){var bankClass="hide";return void 0!==$scope.currentBank&&$scope.currentBank.BankID===bank.BankID?bankClass="on":(void 0===$scope.currentBank&&bank.PayPreferentials[0]&&bank.PayPreferentials[0].IsCheck&&(bankClass="on"),$scope.showAllBanks&&(bankClass="")),bankClass},$scope.confirmPay=function(){$scope.showCancelMask=!1},$scope.pay=function(){return $scope.timeout?void api.toast("您的订单支付超时，请重新下单"):$scope.agreeContract?$scope.currentBank?$scope.orderPrepayMent<=0?void api.toast("金额不能低于零请联系客服协助您预订"):"1"!==$scope.isbindbankcard&&"ApplePay"===$scope.currentBank.BankCode?void api.toast("您的apple pay功能尚未开通，请前往程序Wallet开通"):void $paycommon.mobilePay(orderCode,isSonOrder,0,$scope.paymentInfo.OrderDetail.PayOrderID,"",0,$scope.currentBank.BankCode,userId):void api.toast("请选择一种支付方式"):void api.toast("请确认预订须知")},$scope.goBack=function(isCancel){isCancel?loadingBack():$scope.showCancelMask=!0},$scope.confirmPay=function(){$scope.showCancelMask=!1},$scope.clickMask=function(){$scope.showCancelMask?$scope.showCancelMask=!1:$scope.showError&&($scope.showError=!1)},$scope.Timecountdown=function(){var _minute=$doc.getElementsByClassName("j_minute")[0],_second=$doc.getElementsByClassName("j_second")[0],_secondInt=parseInt($scope.paymentInfo.OrderDetail.UzaiOrder.SingleOrderSurpluSeconds),_minuteInt=parseInt($scope.paymentInfo.OrderDetail.UzaiOrder.SingleOrderSurpluMinutes),_timer=void 0;_timer=setInterval(function(){0===_secondInt&&0===_minuteInt?(api.toast("您的订单支付超时，请重新下单"),_second.classList.add("disable"),$scope.timeout=!0,clearInterval(_timer)):0===_secondInt&&0!==_minuteInt?(_minuteInt-=1,_secondInt=59,10>_minuteInt?_minute.innerHTML="0"+_minuteInt:_minute.innerHTML=_minuteInt,_second.innerHTML=_secondInt):0!==_secondInt&&(_secondInt-=1,10>_secondInt?_second.innerHTML="0"+_secondInt:_second.innerHTML=_secondInt)},1e3)},window.hanlderResponse=function(response){return 200===response.ErrorCode?!0:-3===response.ErrorCode?(api.toast("网络连接失败,请重试～"),!1):(-5===response.ErrorCode&&(api.toast(response.ErrorMsg,2e3),$scope.showPreferentials=!1,$scope.getBanksAndPreferentials()),-6===response.ErrorCode?($scope.showError=!0,!1):(api.toast(response.ErrorMsg,2e3),!1))}}),$uzai.directive("script",function($compile){return{restrict:"E",scope:!1,link:function(scope,elem,attr){if("text/javascript-lazy"===attr.type||elem.text().indexOf("childrenFunction.")>-1){if(attr.ngSrc){var script=$doc.createElement("script");return script.setAttribute("type","text/javascript"),script.setAttribute("src",attr.ngSrc),void $doc.body.appendChild(script)}var code=elem.text(),f=new Function(code);f()}}}});var ChildrenFunction=function(){function ChildrenFunction(){_classCallCheck(this,ChildrenFunction)}return _createClass(ChildrenFunction,[{key:"individualcontract",value:function(){api.endloading()}}]),ChildrenFunction}(),childrenFunction=new ChildrenFunction;window.childrenFunction=window.childrenFunction||childrenFunction}(window,$doc,$uzai);var loadingBack=function(){api.isApp()?bridge.openPayDetail(orderId,orderType,isSonOrder):window.location.href="https://u.uzai.com/mobile/order"};window.popup=function(text){void 0===text&&(text="");var _popup=$doc.getElementsByClassName("popup")[0];_popup.style.display="block",_popup.getElementsByTagName("span")[0].innerText=text,setTimeout(function(){$doc.getElementsByClassName("popup")[0].style.display="none"},2e3)};var androidGoBack=function(){var viewName=window.location.hash.replace("#/","");""!==viewName.trim()?api.routerGoBack():(scope.showCancelMask=!0,scope.$apply())};window.loadingBack=window.loadingBack||loadingBack,window.androidGoBack=window.androidGoBack||androidGoBack},function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),PayCommon=function(){function PayCommon($http,$scope){_classCallCheck(this,PayCommon),this.$http=$http,this.$scope=$scope,this.devicetype=api.getQueryString("devicetype")||"wap"}return _createClass(PayCommon,[{key:"is_weixin",value:function(){var ua=navigator.userAgent.toLowerCase();return ua.indexOf("micromessenger")>-1}},{key:"GetBankPreferentialList",value:function(parameters,callback){var _this=this,_that=this,controller="",actionname="";""!==api.getUser().userId&&null!==api.getUser().userId&&"undefined"!=typeof api.getUser().userId?(controller="Payment",actionname="GetBankPreferentialList"):(controller="QuickPayLink",actionname="GetQuickPayLinkInit"),api.post(this.$http,this.$scope,api.path.mpaylogic,controller,actionname,parameters,function(data){if(_that.hanlderResponse(data)){if(data=JSON.parse(data.JsonResult),"7"===data.OrderDetail.UzaiOrder.Enable||"7"!==data.OrderDetail.UzaiOrder.Enable&&data.IsSonOrderPay===!0)api.toast("该笔付款已完成，请登录后查看订单状态!",2e3),setTimeout(function(){location.href="https://u.uzai.com/mobile/order"},2e3);else if("9"===data.OrderDetail.UzaiOrder.Enable)return void api.toast("该订单已取消，如需支付请重新下单!");if(_this.$scope.isshowapplepay=!1,_this.$scope.isios=!1,api.isApp()){var appversion=api.getCookie("appversion");if("5.5.6">appversion){var notGiftCard=function(element,index,array){return 10!==element.BankID};data.Banks=data.Banks.filter(notGiftCard)}if("ios"===devicetype){_this.$scope.isios=!0,_this.$scope.isbindbankcard=api.getCookie("isbindbankcard");var phonetype=api.getCookie("phonetype"),systemversion=api.getCookie("systemversion");if(systemversion&&systemversion.split(".").length<3)for(var i=0;i<3-systemversion.split(".").length;i++)systemversion+=".0";if(appversion>="5.5.2"&&Number("9.2.0".replace(/\./g,""))<=Number(systemversion.replace(/\./g,""))&&("iphone6"===phonetype||"iphone6s"===phonetype||"iphone6plus"===phonetype||"iphone6splus"===phonetype||"iphone7"===phonetype||"iphone7plus"===phonetype||"iphonese"===phonetype||"ipad"===phonetype)&&(_this.$scope.isshowapplepay=!0),!_this.$scope.isshowapplepay){var notapplepay=function(element,index,array){return 84!==element.BankID};data.Banks=data.Banks.filter(notapplepay),data.IsBankPref&&(data.PreferentialMoney=0);var notapplepaypref=function(element,index,array){return 32!==element.PreferentialType};data.OrderDetail.UzaiPreferentialRecord=data.OrderDetail.UzaiPreferentialRecord.filter(notapplepaypref)}}}if(_this.is_weixin()){var notalipay=function(element,index,array){return 45!==element.BankID};data.Banks=data.Banks.filter(notalipay),data.IsBankPref&&(data.PreferentialMoney=0);var notalipaypref=function(element,index,array){return 32!==element.PreferentialType};data.OrderDetail.UzaiPreferentialRecord=data.OrderDetail.UzaiPreferentialRecord.filter(notalipaypref);var openidkey=data.WeiXinOpenIdKey;if(_this.$scope.openidvalue=api.getCookie(openidkey),null===_this.$scope.openidvalue||""===_this.$scope.openidvalue||"undefined"==typeof _this.$scope.openidvalue){var checkurl="https://m.uzai.com/WeiXin/Authorization?MyUrl="+encodeURIComponent(decodeURIComponent(location.href).replace("#rd&","&").replace("#rd",""));location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+data.MWeiXinAppId+"&redirect_uri="+encodeURIComponent(checkurl)+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"}}if(data.GetCustomTelList)for(var _i=0;_i<data.GetCustomTelList.length;_i++)1===data.GetCustomTelList[_i].Type?"ios"===devicetype&&(_this.$scope.Telphone=data.GetCustomTelList[_i].Telephone):2===data.GetCustomTelList[_i].Type?"android"===devicetype&&(_this.$scope.Telphone=data.GetCustomTelList[_i].Telephone):20===data.GetCustomTelList[_i].Type&&"ios"!==devicetype&&"android"!==devicetype&&(_this.$scope.Telphone=data.GetCustomTelList[_i].Telephone);callback(data)}},0,!1)}},{key:"mobilePay",value:function(orderCode,isSonOrder,tuanId,payOrderID,preferentialIds,preferentialTotalMoney,bankCode,userId){var bcmpayurl="https://mpay.uzai.com/pay/bcmpay.html?orderCode="+orderCode+"&orderId="+(isSonOrder?"02":"01")+payOrderID+"&tuanId="+(null===tuanId?0:tuanId)+"&preferentialIds="+preferentialIds+"&preferentialTotalMoney="+preferentialTotalMoney,flippedCardUrl="https://mpay.uzai.com/pay/flippedpay.html?orderCode="+orderCode+"&orderId="+this.$scope.paymentInfo.OrderDetail.UzaiOrder.OrderId,quickunionpayurl="https://mpay.uzai.com/pay/quickunionpay.html?orderCode="+orderCode+"&preferentialIds="+preferentialIds;if(api.isApp())if("BCM"===bankCode)window.location.href=bcmpayurl;else if("FlippedCard"===bankCode)window.location.href=flippedCardUrl;else if("QuickUnionPay"===bankCode)window.location.href=quickunionpayurl;else{var params={payType:bankCode,IsSSL:0,IsUtour:0,goDate:this.$scope.paymentInfo.OrderDetail.UzaiOrder.GoDate,nums:this.$scope.paymentInfo.OrderDetail.UzaiOrder.OrderPresonCount,orderCode:orderCode,orderId:payOrderID,pname:this.$scope.paymentInfo.OrderDetail.UzaiOrder.ProductName,prepayment:this.$scope.orderPrepayMent};bridge.invokeBankPay(params)}else{var param={OutOrderCode:payOrderID,UserId:userId,payType:bankCode,ClientIP:api.getCookie("spbill_create_ip")};switch(this.is_weixin()&&(param.OpenId=this.$scope.openidvalue),isSonOrder?param.OutOrderCode="02"+payOrderID:param.OutOrderCode="01"+payOrderID,param=JSON.stringify(param),bankCode){case"KQ":this.mpayRedirect("GetMKQPay",param);break;case"AliPay":this.mpayRedirect("GetMAliPay",param);break;case"MWeiXin":this.is_weixin()?this.mpayRedirect("GetMWeiXinPay",param):this.mpayRedirect("GetMArouseWinXinClientPay",param);break;case"BCM":window.location.href=bcmpayurl;break;case"QuickUnionPay":window.location.href=quickunionpayurl;break;case"FlippedCard":window.location.href=flippedCardUrl}}}},{key:"mpayRedirect",value:function(mpayaction,param){var _that=this;this.is_weixin()&&"MWeiXin"===JSON.parse(param).payType?api.post(this.$http,this.$scope,api.path.mpaylogic,"Payment",mpayaction,param,function(data){function onBridgeReady(){var payData=MPayRes;if(payData){var jsonData=payData;if("fail"===jsonData.return_code.toLowerCase())return void alert(jsonData.return_msg);if("fail"===jsonData.result_code.toLowerCase())return void alert(jsonData.err_code_des);window.WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:jsonData.appid,timeStamp:jsonData.timestamp,nonceStr:jsonData.nonce_str,"package":jsonData["package"],signType:jsonData.signType,paySign:jsonData.sign},function(res){"get_brand_wcpay_request:ok"===res.err_msg&&(api.toast("支付完成",1e3),location.href="https://u.uzai.com/mobile/order"),"get_brand_wcpay_request:cancel"===res.err_msg&&(api.toast("支付失败",1e3),location.href="https://u.uzai.com/mobile/order"),"get_brand_wcpay_request:fail"===res.err_msg&&(api.toast("支付失败",1e3),location.href="https://u.uzai.com/mobile/order")})}}if(api.loading(),_that.hanlderResponse(data)){var MPayRes=JSON.parse(data.JsonResult);"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",onBridgeReady,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",onBridgeReady),document.attachEvent("onWeixinJSBridgeReady",onBridgeReady)):onBridgeReady()}},0,!1):this.is_weixin()||"MWeiXin"!==JSON.parse(param).payType?api.post(this.$http,this.$scope,api.path.mpaylogic,"Payment",mpayaction,param,function(data){if(api.loading(),_that.hanlderResponse(data)){var MPayRes=JSON.parse(data.JsonResult),div=document.createElement("div");""!==MPayRes.MPayRes&&"undefined"!=typeof MPayRes.MPayRes&&(div.innerHTML=MPayRes.MPayRes.replace(/&plus/g,"+")),document.body.appendChild(div),document.forms[0].submit()}},0,!1):api.post(this.$http,this.$scope,api.path.mpaylogic,"Payment",mpayaction,param,function(data){if(api.loading(),!_that.hanlderResponse(data))return void api.endloading();var weixinjson=JSON.parse(data.JsonResult);if("success"===weixinjson.ReturnCode.toLowerCase()&&"success"===weixinjson.ResultCode.toLowerCase()){var mweburl=weixinjson.MwebUrl;window.location.href=mweburl}},0,!1)}},{key:"hanlderResponse",value:function(response){var _that=this;return 200===response.ErrorCode?!0:-3===response.ErrorCode?(api.toast("网络连接失败,请重试～"),!1):(-5===response.ErrorCode&&(api.toast(response.ErrorMsg,2e3),this.$scope.showPreferentials=!1,_that.GetBankPreferentialList(parameters)),-6===response.ErrorCode?(this.$scope.showError=!0,!1):(api.toast(response.ErrorMsg,2e3),!1))}},{key:"gaStatistics",value:function(data,orderCode){setTimeout(function(){var travelClass={1:"出境游",2:"国内游",3:"周边游",4:"签证",5:"酒店",6:"国内机票",7:"门票",8:"租车",9:"手机租赁",10:"自驾游",11:"机票+酒店",12:"巴士+酒店",13:"国内半自助",14:"一日游",15:"海外自由行",16:"国内自由行",17:"邮轮船票",18:"邮轮套餐",19:"自驾车+酒店",20:"接送机",21:"国际酒店",22:"国内酒店",23:"房型",24:"团队游(国内)",25:"手机",26:"附加产品",27:"团队游(出境)",28:"会员",29:"周边自由行",32:"国际机票",33:"供应商确认单",34:"其他业务收入",35:"资深",37:"wifi租赁",38:"国内私家团产品",39:"单项服务",40:"出境私家团产品",41:"特卖会产品",42:"国际火车",43:"要出发",44:"奇迹旅行"};try{window.ga("require","ecommerce","ecommerce.js"),window.ga("ecommerce:addTransaction",{id:orderCode,affiliation:"",revenue:data.OrderDetail.UzaiOrder.PrepayMent,shipping:"",tax:""}),window.ga("ecommerce:addItem",{id:orderCode,name:data.OrderDetail.UzaiOrder.ProductName,sku:data.OrderDetail.UzaiOrder.ProductId,category:travelClass[data.OrderDetail.UzaiOrder.UzaiTravelClassID],price:data.OrderDetail.UzaiOrder.PrepayMent,quantity:data.OrderDetail.UzaiOrder.Person+data.OrderDetail.UzaiOrder.Child}),window.ga("ecommerce:send")}catch(err){}},200)}}]),PayCommon}();exports.PayCommon=PayCommon}]);