//
//  test_Webview.m
//  OC与JS交互之UIWebView
//
//  Created by 李孔文 on 2018/8/10.
//  Copyright © 2018年 rrcc. All rights reserved.
//

#import "test_Webview.h"
#import <JavaScriptCore/JavaScriptCore.h>

@interface test_Webview ()<UIWebViewDelegate>
@property (nonatomic, strong) JSContext *jsContext;
@property (nonatomic, strong) UIWebView *webview;
@end

@implementation test_Webview

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = UIColor.whiteColor;
    [self InitUI];
}

#pragma 扩展
-(void)InitUI{
    
    _webview = [[UIWebView alloc]initWithFrame:self.view.bounds];
    [self.view addSubview:_webview];
    _webview.delegate = self;
    NSString *filePath = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html"];
    NSURL *baseURL = [[NSBundle mainBundle] bundleURL];
    [_webview loadHTMLString:[NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil] baseURL:baseURL];
}
#pragma UIWebViewDelegate
- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType{
    
    //标准的URL包含scheme、host、port、path、query、fragment等
    NSURL *URL = request.URL;
    if ([URL.scheme isEqualToString:@"darkangel"]) {
        if ([URL.host isEqualToString:@"smsLogin"]) {
            NSLog(@"短信验证码登录，参数为 %@", URL.query);
            return NO;
        }
    }

    return YES;
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    self.navigationItem.title = [self.title stringByAppendingString:[webView stringByEvaluatingJavaScriptFromString:@"document.title"]];
    [self convertJSFunctionsToOCMethods];
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error{
    
    NSLog(@"%@",error);
}

- (void)convertJSFunctionsToOCMethods
{
    //测试1
    //获取该UIWebview的javascript上下文
    //self持有jsContext
    //@property (nonatomic, strong) JSContext *jsContext;
    self.jsContext = [_webview valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
    
    //js调用oc
    //其中share就是js的方法名称，赋给是一个block 里面是oc代码
    //此方法最终将打印出所有接收到的参数，js参数是不固定的
    self.jsContext[@"share"] = ^() {
        NSArray *args = [JSContext currentArguments];//获取到share里的所有参数
        //args中的元素是JSValue，需要转成OC的对象
        NSMutableArray *messages = [NSMutableArray array];
        for (JSValue *obj in args) {
            [messages addObject:[obj toObject]];
        }
        NSLog(@"点击分享js传回的参数：\n%@", messages);
    };
    
    //测试2
    //调用方法的本来实现，给原结果乘以10
    self.jsContext[@"testAddMethod"] = ^NSInteger(NSInteger a, NSInteger b) {
        return a * b ;
    };
    
    //测试3
    //异步回调
    self.jsContext[@"shareBlack"] = ^(JSValue *shareData) {
        //首先这里要注意，回调的参数不能直接写NSDictionary类型，为何呢？
        //仔细看，打印出的确实是一个NSDictionary，但是result字段对应的不是block而是一个NSDictionary
        NSLog(@"%@", [shareData toObject]);
        //获取shareData对象的result属性，这个JSValue对应的其实是一个javascript的function。
        JSValue *resultFunction = [shareData valueForProperty:@"result"];
        //回调block，将js的function转换为OC的block
        void (^result)(BOOL) = ^(BOOL isSuccess) {
            [resultFunction callWithArguments:@[@(isSuccess)]];
        };
        //模拟异步回调
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            NSLog(@"回调分享成功");
            result(false);
        });
    };
    
  
}



@end
