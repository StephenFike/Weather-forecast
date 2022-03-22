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

var getLocalStorage = function (data) {
    var gotCityName = localStorage.getItem("cityNames");
    if(gotCityName === null){
        localStorage.setItem("cityNames", data.name);
    } else {
        localStorage.setItem("cityNames", data.name + "," + gotCityName);
    }
    getHistory();
};

var getHistory = function() {
    var historyCities = localStorage.getItem("cityNames");
    var cityArray = historyCities.split(",")
    console.log(cityArray);
};

var displayCityWeather = function(weather) {
  // create h1 for the current date

  // create h2 for city name
  var nameContainer = document.createElement("h2");
  nameContainer.textContent = weather.name
  // append to currentWeather container
  currentWeatherContainerEl.append(nameContainer);

}

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
        getLocalStorage(data);
        console.log(data);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};





$("#user-form").on("submit", formSubmitHandler);

var bootupHistory = function() {
    var gotCityName = localStorage.getItem("cityNames");
    if (gotCityName === null){
        return
    } else {
       getHistory();
    }
};

bootupHistory();

// class="w-100 bg-secondary text-black text-center mb-2 rounded py-1 cityHistoryBtn" - class for created Li's
