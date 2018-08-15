//
//  WKview.m
//  OC与JS交互之UIWebView
//
//  Created by 李孔文 on 2018/8/1.
//  Copyright © 2018年 rrcc. All rights reserved.
//

#import "WKview.h"

@interface WKview ()<WKUIDelegate,WKNavigationDelegate>
@property(nonatomic,strong)dispatch_source_t timer;
@end

@implementation WKview

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor redColor];
    //加载wkwebview
    [self creatWKWebView];
}

-(void)creatWKWebView{
    
    WKWebViewConfiguration *configuration = [[WKWebViewConfiguration alloc] init];
    WKUserContentController *controller = [[WKUserContentController alloc] init];
    
    self.webView = [[WKWebView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height-100) configuration:configuration];
    self.webView.allowsBackForwardNavigationGestures = YES; //允许右滑返回上个链接，左滑前进
    self.webView.allowsLinkPreview = YES; //允许链接3D Touch
    self.webView.customUserAgent = @"WebViewDemo/1.0.0"; //自定义UA，UIWebView就没有此功能，后面会讲到通过其他方式实现
    
    self.webView.UIDelegate = self;
    self.webView.navigationDelegate = self;
    [self.view addSubview:self.webView];
    
    //添加js全局变量
    WKUserScript *script = [[WKUserScript alloc] initWithSource:@"var interesting = 123;" injectionTime:WKUserScriptInjectionTimeAtDocumentStart forMainFrameOnly:NO];
    //页面加载完成立刻回调，获取页面上的所有Cookie
    WKUserScript *cookieScript = [[WKUserScript alloc] initWithSource:@"                window.webkit.messageHandlers.currentCookies.postMessage(document.cookie);" injectionTime:WKUserScriptInjectionTimeAtDocumentEnd forMainFrameOnly:NO];
    //alert Cookie
    WKUserScript *alertCookieScript = [[WKUserScript alloc] initWithSource:@"alert(document.cookie);" injectionTime:WKUserScriptInjectionTimeAtDocumentEnd forMainFrameOnly:NO];
    //添加自定义的cookie
    WKUserScript *newCookieScript = [[WKUserScript alloc] initWithSource:@"                document.cookie = 'DarkAngelCookie=DarkAngel;'" injectionTime:WKUserScriptInjectionTimeAtDocumentStart forMainFrameOnly:NO];
    
    //添加脚本
    [controller addUserScript:script];
    [controller addUserScript:cookieScript];
    [controller addUserScript:alertCookieScript];
    [controller addUserScript:newCookieScript];
  
    configuration.userContentController = controller;

    [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"index" ofType:@"html"]]]];
    
  
}
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event{
    
   
    
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


- (void)showMsg:(NSString *)msg {
    [[[UIAlertView alloc] initWithTitle:nil message:msg delegate:nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil] show];
}

- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
    
    NSString *absolutePath = navigationAction.request.URL.absoluteString;
    absolutePath = absolutePath.stringByRemovingPercentEncoding;
    NSString *scheme = @"rrcc://";
    NSString *schem =  navigationAction.request.URL.scheme;
    
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
    
    decisionHandler(WKNavigationActionPolicyAllow);
    NSLog(@"%@", NSStringFromSelector(_cmd));
}



@end
