export default function createWeatherList(forecastDays) {
  const weatherList = [];
  forecastDays.forEach((forecast) => {
    weatherList.push({
      maxtemp_c: forecast["day"]["maxtemp_c"],
      maxtemp_f: forecast["day"]["maxtemp_f"],
      mintemp_c: forecast["day"]["mintemp_c"],
      mintemp_f: forecast["day"]["mintemp_f"],
      avghumidity: forecast["day"]["avghumidity"],
      condition: forecast["day"]["condition"]["text"],
      date: forecast["day"]["date"],
    });
  });
  return weatherList;
}
