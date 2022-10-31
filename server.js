
const express = require('express');
const app = express();
const router = express.Router();

app.enable('trust proxy');


router.get('/', function (req, res) {
    res.send("Space-mapping-app");
});



app.use('/', router);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});