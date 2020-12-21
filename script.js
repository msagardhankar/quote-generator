const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newBtn = document.getElementById("new-quote");

// Function to Get quote from Api
// async is a type of function
async function getQuote() {
  // Proxy url is used becoz sometime the above url of free api not works, thatiswhy
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  // forismatic is free api server for famous quotes
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    // wait until website get response from api server, and get response material
    const response = await fetch(proxyUrl + apiUrl);
    // response material in json format
    const data = await response.json();
    // If author is blank - add unknown
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      // dom manipulation, add data from server's got material
      // from json format defined in api server website, quoteAuthor is method to get author name
      authorText.innerText = data.quoteAuthor;
    }

    quoteText.innerText = data.quoteText;
    // If quote text len>120 => font size lower
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
  } catch (err) {
    // if something wrong(no response from server) happen in try block then it enter in catch block
    // function call again if no response from server
    getQuote();
    console.log("Whoops! no quote ", err);
  }
}

//On load
getQuote();
