# space-mapping-microservice

A microservice that calculates travel time to an object in space when given a vehicle type and a destination.

## Introduction
The microservice stores a sample collection of different objects in space (planets, stars, .. etc) and their distances from earth, as well as a collection of different vehicle types (bicycle, ford_mustang.. etc) and their speeds, and calculates the travel time between the earth and a destination in space using a specific vehicle.  Both the destination and the vehicle type will be provided by the user.

## Technologies
* express: 4.18.2

## Usage
### Calculate Travel Time:
Send a POST call to the '/' end-point with the following attributes in the body of the request:
* "destination": the destination to travel to from the earth.
* "vehicle": the vehicle type used in the travel.

The object in the body of the request should be a JSON object similar to the following example:
```
{"destination": "mars", "vehicle": "bicycle"}
```
Once the POST request is sent using the above example, the response body will contain a JSON object with the travel time in hours, similar to the below example:
```
{"time_to_dest": 878993}
```
