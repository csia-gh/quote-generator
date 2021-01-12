const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let errorCounter = 0;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function somethingWentWrong() {
  quoteContainer.innerHTML =
    '<h2>Something went wrong, please try later </h2><h2>&#127773;</h2>';
}

// Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  //   const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // free proxy api from CORS anywhere. It often results in http status code 429, because there is too much traffic. You can't do anything about the 429 error other than just wait.
  const proxyUrl = 'https://young-island-72989.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl); // we make our api call using our headers from our proxy call
    const data = await response.json();

    // If author is blank, add 'Unknown'
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
    // throw new Error('oops');
  } catch (error) {
    console.log('whoops, no quote', error);
    errorCounter++;
    if (errorCounter >= 5) {
      removeLoadingSpinner();
      somethingWentWrong();
    } else getQuote(); // for 'unexpected token in json' error
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  console.log(twitterUrl);
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();

// https://developer.twitter.com/en/docs/twitter-for-websites
// https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview

// https://www.w3schools.com/howto/howto_css_loader.asp
