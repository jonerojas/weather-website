console.log('Client side JS file triggered!');

fetch('https://puzzle.mead.io/puzzle').then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

fetch('http://localhost:3000/weather?address=oakland').then((response) => {
  response.json().then(({ location, forecast, error }) => {
    if (error) {
      return console.log(error);
    } else {
      console.log(location);
      console.log(forecast);
    }
  });
});
