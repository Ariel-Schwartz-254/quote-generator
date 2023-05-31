const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const copyBtn = document.getElementById('copy');
const twitterBtn = document.getElementById('twitter');
const facebookBtn = document.getElementById('facebook');
const instagramBtn = document.getElementById('instagram');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function displayLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Display New Quote
function newQuote() {
    displayLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = '- unknown';
    } else {
        authorText.textContent = '- ' + quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loading Spinner
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes () {
    displayLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log('Quotes failed to fetch', error);
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Copy Quote to Clipboard
function copyQuoteToClipboard() {
    navigator.clipboard.writeText(`${quoteText.textContent} ${authorText.textContent}`)
    .then(console.log('Quote copied to clipboard'))
    .catch(error => console.error("Error copying text:", error));
}

// Post Quote on Facebook
function postQuoteOnFacebook() {
    // copyQuoteToClipboard();
    const facebookUrl = 'https://www.facebook.com/stories/create'
    window.open(facebookUrl, '_blank');
}

// Share Quote on Instagram
function shareQuoteOnInstagram() {
    const instagramUrl = `https://www.instagram.com/`;
    window.open(instagramUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
facebookBtn.addEventListener('click', postQuoteOnFacebook);
instagramBtn.addEventListener('click', shareQuoteOnInstagram);
copyBtn.addEventListener('click', copyQuoteToClipboard);


// On Load
getQuotes();
