const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const programmingButton = document.getElementById('programming');
const darkButton = document.getElementById('dark');
const nsfwButton = document.getElementById('nsfw');

let currentAPIUrl =
  'https://sv443.net/jokeapi/v2/joke/Programming,Dark?blacklistFlags=nsfw,religious,political,racist,sexist';

// Disable / Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Pass the joke to the voiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: config.MY_KEY,
    src: joke,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = '';

  try {
    const response = await fetch(currentAPIUrl);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    // Tell the joke
    tellMe(joke);

    // Disable the button
    toggleButton();
  } catch (error) {
    console.log('An error occured in getJokes(). ', error);
  }
}

// Event Listeners
button.addEventListener('click', () => {
  getJokes();
});
audioElement.addEventListener('ended', toggleButton);

// These are to let the user switch between different joke types.
programmingButton.addEventListener('click', () => {
  darkButton.disabled = false;
  nsfwButton.disabled = false;
  programmingButton.disabled = true;
  currentAPIUrl =
    'https://sv443.net/jokeapi/v2/joke/Programming,Dark?blacklistFlags=nsfw,religious,political,racist,sexist';
});
darkButton.addEventListener('click', () => {
  darkButton.disabled = true;
  nsfwButton.disabled = false;
  programmingButton.disabled = false;
  currentAPIUrl =
    'https://sv443.net/jokeapi/v2/joke/Dark?blacklistFlags=nsfw,religious,political,racist,sexist';
});
nsfwButton.addEventListener('click', () => {
  darkButton.disabled = false;
  nsfwButton.disabled = true;
  programmingButton.disabled = false;
  currentAPIUrl =
    'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=religious,political,racist,sexist';
});
