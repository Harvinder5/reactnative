package com.chaione.velosticsdriver.location;

public class LocationCoordinates {
    private double latitude;
    private double longitude;
    private double heading;
    private double accuracy;
    private long timestamp;

    double getLatitude() {
        return latitude;
    }

    LocationCoordinates setLatitude(double latitude) {
        this.latitude = latitude;
        return this;
    }

    double getLongitude() {
        return longitude;
    }

    LocationCoordinates setLongitude(double longitude) {
        this.longitude = longitude;
        return this;
    }

    long getTimestamp() {
        return timestamp;
    }

    LocationCoordinates setTimestamp(long timestamp) {
        this.timestamp = timestamp;
        return this;
    }
    double getHeading() { return heading; }
    LocationCoordinates setHeading(double heading) {
        this.heading = heading;
        return this;
    }

    double getAccuracy() { return accuracy; }
    LocationCoordinates setAccuracy(double accuracy) {
        this.accuracy = accuracy;
        return this;
    }

}
