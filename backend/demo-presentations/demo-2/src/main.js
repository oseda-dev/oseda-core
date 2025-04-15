import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Notes from "reveal.js/plugin/notes/notes.esm.js";

import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import "../css/custom.css";

import slides from "../slides/slides.md?raw";

document.addEventListener("DOMContentLoaded", () => {
  const slidesContainer = document.querySelector(".slides");
  const section = document.createElement("section");
  section.setAttribute("data-markdown", "");
  section.setAttribute("data-separator", "^\\n---\\n");
  section.setAttribute("data-separator-vertical", "^\\n--\\n");
  section.setAttribute("data-separator-notes", "^Note:");
  section.setAttribute("data-charset", "utf-8");
  section.innerHTML = `<textarea data-template>${slides}</textarea>`;
  slidesContainer.appendChild(section);

  const deck = new Reveal({
    hash: true,
    plugins: [Markdown, Notes],
  });

  deck.initialize();
});
