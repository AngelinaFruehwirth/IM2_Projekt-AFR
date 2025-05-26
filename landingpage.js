
    function isInputValid(input) {
      const bannedWords = ["test","testen", "xyz", "abcd", "123", "1234", "12345", "fuck", "shit", "spam", "scheisse"];
      const cleaned = input.trim().toLowerCase();
      return cleaned.length >= 2 && !bannedWords.includes(cleaned);
    }

    document.getElementById("search-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const input = document.getElementById("name-input").value;
      const errorMsg = document.getElementById("error-msg");

      if (!isInputValid(input)) {
        errorMsg.textContent = "Bitte gib einen gültigen Nachnamen ein.";
      } else {
        errorMsg.textContent = "";
        window.location.href = `results.html?name=${encodeURIComponent(input)}`;
      }
    });


    fetch("countries.json")
      .then((res) => res.json())
      .then((countries) => {
        const container = document.getElementById("emoji-container");
        const shuffled = countries.sort(() => 0.5 - Math.random()).slice(0, 20);
        shuffled.forEach((country) => {
          const img = document.createElement("img");
          img.className = "floating-emoji";
          img.src = country.image;
          img.alt = country.code;
          img.style.top = `${Math.random() * 90}%`;
          img.style.left = `${Math.random() * 90}%`;
          container.appendChild(img);
        });
      });


