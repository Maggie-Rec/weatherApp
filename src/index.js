function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `c5a356ad92d64faf6646a907c456e071`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
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

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
     
       <div class="col-2">
            <div class="forecast-date">${day}</div>
            <img src="images/cloud.png" width="60px" alt="cloud icon" />
            <ul>
              <li class="forecast-temperature-max">20°C</li>
              <li class="forecast-temperature-min">15°C</li>
            </ul>
          </div>
       `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureUnit = document.querySelector(".temperatureCurrent");
  temperatureUnit.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
  let temperatureHigh = document.querySelector("#highTemp");
  let temperatureLow = document.querySelector("#lowTemp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  temperatureHigh.innerHTML = Math.round((maximumTemperature * 9) / 5 + 32);
  temperatureLow.innerHTML = Math.round((minimumTemperature * 9) / 5 + 32);
}

function comeBackToCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureUnit = document.querySelector(".temperatureCurrent");
  temperatureUnit.innerHTML = Math.round(celciusTemperature);
  let temperatureHigh = document.querySelector("#highTemp");
  let temperatureLow = document.querySelector("#lowTemp");

  temperatureHigh.innerHTML = Math.round(maximumTemperature);
  temperatureLow.innerHTML = Math.round(minimumTemperature);
}

let fahrenheitLink = document.querySelector("#tempFahr");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#tempCel");
celciusLink.addEventListener("click", comeBackToCelcius);

let celciusTemperature = null;
let minimumTemperature = null;
let maximumTemperature = null;

displayForecast();
