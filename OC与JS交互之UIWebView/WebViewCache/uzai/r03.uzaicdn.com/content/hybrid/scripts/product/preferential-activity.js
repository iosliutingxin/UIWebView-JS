"use strict";!function(){function CreateActivity(sel){this.sel=sel}function isLocalStorageSupported(){var testKey="test",storage=window.sessionStorage;try{return storage.setItem(testKey,"testValue"),storage.removeItem(testKey),!0}catch(error){return!1}}function SetNoActivityLogo(isbenefit){"0"===isbenefit?$(".no-activity").show():$(".no-activity").hide(),$(".all-perferential").show()}function getUzaiPointBenefit(istour,uzaipointObj){var dateBenefitArray=[];return"1"===istour?(uzaipointObj.IsUtourGivePoint?dateBenefitArray.push(uzaipointObj.GivePointName+"-"+uzaipointObj.GivePointDesc):angular.forEach(uzaipointObj.GivePointDatesText,function(data){return data===seldate?void dateBenefitArray.push(uzaipointObj.GivePointName+"-"+uzaipointObj.GivePointDesc):void 0}),uzaipointObj.IsUtourOffsetPoint?dateBenefitArray.push(uzaipointObj.OffsetPointName+"-"+uzaipointObj.OffsetPointDesc):angular.forEach(uzaipointObj.OffsetPointDatesText,function(data){return data===seldate?void dateBenefitArray.push(uzaipointObj.OffsetPointName+"-"+uzaipointObj.OffsetPointDesc):void 0})):(uzaipointObj.IsGivePoint&&dateBenefitArray.push(uzaipointObj.GivePointName+"-"+uzaipointObj.GivePointDesc),uzaipointObj.IsOffsetPoint&&dateBenefitArray.push(uzaipointObj.OffsetPointName+"-"+uzaipointObj.OffsetPointDesc)),uzaipointObj.IsCoupon&&dateBenefitArray.push(uzaipointObj.CouponName+"-"+uzaipointObj.CouponDesc),dateBenefitArray}function setNoLocalStorageTDK(benefitData){if(null!==benefitData.ProductName&&"undefined"!=typeof benefitData.ProductName){var metacontent=benefitData.ProductName+"-众信悠哉旅游网";setTDK(metacontent,metacontent,metacontent)}else setTDK("众信悠哉旅游网","众信悠哉旅游网","众信悠哉旅游网")}function setTDK(title,description,keywords){$("title").html(title),$("meta[name='keywords']").attr("content",description),$("meta[name='description']").attr("content",keywords)}function androidGoBack(){back()}function back(){$(".all-perferential").hide(),api.loading();var url=void 0,frompage=api.getQueryString("from");url=null!==frompage?null!==seldate?"calendar.html?productid="+productid+"&seldate="+seldate:"calendar.html?productid="+productid:"detail.html?productid="+productid,window.location.href=url}api.serverVirtualDir="product",api.__asyncLoadingCode__="0",CreateActivity.prototype={constructor:CreateActivity,addMarginTop:function(){var $first=$(".perferential-activity").eq(0);$first.css("margin-top","1.5rem")},deleteFirst:function(){$(".all-perferential .perferential-activity").eq(0).find(".perferential-container").removeClass("bottom-distance").find(".containers").removeClass("zHide"),$(".all-perferential .perferential-activity").eq(0).addClass("HAHA")},addOpen:function(){$(".perferential-activity").eq(0).find(".title .right").addClass("rotates"),$(".perferential-activity .title").off("click").click(function(){var $this=$(this);$this.find(".right").toggleClass("rotates").parents(".perferential-container").toggleClass("bottom-distance").parents(".perferential-activity").siblings(".perferential-activity").find(".perferential-container").addClass("bottom-distance").find(".title .right").removeClass("rotates"),$this.siblings(".containers").toggle().parents(".perferential-activity").siblings(".perferential-activity").find(".containers").hide()})}};var myActivity=new CreateActivity,productid=api.getQueryString("productid"),seldate=api.getQueryString("seldate"),app=angular.module("benefitapp",[]);app.controller("benefitdetail",function($scope,$http){if(null!==seldate){var isbenefit="0",productname="",istour=void 0,startcityflag=void 0;if(isLocalStorageSupported()){if(productname=api.getLocalStorage("productname"),istour=api.getLocalStorage("isutour"),null!==istour&&"1"===istour){var platforms=api.getLocalStorage("platforms");if(null!==platforms&&"0"!==platforms&&angular.forEach(JSON.parse(platforms),function(data){data.TourDateText===seldate&&($scope.platforms=data.BenefitPlatForm,"undefined"!=typeof $scope.platforms&&$scope.platforms.length>0&&(isbenefit="1"))}),startcityflag=api.getLocalStorage("startcityflag"),null!==startcityflag&&"0"===startcityflag){var additional1=api.getLocalStorage("additionalbenefits");if(null!==additional1&&"0"!==additional1){var additionalbenefits1=JSON.parse(additional1),dateBenefit1=void 0;angular.forEach(additionalbenefits1,function(data){return data.TourDateText===seldate?void(dateBenefit1=data.BenefitInfos):void 0}),$scope.additional=dateBenefit1,"undefined"!=typeof $scope.additional&&$scope.additional.length>0&&(isbenefit="1")}}}else{var additional=api.getLocalStorage("additionalbenefits");if(null!==additional&&"0"!==additional){$(".no-activity").hide();var additionalbenefits=JSON.parse(additional),dateBenefit=void 0;angular.forEach(additionalbenefits,function(data){return data.TourDateText===seldate?void(dateBenefit=data.BenefitInfos):void 0}),$scope.additional=dateBenefit,"undefined"!=typeof $scope.additional&&$scope.additional.length>0&&(isbenefit="1")}}var uzaipoint=api.getLocalStorage("uzaipoint");null!==uzaipoint&&"0"!==uzaipoint&&($scope.uzaipoints=getUzaiPointBenefit(istour,JSON.parse(uzaipoint)),"undefined"!=typeof $scope.uzaipoints&&$scope.uzaipoints.length>0&&(isbenefit="1")),SetNoActivityLogo(isbenefit)}else{api.loading();var params=JSON.stringify({ProductId:productid,BeginDate:seldate});api.post($http,$scope,api.path.mproductlogic,"UzaiProductBenefit","SelectedDate",params,function(obj){if(-3===obj.ErrorCode)return api.toast(obj.ErrorMsg),void($scope.backshow=!0);if("undefined"!=typeof obj.JsonResult&&null!==obj.JsonResult){var benefitData=JSON.parse(obj.JsonResult);productname=benefitData.ProductName,"undefined"!=typeof benefitData.IsUtour&&null!==benefitData.IsUtour&&benefitData.IsUtour?("undefined"!=typeof benefitData.TourDateBenefitPlatForm&&null!==benefitData.TourDateBenefitPlatForm&&benefitData.TourDateBenefitPlatForm.length>0&&benefitData.TourDateBenefitPlatForm[0].BenefitPlatForm.length>0&&($scope.platforms=benefitData.TourDateBenefitPlatForm[0].BenefitPlatForm,isbenefit="1"),"undefined"!=typeof benefitData.StartCityFlag&&null!==benefitData.StartCityFlag&&0===benefitData.StartCityFlag&&"undefined"!=typeof benefitData.AdditionalBenefits&&null!==benefitData.AdditionalBenefits&&benefitData.AdditionalBenefits.length>0&&benefitData.AdditionalBenefits[0].BenefitInfos.length>0&&($scope.additional=benefitData.AdditionalBenefits[0].BenefitInfos,isbenefit="1")):"undefined"!=typeof benefitData.AdditionalBenefits&&null!==benefitData.AdditionalBenefits&&benefitData.AdditionalBenefits.length>0&&benefitData.AdditionalBenefits[0].BenefitInfos.length>0&&($scope.additional=benefitData.AdditionalBenefits[0].BenefitInfos,isbenefit="1"),"undefined"!=typeof benefitData.UzaiPoint&&null!==benefitData.UzaiPoint&&(istour=benefitData.IsUtour?"1":"0",$scope.uzaipoints=getUzaiPointBenefit(istour,benefitData.UzaiPoint),"undefined"!=typeof $scope.uzaipoints&&$scope.uzaipoints.length>0&&(isbenefit="1"))}SetNoActivityLogo(isbenefit)},3,!1)}if(null!==productname&&"undefined"!=typeof productname){var metacontent=productname+"-众信悠哉旅游网";setTDK(metacontent,metacontent,metacontent)}else setTDK("众信悠哉旅游网","众信悠哉旅游网","众信悠哉旅游网")}else{api.loading();var param=JSON.stringify({ProductId:productid});api.post($http,$scope,api.path.mproductlogic,"UzaiProductBenefit","All",param,function(obj){var isbenefit="0";if(200===obj.ErrorCode||-3===obj.ErrorCode){if(-3===obj.ErrorCode)return api.toast(obj.ErrorMsg),void($scope.backshow=!0);if("undefined"!=typeof obj.JsonResult&&null!==obj.JsonResult){var benefitData=JSON.parse(obj.JsonResult);if(setNoLocalStorageTDK(benefitData),null!==benefitData.IsUtour&&benefitData.IsUtour===!0?(null!==benefitData.BenefitPlatForm&&($scope.platforms=benefitData.BenefitPlatForm,"undefined"!=typeof $scope.platforms&&$scope.platforms.length>0&&(isbenefit="1")),0===benefitData.StartCityFlag&&null!==benefitData.AdditionalProductBenefits&&($scope.additional=benefitData.AdditionalProductBenefits,"undefined"!=typeof $scope.additional&&$scope.additional.length>0&&(isbenefit="1"))):null!==benefitData.AdditionalProductBenefits&&($scope.additional=benefitData.AdditionalProductBenefits,"undefined"!=typeof $scope.additional&&$scope.additional.length>0&&(isbenefit="1")),null!==benefitData.BenefitDictionary){var _uzaipoint=[];angular.forEach(benefitData.BenefitDictionary,function(value,key){_uzaipoint.push(key+"-"+value)},null),$scope.uzaipoints=_uzaipoint,"undefined"!=typeof $scope.uzaipoints&&$scope.uzaipoints.length>0&&(isbenefit="1")}"0"===isbenefit&&$(".no-activity").show()}$(".all-perferential").show()}else $scope.backshow=!0,api.endloading(),api.toast(obj.ErrorMsg)},3,!1)}$scope.backpage=function(){back()}}),app.directive("preLast",function($timeout){return{restrict:"AE",link:function(scope,elm,attr){scope.$last===!0&&$timeout(function(){myActivity.addMarginTop(),myActivity.addOpen(),myActivity.deleteFirst()},0)}}}),window.androidGoBack=window.androidGoBack||androidGoBack}(window);