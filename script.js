const API_OPTIONS = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '4218e772d8mshd3036d10d2f0012p1a8adbjsnbdbc9d7a30a6',
        'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
    }
};

const URL_REGEX = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/;

const summarizeButton = document.querySelector(".btn");

summarizeButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const inputUrl = document.querySelector(".url").value.trim();
    const summaryDisplay = document.querySelector(".summary");

    summaryDisplay.innerText = "Please wait, the article is summarizing...";

    if (!URL_REGEX.test(inputUrl)) {
        summaryDisplay.innerText = "Please enter a valid URL.";
        return;
    }

    const apiUrl = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(inputUrl)}&lang=en&engine=2`;

    try {
        const response = await fetch(apiUrl, API_OPTIONS);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        summaryDisplay.innerText = data.summary || "No summary available for this URL.";
    } catch (error) {
        console.error("Error fetching summary:", error);
        summaryDisplay.innerText = "An error occurred while summarizing the article. Please try again.";
    }
});