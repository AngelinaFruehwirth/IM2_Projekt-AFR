const params = new URLSearchParams(window.location.search);
const name = params.get("name");

async function getResults() {
  if (!name) return;

  try {
    const response = await fetch(`https://api.nationalize.io/?name=${name}`);
    const data = await response.json();

    const countries = await fetch("countries.json").then((res) => res.json());

    const resultContainer = document.getElementById("results-container");
    const nameDisplay = document.getElementById("nameDisplay");

    if (!resultContainer || !nameDisplay) return;

    resultContainer.innerHTML = "";
    nameDisplay.textContent = "Your Results";

    data.country
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 3)
      .forEach((item, index) => {
        const match = countries.find((c) => c.code === item.country_id);
        const percent = Math.round(item.probability * 100);

        const podium = document.createElement("div");
        podium.className = `podium podium-${index + 1}`;

        const flagImg = document.createElement("img");
        flagImg.src = match?.image || "";
        flagImg.alt = match?.name || item.country_id;
        flagImg.className = "flag-img";

        const column = document.createElement("div");
        column.className = "column";
        column.style.height = `${100 + percent}px`;

        const label = document.createElement("div");
        label.className = "label";
        label.innerHTML = `${percent}%<br>${match?.name || item.country_id}`;

        podium.appendChild(flagImg);
        podium.appendChild(column);
        podium.appendChild(label);

        resultContainer.appendChild(podium);
      });

  } catch (e) {
    console.error("Fehler beim Abrufen der Daten", e);
  }
}

// Emojis anzeigen
const emojiContainer = document.getElementById('emoji-container');
if (emojiContainer) {
  fetch('countries.json')
    .then((res) => res.json())
    .then((countries) => {
      const shuffled = countries.sort(() => 0.5 - Math.random()).slice(0, 20);

      shuffled.forEach((country) => {
        const img = document.createElement('img');
        img.className = 'floating-emoji';
        img.src = country.image;
        img.alt = country.code;

        img.style.top = `${Math.random() * 90}%`;
        img.style.left = `${Math.random() * 90}%`;
        img.style.animationDuration = `${20 + Math.random() * 20}s`;
        img.style.animationDelay = `${Math.random() * 10}s`;

        emojiContainer.appendChild(img);
      });
    });
}

// Nur ausführen, wenn auf results.html
if (document.getElementById("results-container")) {
  getResults();
}