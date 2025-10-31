console.clear();

const TEXT = document.querySelector(".text");
const VERSE = document.querySelector(".verse");
const GO_BTN = document.querySelector("#goBtn");

const VERSE_INPUT = document.querySelector("#verse");
const CHAPTER_INPUT = document.querySelector("#chapter");

let al = false;

// Get verse function
const getVerse = (ch, verse) => {
  // Fetch the specified verse
  fetch(`https://bible-api.com/${ch}+${verse}?translation=kjv`)
    // Converts to JSON
    .then((res) => res.json())
    .then((text) => {
      if (text.text != undefined) {
        TEXT.innerText = text.text;
        VERSE.innerText = `${ch} ${verse}`;
      } else {
        // If it's not a valid verse
        swal("Error", "Please enter a valid value", "warning");
      }
    });
};

getVerse("Genesis", "1:1");

GO_BTN.addEventListener("click", () => {
  getVerse(CHAPTER_INPUT.value, VERSE_INPUT.value);
});

VERSE_INPUT.addEventListener("click", () => {
  if (al == false) {
    swal(
      "How-To",
      "\n[1:1] - Single verse\n\n[1:1-3] - Range of verses in one chapter\n\n[1] - Single chapter\n\n[1-3] - Range of chapters",
      "info",
      {
        buttons: ["Cancel", "Got it!"],
        dangerMode: true
      }
    ).then((show) => {
      if (show) al = true;
    });
  }
});