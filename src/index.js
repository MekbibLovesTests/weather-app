import "./style.css";
import getWeather from "./getWeather";
import getGif from "./getGif";

const submitButton = document.querySelector("button");
submitButton.addEventListener("click", handleSubmit);

const radioButtons = document.querySelectorAll(`input[type="radio"]`);
radioButtons.forEach((radio) => {
  radio.addEventListener("click", changeTemperatureScale);
});
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

  div.append(
    createSpanElement("date", weather),
    createTemperatureSpanElement(weather),
    createSpanElement("average Humidity", weather)
  );
  weatherCards.appendChild(div);
  div.append(await createGif(weather.condition));
}

function createSpanElement(key, weather, data_attribute = null) {
  const span = document.createElement("span");
  const keyP = document.createElement("p");
  keyP.textContent = key;
  const valueP = document.createElement("p");
  valueP.textContent = weather[key];
  span.append(keyP, valueP);

  return span;
}

function createTemperatureSpanElement(weather) {
  const inputValue = document.querySelector(
    "input[type = radio]:checked"
  ).value;
  let scale;
  let key;
  let opposite_key;
  if (inputValue === "fahrenheit") {
    scale = "fahrenheit";
    key = "average temp in f";
    opposite_key = "average temp in c";
  } else {
    scale = "celsius";
    key = "average temp in c";
    opposite_key = "average temp in f";
  }
  const span = document.createElement("span");
  const keyP = document.createElement("p");
  keyP.textContent = key;
  const valueP = document.createElement("p");
  valueP.textContent = weather[key];
  keyP.setAttribute("scale", scale);
  valueP.setAttribute("opposite_temperature", weather[opposite_key]);

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
export function resetContainer() {
  const location = document.querySelector(".location");
  location.textContent = "";
  const weatherCards = document.querySelector(".weatherCards");
  weatherCards.textContent = "";
}

function changeTemperatureScale(e) {
  const value = e.target.value;
  const scaleList = document.querySelectorAll("[scale]");
  const temperatureList = document.querySelectorAll("[opposite_temperature]");
  if (scaleList.length === 0 || scaleList[0].scale === value) return;

  scaleList.forEach((scale) => {
    if (value === "celsius") {
      scale.textContent = "average temp in c";
      scale.scale = value;
    } else {
      scale.textContent = "average temp in f";
      scale.scale = value;
    }
  });

  temperatureList.forEach((temperature) => {
    const textContentCopy = temperature.textContent;

    temperature.textContent = temperature.getAttribute("opposite_temperature");
    temperature.setAttribute("opposite_temperature", textContentCopy);
  });
}
