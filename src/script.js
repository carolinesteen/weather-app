/////// Make date /////////

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

// Search engine

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-desc").innerHTML =
    response.data.condition.description;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}
function searchCity(city) {
  let apiKey = "42e4tbb0e36fc43f4faaf7e2bob6c342";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let dateElement = document.querySelector("#currentDate");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Los Angeles");

///// Get current location weather
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "42e4tbb0e36fc43f4faaf7e2bob6c342";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

/// Button

let locationButton = document.querySelector("#currentLocation");
locationButton.addEventListener("click", getCurrentLocation);

/// position Location Function
function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let currentLocation = document.querySelector("#currentLocation");
  currentLocation.innerHTML = alert(
    `The temperature at your current location is ${temp}°C`
  );
}

// converter
// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = `(${temperatureElement} * 9/5) + 32`;
// }

// function convertToCelsius(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = `${temperatureElement} * 9/5) + 32`;
// }

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", convertToCelsius);
