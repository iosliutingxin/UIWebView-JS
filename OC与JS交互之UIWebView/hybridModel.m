//
//  hybridModel.m
//  OC与JS交互之UIWebView
//
//  Created by 李孔文 on 2018/7/25.
//  Copyright © 2018年 rrcc. All rights reserved.
//

#import "hybridModel.h"

@implementation hybridModel
+(instancetype)hybridWithDiction:(NSDictionary *)dict{
    
    hybridModel *hybrid = [[self alloc]init];
    [hybrid setValuesForKeysWithDictionary:dict];
    return  hybrid;
    
}
@end
