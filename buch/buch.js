let pageAddress = {
  galaxy: "",
  star: "",
  planet: -1,
  building: "",
  floor: -1,
  room: -1,
  shelf: -1,
  book: -1,
  page: -1,
};

const $ = (id) => document.getElementById(id);
const $$ = (q) => document.querySelector(q);
const $$$ = (q) => document.querySelectorAll(q);

function Init() {
  InitPageAddress();
  InitRandomizeButtons();
}

$("galaxy-name").addEventListener("input", () => {
  SetGalaxyName($("galaxy-name").value);
});

$$("#galaxy-input-container .next").addEventListener("click", () => {
  SetGalaxyName(
    $("galaxy-name")
      .value.split("\n")
      .join("")
      .padEnd(PAGE_LENGTH - 19, " ")
  );

  $("galaxy-input-container").classList.add("hidden");
  UpdatePath("galaxy");
  InitInputs("star");
});

$$("#star-input-container .next").addEventListener("click", () => {
  for (let i = 0; i < 6; i++)
    pageAddress.star += $$$("#star-input input")[i].value.padStart(1, " ");

  $("star-input-container").classList.add("hidden");
  UpdatePath("star");
  InitInputs("planet");
});

$$("#planet-input-container .next").addEventListener("click", () => {
  const num =
    10 * parseInt($$$("#planet-input input")[0].value.padStart(1, "0")) +
    1 * parseInt($$$("#planet-input input")[1].value.padStart(1, "0"));

  if (num < 81 && !isNaN(num)) pageAddress.planet = num;
  else return;

  $("planet-input-container").classList.add("hidden");
  UpdatePath("planet");
  InitInputs("building");
});

$$("#building-input-container .next").addEventListener("click", () => {
  for (let i = 0; i < 6; i++)
    pageAddress.building += $$$("#building-input input")[i].value.padStart(
      1,
      " "
    );

  $("building-input-container").classList.add("hidden");
  UpdatePath("building");
  InitInputs("floor");
});

$$("#floor-input-container .next").addEventListener("click", () => {
  const num =
    10 * parseInt($$$("#floor-input input")[0].value.padStart(1, "0")) +
    1 * parseInt($$$("#floor-input input")[1].value.padStart(1, "0"));

  if (num < 81 && !isNaN(num)) pageAddress.floor = num;
  else return;

  $("floor-input-container").classList.add("hidden");
  UpdatePath("floor");
  InitInputs("room");
});

$$("#room-input-container .next").addEventListener("click", () => {
  const num =
    10 * parseInt($$$("#room-input input")[0].value.padStart(1, "0")) +
    1 * parseInt($$$("#room-input input")[1].value.padStart(1, "0"));

  if (num < 81 && !isNaN(num)) pageAddress.room = num;
  else return;

  $("room-input-container").classList.add("hidden");
  UpdatePath("room");
  InitInputs("shelf");
});

$$("#shelf-input-container .next").addEventListener("click", () => {
  const num =
    10 * parseInt($$$("#shelf-input input")[0].value.padStart(1, "0")) +
    1 * parseInt($$$("#shelf-input input")[1].value.padStart(1, "0"));

  if (num < 81 && !isNaN(num)) pageAddress.shelf = num;
  else return;

  $("shelf-input-container").classList.add("hidden");
  UpdatePath("shelf");
  InitInputs("book");
});

$$("#book-input-container .next").addEventListener("click", () => {
  const num =
    1000 * parseInt($$$("#book-input input")[0].value.padStart(1, "0")) +
    100 * parseInt($$$("#book-input input")[1].value.padStart(1, "0")) +
    10 * parseInt($$$("#book-input input")[2].value.padStart(1, "0")) +
    1 * parseInt($$$("#book-input input")[3].value.padStart(1, "0"));

  if (num < 6561 && !isNaN(num)) pageAddress.book = num;
  else return;

  $("shelf-input-container").classList.add("hidden");
  $("book-input-container").classList.remove("hidden");

  UpdatePath("book");

  let pageName = "";
  pageName += pageAddress.galaxy;
  pageName += pageAddress.star;
  pageName += ALPHABET[pageAddress.planet];
  pageName += pageAddress.building;
  pageName += ALPHABET[pageAddress.floor];
  pageName += ALPHABET[pageAddress.room];
  pageName += ALPHABET[pageAddress.shelf];
  pageName += ALPHABET[Math.floor(pageAddress.book / 81)];
  pageName += ALPHABET[pageAddress.book % 81];
  pageName += "~";

  const pageLink = GetLink(pageName);

  location.href = location.href.split("?")[0] + "?" + pageLink;

  $("book-input-container").classList.add("hidden");
  $("page-input-container").classList.remove("hidden");
  $("content-container").classList.remove("hidden");
  $("navigate").classList.remove("hidden");
});

