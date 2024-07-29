let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function appendBooks(results) {
    let imgUrl = results.imageLink;
    let authorName = results.author;

    let imageEl = document.createElement("img");
    imageEl.src = imgUrl;
    searchResultsEl.appendChild(imageEl);

    let authorEl = document.createElement("p");
    authorEl.classList.add("authortext");
    authorEl.textContent = authorName;
    searchResultsEl.appendChild(authorEl);
}

function displayResults(search_results) {
    searchInputEl.value = " ";
    let headingEl = document.createElement("h1");
    headingEl.classList.add("errorHeading");
    searchResultsEl.appendChild(headingEl);

    let headingEl2 = document.createElement("h1");
    headingEl2.classList.add("popularBooks");
    searchResultsEl.appendChild(headingEl2);
    if (search_results.length === 0) {
        spinnerEl.classList.add("d-none");
        headingEl.textContent = 'No results found';
    } else if (search_results) {
        spinnerEl.classList.remove("d-none");
        headingEl2.textContent = 'Popular Books';
        for (let results of search_results) {
            appendBooks(results);
        }
    } else {
        spinnerEl.classList.add("d-none");
        headingEl.textContent = "Error: Invalid response from server";
    }
}

searchInputEl.addEventListener("keydown", function(event) {
    let searchInputValue = event.target.value;
    searchResultsEl.textContent = "";
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                displayResults(jsonData.search_results);
            });
    }
});