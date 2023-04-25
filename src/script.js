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

function getForecast(city) {
  console.log(city);
  let apiKey = "42e4tbb0e36fc43f4faaf7e2bob6c342";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-container");

  let forecastHTML = `<div class="row" id="forecast-row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2 justify-content-evenly">
                  <div class="forecast-day">${formatDay(forecastDay.time)}</div>
                  <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          width="42"
        />
                  <div class="forecast-temp">
                    <span class="high">${Math.round(
                      forecastDay.temperature.maximum
                    )}°C / </span>
                    <span class="low">${Math.round(
                      forecastDay.temperature.minimum
                    )}°C </span>
                  </div>
                </div>
                `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML =
    response.data.city + ", " + response.data.country;
  document.querySelector("#temperature").innerHTML =
    Math.round(response.data.temperature.current) + "°";
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

  celciusTemp = response.data.temperature.current;

  getForecast(response.data.city);
  console.log(response.data);
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

///// Get current location weather
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  console.log(event.data);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl2 = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=42e4tbb0e36fc43f4faaf7e2bob6c342&units=metric`;
  axios.get(apiUrl2).then(displayWeatherCondition);
}

/// Button

let locationButton = document.querySelector("#currentLocation");
locationButton.addEventListener("click", getCurrentLocation);

// converter

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function convertToCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let fahrenheitLink = document.querySelector("#farenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

let celciusTemp = null;

searchCity("Los Angeles");
