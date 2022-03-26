var apiKey = "6f72019040ff1a5c35e180b603fe5518";
var cityNameEl = $("#city");
var currentWeatherContainerEl = $(".currentWeather");
var fiveDayForecastContainerEl = $(".fiveDayForecast");
var hidden = $('.day')
hidden.hide();


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
        oneCallApi(data);
        console.log(data);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

var oneCallApi = function(data){
    var {coord} = data;
    var {lat, lon} = coord;

    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(apiUrl).then(function(response) {
      if(response.ok) {
        response.json().then(function (data) {
          var uv = document.createElement('h6');
          uv.className = "uvIndex";
          uv.textContent = `UV Index: ${data.current.uvi}`
          currentWeatherContainerEl.append(uv);
          hidden.show();
          console.log(data);
          showUvLevel(data);

          for (var i = 0; i < data.daily.length; i++) {
            var date = new Date(data.daily[i].dt * 1000).toLocaleDateString("en-US");
            $('.date').eq(i).text(date);
            $('.wicon').eq(i).attr('src', 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '.png');
            $('.fiveDayForecast .temp').eq(i).text('Temp: ' + data.daily[i].temp.day);
            $('.fiveDayForecast .wind').eq(i).text('Wind: ' + data.daily[i].wind_speed + ' MPH');
            $('.fiveDayForecast .humidity').eq(i).text('Humidity: ' + data.daily[0].humidity + '%');
        }
        })
      } else {
        alert("Error: " + response.statusText);
      }
    });
};


function showUvLevel(data) {
  if (data.current.uvi <= 3){
    $('.uvIndex').addClass('favorable');
  } else if (data.current.uvi >= 4 || data.current.uvi <= 7){
    $('.uvIndex').addClass('moderate');
  } else {
    $('.uvIndex').addClass('severe');
  }
};


var displayCityWeather = function(weather) {
  // create h1 for the current date
  var dateEl = document.createElement('h1')
  var date = new Date(weather.dt * 1000).toLocaleDateString("en-US");
  dateEl.textContent = date;
  // clear currentWeather container and then create an h1 and append to the contrainer
  document.querySelector('.currentWeather').innerHTML = '';
  var nameContent = document.createElement('h1');
  nameContent.textContent = weather.name;
  // create div to hold weather icon
  var weatherIconEl = document.createElement('img');
  weatherIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '.png')
  // append to currentWeather container
  currentWeatherContainerEl.append(nameContent);
  currentWeatherContainerEl.append(dateEl);
  currentWeatherContainerEl.append(weatherIconEl);
  // create h6 elements for temp, humidity, wind speed
  var temp = document.createElement('h6');
  var humid = document.createElement('h6');
  var windSpeed = document.createElement('h6');
  // set values to h6 elements
  temp.textContent = "Temp: " + weather.main.temp;
  humid.textContent = "Humidity: " + weather.main.humidity;
  windSpeed.textContent = "Wind Speed: " + weather.wind.speed;
  // append to currentWeather container
  currentWeatherContainerEl.append(temp, humid, windSpeed);
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
});

getRecentCities();
