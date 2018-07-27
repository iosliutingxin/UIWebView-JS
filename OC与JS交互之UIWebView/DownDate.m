//
//  DownDate.m
//  OC与JS交互之UIWebView
//
//  Created by 李孔文 on 2018/7/25.
//  Copyright © 2018年 rrcc. All rights reserved.
//

#import "DownDate.h"
#import "hybridModel.h"
#import "NSData+expend.h"
#define KWEBNURL @"https://r03.uzaicdn.com/content/hybrid/version"
#define KROOTDIRECTORY @"WebViewCache"
#define KROOTFILENAME @"uzai"

@implementation DownDate
//实例化
+(instancetype)sharedInstance{
    static id instance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
    });
    return  instance;
}


//下载接口调用
-(void)contrastWithLocalDate{
    
    //数据对比，与本地对比，看是否存在或者是不是最新的---
    NSArray *update = [self queryStringFromDictionary:[[self getRequestDate] objectForKey:@"update"]];
    for (hybridModel * hybrid in update) {
        
        if ([self compareLocalListWith:hybrid]) {
            //判断本地是否存在
            NSString *localpath = [self convertLocalPathWithUrl:hybrid.file];
            if (![self fileExistsAtPath:localpath]) {
                NSLog(@"存在已更新---%@-ver=%@",hybrid.file,hybrid.ver);
                [self updateHybridDateWithFile:hybrid.file withVer:hybrid.ver];
            }else{
                NSLog(@"exist");
            }
        }else{
            
            NSLog(@"不存在---%@-ver=%@",hybrid.file,hybrid.ver);
            [self updateHybridDateWithFile:hybrid.file withVer:hybrid.ver];

        }
    }
}

