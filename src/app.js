const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utilities.js/forecast');
const geocode = require('./utilities.js/geocode');

const app = express();
const PORT = process.env.PORT || 3000;

const publicDirectoryRoute = path.join(__dirname, '../public');

//Path to the templates folder holding all hbs files
const templatePath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

//------>Setup for handlebars and views location
//instead of hbs looking or a views folder, we configure express to look for tempates instead
app.set('views', templatePath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//in node, static files cannot be a relative path (path from within the folder) but from the root of our pc
app.use(express.static(publicDirectoryRoute));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    name: 'Jonathan'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jonathan',
    favColor: 'green'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Contact help@rojasgroup.com for your support needs.',
    name: 'Jonathan'
  });
});

app.get('/weather', (req, res) => {
  //the query object returns an object with querys you make within the url in the browser
  //i.e localhost:3000/weather?address=oakland
  //returns {address: oakland}
  if (!req.query.address) {
    return res.send({
      error: 'Search term must be provided'
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
          coordinates: {
            latitude: latitude,
            longitude: longitude
          }
        });
      });
    }
  );
});

app.get('/product', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Search term must be provided'
    });
  }
  console.log(req.query);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('help-error', {
    title: '404. No article found.',
    errorMessage: 'Article not found. Please try again',
    name: 'Jonathan'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Error page triggered',
    name: 'Jonathan'
  });
});

app.listen(PORT, () => {
  console.log('Port started on 3000');
});

//__dirname gives us the path to the folder where the file app.js is located
console.log(__dirname);
//C:\Users\Jonathan\Desktop\Projects\node-course\web-server\src

//__filename gives us the path all the way to the file itself
console.log(__filename);
// C:\Users\Jonathan\Desktop\Projects\node-course\web-server\src\app.js
