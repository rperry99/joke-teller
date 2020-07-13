const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

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
  // List of Joke API Urls
  // Clean Programming
  const cleanProgrammingJokeApiUrl =
    'https://sv443.net/jokeapi/v2/joke/Programming,Dark?blacklistFlags=nsfw,religious,political,racist,sexist';

  // Clean Dark Jokes
  const cleanDarkJokeApiUrl =
    'https://sv443.net/jokeapi/v2/joke/Dark?blacklistFlags=nsfw,religious,political,racist,sexist';

  // Any Jokes including NSFW, excluding religious, political, racist, or sexist
  const nsfwJokeApiUrl =
    'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=religious,political,racist,sexist';

  try {
    const response = await fetch(nsfwJokeApiUrl);
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
