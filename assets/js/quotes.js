window.onload = (event) => {
    const quotes = document.getElementsByClassName("quoteblock");
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quote.style.display = "block";
};