function SetGalaxyName(text) {
  text = text.split("\n").join("");

  if (text.length > PAGE_LENGTH - 19)
    text = text.substring(0, PAGE_LENGTH - 19);

  let formatted = "";

  for (let i = 0; i < text.length; i++) {
    if (ALPHABET.includes(text[i])) formatted += text[i];
    if (i % 81 == 80) formatted += "\n";
  }

  const raw = formatted.split("\n").join("");

  let cursor = $("galaxy-name").selectionEnd;
  cursor += Math.max(0, Math.floor(raw.length / 82) - Math.floor(pageAddress.galaxy.length / 82));

  $("galaxy-name").value = formatted;
  $("galaxy-name").selectionEnd = cursor

  pageAddress.galaxy = formatted.split("\n").join("");
}

function InitRandomizeButtons() {
  $$("#galaxy-input-container .random").addEventListener("click", () => {
    SetGalaxyName(ran());
  });

  $$("#star-input-container .random").addEventListener("click", () => {
    for (let i = 0; i < 6; i++)
      $$$("#star-input input")[i].value = ALPHABET.random();
    $$("#star-input-container .next").focus();
  });

  $$("#planet-input-container .random").addEventListener("click", () => {
    const num = Math.floor(Math.random() * 81);
    const str = num.toString().padStart(2, "0");
    $$$("#planet-input input")[0].value = str[0];
    $$$("#planet-input input")[1].value = str[1];
    $$("#planet-input-container .next").focus();
  });

  $$("#building-input-container .random").addEventListener("click", () => {
    for (let i = 0; i < 6; i++)
      $$$("#building-input input")[i].value = ALPHABET.random();
    $$("#building-input-container .next").focus();
  });

  $$("#floor-input-container .random").addEventListener("click", () => {
    const num = Math.floor(Math.random() * 81);
    const str = num.toString().padStart(2, "0");
    $$$("#floor-input input")[0].value = str[0];
    $$$("#floor-input input")[1].value = str[1];
    $$("#floor-input-container .next").focus();
  });

  $$("#room-input-container .random").addEventListener("click", () => {
    const num = Math.floor(Math.random() * 81);
    const str = num.toString().padStart(2, "0");
    $$$("#room-input input")[0].value = str[0];
    $$$("#room-input input")[1].value = str[1];
    $$("#room-input-container .next").focus();
  });

  $$("#shelf-input-container .random").addEventListener("click", () => {
    const num = Math.floor(Math.random() * 81);
    const str = num.toString().padStart(2, "0");
    $$$("#shelf-input input")[0].value = str[0];
    $$$("#shelf-input input")[1].value = str[1];
    $$("#shelf-input-container .next").focus();
  });

  $$("#book-input-container .random").addEventListener("click", () => {
    const num = Math.floor(Math.random() * 6561);
    const str = num.toString().padStart(4, "0");
    $$$("#book-input input")[0].value = str[0];
    $$$("#book-input input")[1].value = str[1];
    $$$("#book-input input")[2].value = str[2];
    $$$("#book-input input")[3].value = str[3];
    $$("#book-input-container .next").focus();
  });
}

