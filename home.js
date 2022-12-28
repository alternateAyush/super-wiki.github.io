// first install crypto-js
// now use md5 as below

//--------------------------index.html---------------------------------

var searchBtn = document.getElementById("search-btn");
var searchInput = document.getElementById("search-input");
var homePage = document.getElementById("home-page");
var loadMoreBtn = document.getElementById("load-more-button");
var reverseLoadBtn = document.getElementById("reverse-load-button");
var modifyLoadBtn = document.getElementById("modify-load-button");
var waitSpinner = document.getElementById("wait-spinner");
var card = document.getElementsByClassName("card");

//--------------------------character.html---------------------------------

var temp = document.getElementById("temp");

console.log(getTimeHash());

function setCharId(event) {
  console.log(event.target.getAttribute("data-id"));
  localStorage.setItem("character_id",event.target.getAttribute("data-id"));
  window.open("character.html");
}

// home page loading functions--------------------------------------------------------
function characterCard(id, name, imgUrl, des) {
  const newEle = document.createElement("div");
  newEle.id = id;
  newEle.classList.add("card");
  newEle.setAttribute("data-id", id);
  newEle.innerHTML = `<i class="fa-regular fa-heart" data-id=${id}></i>
  <img src="${imgUrl}" class="card-img-top" data-id=${id} alt="${name} image"/>
  <div class="card-body" data-id=${id}>
    <h5 class="card-title" data-id=${id}>${name}</h5>
    <p class="card-text" data-id=${id}>
      ${des}
    </p>
  </div>`;
  homePage.appendChild(newEle);
  return;
}

var offset = 0;
var order = "name";
function onHomeLoad() {
  waitSpinner.style.display = "inline-block";
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    if (response.code != 200) {
      return;
    }
    var charArr = response.data.results;
    for (var i = 0; i < charArr.length; i++) {
      var comicChar = charArr[i];
      var id = comicChar.id;
      var name = comicChar.name;
      var imgUrl =
        comicChar.thumbnail.path + "." + comicChar.thumbnail.extension;
      var description = comicChar.description;
      characterCard(id, name, imgUrl, description);
    }
    offset += 20;
    waitSpinner.style.display = "none";
    for (var i = 0; i < card.length; i++) {
      card[i].addEventListener("click", setCharId);
    }
  };
  console.log(
    `${queryHead}characters?offset=${offset}&orderBy=${order}&${getTimeHash()}`
  );
  xhrRequest.open(
    "get",
    `${queryHead}characters?offset=${offset}&orderBy=${order}&${getTimeHash()}`,
    true
  );
  xhrRequest.send();
}

function changeAZOrder() {
  homePage.replaceChildren();
  offset = 0;
  if (order == "name") {
    order = "-name";
    reverseLoadBtn.innerHTML = "A-Z";
  } else {
    order = "name";
    reverseLoadBtn.innerHTML = "Z-A";
  }
  onHomeLoad();
}
function changeModifyOrder() {
  homePage.replaceChildren();
  offset = 0;
  if (order == "modified") {
    order = "-modified";
    modifyLoadBtn.innerHTML = "Newest !";
  } else {
    order = "modified";
    modifyLoadBtn.innerHTML = "Oldest !";
  }
  onHomeLoad();
}

// home page loading functions--------------------------------------------------------

function init() {
  waitSpinner.style.display = "none";
  loadMoreBtn.addEventListener("click", onHomeLoad);
  reverseLoadBtn.addEventListener("click", changeAZOrder);
  modifyLoadBtn.addEventListener("click", changeModifyOrder);
  onHomeLoad();
}
init();
// console.log(getTimeHash())
