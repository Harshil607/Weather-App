const cityName = document.getElementById("city");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const weather = document.getElementById("weather");
const emoji = document.getElementById("emoji");
const btn = document.getElementById("btn");
const input = document.getElementById("inp");
const wrong = document.getElementById("wrong");
const api = "f16704f5e9a2c47f667a3426d12e3aca";
let whichCity = "";

btn.onclick = async function () {
  whichCity = input.value.toLowerCase();
  if (whichCity) {
    try {
      const weatherData = await getWeatherData(whichCity);
      weatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      wrong.textContent = error;
      input.value = "";
      cityName.textContent = "";
      temp.textContent = "";
      humidity.textContent = "";
      weather.textContent = "";
      emoji.textContent = "";
    }
  } else {
    displayError("Please Enter a City");
  }
};

async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Couldn't Fetch Data");
  } else {
    return await response.json();
  }
}

function weatherInfo(data) {
  console.log(data);

  cityName.textContent = data.name;
  temp.textContent = `${data.main.temp} °C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  weather.textContent = data.weather[0].description;

  emoji.textContent = getWeatherEmoji(data.weather[0].id);

  wrong.textContent = "";
}

function getWeatherEmoji(weatherID) {
  if (weatherID >= 200 && weatherID < 300) {
    return "⛈️"; // Thunderstorm
  } else if (weatherID >= 300 && weatherID < 400) {
    return "🌦️"; // Drizzle
  } else if (weatherID >= 500 && weatherID < 600) {
    return "🌧️"; // Rain
  } else if (weatherID >= 600 && weatherID < 700) {
    return "❄️"; // Snow
  } else if (weatherID >= 700 && weatherID < 800) {
    return "🌫️"; // Fog, Mist, Haze
  } else if (weatherID === 800) {
    return "☀️"; // Clear
  } else if (weatherID > 800) {
    return "☁️"; // Clouds
  } else {
    return "🌍";
  }
}
function displayError(msg) {
  wrong.textContent = msg;
}
