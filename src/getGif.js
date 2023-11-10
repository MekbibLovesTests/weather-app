export default async function getGif(condition) {
  const request = new Request(
    `https://api.giphy.com/v1/gifs/translate?api_key=iSTaVuMDhS7xl89ZKeFtc9nLUPUvofnL&s=${condition}`,
    {
      mode: "cors",
      method: "GET",
    }
  );
  const response = await fetch(request);
  const data = await response.json();
  let url = data.data.images.original.url;
  return url;
}
