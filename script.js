async function analyzeSentiment() {
    let review = document.getElementById("reviewInput").value;
    let resultBox = document.getElementById("result");
    let spinner = document.getElementById("spinner");
    let sentimentText = document.getElementById("sentimentText");
    let confidenceText = document.getElementById("confidenceText");
    let cleanedText = document.getElementById("cleanedText");
    let historyList = document.getElementById("history");

    if (review.trim() === "") {
        alert("Please enter a review.");
        return;
    }

    // Show spinner
    spinner.classList.remove("hidden");
    resultBox.classList.add("hidden");

    //https://sentiment-backend-by1g.onrender.com
    try {
        let response = await fetch("https://sentiment-backend-by1g.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ review: review })
        });

        let data = await response.json();

        const sentiment = data.sentiment;
        const confidence = data.confidence;
        const cleaned = data.cleaned_text;

        // Emoji + Color mapping
        const map = {
            "positive": { emoji: "😊", color: "green" },
            "negative": { emoji: "😡", color: "red" },
            "neutral":  { emoji: "😐", color: "gray" }
        };

        sentimentText.innerHTML = 
            `Sentiment: <strong style="color:${map[sentiment].color}">${sentiment.toUpperCase()} ${map[sentiment].emoji}</strong>`;

        confidenceText.innerHTML =
            `Confidence: <strong>${confidence}%</strong>`;

        cleanedText.innerHTML =
            `Cleaned Text: <em>${cleaned}</em>`;

        // Add to history
        let li = document.createElement("li");
        li.innerHTML = `<strong>${sentiment.toUpperCase()}</strong> (${confidence}%) - ${review}`;
        historyList.prepend(li);

        // Show results
        spinner.classList.add("hidden");
        resultBox.classList.remove("hidden");

    } catch (err) {
        spinner.classList.add("hidden");
        alert("Error connecting to backend.");
        console.error(err);
    }
}

/* DARK MODE */
document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");
};