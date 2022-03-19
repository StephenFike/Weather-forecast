var apiKey = "6f72019040ff1a5c35e180b603fe5518";
var cityNameEl = $("#city");

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input
  var cityName = cityNameEl.val().trim();

  if (cityName) {
    getCityWeather(cityName);
    getHistory();
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
};

var getHistory = function() {
    var historyCities = localStorage.getItem("cityNames");
    var cityArray = historyCities.split(",")
    console.log(cityArray);
};

var getCityWeather = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
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

    } else {
       getHistory();
    }
};

bootupHistory();
// class="w-100 bg-secondary text-black text-center mb-2 rounded py-1 - class for created Li's
