//
//  LocationManager.m
//  LocationBoox
//
//  Created by Ankit Jaiswal on 28/08/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(LocationManager, RCTEventEmitter)RCT_EXTERN_METHOD(turnOn)RCT_EXTERN_METHOD(turnOff)RCT_EXTERN_METHOD(start:(NSDictionary *)configure)RCT_EXTERN_METHOD(startGeoFencing:(NSDictionary *)configure)RCT_EXTERN_METHOD(stop)RCT_EXTERN_METHOD(getCurrentLocation)RCT_EXTERN_METHOD(getStatus: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(removeGeoFenceById:(NSDictionary *)configure)
RCT_EXTERN_METHOD(removeAllGeoFences)
RCT_EXTERN_METHOD(supportedEvents)

@end
