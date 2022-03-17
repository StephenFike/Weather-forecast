var apiKey = "6f72019040ff1a5c35e180b603fe5518"

var getCityWeather = function(city) {
    var city = $("#userInput").val();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                $('.cityinfo .temp').text('Temp: ' + data.main.temp);
            })
        } else {
            alert("Error: " + response.statusText);
        }
    })
}