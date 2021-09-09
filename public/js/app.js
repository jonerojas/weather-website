console.log('Client side JS file triggered!');

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch('http://localhost:3000/weather?address=oakland').then((response) => {
//   response.json().then(({ location, forecast, error }) => {
//     if (error) {
//       return console.log(error);
//     } else {
//       console.log(location);
//       console.log(forecast);
//     }
//   });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const para = document.querySelector('p');
const paragraphOne = document.querySelector('#message-one');
const paragraphTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (event) => {
  //When forms are submitted, the default behavior is to refresh the page. preventDefualt() overrides that
  event.preventDefault();

  const userLocation = search.value;

  paragraphOne.textContent = 'Loading...';
  paragraphTwo.textContent = '';

  fetch('http://localhost:3000/weather?address=' + userLocation).then(
    (response) => {
      response.json().then(({ location, forecast, error }) => {
        if (error) {
          paragraphOne.textContent = error;
          return console.log(error);
        } else {
          console.log(search.value);
          paragraphOne.textContent = location;
          paragraphTwo.textContent = forecast;
        }
      });
    }
  );
});
