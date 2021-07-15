// Fetch API - Promise (https://openweathermap.org/) -> API
let weather = {
    apiKey: "9032fdcd419fcdba336860448fc90a9e",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    // Function- Object Destructuring
    displayWeather: function (data) {
        const { name } = data;
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        // DOM manipulation -
        document.querySelector(".city").innerText = name + ", " + country;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    //   input- 
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

// Button logic -
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

// Keyboard 'Enter' key setup-
document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

// Initial page-
weather.fetchWeather("Chennai");
