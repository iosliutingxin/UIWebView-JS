//
//  CookierController.m
//  OC与JS交互之UIWebView
//
//  Created by 李孔文 on 2018/8/13.
//  Copyright © 2018年 rrcc. All rights reserved.
//

#import "CookierController.h"
#import <JavaScriptCore/JavaScriptCore.h>

@interface CookierController ()<UIWebViewDelegate>
@property (copy) void(^exceptionHandler)(JSContext *context, JSValue *exception);
@end

@implementation CookierController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    [self InitUI];
}

#pragma 扩展
-(void)InitUI{
    
    _webview = [[UIWebView alloc]initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, 400)];
    _webview.delegate = self;
    [self.view addSubview:_webview];
    
    //---------------------添加固定cookie
   // NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://www.baidu.com"]];
  //  [request addValue:@"customCookieName=1314521;" forHTTPHeaderField:@"Set-Cookie"];
  //  [_webview loadRequest:request];
    
        NSString *filePath = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html"];
        NSURL *baseURL = [[NSBundle mainBundle] bundleURL];
        [_webview loadHTMLString:[NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil] baseURL:baseURL];
    
    //---------------------自定义cookie
    NSHTTPCookie *cookie = [NSHTTPCookie cookieWithProperties:@{
                                                                NSHTTPCookieName: @"customCookieName",
                                                                NSHTTPCookieValue: @"hello world",
                                                                NSHTTPCookieDomain: @".baidu.com",
                                                                NSHTTPCookiePath: @"/"
                                                                }];
    [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:cookie];
    
}

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event{
    //-------------------h获取存储的cookie
    NSArray *cookies = [NSHTTPCookieStorage sharedHTTPCookieStorage].cookies;
    //Cookies数组转换为requestHeaderFields
    NSDictionary *requestHeaderFields = [NSHTTPCookie requestHeaderFieldsWithCookies:cookies];
    //设置请求头
//    request.allHTTPHeaderFields = requestHeaderFields;
    
    //oc调JS
    
  
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    //更新标题，这是上面的讲过的方法
    //self.navigationItem.title = [webView stringByEvaluatingJavaScriptFromString:@"document.title"];
    
    //获取该UIWebView的javascript上下文
    JSContext *jsContext = [self.webview valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
    
    
    //在调用前，设置异常回调
    [jsContext setExceptionHandler:^(JSContext *context, JSValue *exception){
        NSLog(@"回调错误信息----%@", exception);
    }];
    //这也是一种获取标题的方法。
    JSValue *value = [jsContext evaluateScript:@"document.title"];
    //更新标题
    self.navigationItem.title = value.toString;
    
    

    //执行方法
    JSValue *value01 = [jsContext evaluateScript:@"document.titlexxxx"];
    
   
}



@end
