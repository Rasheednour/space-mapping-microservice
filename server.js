
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const space_objects = require('./space-objects');
const vehicles = require('./vehicles');
const au_km = 149597870.691;

app.enable('trust proxy');

app.use(bodyParser.json());

// The function takes a distance in AU and speed in km/hr 
// and calculates the travel time
function calculate_time(distance, speed) {
    // convert distance from AU to KM
    const distance_km = distance * au_km;
    const time = distance_km / speed;
    return time;
}

// The function takes a destination and a travel method and extracts
// the distance to that destination and the speed of the travel method
// and uses these two values to call another function to calculate travel time
function travel_time(destination, travel_method) {

    for(let index=0; index < space_objects.length; index++){
        const space_object = space_objects[index];
        if (space_object["object"] === destination) {
            const distance = space_object["distance"];
            for(let i=0; i < vehicles.length; i++){
                const vehicle = vehicles[i];
                if (vehicle["type"] === travel_method) {
                    const speed = vehicle["speed"];
                    const time = calculate_time(distance, speed);
                    return Math.floor(time);
                }
            }
        }
    }
}


router.get('/', function (req, res) {
    res.json(vehicles);
});

// process post requests to get the travel time to an object in space
router.post('/', function (req, res) {
    console.log(req.body);
    const time = travel_time(req.body.destination, req.body.vehicle)
    return res.status(200).json({"time_to_dest": time}).end();
});


app.use('/', router);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});