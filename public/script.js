// select required element

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  // free open weather api key :)
  const APIKey = "bb197c411e866ae3f1479038cba43e97";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";

        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";

        error404.style.display = "block";
        error404.classList.add("fadeIn");

        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      // select required element

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity-details span"
      );
      const wind = document.querySelector(".weather-details .wind-details span");
      const pressure = document.querySelector(
        ".weather-details .pressure-details span"
      );
      const visibility = document.querySelector(
        ".weather-details .visiblity-details span"
      );

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Mist":
          image.src = "images/mist.png";
          break;
        case "Smoke":
          image.src = "images/smoke.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
      pressure.innerHTML = `${json.main.pressure}mb`;
      visibility.innerHTML = `${json.visibility / 1000}km`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");

      container.style.height = "590px";

      // Send weather data to server
      fetch('/save-weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: city,
          temperature: parseInt(json.main.temp),
          description: json.weather[0].description,
          humidity: json.main.humidity,
          windSpeed: parseInt(json.wind.speed),
          pressure: json.main.pressure,
          visibility: json.visibility / 1000
        })
      })
      .then(response => response.text())
      .then(data => {
        console.log('Weather data saved:', data);
      })
      .catch(error => {
        console.error('Error saving weather data:', error);
      });
    });
});
