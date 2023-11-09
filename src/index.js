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
}
