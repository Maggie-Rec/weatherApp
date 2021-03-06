function getForecast(coordinates) {
  let apiKey = `c5a356ad92d64faf6646a907c456e071`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let displayCurrentWeather = document.querySelector(".temperatureCurrent");
  let windSpeed = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let country = document.querySelector("#country");
  let pressure = document.querySelector("#pressure");
  let cityName = document.querySelector("#change-city");
  let icon = document.querySelector("#icon");
  let minTemperature = document.querySelector("#lowTemp");
  let maxTemperature = document.querySelector("#highTemp");
  let description = document.querySelector(".description");

  celciusTemperature = response.data.main.temp;
  minimumTemperature = response.data.main.temp_min;
  maximumTemperature = response.data.main.temp_max;

  description.innerHTML = response.data.weather[0].description;
  minTemperature.innerHTML = Math.round(minimumTemperature);
  maxTemperature.innerHTML = Math.round(maximumTemperature);
  displayCurrentWeather.innerHTML = Math.round(celciusTemperature);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
  country.innerHTML = response.data.sys.country;
  pressure.innerHTML = response.data.main.pressure;
  cityName.innerHTML = response.data.name;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let city = document.querySelector("#change-city");
  city.innerHTML = searchCity.value;

  let apiKey = `c5a356ad92d64faf6646a907c456e071`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", showCity);

function currentPosition(position) {
  let apiKey = `c5a356ad92d64faf6646a907c456e071`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocation = document.querySelector(".currentLocation");
currentLocation.addEventListener("click", showCurrentPosition);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

let now = new Date();

let day = document.querySelector("#day");
day.innerHTML = days[now.getDay()];

let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let currentYear = now.getFullYear();

let date = document.querySelector("#date");

date.innerHTML = `${currentDate}/${currentMonth}/${currentYear}`;

let time = document.querySelector("#time");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

time.innerHTML = `${hours}:${minutes}`;

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
     
       <div class="col-2">
            <div class="forecast-date">${formatForecastDate(
              forecastDay.dt
            )}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" width="60px" alt="" />
            <ul>
              <li class="forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}??C</li>
              <li class="forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}??C</li>
            </ul>
          </div>
       `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celciusTemperature = null;
let minimumTemperature = null;
let maximumTemperature = null;
