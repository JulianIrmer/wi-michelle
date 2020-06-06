
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongojs = require('mongojs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); 
app.use(cors());

// ########## DATABASE CONNECTION ##########
const DB_URL = encodeURI('mongodb://admin:lala1234@ds111608.mlab.com:11608/michelle');
const db = mongojs(DB_URL);
db.on('error', (err) => {
  console.log('database error', err);
});

db.on('connect', () => {
  console.log('database connected');
});


app.get('/', (req, res, next) => {
    res.send('<h1>NodeJS Backend running...</h1>');
    next();
});
// Find hotels with the given queries
app.get('/api/findhotel', (req, res, next) => {
    const destination = req.query.destination;
    console.log(destination);

    db.Hotels.find({country: destination}, (err, results) => {
        if (err) {
            console.error(err);
        } else if (results.length < 1) {
            res.json({message: 'Keine Hotels gefunden'});
        } else {
            res.json(results);
        }
    });
    next();
});

// Return hotel with specific ID
app.get('/api/getdetails', (req, res, next) => {
    console.log(req.query.id);
    db.Hotels.find({id: req.query.id}, (err, result) => {
        if (err) {
            console.error(err);
        } else if (result.length < 1) {
            res.json({message: 'Keine Ergebnisse'});
        } else {
            console.log(result);
            res.json(result);
        }
    });
    next();
});

// Update Hotel
app.post('/api/addHotel' , (req, res) => {
    const body = req.body;
    // const data = {
    //     id: body.id,
    //     name: body.name,
    //     shortDesc: body.shortDesc,
    //     longDesc: body.longDesc,
    //     country: body.country,
    //     stars: body.stars,
    //     recommandation: body.recommandation,
    //     location: body.location,
    //     room: body.room,
    //     images: body.images,
    //     catering: body.catering
    // }
    const data = {
        id: body.id,
        fittings: body.fittings
    }
    console.log(data);
    db.Hotels.update({id: data.id}, {$set: {fittings: data.fittings}}, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Hotel saved');
        }
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