function InitInputs(part, filled = false) {
  let address = filled ? GetName(location.href.split("?")[1]) : "";

  if (part == "galaxy") {
    $("galaxy-input-container").classList.remove("hidden");
    SetGalaxyName(address.substring(0, PAGE_LENGTH - 19));
  } else if (["star", "building"].includes(part)) {
    $(`${part}-input-container`).classList.remove("hidden");

    let name = "";
    if (filled) name = address.substring(address.length - 6);

    const inputs = $$$(`#${part}-input input`);

    for (let i = 0; i < inputs.length; i++) {
      if (filled) inputs[i].value = name[i];
      inputs[i].addEventListener("focusin", () => inputs[i].select());
      inputs[i].addEventListener("input", () => {
        if (!ALPHABET.includes(inputs[i].value)) inputs[i].value = "";
        else {
          if (inputs[i].value.length == 1) {
            if (i < inputs.length - 1) inputs[i + 1].focus();
            else $$(`#${part}-input-container .next`).focus();
          }
        }
      });
    }

    inputs[0].focus();
  } else if (["planet", "floor", "room", "shelf"].includes(part)) {
    $(`${part}-input-container`).classList.remove("hidden");

    const number = filled
      ? ALPHABET.indexOf(address[address.length - 1])
          .toString()
          .padStart(2, "0")
      : "";
    const inputs = $$$(`#${part}-input input`);

    for (let i = 0; i < inputs.length; i++) {
      if (filled) inputs[i].value = number[i];
      inputs[i].addEventListener("focusin", () => inputs[i].select());
      inputs[i].addEventListener("input", () => {
        if (i == 0) {
          if (isNaN(parseInt(inputs[0].value)) || parseInt(inputs[0].value) > 8)
            inputs[0].value = "";
          else {
            if (parseInt(inputs[0].value) == 8) inputs[1].value = "0";
            inputs[1].focus();
          }
        } else {
          if (
            isNaN(parseInt(inputs[1].value)) ||
            (inputs[0].value == "8" && parseInt(inputs[1].value) > 0)
          )
            inputs[1].value = "";
          else $$(`#${part}-input-container .next`).focus();
        }
      });
    }

    inputs[0].focus();
  } else if (part == "book") {
    $("book-input-container").classList.remove("hidden");

    let number = "";
    if (filled) {
      const str = address.substring(address.length - 2);
      number = (81 * ALPHABET.indexOf(str[0]) + ALPHABET.indexOf(str[1]))
        .toString()
        .padStart(4, "0");
    }
    const inputs = $$$("#book-input input");

    for (let i = 0; i < inputs.length; i++) {
      if (filled) inputs[i].value = number[i];
      inputs[i].addEventListener("focusin", () => inputs[i].select());
      inputs[i].addEventListener("input", () => {
        if (isNaN(parseInt(inputs[i].value))) return (inputs[i].value = "");

        if (i == 0) {
          if (parseInt(inputs[0].value) > 6) inputs[0].value = "";
          else inputs[1].focus();
          return;
        }

        if (i == 1) {
          if (inputs[0].value == "6" && parseInt(inputs[1].value) > 5)
            inputs[1].value = "";
          else inputs[2].focus();
          return;
        }

        if (i == 2) {
          if (
            inputs[0].value + inputs[1].value == "65" &&
            parseInt(inputs[2].value) > 6
          )
            inputs[2].value = "";
          else {
            if (inputs[0].value + inputs[1].value + inputs[2].value == "656")
              inputs[3].value = "0";
            inputs[3].focus();
          }
          return;
        }

        if (i == 3) {
          if (
            inputs[0].value + inputs[1].value + inputs[2].value == "656" &&
            parseInt(inputs[3].value) > 0
          )
            inputs[3].value = "";
          else $$("#book-input-container .next").focus();
        }
      });
    }

    inputs[0].focus();
  }
}

