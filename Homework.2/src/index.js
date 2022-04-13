function displayWeather(response) {
  let displayCurrentWeather = document.querySelector(".temperatureCurrent");
  displayCurrentWeather.innerHTML = Math.round(response.data.main.temp);
  console.log(response);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let country = document.querySelector("#country");
  country.innerHTML = response.data.sys.country;
  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = response.data.main.pressure;
}

function showCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let city = document.querySelector("#change-city");
  city.innerHTML = searchCity.value;

  let apiKey = `c5a356ad92d64faf6646a907c456e071`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayWeather);
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", showCity);

let days = [
  "Sunady",
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

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureUnit = document.querySelector(".temperatureCurrent");
  let temperature = temperatureUnit.innerHTML;
  temperatureUnit.innerHTML = Math.round((temperature * 9) / 5 + 32);
  let temperatureHigh = document.querySelector("#highTemp");
  let temperatureLow = document.querySelector("#lowTemp");
  let highTemp = temperatureHigh.innerHTML;
  let lowTemp = temperatureLow.innerHTML;
  temperatureHigh.innerHTML = Math.round((highTemp * 9) / 5 + 32);
  temperatureLow.innerHTML = Math.round((lowTemp * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#tempFahr");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
