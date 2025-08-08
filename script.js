document.getElementById("plan-form").addEventListener("submit", function(e) {
    e.preventDefault();
    getRecommendation();
});

document.querySelectorAll("#persona-sim button").forEach(btn => {
    btn.addEventListener("click", () => loadPersona(btn.dataset.persona));
});

function getRecommendation() {
    const device = document.getElementById("device").value;
    const location = document.getElementById("location").value;
    const income = document.getElementById("income").value;
    const interests = Array.from(document.getElementById("interests").selectedOptions).map(o => o.value);

    let planName = "";
    let reason = "";

    // Simple "model" logic
    if (device === "mobile" && income === "low") {
        planName = "Mobile Plan";
        reason = "You're mostly on mobile and prefer a budget-friendly option.";
    } else if (income === "high" && interests.includes("movies")) {
        planName = "Premium Ad-Free Plan";
        reason = "You value high-quality streaming and enjoy movies without interruptions.";
    } else if (interests.includes("kids")) {
        planName = "Family Plan";
        reason = "Perfect for households with kids and multiple devices.";
    } else {
        planName = "Standard Plan";
        reason = "A balanced option for general viewing across devices.";
    }

    document.getElementById("plan-name").textContent = planName;
    document.getElementById("plan-reason").textContent = reason;
    document.getElementById("plan-card").classList.remove("hidden");
}

function loadPersona(type) {
    if (type === "student") {
        document.getElementById("device").value = "mobile";
        document.getElementById("income").value = "low";
        document.getElementById("location").value = "urban";
        selectInterests(["sports", "movies"]);
    } else if (type === "family") {
        document.getElementById("device").value = "tv";
        document.getElementById("income").value = "medium";
        document.getElementById("location").value = "suburban";
        selectInterests(["kids"]);
    } else if (type === "cinephile") {
        document.getElementById("device").value = "desktop";
        document.getElementById("income").value = "high";
        document.getElementById("location").value = "urban";
        selectInterests(["movies", "documentaries"]);
    }
    getRecommendation();
}

function selectInterests(values) {
    const options = document.getElementById("interests").options;
    for (let i = 0; i < options.length; i++) {
        options[i].selected = values.includes(options[i].value);
    }
}
