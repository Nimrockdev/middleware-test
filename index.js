const express = require('express')
const app = express()

app.use(function(req, res, next) {

    var m = new Date();
    var dateString = m.getUTCFullYear() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
    //console.log('Time:', Date.now());
    console.log('Time:', dateString);
    next();
});


app.get('/', function(req, res) {
    res.send('Hello World')
})


app.get('/user/:id', function(req, res) {
    res.send({ user: 8, name: 'user name' })
})


app.use('/works/:id', function(req, res, next) {
    console.log('Request URL work:', req.originalUrl);
    next();
}, function(req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

app.use('/user/:id', function(req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

app.get('/works/:id', function(req, res, next) {
    console.log('Work:', req.params.id);
    res.send(`Work ${req.params.id}`)
});

app.get('/cars/:id', function(req, res, next) {
    console.log('ID:', req.params.id);

    let cars = [
        { id: 1, name: 'BMW' },
        { id: 2, name: 'Audi' },
    ]

    console.log(carSearch(cars, parseInt(req.params.id)));
    let t = carSearch(cars, parseInt(req.params.id));

    res.send({
        t
    })

});

app.listen(3005);


function carSearch(cars, id) {

    let foundCars = [];

    cars.forEach(car => {
        if (car.id == id) {
            foundCars.push(car);
        }
    });

    return foundCars;

}