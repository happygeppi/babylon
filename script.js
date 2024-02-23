const PAGE_LENGTH = 3240; // 81 * 40
const NUM_ROUNDS = 5;

const NUM_CUBES = (PAGE_LENGTH * 2) / 81; // #cube = #char * 2nits/char / 81nits/cube

function Content(page) {
  if (page.length < PAGE_LENGTH) page = fill(page);
  return Alphabetize(Encrypt(Nits(page)));
}

function Page(content) {
  if (content.length < PAGE_LENGTH) content = fill(content);
  return Alphabetize(Decrypt(Nits(content)));
}

function Encrypt(nits) {
  for (let round = 0; round < NUM_ROUNDS; round++) {
    for (let cube = 0; cube < NUM_CUBES; cube++)
      nits[cube] = Sub(Rotate(Sub(Rotate(Sub(Rotate(Sub(nits[cube])))))));
    nits = ShuffleCubes(nits);
  }

  return OneDimension(nits);
}

function Decrypt(nits) {
  for (let round = 0; round < NUM_ROUNDS; round++) {
    nits = unShuffleCubes(nits);
    for (let cube = 0; cube < NUM_CUBES; cube++)
      nits[cube] = unSub(
        unRotate(unSub(unRotate(unSub(unRotate(unSub(nits[cube]))))))
      );
  }

  return OneDimension(nits);
}

function Sub(cube) {
  const subbed = [];

  for (let k = 0; k < 3; k++) {
    subbed.push([]);
    for (let j = 0; j < 3; j++) {
      subbed[k].push([]);
      for (let i = 0; i < 3; i++) subbed[k][j][i] = SUBBOX[cube[k][j][i]];
    }
  }

  return subbed;
}

function unSub(subbed) {
  const cube = [];

  for (let k = 0; k < 3; k++) {
    cube.push([]);
    for (let j = 0; j < 3; j++) {
      cube[k].push([]);
      for (let i = 0; i < 3; i++) cube[k][j][i] = unSUBBOX[subbed[k][j][i]];
    }
  }

  return cube;
}

function Rotate(cube) {
  const rotated = [];

  for (let k = 0; k < 3; k++) {
    rotated[k] = [];
    for (let j = 0; j < 3; j++) {
      rotated[k][j] = [];
      for (let i = 0; i < 3; i++) {
        rotated[k][j][i] = "";
        for (let h = 0; h < 3; h++) {
          rotated[k][j][i] += cube[h][k][j][i];
        }
      }
    }
  }

  return rotated;
}

function unRotate(rotated) {
  const cube = [];

  for (let k = 0; k < 3; k++) {
    cube[k] = [];
    for (let j = 0; j < 3; j++) {
      cube[k][j] = [];
      for (let i = 0; i < 3; i++) {
        cube[k][j][i] = "";
        for (let h = 0; h < 3; h++) {
          cube[k][j][i] += rotated[j][i][h][k];
        }
      }
    }
  }

  return cube;
}

function ShuffleCubes(nits) {
  const nitString = OneDimension(nits);

  const nitList = [];
  for (let i = 0; i < NUM_CUBES; i++) nitList[i] = "";
  for (let i = 0; i < nitString.length; i++)
    nitList[i % NUM_CUBES] += nitString[i];

  const shuffled = [];

  for (let cube = 0; cube < NUM_CUBES; cube++) {
    shuffled[cube] = [];
    for (let k = 0; k < 3; k++) {
      shuffled[cube][k] = [];
      for (let j = 0; j < 3; j++) {
        shuffled[cube][k][j] = [];
        for (let i = 0; i < 3; i++) {
          const index = GetIndex(0, k, j, i);
          shuffled[cube][k][j][i] = nitList[cube].slice(index, index + 3);
        }
      }
    }
  }

  return shuffled;
}