function InitPageAddress() {
  if (location.href.split("?").length == 1)
    return $("galaxy-input-container").classList.remove("hidden");

  const pageName = GetName(location.href.split("?")[1]);

  if (pageName.length == 0)
    return $("galaxy-input-container").classList.remove("hidden");

  if (pageName.length >= PAGE_LENGTH - 19) {
    $("galaxy-input-container").classList.add("hidden");
  } else return;

  if (pageName.length >= PAGE_LENGTH - 13) {
    pageAddress.galaxy = pageName.substring(0, PAGE_LENGTH - 19);
    $("star-input-container").classList.add("hidden");
    UpdatePath("galaxy");
  } else return InitInputs("galaxy", true);

  if (pageName.length >= PAGE_LENGTH - 12) {
    pageAddress.star = pageName.substring(PAGE_LENGTH - 19, PAGE_LENGTH - 13);
    $("planet-input-container").classList.add("hidden");
    UpdatePath("star");
  } else return InitInputs("star", true);

  if (pageName.length >= PAGE_LENGTH - 6) {
    pageAddress.planet = ALPHABET.indexOf(pageName[PAGE_LENGTH - 13]);
    $("building-input-container").classList.add("hidden");
    UpdatePath("planet");
  } else return InitInputs("planet", true);

  if (pageName.length >= PAGE_LENGTH - 5) {
    pageAddress.building = pageName.substring(
      PAGE_LENGTH - 12,
      PAGE_LENGTH - 6
    );
    $("floor-input-container").classList.add("hidden");
    UpdatePath("building");
  } else return InitInputs("building", true);

  if (pageName.length >= PAGE_LENGTH - 4) {
    pageAddress.floor = ALPHABET.indexOf(pageName[PAGE_LENGTH - 6]);
    $("room-input-container").classList.add("hidden");
    UpdatePath("floor");
  } else return InitInputs("floor", true);

  if (pageName.length >= PAGE_LENGTH - 3) {
    pageAddress.room = ALPHABET.indexOf(pageName[PAGE_LENGTH - 5]);
    $("shelf-input-container").classList.add("hidden");
    UpdatePath("room");
  } else return InitInputs("room", true);

  if (pageName.length >= PAGE_LENGTH - 2) {
    pageAddress.shelf = ALPHABET.indexOf(pageName[PAGE_LENGTH - 4]);
    $("book-input-container").classList.add("hidden");
    UpdatePath("shelf");
  } else return InitInputs("shelf", true);

  if (pageName.length >= PAGE_LENGTH) {
    pageAddress.book =
      81 * ALPHABET.indexOf(pageName[PAGE_LENGTH - 3]) +
      1 * ALPHABET.indexOf(pageName[PAGE_LENGTH - 2]);
    $("content-container").classList.remove("hidden");
    UpdatePath("book");

    if (pageName[pageName.length - 1] != "~") {
      pageAddress.page = ALPHABET.indexOf(pageName[PAGE_LENGTH - 1]);
      $("page-input").value = pageAddress.page.toString().padStart(2, "0");
      MakePageContent();
    } else {
      $("page-input").value = "-1";
      MakeCover();
    }

    InitNavigation();
    InitPageInput();
  } else return InitInputs("book", true);
}

