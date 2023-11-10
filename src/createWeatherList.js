export default function createWeatherList(forecastDays) {
  const weatherList = [];
  forecastDays.forEach((forecast) => {
    weatherList.push({
      "average temp in c": forecast["day"]["avgtemp_c"],
      "average temp in f": forecast["day"]["avgtemp_f"],
      "average Humidity": forecast["day"]["avghumidity"],
      condition: forecast["day"]["condition"]["text"],
      date: forecast["date"],
    });
  });
  return weatherList;
}
