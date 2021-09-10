const request = require('request');

const forecast = (lat, long, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=4a952faa36d806de84b30b398e46b434&units=f&query=' +
    lat +
    ',' +
    long;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to get coordinates from coordinates.', undefined);
    } else if (body.error) {
      console.log(body.error);
      callback('No city found', undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '. It is currently ' +
          body.current.temperature +
          ' degrees out. It feels like ' +
          body.current.feelslike +
          ' degrees out.'
      );
    }
  });
};

module.exports = forecast;
