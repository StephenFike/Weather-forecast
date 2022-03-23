var apiKey = "6f72019040ff1a5c35e180b603fe5518";
var cityNameEl = $("#city");
var currentWeatherContainerEl = $(".currentWeather");
var fiveDayForecastContainerEl = $(".fiveDayForecast");

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input
  var cityName = cityNameEl.val().trim();

  if (cityName) {
    getCityWeather(cityName);
    cityNameEl.val("");
  } else {
    alert("Please enter a city name");
  }
};

var getCityWeather = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayCityWeather(data);
        setLocalStorage(data);
        console.log(data);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

var displayCityWeather = function(weather) {
  // create h1 for the current date
  
  // clear currentWeather container and then create an h1 and append to the contrainer
  document.querySelector('.currentWeather').innerHTML = '';
  var nameContent = document.createElement('h1');
  nameContent.textContent = weather.name;
  // append to currentWeather container
  currentWeatherContainerEl.append(nameContent);
  // create h6 elements for temp, humidity, wind speed, and UV
  var temp = document.createElement('h6');
  var humid = document.createElement('h6');
  var windSpeed = document.createElement('h6');
  var uv = document.createElement('h6');
  // set values to h6 elements
  temp.textContent = "Temp: " + weather.main.temp;
  humid.textContent = "Humidity: " + weather.main.humidity;
  windSpeed.textContent = "Wind Speed: " + weather.wind.speed;
  // append to currentWeather container
  currentWeatherContainerEl.append(temp, humid, windSpeed)
};

var setLocalStorage = function (data) {
  localStorage.setItem(data.name, data.name);
};

function getRecentCities() {
  for (var i = 0; i < localStorage.length; i++) {
    var recentBtn = document.createElement('button');
    var recentCont = document.querySelector('.historyList');
    recentBtn.innerHTML = localStorage.key(i);
    recentCont.appendChild(recentBtn);
    recentBtn.className = 'w-100 bg-secondary text-black text-center mb-2 rounded py-1'
  }
};

$("#user-form").on("submit", formSubmitHandler);

$('.historyList').on('click', 'button', function(event) {
  var buttonClick = event.target.innerHTML
  getCityWeather(buttonClick);
})

getRecentCities();

// class="w-100 bg-secondary text-black text-center mb-2 rounded py-1 cityHistoryBtn" - class for created Li's
