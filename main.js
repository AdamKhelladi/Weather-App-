/* 
  ---------------------------
  ------- Weather App -------
  ---------------------------
*/

let searchInput = document.querySelector(".search input");
let searchBtn = document.querySelector(".btn");

let temp = document.querySelector(".temp");
let city = document.querySelector(".city");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");

let weatherIcon = document.querySelector(".weather-icon");

window.onload = () => {
  searchInput.focus();
};

let cityName;
let apiUrl;

searchBtn.addEventListener("click", () => {
  cityName = searchInput.value;

  const apiKey = "8c490936c0b90fb8e7ba4aebfbd1d5c9";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  checkWeather();
});

async function checkWeather() {
  const response = await fetch(apiUrl);
  // console.log(response);

  if (response.status === 404) {
    document.querySelector(".msg").style.display = "block";
    document.querySelector(".msg").textContent = "Invalid city name 😕";
    document.querySelector(".weather").style.display = "none";
    
    return;
  }

  let data = await response.json();

  // console.log(data);

  city.innerHTML = data.name;
  temp.innerHTML = data.main.temp;
  humidity.innerHTML = data.main.humidity + "%";
  wind.innerHTML = data.wind.speed + "<span>km/h</span>";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  }

  document.querySelector(".msg").style.display = "none";
  document.querySelector(".weather").style.display = "block";
}
