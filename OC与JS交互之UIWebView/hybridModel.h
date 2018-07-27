//
//  hybridModel.h
//  OC与JS交互之UIWebView
//
//  Created by 李孔文 on 2018/7/25.
//  Copyright © 2018年 rrcc. All rights reserved.
//

#import <Foundation/Foundation.h>

//混合资源模型
@interface hybridModel : NSObject
//路径
@property(nonatomic,copy)NSString *file;
//crc编码
@property(nonatomic,copy)NSString *ver;
+(instancetype)hybridWithDiction:(NSDictionary *)dict;
@end
