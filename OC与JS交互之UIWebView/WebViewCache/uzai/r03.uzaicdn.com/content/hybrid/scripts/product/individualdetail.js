!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}({0:function(module,exports,__webpack_require__){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function goBack(){var url=api.getCookie("backUrl"),subjectUrl=document.referrer;subjectUrl.indexOf("subject")>=0&&(url=subjectUrl),bridge.goBackForProductdetail(url,!0,!1)}function androidGoBack(){var viewName=window.location.hash.replace("#/","");""!==viewName.trim()?api.routerGoBack():bridge.goBack("",!0,!1,1)}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_lazyloadimg=__webpack_require__(8);api.backUrl="javascript:goBack()";var uzai=angular.module("individualdetail",[]),$doc=document,$backtop=$doc.getElementsByClassName("back-top")[0],$clientHeight=$doc.documentElement.clientHeight;api.serverVirtualDir="singleproduct",uzai.filter("trustHtml",function($sce){return function(input){if(void 0!==input){var txt=input.replace(/\r/g,"</br>");return txt.replace(/\n/g,"&nbsp;"),$sce.trustAsHtml(txt)}return $sce.trustAsHtml(input)}});var Detail_config={create:function(){var Detail_config={};return Detail_config.Isapp=api.isApp(),Detail_config.IsappIos="ios"===api.devicetype,Detail_config.productId=api.getQueryString("productid"),Detail_config.userId="0",Detail_config.userName="",Detail_config.userInit=function(){var user=api.getCookie("user"),self=this;!user||"undefined"==typeof user||user.length<5?self.userId=0:(self.userId=api.getValue("userid",user),self.userName=api.getValue("userName",user),"undefined"!=typeof self.userName&&"undefined"!==self.userName||(self.userName=""))},Detail_config.historyClick=function(){$doc.getElementsByClassName("cal-mask")[0].onclick=$doc.querySelector(".history-view .close-btn").onclick=function(){$doc.getElementsByClassName("detail-content")[0].classList.remove("left"),setTimeout(function(){$doc.querySelector(".detail .wrapper-scroll").style.cssText="position:static;height:auto;",$doc.getElementsByClassName("cal-mask")[0].classList.add("hide")},200)}},Detail_config.historyImgLazy=function(){function imgLazy(){for(var _this2=this,_lazyImg=document.getElementsByClassName("h-img-lazy"),_defauleImg="https://r03.uzaicdn.com/content/hybrid/images/search/bg1.png",_imgoffsettop=0,i=0;i<_lazyImg.length;i++)_imgoffsettop=_lazyImg[i].offsetTop,_imgoffsettop<historyScroll.scrollTop+window.innerHeight&&(_lazyImg[i].onerror=function(){_this2.setAttribute("src",_defauleImg)},_lazyImg[i].getAttribute("src")!==_defauleImg&&_lazyImg[i].getAttribute("src")!==_lazyImg[i].getAttribute("data-src")&&_lazyImg[i].setAttribute("src",_lazyImg[i].getAttribute("data-src")))}var historyScroll=$doc.getElementById("historywrapper");historyScroll.onscroll=function(){imgLazy()},imgLazy()},Detail_config.userInit(),Detail_config}};window.androidGoBack=androidGoBack;var Config=Detail_config.create();!function(uzai,$doc){function scrollfn(){var _whitetopbar=$doc.getElementsByClassName("white-topbar1")[0];window._main=$doc.getElementsByClassName("main")[0],$doc.body.scrollTop>0?(_whitetopbar.classList.add("bg-gradient"),$doc.body.scrollTop>$clientHeight?$backtop.classList.remove("hide"):$backtop.classList.add("hide")):(_whitetopbar.classList.remove("bg-gradient"),$backtop.classList.add("hide"))}window.$login="1";var $detail=$doc.getElementsByClassName("detail")[0],$morelist=$doc.getElementsByClassName("more-list")[0];$detail.onclick=function(ev){var _ev=ev||window.event,_target=_ev.target||_ev.srcElement;"more"!==_target.className&&"iconfont icon-more"!==_target.className&&$morelist.classList.add("hide")},uzai.controller("individualdetailcon",function($http,$scope,$compile,$filter,$timeout){$scope.isApp=Config.Isapp,$scope.isAppIos=Config.IsappIos,angular.element(document).ready(function(){api.router($http,$scope,$compile,"0")}),$scope.recommendShow=function(){var _recommencon=$doc.querySelector(".recommend-con");_recommencon.classList.contains("on")?_recommencon.classList.remove("on"):_recommencon.classList.add("on")};var param=JSON.stringify({ProductID:Config.productId});api.post($http,$scope,"http://msingleproductlogic.uzai.com/api/","UzaiProduct","GetIndividualProductInfo",param,function(obj){if((-3!==obj.ErrorCode||(api.toast(obj.ErrorMsg),api.isApp()))&&(200===obj.ErrorCode||(api.toast("获取数据出现问题,请稍后重试!"),api.isApp()))){null===obj.JsonResult&&api.toast("获取数据出现问题,请稍后重试!");var Product=JSON.parse(obj.JsonResult);$scope.ProductInfo=Product,$scope.ProductImgs=Product.ProductImgInfo,$scope.IsAlreadytFavorites=0,Config.historyClick(),Config=Detail_config.create();var imgpic="";$scope.ProductImgs.length>0&&(imgpic=$scope.ProductImgs.length>2?$scope.ProductImgs[2].ImgUrl:$scope.ProductImgs[0].ImgUrl),document.getElementsByTagName("title")[0].text=$scope.ProductInfo.ProductName+"-"+$scope.ProductInfo.ProductName+"价格_众信旅游悠哉网",document.getElementsByName("keywords")[0].setAttribute("content",$scope.ProductInfo.ProductName+","+$scope.ProductInfo.ProductName+"价格"),document.getElementsByName("description")[0].setAttribute("content","众信旅游悠哉网提供"+$scope.ProductInfo.ProductName+",价格优惠,预订方便;当地玩乐攻略首选众信旅游悠哉网."),$scope.productImgUrl=imgpic,$scope.ProductURL="https://m.uzai.com/singleproduct/detail.html?productid="+Config.productId,null!==Config.userId&&"undefined"!=typeof Config.userId&&""!==Config.userId&&"0"!==Config.userId&&0!==Config.userId&&setTimeout(function(){var isFavriteParam=JSON.stringify({UserID:Config.userId,UzaiProductID:Config.productId});api.post($http,$scope,api.path.mproductlogic,"UzaiUserProductFavorites","IsAlreadytFavorites",isFavriteParam,function(obj){if(200!==obj.ErrorCode&&-3!==obj.ErrorCode||-3!==obj.ErrorCode||(api.toast(obj.ErrorMsg),api.isApp())){var msg=JSON.parse(obj.JsonResult);if($scope.IsAlreadytFavorites=msg,$scope.ProductInfo.IndividualSkuClassifyList.length>0){var insertHistoyParam=JSON.stringify({UserID:Config.userId,UserName:Config.userName,ProductID:Config.productId,ProductPrice:$scope.ProductInfo.MinPrice,ProductName:$scope.ProductInfo.ProductName,ProdcutNameExtension:$scope.ProductInfo.ProductNameExtension,ProductURL:window.location.href,ProductPicURL:imgpic});api.post($http,$scope,api.path.mproductlogic,"UzaiScanRecords","InsertUzaiScanRecords",insertHistoyParam,function(obj){(200!==obj.ErrorCode&&-3!==obj.ErrorCode||-3!==obj.ErrorCode||(api.toast(obj.ErrorMsg),api.isApp()))&&(window.msgHistory=JSON.parse(obj.JsonResult))},3,!1,!1)}}},0,!1,!1)},0)}}),$scope.history_init=function(){if($doc.getElementsByClassName("cal-mask")[0].classList.remove("hide"),$doc.getElementsByClassName("detail-content")[0].classList.add("left"),$doc.querySelector(".detail .wrapper-scroll").style.position="absolute",$doc.querySelector(".detail .wrapper-scroll").style.height=screen.height,null===Config.userId||"undefined"==typeof Config.userId||""===Config.userId||"0"===Config.userId||0===Config.userId)$scope.needLogin=!0;else{$scope.needLogin=!1;var _param=JSON.stringify({UserId:Config.userId,ProductID:Config.productId,PhoneType:20});api.post($http,$scope,api.path.mproductlogic,"UzaiScanRecords","GetUzaiScanRecords",_param,function(obj){(200!==obj.ErrorCode&&-3!==obj.ErrorCode||-3!==obj.ErrorCode||(api.toast(obj.ErrorMsg),api.isApp()))&&($scope.scanRecordsList=JSON.parse(obj.JsonResult))},3,!1)}},$scope.goLoginIn=function(){api.login(window.location.href,window.location.href)},$scope.GoProductDetail=function(ProductID,UzaiTravelClassID,ProductType){var isHistory="true";bridge.openProduct(UzaiTravelClassID,ProductID,ProductType,isHistory)},$scope.GoRecommendProductDetil=function(ProductID){window.location.href="https://m.uzai.com/singleproduct/detail.html?productid="+ProductID},$scope.GoReserve=function(ProductID,SkuID,ReserveDateWay){var verifyProductParam=JSON.stringify({ProductID:ProductID,SkuID:SkuID});api.post($http,$scope,"http://msingleproductlogic.uzai.com/api/","UzaiProduct","VerifyProduct",verifyProductParam,function(obj){if(200!==obj.ErrorCode){if(api.toast(obj.ErrorMsg),-3!==obj.ErrorCode)for(var skuid=SkuID,_reservebtn=document.getElementsByClassName("reserve-btn"),i=0;i<_reservebtn.length;i++)parseInt(_reservebtn[i].getAttribute("ng-skuid"))===skuid&&(_reservebtn[i].classList.add("disable"),_reservebtn[i].innerHTML="已售罄")}else if(1===ReserveDateWay)window.location.href="https://m.uzai.com/singleproduct/calendar.html?productid="+ProductID+"&&skuid="+SkuID;else{var url="https://mbuy.uzai.com/booking/individual-index.html?para="+ProductID+"_"+SkuID;""!==api.getUser().userId&&null!==api.getUser().userId&&"undefined"!=typeof api.getUser().userId?window.location.href=url:api.login(location.href,url)}})},$scope.history_init_app=function(){bridge.openHistory()},$scope.goBack=function(){goBack()},$scope.AddFavorites=function(){if(Config=Detail_config.create(),null!==Config.userId&&"undefined"!=typeof Config.userId&&""!==Config.userId&&"0"!==Config.userId&&0!==Config.userId){var favoritesParam=JSON.stringify({UserID:Config.userId,UzaiProductID:$scope.ProductInfo.ProductID,ProductCode:$scope.ProductInfo.ProductCode,ProductName:$scope.ProductInfo.ProductName,MinPrice:$scope.ProductInfo.MinPrice,UzaiTravelClassID:$scope.ProductInfo.UzaiTravelClassID});api.post($http,$scope,api.path.mproductlogic,"UzaiUserProductFavorites","UpdateMyFavouriteProductByUserIDAndProductID",favoritesParam,function(obj){if(200===obj.ErrorCode||-3===obj.ErrorCode)if(-3===obj.ErrorCode){if(api.toast(obj.ErrorMsg),!api.isApp())return}else api.toast("已加入收藏！",800),$scope.IsAlreadytFavorites=1},0,!1)}else api.login(location.href,location.href)},$scope.CancelFavorites=function(){if(Config=Detail_config.create(),null!==Config.userId&&"undefined"!=typeof Config.userId&&""!==Config.userId&&"0"!==Config.userId&&0!==Config.userId){var cancelFavoritesParam=JSON.stringify({UserID:Config.userId,UzaiProductID:$scope.ProductInfo.ProductID});api.post($http,$scope,api.path.mproductlogic,"UzaiUserProductFavorites","DelelteProductFavoritesByUserIDAndProductID",cancelFavoritesParam,function(obj){if(200===obj.ErrorCode||-3===obj.ErrorCode)if(-3===obj.ErrorCode){if(api.toast(obj.ErrorMsg),!api.isApp())return}else api.toast("已取消收藏！",800),$scope.IsAlreadytFavorites=0},0,!1)}else api.login(location.href,location.href)},$scope.GoIndex=function(){bridge.openIndex()},$scope.GoMyOrder=function(){bridge.openMyOrderList()},$scope.SharaProduct=function(title,content,imgUrl,pageUrl){if(content.length+pageUrl.length>136){var allowedLength=136-pageUrl.length-6;pageUrl.length<136&&content.length>allowedLength&&(content=content.substring(0,allowedLength)+"...")}bridge.shareSubject(title,content,imgUrl,pageUrl)},$scope.GoMyFavorites=function(){bridge.openMyFavorites()},$doc.getElementsByClassName("red-btn")[0].onclick=function(){api.login(window.location.href,window.location.href)}}),uzai.directive("findHeadBg",function(){return{restrict:"AE",link:function(scope){scope.$last===!0&&setTimeout(function(){var _headimglength=document.getElementsByClassName("swiper-container-headbg")[0].getElementsByTagName("li").length;_headimglength>1?window.mySwiperHeadbg=new Swiper(".swiper-container-headbg",{autoplay:3e3,lazyLoading:!0,loop:!0,speed:500,observer:!0,observeParents:!0,autoplayDisableOnInteraction:!1}):window.mySwiperHeadbg=new Swiper(".swiper-container-headbg",{observer:!0,observeParents:!0,autoplayDisableOnInteraction:!1});var _flag=document.getElementsByClassName("recommend-text")[0].clientHeight/parseInt(document.getElementsByTagName("html")[0].style.fontSize);1>_flag&&document.getElementsByClassName("morecon")[0].classList.add("hide"),addEventOnScroll(scrollfn)},500)}}}),uzai.directive("script",function($compile){return{restrict:"E",scope:!1,link:function(scope,elem,attr){if("text/javascript-lazy"===attr.type||elem.text().indexOf("childrenFunction.")>-1){if(attr.ngSrc){var script=$doc.createElement("script");return script.setAttribute("type","text/javascript"),script.setAttribute("src",attr.ngSrc),void $doc.body.appendChild(script)}var code=elem.text(),f=new Function(code);f()}}}}),uzai.directive("findTicket",function(){return{restrict:"AE",link:function(scope){scope.$last===!0&&setTimeout(function(){individualdetail.jticketshow()},100)}}}),uzai.directive("findRecommend",function(){return{restrict:"AE",link:function(scope){scope.$last===!0&&setTimeout(function(){_lazyloadimg.lazyloadimg.init()},100)}}}),uzai.directive("findHistory",function($timeout){return{restrict:"AE",link:function(scope){scope.$last===!0&&$timeout(function(){Config.historyImgLazy()},100)}}});var Individualdetail=function(){function Individualdetail(){_classCallCheck(this,Individualdetail)}return _createClass(Individualdetail,[{key:"init",value:function(){}},{key:"jrouterscroll",value:function(){for(var _router=document.getElementsByClassName("J-router-content"),m=0;m<_router.length;m++)_router[m].scrollTop=0}},{key:"jticketshow",value:function(){for(var _self=this,_jticketshow=$doc.getElementsByClassName("j_ticketshow"),i=0;i<_jticketshow.length;i++)_jticketshow[i].index=i,_jticketshow[i].getElementsByClassName("j_tickettit")[0].onclick=function(){var _this=this;if(_this.parentElement.classList.contains("ticket-on")&&!_this.parentElement.classList.contains("buynoticecon"))return void _this.parentElement.classList.remove("ticket-on");if(!_this.parentElement.classList.contains("ticket-on")&&!_this.parentElement.classList.contains("buynoticecon"))return void _this.parentElement.classList.add("ticket-on");if(!_this.parentElement.classList.contains("ticket-on")&&_this.parentElement.classList.contains("buynoticecon")){for(var _buynoticecon=$doc.getElementsByClassName("buynoticecon"),m=0;m<_buynoticecon.length;m++)_buynoticecon[m].classList.contains("ticket-on")&&_buynoticecon[m].classList.remove("ticket-on");return _this.parentElement.classList.add("ticket-on"),void _self.jrouterscroll()}return _this.parentElement.classList.contains("ticket-on")&&_this.parentElement.classList.contains("buynoticecon")?(_this.parentElement.classList.remove("ticket-on"),void _self.jrouterscroll()):void 0}}}]),Individualdetail}(),individualdetail=new Individualdetail;individualdetail.init();var addEventOnScroll=function(func){var oldOnscroll=window.onscroll;"function"!=typeof window.onscroll?window.onscroll=func:window.onscroll=function(){oldOnscroll(),func()}};$backtop.onclick=function(){window.scrollTo(0,0)};var $more=$doc.getElementsByClassName("more")[0];$more.onclick=function(){$morelist.classList.contains("hide")?$morelist.classList.remove("hide"):$morelist.classList.add("hide")};var childrenFunction={costnotice:function(){api.endloading();var _this=this;setTimeout(function(){_this.overheight(),individualdetail.jticketshow()},200)},introduce:function(){api.endloading();var _this=this;setTimeout(function(){_this.overheight()},200)},usenotice:function(){api.endloading();var _this=this;setTimeout(function(){_this.overheight(),individualdetail.jticketshow()},200)},overheight:function(){for(var _jroutercon=document.getElementsByClassName("J-router-content"),_fontSize=parseInt($doc.getElementsByTagName("html")[0].style.fontSize),i=0;i<_jroutercon.length;i++)_jroutercon[i].style.height=window.innerHeight-1.08*_fontSize+"px"}};window.childrenFunction=window.childrenFunction||childrenFunction,uzai.directive("findCost",function(){return{restrict:"AE",link:function(){setTimeout(function(){var $winh=window.innerHeight;$doc.getElementsByClassName("J-router-costnotice")[0].style.height=$winh+"px"},1e3)}}}),uzai.directive("findIntroduce",function(){return{restrict:"AE",link:function(){var $winh=window.innerHeight;$doc.getElementsByClassName("J-router-introduce")[0].style.height=$winh+"px",setTimeout(function(){var _img=document.getElementsByClassName("troduce-page")[0].getElementsByTagName("img"),_length=_img.length,sumnumber=$doc.getElementsByClassName("sumnumber")[0];sumnumber.innerHTML=_length;var mySwiperShowimg=new Swiper(".swiper-container-Showimg",{speed:500,lazyLoading:!0,autoplayDisableOnInteraction:!1,pagination:".swiper-pagination",paginationType:"fraction",observer:!0,observeParents:!0,onSlideChangeStart:function(swiper){var _number=$doc.getElementsByClassName("number")[0];_number.innerHTML=swiper.activeIndex+1}}),_imgclosebtn=$doc.querySelector(".img-view .close-btn"),_imgview=$doc.getElementsByClassName("img-view")[0],_datucon=$doc.getElementsByClassName("datucon")[0];_imgclosebtn.onclick=function(){_imgview.classList.add("hide")};for(var _htmlImg="",_fontSize=parseInt($doc.getElementsByTagName("html")[0].style.fontSize),_loop=function(i){_htmlImg+='<li class="swiper-slide"><img src="'+_img[i].src+'"></li>',_img[i].onclick=function(){var index=i;mySwiperShowimg.slideTo(index),_imgview.classList.remove("hide");for(var _li=document.getElementsByClassName("swiper-container-Showimg")[0].getElementsByTagName("li"),m=0;m<_li.length;m++)_li[m].style.height=window.innerHeight-1.5*_fontSize+"px",_li[m].style.width=window.innerWidth+"px"}},i=0;_length>i;i++)_loop(i);_datucon.innerHTML=_htmlImg},2e3)}}}),uzai.directive("findUse",function(){return{restrict:"AE",link:function(){setTimeout(function(){var $winh=window.innerHeight;$doc.getElementsByClassName("J-router-usenotice")[0].style.height=$winh+"px"},1e3)}}})}(uzai,$doc)},8:function(module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var lazyloadimg={imgloading:function(){for(var _lazyImg=document.getElementsByClassName("img-lazy"),_defauleImg="https://r03.uzaicdn.com/content/hybrid/images/search/bg1.png",_imgoffsettop=0,_this=this,i=0;i<_lazyImg.length;i++)_imgoffsettop=_this.offsettopbody(_lazyImg[i]),_imgoffsettop<window.scrollY+window.innerHeight&&(_lazyImg[i].onerror=function(){this.setAttribute("src",_defauleImg)},_lazyImg[i].getAttribute("src")!==_defauleImg&&_lazyImg[i].getAttribute("src")!==_lazyImg[i].getAttribute("data-src")&&_lazyImg[i].setAttribute("src",_lazyImg[i].getAttribute("data-src")))},offsettopbody:function(obj){var offsettop=0;do{if(null===obj.offsetParent)return;obj=obj.offsetParent,offsettop+=obj.offsetTop}while("BODY"!==obj.tagName);return offsettop},init:function(){var _this=this;_this.imgloading(),window.onscroll=function(){_this.imgloading()}}};exports.lazyloadimg=lazyloadimg}});