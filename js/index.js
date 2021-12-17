'use strict';

// DOM selectors
const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const listen = document.querySelector('#listen');
const copy = document.querySelector('#copy');
const tweetit = document.querySelector('#tweetit');
const generateQuote = document.querySelector('#generateQuote');

quote.innerText =
  'Quote content goes here, once you click New Quote, a random quote will be created.';

// Generate random quote function
function generateRandomQuote() {
  // make loading effect
  generateQuote.classList.add('loading');
  generateQuote.textContent = 'loading...';

  // fetch random quote from quotable.io API and parsing it into JS object:
  fetch('https://quotable.io/random')
    .then(r => r.json())
    .then(quoteData => {
      quote.textContent = quoteData.content;
      author.textContent = quoteData.author;
      generateQuote.classList.remove('loading');
      generateQuote.textContent = 'New Quote';
    });
}

// listen to the quote function
function listenToQuote() {
  // declare speaker
  let speaker = new SpeechSynthesisUtterance(
    `${quote.textContent} said by ${author.textContent}`
  );

  speechSynthesis.speak(speaker);

  document.querySelector('.ri-volume-down-fill').classList.toggle('hidden');
  document.querySelector('#listen .ri-check-line').classList.toggle('hidden');
  setTimeout(() => {
    document.querySelector('.ri-volume-down-fill').classList.toggle('hidden');
    document.querySelector('#listen .ri-check-line').classList.toggle('hidden');
  }, 1200);
}

// copy the quote function
function copyQuote() {
  navigator.clipboard.writeText(quote.textContent);

  document.querySelector('.ri-file-copy-fill').classList.toggle('hidden');
  document.querySelector('#copy .ri-check-line').classList.toggle('hidden');
  setTimeout(() => {
    document.querySelector('.ri-file-copy-fill').classList.toggle('hidden');
    document.querySelector('#copy .ri-check-line').classList.toggle('hidden');
  }, 1200);
}

// tweet the quote function
function tweetQuote() {
  let tweetContent = `${quote.textContent} - ${author.textContent}`;
  let tweetURL = `https://twitter.com/intent/tweet?url=${tweetContent}`;
  window.open(tweetURL, '_blank');
}

// events
listen.addEventListener('click', listenToQuote);

copy.addEventListener('click', copyQuote);

tweetit.addEventListener('click', tweetQuote);

generateQuote.addEventListener('click', generateRandomQuote);
