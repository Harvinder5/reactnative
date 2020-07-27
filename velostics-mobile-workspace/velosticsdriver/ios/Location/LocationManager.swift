//
//  LocationManager.swift
//  LocationBoox
//
//  Created by Ankit Jaiswal on 28/08/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import CoreLocation
import Foundation

@objc(LocationManager) class LocationManager: RCTEventEmitter {
  @objc static var isOn = false

  override init() {
    super.init()
    EventEmitter.sharedInstance.registerEventEmitter(eventEmitter: self)
  }

  /// Base overide for RCTEventEmitter.
  ///
  /// - Returns: all supported events
  @objc open override func supportedEvents() -> [String] {
    return EventEmitter.sharedInstance.allEvents
  }

  @objc func turnOn() {
    LocationManager.isOn = true
  }

  @objc func turnOff() {
    LocationManager.isOn = false
  }

  @objc func getStatus(_ callback: RCTResponseSenderBlock) {
    callback([NSNull(), fetchedLocation.coordinate.latitude])
  }

  @objc public override static func requiresMainQueueSetup() -> Bool { return true }

  static var shared = LocationManager()
  var locationManager = CLLocationManager()
  var fetchedLocation = CLLocation()
  var isStartUpdating = false

  @objc func start(_ configure: [String: Any]) {
    if isStartUpdating {
      return
    }

    DispatchQueue.main.async {
      self.locationManager = CLLocationManager()
      self.isStartUpdating = true
      self.locationManager.delegate = self
      self.locationManager.distanceFilter = configure["distanceFilter"] as! CLLocationDistance
      self.locationManager.allowsBackgroundLocationUpdates = true
      if #available(iOS 11.0, *) {
        self.locationManager.showsBackgroundLocationIndicator = true
      } else {
        // Fallback on earlier versions
      }
      self.locationManager.pausesLocationUpdatesAutomatically =  false
      self.locationManager.activityType = .automotiveNavigation
      self.locationManager.desiredAccuracy = kCLLocationAccuracyBest
      self.locationManager.requestAlwaysAuthorization()
      self.locationManager.startMonitoringSignificantLocationChanges()

      self.manageStatus(CLLocationManager.authorizationStatus())
    }
  }

  @objc func getCurrentLocation() {
    let dictionary = ["latitude": fetchedLocation.coordinate.latitude,
                      "longitude": fetchedLocation.coordinate.longitude,
                      "heading": fetchedLocation.course]
    EventEmitter.sharedInstance.dispatch(name: "location", body: dictionary)
  }

  func manageStatus(_ status: CLAuthorizationStatus) {
    switch status {
    case .notDetermined:
      locationManager.requestAlwaysAuthorization()
    case .authorizedWhenInUse, .authorizedAlways:
      if CLLocationManager.locationServicesEnabled() {
        locationManager.startUpdatingLocation()
        isStartUpdating = true
      }
    case .restricted, .denied:
      alertLocationAccessNeeded()
    @unknown default:
      break
    }
  }

  func getStatus() {
    switch CLLocationManager.authorizationStatus() {
    case .notDetermined:
      break case .authorizedWhenInUse, .authorizedAlways:
      break
    case .restricted, .denied:
      break @unknown default:
      break
    }
  }

  @objc func stop() {
    locationManager.stopUpdatingLocation()
    isStartUpdating = false
  }

  func alertLocationAccessNeeded() {
    guard let settingsAppURL = URL(string: UIApplication.openSettingsURLString) else {
      return
    }

    let alert = UIAlertController(
      title: "Need Location Access",
      message: "Location access is required for Velostics.",
      preferredStyle: UIAlertController.Style.alert
    )

    alert.addAction(UIAlertAction(title: "Cancel", style: .default, handler: nil))
    alert.addAction(UIAlertAction(title: "Allow Location Access",
                                  style: .cancel,
                                  handler: { (_) -> Void in
                                    UIApplication.shared.open(settingsAppURL,
                                                              options: [:],
                                                              completionHandler: nil)
    }))

    UIApplication.shared.keyWindow?.rootViewController?.present(alert, animated: true, completion: nil)
  }

  func handleEvent(forRegion region: CLRegion!, _ isExit: Bool = false) {
    let dictionary = ["id": region.identifier]
    EventEmitter.sharedInstance.dispatch(name: isExit ? "geo-fence-exit" : "geo-fence-enter", body: dictionary)
  }

  // MARK: Added GeoFencing Methods

  @objc func removeGeoFenceById(_ configure: [String: Any]) {
    let id = configure["id"] as! String
    for region in locationManager.monitoredRegions where region.identifier == id {
      locationManager.stopMonitoring(for: region)
    }
  }

  @objc func removeAllGeoFences() {
    for region in locationManager.monitoredRegions {
      locationManager.stopMonitoring(for: region)
    }
  }

  @objc func startGeoFencing(_ configure: [String: Any]) {
    let geofenceRegionCenter = CLLocationCoordinate2DMake(configure["latitude"] as! CLLocationDegrees, configure["longitude"] as! CLLocationDegrees)

    /* Create a region centered on desired location,
     choose a radius for the region (in meters)
     choose a unique identifier for that region */
    let geofenceRegion = CLCircularRegion(center: geofenceRegionCenter,
                                          radius: configure["radius"] as! CLLocationDistance,
                                          identifier: configure["id"] as! String)
    geofenceRegion.notifyOnEntry = true
    geofenceRegion.notifyOnExit = true

    locationManager.startMonitoring(for: geofenceRegion)
  }
}

extension LocationManager: CLLocationManagerDelegate {
  // Monitor location services authorization changes
  func locationManager(_: CLLocationManager,
                       didChangeAuthorization status: CLAuthorizationStatus) {
    // Uncomment below code if you want to handle location service permissions whenever user changes it from settings
    manageStatus(status)
  }

  public func locationManager(_: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    if let userLocation = locations.first {
      fetchedLocation = userLocation
      let dictionary = ["latitude": userLocation.coordinate.latitude,
                        "longitude": userLocation.coordinate.longitude,
                        "heading": userLocation.course,
                        "altitude": userLocation.altitude,
                        "accuracy": userLocation.horizontalAccuracy,
                        "verticalAccuracy": userLocation.verticalAccuracy]

      let cords = ["coords": dictionary,
                   "timestamp": Int(userLocation.timestamp.timeIntervalSince1970)] as [String: Any]
      EventEmitter.sharedInstance.dispatch(name: "location", body: cords)
    }
  }

  func locationManager(_: CLLocationManager, didFailWithError error: Error) {
    let dictionary = ["error": error.localizedDescription]
    EventEmitter.sharedInstance.dispatch(name: "error", body: dictionary)
  }

  // MARK: Delegate methods for Geofencing

  func locationManager(_: CLLocationManager, monitoringDidFailFor _: CLRegion?, withError error: Error) {
    print(error.localizedDescription)
  }

  // called when user Exits a monitored region
  func locationManager(_: CLLocationManager, didExitRegion region: CLRegion) {
    if region is CLCircularRegion {
      // Do what you want if this information
      print("EXIT REGION")
      handleEvent(forRegion: region, true)
    }
  }

  // called when user Enters a monitored region
  func locationManager(_: CLLocationManager, didEnterRegion region: CLRegion) {
    if region is CLCircularRegion {
      // Do what you want if this information
      print("ENTER REGION")
      handleEvent(forRegion: region, false)
    }
  }
}