function unShuffleCubes(shuffled) {
  const shuffledNitList = [];
  for (let i = 0; i < NUM_CUBES; i++) shuffledNitList[i] = "";

  for (let cube = 0; cube < NUM_CUBES; cube++)
    for (let k = 0; k < 3; k++)
      for (let j = 0; j < 3; j++)
        for (let i = 0; i < 3; i++)
          shuffledNitList[cube] += shuffled[cube][k][j][i];

  let nitString = "";
  for (let index = 0; index < 81; index++)
    for (let cube = 0; cube < NUM_CUBES; cube++)
      nitString += shuffledNitList[cube][index];

  const unshuffled = [];

  for (let cube = 0; cube < NUM_CUBES; cube++) {
    unshuffled[cube] = [];
    for (let k = 0; k < 3; k++) {
      unshuffled[cube][k] = [];
      for (let j = 0; j < 3; j++) {
        unshuffled[cube][k][j] = [];
        for (let i = 0; i < 3; i++) {
          const index = GetIndex(cube, k, j, i);
          unshuffled[cube][k][j][i] = nitString.slice(index, index + 3);
        }
      }
    }
  }

  return unshuffled;
}

function Alphabetize(nits) {
  let text = "";

  for (let char = 0; char < nits.length / 2; char++) {
    const charCode = nits.slice(2 * char, 2 * char + 2);
    text += ALPHABET[parseInt(charCode, 9)];
  }

  return text;
}

function OneDimension(nits) {
  let nitString = "";

  for (let cube = 0; cube < NUM_CUBES; cube++)
    for (let k = 0; k < 3; k++)
      for (let j = 0; j < 3; j++)
        for (let i = 0; i < 3; i++) nitString += nits[cube][k][j][i];

  return nitString;
}

// "nits" like bits but for 0,1,2,3,4,5,6,7,8
function Nits(text) {
  const rawNits = text
    .split("")
    .map((char) => CHARCODE[char])
    .join("");

  const nits = [];
  for (let cube = 0; cube < NUM_CUBES; cube++) {
    nits.push([]);
    for (let k = 0; k < 3; k++) {
      nits[cube].push([]);
      for (let j = 0; j < 3; j++) {
        nits[cube][k].push([]);
        for (let i = 0; i < 3; i++) {
          const index = GetIndex(cube, k, j, i);
          nits[cube][k][j][i] = rawNits.slice(index, index + 3);
        }
      }
    }
  }

  return nits;
}

function GetIndex(cube, k, j, i, h = 0) {
  return 81 * cube + 27 * k + 9 * j + 3 * i + 1 * h;
}

function ran() {
  let page = "";
  for (let i = 0; i < PAGE_LENGTH; i++)
    page += ALPHABET[Math.floor(Math.random() * 81)];
  return page;
}

function fill(text) {
  return text.padEnd(PAGE_LENGTH, " ");
}

function replaceHTML(str) {
  let text = "";
  for (const char of str) text += replaceCharHTML(char);
  return text;
}

function replaceCharHTML(char) {
  if (char == " ") return "&nbsp;";
  else if (char == "_") return "&#95;";
  else if (char == "-") return "&#45;";
  else if (char == "+") return "&#43;";
  else if (char == "*") return "&#42;";
  else if (char == "/") return "&#47;";
  else if (char == "=") return "&#61;";
  else if (char == "&") return "&amp;";
  else if (char == "'") return "&#39;";
  else if (char == "(") return "&#40;";
  else if (char == ")") return "&#41;";
  else if (char == "<") return "&lt;";
  else if (char == ">") return "&gt;";
  else if (char == "#") return "&#35;";
  else if (char == "?") return "&#63;";
  else if (char == "!") return "&#33;";
  else if (char == ":") return "&#58;";
  else if (char == ",") return "&#44;";
  else if (char == ".") return "&#46;";
  return char;
}

function GetLink(pageName) {
  let link = "";
  for (const char of pageName) link += CHARCODE[char];
  return link;
}

function GetName(pageLink) {
  let name = "";
  for (let i = 0; i < pageLink.length; i += 2) {
    let charCode = pageLink[i] + pageLink[i + 1];
    if (charCode == "~~") charCode = "100";
    charCode = parseInt(charCode, 9);
    name += ALPHABET[charCode];
  }
  return name;
}

String.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};