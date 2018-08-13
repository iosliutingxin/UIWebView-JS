//
//  ViewController.m
//  OC与JS交互之UIWebView
//
//  Created by user on 16/8/15.
//  Copyright © 2016年 rrcc. All rights reserved.
//

#import "ViewController.h"
#import "WebTool.h"
#import "DownDate.h"
@interface ViewController () <UIWebViewDelegate>
@property (weak, nonatomic) IBOutlet UIWebView *webView;
@property(nonatomic,strong)WebTool *tool;
@end

@implementation ViewController

- (void)viewDidLoad {
    
    [super viewDidLoad];
    self.webView.delegate = self;
//--------------1
//    NSString *filePath = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html"];
//    NSURL *baseURL = [[NSBundle mainBundle] bundleURL];
//    [self.webView loadHTMLString:[NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil] baseURL:baseURL];
    
//---------------2
//    NSURL *url =[NSURL URLWithString:@"https://m.uzai.com/product/detail.html?devicetype=ios&userid=1628559&productid=10582&source=iphone&hybridversion=3&appversion=6.0.7"];
//    NSURLRequest *request = [NSURLRequest requestWithURL:url];
//    [self.webView loadRequest:request];
    
//-------------3
    NSString *mainBundlePath = [[NSBundle mainBundle]bundlePath];
    NSString *basePath = [NSString stringWithFormat:@"%@/WebViewCache",mainBundlePath];
    
    //detail.html
// ---------------------- 4
//    NSString *htmlPath = [NSString stringWithFormat:@"%@/uzai/m.uzai.com/product/hybrid/detail.html",basePath];

//    NSURL *baseURL = [NSURL fileURLWithPath:htmlPath  isDirectory:NO];
//    NSString *htmlString = [NSString stringWithContentsOfFile:htmlPath encoding:NSUTF8StringEncoding error:nil];
//    [self.webView loadHTMLString:htmlString baseURL:baseURL];
    
//   --------------------- 5
//    NSString *paramer = @"?devicetype=ios&userid=1628559&productid=10582&source=iphone&hybridversion=3&appversion=6.0.7";
//    NSString *htmlPath = [NSString stringWithFormat:@"%@/uzai/m.uzai.com/product/hybrid/detail.html",basePath];
//
//    NSURL *url = [[NSURL alloc] initFileURLWithPath:htmlPath];
//    NSURLRequest *request = [NSURLRequest requestWithURL:url cachePolicy:NSURLRequestReloadIgnoringLocalCacheData timeoutInterval:60.0];

//    NSURL *url = [NSURL fileURLWithPath:htmlPath];
//    NSString *body = [NSString stringWithFormat: @"devicetype=%@&userid=%@&productid=%@&source=%@&hybridversion=%@&appversion=%@",@"ios",@"1628559",@"10582",@"iphone",@"3",@"6.0.7"];
//    NSMutableURLRequest *request = [[NSMutableURLRequest alloc]initWithURL: url];
//    [request setHTTPMethod: @"POST"];
//    [request setHTTPBody: [body dataUsingEncoding: NSUTF8StringEncoding]];
//    [self.webView loadRequest:request];
    
}

//--------------------加载本地HTML资源-------------------------
-(void)test01{
    
}
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event{
    
     _tool = [WebTool sharedInstance];
    [_tool copyWebViewCache];
//    NSString *loadpath = @"file:///var/mobile/Containers/Data/Application/8C4B6C30-2585-48FF-9831-BDCC997A87AA/Library/Caches/WebViewCache/uzai/m.uzai.com/product/hybrid/calendar.html?productid=10235&devicetype=ios&userid=1628559&source=iphone&hybridversion=3&appversion=6.0.7";


    [_tool componentHybirdPath:nil request:^(NSURLRequest *request) {
            [self.webView loadRequest:request];
            NSLog(@"处理后的链接---%@---线程--%@",request,[NSThread currentThread]);
    }];
    
    NSOperationQueue * q = [[NSOperationQueue alloc]init];
    NSLog(@"线程0----%@",[NSThread currentThread]);

    for (int i = 0; i<10; i++) {
        [q addOperationWithBlock:^{
            
            NSLog(@"线程1----%@",[NSThread currentThread]);
            //下载混合资源
            DownDate *date = [DownDate sharedInstance];
            
            [date contrastWithLocalDate];
            
        }];
    }
  
    
    
   
    


}



