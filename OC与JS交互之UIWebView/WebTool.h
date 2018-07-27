//
//  WebTool.h
//  OC与JS交互之UIWebView
//
//  Created by 李孔文 on 2018/7/18.
//  Copyright © 2018年 rrcc. All rights reserved.
//

#import <Foundation/Foundation.h>

#define WebViewCache @"WebViewCache"
#define KROOTFILENAME @"uzai"
#define KROOTDIRECTORY @"WebViewCache"

@interface WebTool : NSObject
+(instancetype)sharedInstance;
-(void)copyWebViewCache;
-(BOOL)componentHybirdPath:(NSString *)loadPath
                   request:(void(^)(NSURLRequest * request))requestBlock;
@end
