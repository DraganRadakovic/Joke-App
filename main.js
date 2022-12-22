const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//EventListeners

button.addEventListener("click", jokes);
audioElement.addEventListener("ended", toggleButton);

//Enable Disable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Get Joke from Api
async function jokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // check joke to see if it's a single or two part joke
    if (data.type == "twopart") {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMeJoke(joke);
    toggleButton();
  } catch (error) {
    console.log("error");
  }
}

//Passing Joke to VoiceRss

function tellMeJoke(joke) {
  VoiceRSS.speech({
    key: "4531f56af7ef4b82a48d3acd34acbb7e",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}
