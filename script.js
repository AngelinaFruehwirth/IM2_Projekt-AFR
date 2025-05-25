console.log('test')

const url = 'https://api.nationalize.io/?name=bock';
try{
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}catch(e) {
    console.error(e);
}

const params = new URLSearchParams(window.location.search);
const name = params.get('name');

if (name) {
  document.getElementById('nameDisplay').textContent = `Based on the name: "${name}"`;

  const url = `https://api.nationalize.io/?name=${name}`;

  fetch(url)
    .then(response => response.json())
    .then(async data => {
      const response = await fetch('countries.json');
      const countryList = await response.json();

      const resultContainer = document.getElementById("result");
      resultContainer.innerHTML = "";

      data.country.slice(0, 3).forEach((country) => {
        const match = countryList.find(c => c.code === country.country_id);
        const div = document.createElement("div");
        div.className = "bar";
        div.style.height = `${100 + country.probability * 200}px`;

        const flag = document.createElement("img");
        flag.className = "bar-flag";
        flag.src = match?.flag || "";
        flag.alt = match?.name || country.country_id;

        const label = document.createElement("div");
        label.className = "bar-label";
        label.innerHTML = `
          ${Math.round(country.probability * 100)}%<br>
          ${match?.name || country.country_id}
        `;

        div.appendChild(flag);
        div.appendChild(label);
        resultContainer.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Error fetching data:", err);
    });
}

//neu

async function getResults() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  if (!name) return;

  try {
    const response = await fetch(`https://api.nationalize.io/?name=${name}`);
    const data = await response.json();
    const countries = await fetch("countries.json").then((res) => res.json());

    const resultContainer = document.getElementById("results-container");
    resultContainer.innerHTML = "";

    data.country
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 3)
      .forEach((item) => {
        const match = countries.find((c) => c.code === item.country_id);
        const percent = Math.round(item.probability * 100);

        const result = document.createElement("div");
        result.className = "result-item";

        result.innerHTML = `
          <div class="flag">${match?.emoji || ""}</div>
          <div class="bar" style="height:${100 + percent}px">
            <div>${percent}%</div>
            <div>${match?.name || item.country_id}</div>
          </div>
        `;
        resultContainer.appendChild(result);
      });
  } catch (e) {
    console.error("Fehler beim Abrufen der Daten", e);
  }
}

window.addEventListener("DOMContentLoaded", getResults);

fetch('countries.json')
  .then((res) => res.json())
  .then((countries) => {
    const container = document.getElementById('emoji-container');
    const shuffled = countries.sort(() => 0.5 - Math.random()).slice(0, 20);

    shuffled.forEach((country) => {
      const img = document.createElement('img');
      img.className = 'floating-emoji';
      img.src = country.image;
      img.alt = country.code;

      img.style.top = `${Math.random() * 90}%`;
      img.style.left = `${Math.random() * 90}%`;
      img.style.animationDuration = `${20 + Math.random() * 20}s`; // z. B. 20–40 Sekunden
      img.style.animationDelay = `${Math.random() * 10}s`; // z. B. 0–10 Sekunden

      container.appendChild(img);
    });
  });