- (void)showMsg:(NSString *)msg {
    [[[UIAlertView alloc] initWithTitle:nil message:msg delegate:nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil] show];
}

- (IBAction)btnClick:(UIButton *)sender {
    //网页加载完成之后调用JS代码才会执行，因为这个时候html页面已经注入到webView中并且可以响应到对应方法
    if (sender.tag == 123) {
        [self.webView stringByEvaluatingJavaScriptFromString:@"alertMobile()"];
    }
    
    if (sender.tag == 234) {
        [self.webView stringByEvaluatingJavaScriptFromString:@"alertName('小红')"];
    }
    
    if (sender.tag == 345) {
        [self.webView stringByEvaluatingJavaScriptFromString:@"alertSendMsg('18870707070','周末爬山真是件愉快的事情')"];
    }

}

#pragma mark - JS调用OC方法列表
- (void)showMobile {
    [self showMsg:@"我是下面的小红 手机号是:18870707070"];
}

- (void)showName:(NSString *)name {
    NSString *info = [NSString stringWithFormat:@"你好 %@, 很高兴见到你",name];

    [self showMsg:info];
}

- (void)showSendNumber:(NSString *)num msg:(NSString *)msg {
    NSString *info = [NSString stringWithFormat:@"这是我的手机号: %@, %@ !!",num,msg];
    
    [self showMsg:info];
}

#pragma mark - UIWebViewDelegate
- (BOOL)we333333bView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {


NSString *requestString = request.URL.absoluteString.stringByRemovingPercentEncoding;

//OC调用JS是基于协议拦截实现的 下面是相关操作
NSString *absolutePath = request.URL.absoluteString;
absolutePath = absolutePath.stringByRemovingPercentEncoding;
NSString *scheme = @"rrcc://";
NSString *schem =  request.URL.scheme;
//    if ([schem  isEqual: @"http"] || [schem  isEqual: @"https"] || [schem  isEqual: @"file"]) {
//
//                if ([absolutePath rangeOfString:@"devicetype" options:(NSCaseInsensitiveSearch)].location == NSNotFound) {
//                    NSString *loadpath =@"file:///var/mobile/Containers/Data/Application/68B40368-2F85-4642-AA18-D4087D038F06/Library/Caches/WebViewCache/uzai/m.uzai.com/product/hybrid/calendar.html?devicetype=ios&userid=1628559&productid=10582&source=iphone&hybridversion=3&appversion=6.0.7";
//                [_tool componentHybirdPath:loadpath request:^(NSURLRequest *request) {
//                    [self.webView loadRequest:request];
//                }];
//            }
//    }
if ([absolutePath hasPrefix:scheme]) {
    NSString *subPath = [absolutePath substringFromIndex:scheme.length];
    
    if ([subPath containsString:@"?"]) {//1个或多个参数
        
        if ([subPath containsString:@"&"]) {//多个参数
            NSArray *components = [subPath componentsSeparatedByString:@"?"];
            
            NSString *methodName = [components firstObject];
            
            methodName = [methodName stringByReplacingOccurrencesOfString:@"_" withString:@":"];
            SEL sel = NSSelectorFromString(methodName);

            NSString *parameter = [components lastObject];
            NSArray *params = [parameter componentsSeparatedByString:@"&"];
            
            if (params.count == 2) {
                if ([self respondsToSelector:sel]) {
                    [self performSelector:sel withObject:[params firstObject] withObject:[params lastObject]];
                }
            }
            

        } else {//1个参数
            NSArray *components = [subPath componentsSeparatedByString:@"?"];
            
            NSString *methodName = [components firstObject];
            methodName = [methodName stringByReplacingOccurrencesOfString:@"_" withString:@":"];
            SEL sel = NSSelectorFromString(methodName);

            NSString *parameter = [components lastObject];
            
            if ([self respondsToSelector:sel]) {
                [self performSelector:sel withObject:parameter];
            }

        }
        
    } else {//没有参数
        NSString *methodName = [subPath stringByReplacingOccurrencesOfString:@"_" withString:@":"];
        SEL sel = NSSelectorFromString(methodName);
        
        if ([self respondsToSelector:sel]) {
            [self performSelector:sel];
        }
    }
}

    


return YES;
}


