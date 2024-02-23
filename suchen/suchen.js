const $ = (id) => document.getElementById(id);
const $$ = (q) => document.querySelector(q);
const $$$ = (q) => document.querySelectorAll(q);

let prevValue = "";

$("search").addEventListener("input", () => {
  let text = $("search").value.split("\n").join("");

  if (text.length > PAGE_LENGTH) text = text.substring(0, PAGE_LENGTH);

  let formatted = "";

  for (let i = 0; i < text.length; i++) {
    if (ALPHABET.includes(text[i])) formatted += text[i];
    if (i % 81 == 80 && i < PAGE_LENGTH - 1) formatted += "\n";
  }

  const raw = formatted.split("\n").join("");

  let cursor = $("search").selectionEnd;
  cursor += Math.max(0, Math.floor(raw.length / 82) - Math.floor(prevValue.length / 82));

  $("search").value = formatted;
  $("search").selectionEnd = cursor;

  prevValue = raw;
});

$$("#search-container button").addEventListener("click", ShowResults);

function ShowResults() {
  ClearResults();
  const content = $("search").value.split("\n").join("");

  ShowExactMatch(content);
  if (content.length < PAGE_LENGTH) ShowOtherMatches(content);
  else $("other").classList.add("hidden");
}

function ClearResults() {
  let exact = $$("#exact .result");
  if (exact != null) exact.remove();

  let others = $$$("#other .result");
  for (let i = 0; i < others.length; i++) others[i].remove();
}

function ShowExactMatch(content) {
  const page = Page(content);

  $("results-container").classList.remove("hidden");
  CreateSearchResult(page, "exact");
}

function ShowOtherMatches(rawContent) {
  const num = 10;

  for (let i = 0; i < num; i++) {
    const content = FillRandom(rawContent);
    const page = Page(content);

    $("results-container").classList.remove("hidden");
    CreateSearchResult(page, "other");
  }
}

function CreateSearchResult(page, container) {
  const result = document.createElement("div");
  result.classList.add("result");
  $(container).append(result);

  const link = document.createElement("a");
  result.append(link);
  link.href = "../buch/index.html?" + GetLink(page);
  link.innerHTML =
    replaceHTML(page.substring(0, 20)) +
    "..." +
    replaceHTML(page.substring(PAGE_LENGTH - 20));
}

function FillRandom(raw) {
  const start = Math.floor(Math.random() * (PAGE_LENGTH - raw.length));
  let content = "";

  for (let i = 0; i < PAGE_LENGTH; i++) {
    if (i < start || i >= start + raw.length) content += ALPHABET[Math.floor(Math.random() * 81)];
    else content += raw[i - start];
  }

  return content;
}
