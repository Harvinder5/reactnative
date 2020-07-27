//
//  EventEmitter.swift
//  LocationBoox
//
//  Created by Ankit Jaiswal on 29/08/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

class EventEmitter {

/// Shared Instance.
public static var sharedInstance = EventEmitter()

// ReactNativeEventEmitter is instantiated by React Native with the bridge.
private static var eventEmitter: LocationManager!

private init() {}

// When React Native instantiates the emitter it is registered here.
func registerEventEmitter(eventEmitter: LocationManager) {
  EventEmitter.eventEmitter = eventEmitter
}

func dispatch(name: String, body: Any?) {
  EventEmitter.eventEmitter.sendEvent(withName: name, body: body)
}

/// All Events which must be support by React Native.
lazy var allEvents: [String] = {
  var allEventNames: [String] = []
  
  // Append all events here
  allEventNames.append("location")
  allEventNames.append("error")
  allEventNames.append("geo-fence-exit")
  allEventNames.append("geo-fence-enter")
  
  return allEventNames
}()

}
