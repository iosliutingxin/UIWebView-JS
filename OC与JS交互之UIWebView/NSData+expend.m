//
//  NSData+expend.m
//  OC与JS交互之UIWebView
//
//  Created by 李孔文 on 2018/7/25.
//  Copyright © 2018年 rrcc. All rights reserved.
//

#import "NSData+expend.h"
#import <zlib.h>

@implementation NSData (expend)
- (NSString *)CRCString
{
    if(self == nil || [self length] == 0)
        return nil;
    
    unsigned long result = crc32(0, self.bytes, self.length);
    return [NSString stringWithFormat:@"%lu",result];
}
@end