function UpdatePath(part) {
  $(part + "-path").classList.remove("hidden");

  switch (part) {
    case "galaxy":
      const galaxyName = pageAddress.galaxy;
      const len = galaxyName.length;
      $("galaxy-path").innerHTML +=
        " " +
        replaceHTML(galaxyName.substring(0, 10)) +
        "..." +
        replaceHTML(galaxyName.substring(len - 10)) +
        " >>";

      $("galaxy-path").href =
        location.href.split("?")[0] + "?" + GetLink(pageAddress.galaxy);
      break;

    case "star":
      $("star-path").innerHTML +=
        " " + replaceHTML(pageAddress.star) + " >>";

      $("star-path").href =
        location.href.split("?")[0] +
        "?" +
        GetLink(pageAddress.galaxy + pageAddress.star);
      break;

    case "planet":
      $("planet-path").innerHTML +=
        " " + pageAddress.planet.toString().padStart(2, "0") + " >>";

      $("planet-path").href =
        location.href.split("?")[0] +
        "?" +
        GetLink(
          pageAddress.galaxy + pageAddress.star + ALPHABET[pageAddress.planet]
        );

      break;

    case "building":
      $("building-path").innerHTML +=
        " " + replaceHTML(pageAddress.building) + " >>";

      $("building-path").href =
        location.href.split("?")[0] +
        "?" +
        GetLink(
          pageAddress.galaxy +
            pageAddress.star +
            ALPHABET[pageAddress.planet] +
            pageAddress.building
        );

      break;

    case "floor":
      $("floor-path").innerHTML +=
        " " + pageAddress.floor.toString().padStart(2, "0") + " >>";

      $("floor-path").href =
        location.href.split("?")[0] +
        "?" +
        GetLink(
          pageAddress.galaxy +
            pageAddress.star +
            ALPHABET[pageAddress.planet] +
            pageAddress.building +
            ALPHABET[pageAddress.floor]
        );
      break;

    case "room":
      $("room-path").innerHTML +=
        " " + pageAddress.room.toString().padStart(2, "0") + " >>";

      $("room-path").href =
        location.href.split("?")[0] +
        "?" +
        GetLink(
          pageAddress.galaxy +
            pageAddress.star +
            ALPHABET[pageAddress.planet] +
            pageAddress.building +
            ALPHABET[pageAddress.floor] +
            ALPHABET[pageAddress.room]
        );
      break;

    case "shelf":
      $("shelf-path").innerHTML +=
        " " + pageAddress.shelf.toString().padStart(2, "0") + " >>";

      $("shelf-path").href =
        location.href.split("?")[0] +
        "?" +
        GetLink(
          pageAddress.galaxy +
            pageAddress.star +
            ALPHABET[pageAddress.planet] +
            pageAddress.building +
            ALPHABET[pageAddress.floor] +
            ALPHABET[pageAddress.room] +
            ALPHABET[pageAddress.shelf]
        );
      break;

    case "book":
      $("book-path").innerHTML +=
        " " + pageAddress.book.toString().padStart(4, "0") + " >>";

      $("book-path").href =
        location.href.split("?")[0] +
        "?" +
        GetLink(
          pageAddress.galaxy +
            pageAddress.star +
            ALPHABET[pageAddress.planet] +
            pageAddress.building +
            ALPHABET[pageAddress.floor] +
            ALPHABET[pageAddress.room] +
            ALPHABET[pageAddress.shelf] +
            ALPHABET[Math.floor(pageAddress.book / 81)] +
            ALPHABET[pageAddress.book % 81]
        );
      break;
  }
}

function InitPageInput() {
  $("page-input-container").classList.remove("hidden");
  $("page-input").addEventListener("focusin", () => {
    $("page-input").select();
  });
  $("page-input").addEventListener("change", () => {
    const p = parseInt($("page-input").value);
    if (isNaN(p) || p > 80 || p < -1) return;

    let newUrl = location.href.slice(0, location.href.length - 2);

    if (p == -1) newUrl += "~~";
    else newUrl += p.toString(9).padStart(2, "0");

    location.href = newUrl;
  });
}

function InitNavigation() {
  const url = location.href;
  if (url.split("?")[1].length < PAGE_LENGTH) return;

  $("navigate").classList.remove("hidden");

  $("to-cover").href = url.slice(0, url.length - 2) + "~~";
  $("to-end").href = url.slice(0, url.length - 2) + "88";

  let num = url.substring(url.length - 2);
  if (num == "~~") num = "-1";
  num = parseInt(num, 9);

  if (pageAddress.page == -1) $("to-prev").href = url;
  else if (pageAddress.page == 0)
    $("to-prev").href = url.substring(0, url.length - 2) + "~~";
  else
    $("to-prev").href =
      url.slice(0, url.length - 2) + (num - 1).toString(9).padStart(2, "0");

  if (pageAddress.page == 80) $("to-next").href = url;
  else
    $("to-next").href =
      url.slice(0, url.length - 2) + (num + 1).toString(9).padStart(2, "0");
}

function MakePageContent() {
  if (pageAddress.page == -1) return MakeCover();

  const pageName = GetName(location.href.split("?")[1]);
  const pageContent = Content(pageName);

  let text = "";
  for (let i = 0; i < pageContent.length; i++) {
    text += replaceHTML(pageContent[i]);
    if (i % 81 == 80) text += "\n";
  }

  $("content").innerHTML = text;
}

function MakeCover() {
  $("cover").classList.remove("hidden");
  $("content").classList.add("hidden");

  const bookName = GetName(location.href.split("?")[1]);
  let text = "";
  for (let i = 0; i < bookName.length; i++) {
    text += replaceHTML(bookName[i]);
    if (i % 81 == 80) text += "\n";
  }

  $$("#cover p").innerHTML = text;
}

Init();