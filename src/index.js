import "./style.css";
import getWeather from "./getWeather";

const submitButton = document.querySelector("button");

submitButton.addEventListener("click", handleSubmit);

async function handleSubmit(e) {
  const location = document.querySelector("input").value;
  if (location === "") return;
  e.preventDefault();
  const weatherList = await getWeather(location);
  console.log(weatherList);
  resetContainer();
  weatherList.forEach((weather) => {
    createWeatherCard(weather);
  });
}

function createWeatherCard(weather) {
  const container = document.querySelector(".weather");
  const div = document.createElement("div");
  const inputValue = document.querySelector(
    "input[type = radio]:checked"
  ).value;
  let temperatureScale = "average temp in c";

  if (inputValue === "fahrenheit") {
    temperatureScale = "average temp in f";
  }
  div.append(
    createSpanElement("date", weather),
    createSpanElement(temperatureScale, weather),
    createSpanElement("average Humidity", weather)
  );
  container.appendChild(div);
}

function createSpanElement(key, weather) {
  const span = document.createElement("span");
  const keyP = document.createElement("p");
  keyP.textContent = key;
  const valueP = document.createElement("p");
  valueP.textContent = weather[key];
  span.append(keyP, valueP);

  return span;
}

function resetContainer() {
  const container = document.querySelector(".weather");
  container.textContent = "";
}
