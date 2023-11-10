import "./style.css";
import getWeather from "./getWeather";
import getGif from "./getGif";

const submitButton = document.querySelector("button");

submitButton.addEventListener("click", handleSubmit);

async function handleSubmit(e) {
  const location = document.querySelector("input").value;
  if (location === "") return;
  e.preventDefault();
  try {
    const { name, weatherList } = await getWeather(location);
    resetContainer();
    changeLocationName(name);
    for (let i = 0; i < weatherList.length; i++) {
      createWeatherCard(weatherList[i]);
    }
  } catch (err) {
    console.log(err);
  }
}

function changeLocationName(name) {
  const location = document.querySelector(".location");
  location.textContent = name;
}

async function createWeatherCard(weather) {
  const weatherCards = document.querySelector(".weatherCards");
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
  weatherCards.appendChild(div);
  div.append(await createGif(weather.condition));
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

async function createGif(condition) {
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = "Rain possibility";
  const url = await getGif(condition);
  const img = document.createElement("img");
  img.setAttribute("width", "100px");
  img.setAttribute("height", "100px");
  img.src = url;

  div.append(p, img);
  return div;
}
function resetContainer() {
  const location = document.querySelector(".location");
  location.textContent = "";
  const weatherCards = document.querySelector(".weatherCards");
  weatherCards.textContent = "";
}
