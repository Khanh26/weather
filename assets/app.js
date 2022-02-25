let weather = {
    'apiKey': 'cbbcb177c3d759f69c754aa7e0953d6d',
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city 
             + "&units=metric&appid=" 
             + this.apiKey
        ).then((res) => res.json())
        .then((data) => {
            this.displayWeather(data)
        });
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector('.city').innerHTML = "Weather in " + name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        document.querySelector('.temp').innerHTML = +temp.toFixed(1)+"&deg;C";
        document.querySelector('.description').innerHTML = description;
        document.querySelector('.humidity').innerHTML = "Humidity: "+ humidity +"%";
        document.querySelector('.wind').innerHTML = "Wind speed " + speed + " km/h";
        document.querySelector('.weather').classList.remove('loading');
        document.body.style.background = 'url("https://source.unsplash.com/random/1600/? '+ name +'") center / cover no-repeat';
    },
    search :function() {
        this.fetchWeather(document.querySelector('.search-bar').value)
    }
}
document.querySelector('.search button')
    .addEventListener("click", () => {
    document.querySelector('.weather').classList.add('loading');
    weather.search();
})

document.querySelector('.search-bar')
    .addEventListener("keyup", (e) => {
    if(e.key == 'Enter') {
        document.querySelector('.weather').classList.add('loading');
        weather.search();
    }
})