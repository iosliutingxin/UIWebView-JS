//
//  WebTool.m
//  OC与JS交互之UIWebView
//
//  Created by 李孔文 on 2018/7/18.
//  Copyright © 2018年 rrcc. All rights reserved.
//

#import "WebTool.h"

@implementation WebTool
//实例化
+(instancetype)sharedInstance{
    static id instance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
    });
    return  instance;
}

//复制
-(void)copyWebViewCache{
//    [[NSFileManager defaultManager] removeItemAtPath:[self cachesPath] error:nil];

    //只复制一次，需要继续完善更新系统
    if (![[NSFileManager defaultManager] fileExistsAtPath:[self cachesPath]]) {
        NSError *erro;

        [[NSFileManager defaultManager] copyItemAtPath:[self WebViewPath] toPath:[self cachesPath] error:&erro];
        NSLog(@"复制成功");
    }
}

//文件原始路径
-(NSString *)WebViewPath{
    __weak __typeof(self) weakself = self;
   NSString *resourchPath = [[NSBundle bundleForClass:weakself] resourcePath];
   return  [resourchPath stringByAppendingPathComponent:WebViewCache];
}

//存储路径
-(NSString *)cachesPath{
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
    NSString *documentsPath = ([paths count]>0) ? [paths objectAtIndex:0] : nil;
    return  [documentsPath stringByAppendingFormat:@"/%@",WebViewCache];
}

//处理链接
-(BOOL)componentHybirdPath:(NSString *)loadPath
                   request:(void(^)(NSURLRequest * request))requestBlock{
    
    NSString *https = @"https://m.uzai.com/product/hybrid/detail.html?devicetype=ios&userid=1628559&productid=10235&source=iphone&hybridversion=3&appversion=6.0.7";

    if (loadPath) {
        
        https = loadPath;

    }
    
    NSString *dealWithPath =  [self compareLocationWithPath:https];
    NSURL *url = [NSURL URLWithString:dealWithPath];
    NSURLRequest *request = [NSURLRequest requestWithURL:url cachePolicy:NSURLRequestReloadIgnoringLocalCacheData timeoutInterval:60.0];
    requestBlock(request);
   return YES;
}
/**
 1.对链接继续处理，转换为本地路径和沙盒路径进行比较，存在则返回沙盒路径，不存在则返回原来路径
 */
-(NSString *)compareLocationWithPath:(NSString *)loadPath{
    
    //1.路径处理
    NSRange separateRange = [loadPath rangeOfString:@"://" options:(NSCaseInsensitiveSearch) range:NSMakeRange(0, 15)];
    NSString * schemeHeader = [loadPath substringToIndex:separateRange.location+separateRange.length];
    NSString * path = [loadPath substringFromIndex:separateRange.location+separateRange.length];
    // 首先用#分割链接
    NSArray * midArr = [path componentsSeparatedByString:@"#"];
    NSString * loadPathMid = midArr.firstObject;
    NSString * separateStr = [NSString stringWithFormat:@"%@/%@/",KROOTDIRECTORY,KROOTFILENAME];
    // 用本地存储路径分割
    NSString * urlStr = [loadPathMid componentsSeparatedByString:separateStr].lastObject;
    NSArray * urlArr = [urlStr componentsSeparatedByString:@"?"];
    NSString * searchPath = urlArr.firstObject;
    NSMutableString * finalPath = [[NSString stringWithFormat:@"%@/%@",KROOTFILENAME,[searchPath lowercaseString]] mutableCopy];
    NSString * finalStr = [finalPath stringByReplacingOccurrencesOfString:@"//" withString:@"/"];
    NSString * localPath = [NSString stringWithFormat:@"%@/%@",[self cachesPath],finalStr];
    
    //2、与沙盒比较，相对路径是否存在
    BOOL isDir;
    NSFileManager *fileManger = [NSFileManager defaultManager];
    BOOL isExist = [fileManger fileExistsAtPath:localPath isDirectory:&isDir];
    BOOL isHav = YES;
    //3、验证
    //TODO:验证
    if (!isExist) {
       
        if ([loadPath rangeOfString:@"hybrid" options:(NSCaseInsensitiveSearch)].location == NSNotFound) {
            isHav = NO;
        }
        
            if (isHav) {
                NSMutableArray * fileComponent = [[loadPath componentsSeparatedByString:@"/"] mutableCopy];
                [fileComponent removeObject:@"hybrid"];
                loadPath = [fileComponent componentsJoinedByString:@"/"];
           
        }
        
        return  loadPath;

    }else{
        if (urlArr.count>1) {
            // 拼接原本链接上带有的参数
            localPath = [localPath stringByAppendingFormat:@"?%@",urlArr.lastObject];
        }
        return  localPath;
    }
    
    
    
}


@end