- (void)webViewDidStartLoad:(UIWebView *)webView {
    
//    self.curWebView?.stringByEvaluatingJavaScript(from: jsMessage)


    NSLog(@"%@",NSStringFromSelector(_cmd));
}
- (void)webViewDidFinishLoad:(UIWebView *)webView {
    
    NSString *filePath = [[NSBundle mainBundle] pathForResource:@"dataReasource" ofType:@"plist"];
    NSString *dict = [[NSDictionary dictionaryWithContentsOfFile:filePath] valueForKey:@"value02"];
//    [self.webView stringByEvaluatingJavaScriptFromString:dict];
    
    [self.webView stringByEvaluatingJavaScriptFromString:@"api.callback(\'1\',{\"ErrorCode\":200,\"ErrorMsg\":\"查询成功！\",\"JsonResult\":\"{\\\"IsUtour\\\":true,\\\"MinTravellerCount\\\":1,\\\"MaxTravellerCount\\\":9,\\\"CalendarTitle\\\":[\\\"2018-9\\\",\\\"2018-10\\\"],\\\"CalendarData\\\":[{\\\"TourDateId\\\":1200761,\\\"TourDateText\\\":\\\"2018-09-12\\\",\\\"TripId\\\":38138,\\\"TripName\\\":\\\"A\\\",\\\"AdultPrice\\\":19999.00,\\\"ChildPrice\\\":19999.00,\\\"AvailableStock\\\":23,\\\"UnPayStockNumber\\\":0,\\\"ChildPriceDesc\\\":\\\"欧洲满4岁与成人同价；2岁--不满4岁（不占床），机票签证不打折，地接9折\\\",\\\"IsShowChildPriceDesc\\\":true,\\\"TuanNo\\\":\\\"TS1800071516\\\"},{\\\"TourDateId\\\":1200760,\\\"TourDateText\\\":\\\"2018-09-19\\\",\\\"TripId\\\":38138,\\\"TripName\\\":\\\"A\\\",\\\"AdultPrice\\\":19999.00,\\\"ChildPrice\\\":19999.00,\\\"AvailableStock\\\":37,\\\"UnPayStockNumber\\\":0,\\\"ChildPriceDesc\\\":\\\"欧洲满4岁与成人同价；2岁--不满4岁（不占床），机票签证不打折，地接9折\\\",\\\"IsShowChildPriceDesc\\\":true,\\\"TuanNo\\\":\\\"TS1800071515\\\"},{\\\"TourDateId\\\":1211057,\\\"TourDateText\\\":\\\"2018-10-03\\\",\\\"TripId\\\":38138,\\\"TripName\\\":\\\"A\\\",\\\"AdultPrice\\\":18999.00,\\\"ChildPrice\\\":18999.00,\\\"AvailableStock\\\":17,\\\"UnPayStockNumber\\\":0,\\\"ChildPriceDesc\\\":\\\"欧洲满4岁与成人同价；2岁--不满4岁（不占床），机票签证不打折，地接9折\\\",\\\"IsShowChildPriceDesc\\\":true,\\\"TuanNo\\\":\\\"TS1800147295\\\"},{\\\"TourDateId\\\":1211056,\\\"TourDateText\\\":\\\"2018-10-17\\\",\\\"TripId\\\":38138,\\\"TripName\\\":\\\"A\\\",\\\"AdultPrice\\\":18999.00,\\\"ChildPrice\\\":18999.00,\\\"AvailableStock\\\":25,\\\"UnPayStockNumber\\\":0,\\\"ChildPriceDesc\\\":\\\"欧洲满4岁与成人同价；2岁--不满4岁（不占床），机票签证不打折，地接9折\\\",\\\"IsShowChildPriceDesc\\\":true,\\\"TuanNo\\\":\\\"TS1800147294\\\"}],\\\"AdditionalBenefits\\\":null,\\\"TourDateBenefitPlatForm\\\":[{\\\"TourDateText\\\":\\\"2018-09-12\\\",\\\"BenefitPlatForm\\\":[{\\\"Name\\\":\\\"多订多惠\\\",\\\"BeginEndDateText\\\":\\\"2018-07-01*2018-07-31\\\",\\\"Content\\\":\\\"活动期间，购买本产品指定出发日期即可享受买一赠一优惠，名额有限售完即止！！（与早订优惠/特价抢购/优惠券等优惠互斥，本优惠不参与会员积分累积）\\\",\\\"TourDatesText\\\":\\\"2018-09-12\\\"}],\\\"BenefitCount\\\":1,\\\"TypeName\\\":\\\"限时优惠\\\"},{\\\"TourDateText\\\":\\\"2018-09-19\\\",\\\"BenefitPlatForm\\\":[{\\\"Name\\\":\\\"多订多惠\\\",\\\"BeginEndDateText\\\":\\\"2018-07-01*2018-07-31\\\",\\\"Content\\\":\\\"活动期间，购买本产品指定出发日期即可享受买一赠一优惠，名额有限售完即止！！（与早订优惠/特价抢购/优惠券等优惠互斥，本优惠不参与会员积分累积）\\\",\\\"TourDatesText\\\":\\\"2018-09-19\\\"}],\\\"BenefitCount\\\":1,\\\"TypeName\\\":\\\"限时优惠\\\"},{\\\"TourDateText\\\":\\\"2018-10-03\\\",\\\"BenefitPlatForm\\\":[{\\\"Name\\\":\\\"多订多惠\\\",\\\"BeginEndDateText\\\":\\\"2018-07-01*2018-07-31\\\",\\\"Content\\\":\\\"活动期间，购买本产品指定出发日期即可享受买一赠一优惠，名额有限售完即止！！（与早订优惠/特价抢购/优惠券等优惠互斥，本优惠不参与会员积分累积）\\\",\\\"TourDatesText\\\":\\\"2018-10-03\\\"}],\\\"BenefitCount\\\":1,\\\"TypeName\\\":\\\"限时优惠\\\"},{\\\"TourDateText\\\":\\\"2018-10-17\\\",\\\"BenefitPlatForm\\\":[{\\\"Name\\\":\\\"多订多惠\\\",\\\"BeginEndDateText\\\":\\\"2018-07-01*2018-07-31\\\",\\\"Content\\\":\\\"活动期间，购买本产品指定出发日期即可享受买一赠一优惠，名额有限售完即止！！（与早订优惠/特价抢购/优惠券等优惠互斥，本优惠不参与会员积分累积）\\\",\\\"TourDatesText\\\":\\\"2018-10-17\\\"}],\\\"BenefitCount\\\":1,\\\"TypeName\\\":\\\"限时优惠\\\"}],\\\"UzaiPoint\\\":null,\\\"ChildPriceDesc\\\":\\\"\\\",\\\"TodayOfYear\\\":2018,\\\"TodayOfMonth\\\":7,\\\"TodayOfDay\\\":19,\\\"ProductName\\\":\\\"<【优品东欧】东欧大全景6国13日 奥地利 匈牙利 波兰 德国 捷克 斯洛伐克>【欧洲年中大促】音乐之都维也纳，莫扎特故乡萨尔茨堡，百塔之城布拉格，多瑙河畔明珠布达佩斯\\\",\\\"UzaiProcutBehavior\\\":\\\"\\\",\\\"StartCityFlag\\\":1,\\\"ProductType\\\":2,\\\"UzaiTravelClassID\\\":1,\\\"PayType\\\":1}\"})"];
    
    NSLog(@"%@",NSStringFromSelector(_cmd));
    [[NSUserDefaults standardUserDefaults] setInteger:0 forKey:@"WebKitCacheModelPreferenceKey"];
    [[NSUserDefaults standardUserDefaults] setBool:NO forKey:@"WebKitDiskImageCacheEnabled"];
    [[NSUserDefaults standardUserDefaults] setBool:NO forKey:@"WebKitOfflineWebApplicationCacheEnabled"];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

- (void)dealloc
{
    [self.webView stopLoading];
    [self.webView removeFromSuperview];
     self.webView = nil;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    
    [[NSURLCache sharedURLCache] removeAllCachedResponses];
}
@end


