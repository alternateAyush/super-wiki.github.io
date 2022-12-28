var body = document.getElementsByTagName("body");
var spinner = document.getElementById("wait-spinner");
var likeBtn = document.getElementById("like-btn");
var charHead = document.getElementById("character-name");
var charImage = document.getElementById("character-image");
var charDescript = document.getElementById("character-description");

var seriesList = document.getElementById("series-list");
var characterId;
var flag = false;

function addToFavourite() {
  flag = !flag;
  if (flag) {
    likeBtn.style.color = "rgb(230,36,41)";
  } else {
    likeBtn.style.color = "white";
  }
}

function loadImage(img, url) {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    if (response.code != 200) {
      img.src = "#";
      return;
    }
    var comicImg = response.data.results[0].thumbnail;
    img.src = `${comicImg.path}.${comicImg.extension}`;
    return;
  };
  xhrRequest.open("get", `${url}?${getTimeHash()}`, true);
  xhrRequest.send();
  return;
}

function makeEventsList(url) {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    if (response.code != 200) {
      return;
    }
  };
  xhrRequest.open("get");
}

function makeCard(Comic, id) {
  var List = document.getElementById(id);
  var comicItemImg = Comic.thumbnail.path + "." + Comic.thumbnail.extension;
  var comic = document.createElement("div");
  comic.classList.add("card");
  comic.classList.add("comic-card");
  var img = document.createElement("img");
  img.classList.add("list-item-img");
  img.classList.add("card-img-top");
  img.src = comicItemImg;
  img.alt = "comic-img";
  var cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  var cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = Comic.title;
  cardBody.appendChild(cardTitle);
  if (id == "events-container") {
    var des = document.createElement("p");
    des.classList.add("card-text");
    des.innerText = Comic.description;
    cardBody.appendChild(des);
  }
  comic.appendChild(img);
  comic.appendChild(cardBody);
  List.appendChild(comic);
}

function loadCard(url,card) {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    if (response.code != 200) {
      return;
    }
    var Comic = response.data.results;
    var n=Math.min(10,Comic.length);
    for (var i = 0; i < n; i++) {
      makeCard(Comic[i], card);
    }
  };
  console.log(`${url}?${getTimeHash()}`);
  xhrRequest.open("get", `${url}?${getTimeHash()}`, true);
  xhrRequest.send();
  return;
}


function loadCharacter() {
  spinner.style.display = "inline-block";
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    if (response.code != 200) {
      console.log("error: ", response.code);
      return;
    }
    var charDetails = response.data.results[0];
    document.title = charDetails.name;
    charHead.innerText = charDetails.name;
    charImage.src =
      charDetails.thumbnail.path + "." + charDetails.thumbnail.extension;
    charDescript.innerText = charDetails.description;
    //------------------------------------------------------
    loadCard(`${queryHead}characters/comics/${characterID}`,"comics-container")
    loadCard(`${queryHead}characters/series/${characterID}`,"series-container")
    loadCard(`${queryHead}characters/events/${characterID}`,"events-container")
    //------------------------------------------------------
    // makeEventsList(charDetails.events.collectionURI);
    //------------------------------------------------------
    spinner.style.display = "none";
    return;
  };
  console.log(`${queryHead}characters/${characterId}?${getTimeHash()}`);
  xhrRequest.open(
    "get",
    `${queryHead}characters/${characterId}?${getTimeHash()}`,
    true
  );
  xhrRequest.send();
}

function init() {
  characterId = localStorage.getItem("character_id");
  loadCharacter();
  likeBtn.addEventListener("click", addToFavourite);
}
init();