//发起请求获取数据---获取要下载的列表
-(id)getRequestDate{
    NSLog(@"线程2----%@",[NSThread currentThread]);
    NSString *urlStr = [NSString stringWithFormat:@"%@/version-ssl.txt?ver=%@",KWEBNURL,[self getCurrentTimer]];
    NSString *encode = [urlStr stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    NSURL *url = [NSURL URLWithString:encode];
    
    NSError *error = nil;
    id result = nil;
    NSData *date = [NSData dataWithContentsOfURL:url options:0 error:&error];
    if (!error) {
        if (date) {
            result = [NSJSONSerialization JSONObjectWithData:date options:0 error:&error];
        }
    }
    return result;
}


//下载混合资源
-(void)updateHybridDateWithFile:(NSString *)file
                        withVer:(NSString *)ver{
    
    NSLog(@"线程3----%@",[NSThread currentThread]);
    NSString *urlStr =@"";
    if (ver) {
        urlStr = [file stringByAppendingFormat:@"?ver=%@",ver];
    }
    NSString *encode = [urlStr stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    NSURL *url = [NSURL URLWithString:encode];
    NSError *error = nil;
    NSData *result = nil;
    NSData *date = [NSData dataWithContentsOfURL:url options:0 error:&error];
    if (!error) {
        if (date) {
            result = date;
        }
    }
    /**
     生成crc32码
     验证传输过程中是否被改变
     */
    if (date) {
        NSString *crcString = [date CRCString];
        if ([crcString isEqualToString:ver]) {
            
            [self writeToLoadDate:date withFile:file withVer:ver];
            
        }else{
            
            NSLog(@"不能储存 file---%@",file);
            [self writeToLibraryDownError:file withVer:@"crc32传输过程中发生了变化"];
        }
    }else{
        
        NSLog(@"请求路径错误--%@",file);
        [self writeToLibraryDownError:file withVer:@"请求路径无数据返回"];

    }
   
}

//------------------------------------工具----------------------------------
//记录下载失败的数据
-(void)writeToLibraryDownError:(NSString*) file  withVer:(NSString *)ver{
    
    NSMutableDictionary * versionDic = [NSMutableDictionary dictionaryWithDictionary:[self getVersionDictWithPack:@"state.plist"]];
    [versionDic setObject:ver forKey:file];
    [self setVersionError:versionDic];
}

//文件路径 如果没有目录 则创建
-(NSString *)writeToLibraryCachePath:(NSString*) fileName {
    
    NSString *documentsPath = [self getLibraryCachePath:fileName];
    NSFileManager * fileManager = [NSFileManager defaultManager];
    NSArray * subPathArr = [documentsPath componentsSeparatedByString:@"/"];
    NSMutableArray * tempArr = [subPathArr mutableCopy];
    [tempArr removeLastObject];
    NSString * dir = [tempArr componentsJoinedByString:@"/"];
    NSError * error;
    BOOL isCreate = [fileManager createDirectoryAtPath:dir withIntermediateDirectories:YES attributes:nil error:&error];
    if (!isCreate) {
        //        NSAssert(isCreate, @"create directory fail");
    }
    
    return documentsPath;
}

-(NSString *)getLibraryCachePath:(NSString *)fileName {
    
    if(fileName == nil)
        return nil;
    NSString * documentsDirectory = [self cachesPath];
    NSString * documentsPath = [documentsDirectory stringByAppendingPathComponent: fileName];
    return documentsPath;
}

//储存数据
-(void)writeToLoadDate:(NSData *)date
              withFile:(NSString *)file
               withVer:(NSString *)ver{
    
    NSString *localpath = [self convertLocalPathWithUrl:file];
    BOOL result = [date writeToFile:[self writeToLibraryCachePath:localpath] atomically:YES];
    NSLog(@"更新状态---%d",result);
    
    if (result) {
        
        NSMutableDictionary * versionDic = [NSMutableDictionary dictionaryWithDictionary:[self getVersionDictWithPack:@"version.plist"]];
        [versionDic setObject:ver forKey:file];
        [self setVersionDict:versionDic];
        NSLog(@"储存成功--%@---线程--%@",file,[NSThread currentThread]);

    }else{
        NSLog(@"储存失败--%@线程--%@",file,[NSThread currentThread]);
        [self writeToLibraryDownError:file withVer:@"储存失败"];

    }
}
//统计下载成功路径
- (BOOL)setVersionDict:(NSDictionary *)versionDict
{
    NSString * path = [self cachesPath];
    NSString *plistPath = [path stringByAppendingPathComponent:@"version.plist"];
    BOOL isSuccess = [versionDict writeToFile:plistPath atomically:YES];
    return isSuccess;
}
//统计下载失败路径
-(BOOL)setVersionError:(NSDictionary *)versionDict
{
    NSString * path = [self cachesPath];
    NSString *plistPath = [path stringByAppendingPathComponent:@"state.plist"];
    BOOL isSuccess = [versionDict writeToFile:plistPath atomically:YES];
    return isSuccess;
}

//将网上路径截取得到为本地需要路径
-(NSString*)convertLocalPathWithUrl:(NSString*)fileName {
    NSArray * perArr = [fileName componentsSeparatedByString:@"ttps:/"];
    NSString * localPath = perArr.lastObject;
    NSMutableString * finalPath = [[NSString stringWithFormat:@"%@/%@",KROOTFILENAME,[localPath lowercaseString]] mutableCopy];
    NSString * finalStr = [finalPath stringByReplacingOccurrencesOfString:@"//" withString:@"/"];
    return finalStr;
}

//沙盒路径是否存在
-(BOOL)fileExistsAtPath:(NSString *)fileName {
    NSFileManager * fileManager = [NSFileManager defaultManager];
    NSString  * zipDir = [self getLibraryCachePath:[NSString stringWithFormat:@"%@",fileName]];
    BOOL fileExist = [fileManager fileExistsAtPath:zipDir];
    return fileExist;
    
}


- (BOOL)compareLocalListWith:(hybridModel *)entity{
    
    NSDictionary *localListsDict = [self getVersionDictWithPack:@"version.plist"];
    NSString * ver = localListsDict[entity.file];
    if (ver != nil) {
        if ([entity.ver isEqualToString:localListsDict[entity.file]]) {
            return YES;
        }else{
            return NO;
        }
    }
    // 之前没有存储过
    return NO;
}
//获取本地记录文件路径
- (NSDictionary *)getVersionDictWithPack:(NSString *)pack
{
    NSString * path = [self cachesPath];
    NSString *plistPath = [path stringByAppendingPathComponent:pack];
    NSDictionary * dict = [NSDictionary dictionaryWithContentsOfFile:plistPath];
    if (dict == nil) {
        return @{};
    }
    return dict;
    
}

//根文件路径
-(NSString *)cachesPath {
    // 缓存写到library/Caches 目录下
    NSArray * paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
    NSString * documentsDirectory = ([paths count] > 0) ? [paths objectAtIndex:0] : nil;
    return [documentsDirectory stringByAppendingFormat:@"/%@",KROOTDIRECTORY];
}

//获取当前时间
-(NSString * )getCurrentTimer{
    
    NSDate* dat = [NSDate dateWithTimeIntervalSinceNow:0];
    NSTimeInterval a = [dat timeIntervalSince1970]*1000;
    NSString *timeString = [NSString stringWithFormat:@"%f", a];//转为字符型
    return timeString;
}

//遍历网络数据
- (NSArray *)queryStringFromDictionary:(NSDictionary *)dictionary
{
    NSMutableArray *pairs = [NSMutableArray array];
    for (NSString *key in [dictionary keyEnumerator])
    {
        id value = [dictionary objectForKey:key];
        if ([value isKindOfClass:[NSArray class]]) {//遍历最外层字典（文件名）
            for(NSDictionary *dic in value) {
                //数据转模型
                hybridModel *entity = [hybridModel hybridWithDiction:dic];
                [pairs addObject:entity];
            }
        }
    }
    return pairs;
}
@end
