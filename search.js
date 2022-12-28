// const publicKey = "8b1cb8c10d30cb2c35d692ed4443de1d";
// const privateKey = "1177006cf0d82a0537b047de61b01eef0cc27e7b";
// const queryHead = "http://gateway.marvel.com/v1/public/";
//-----------------------------------------------------------
var searchBtn = document.getElementById("search-btn");
var searchInput = document.getElementById("search-input");
var searchHint = document.getElementById("search-hint");

// function getTimeHash() {
//   var date = new Date();
//   var ts = date.getTime();
//   var hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
//   return `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
// }

function setCharId(event) {
  console.log(event.target.getAttribute("data-id"));
  localStorage.setItem("character_id",event.target.getAttribute("data-id"));
  window.open("character.html");
}

function getSearchHints() {
  console.log(searchInput.value);
  searchHint.replaceChildren();
  if (searchInput.value == "") {
    return;
  }
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    if (response.code != 200) {
      console.log("hell");
      return;
    }
    var charArr = response.data.results;
    console.log(response);
    for (var i = 0; i < charArr.length; i++) {
      var comicChar = charArr[i];
      var name = comicChar.name;
      console.log(name);
     
      var searchRes = document.createElement('p');
      searchRes.innerText = name;
      searchRes.classList.add("search-result");
      searchRes.setAttribute("data-id",comicChar.id);
      searchRes.addEventListener('click',setCharId)
      searchHint.appendChild(searchRes);
    }
  };
  console.log(
    `${queryHead}characters?nameStartsWith=${
      searchInput.value
    }&${getTimeHash()}`
  );
  xhrRequest.open(
    "get",
    `${queryHead}characters?nameStartsWith=${
      searchInput.value
    }&orderBy=modified&limit=5&${getTimeHash()}`,
    true
  );
  xhrRequest.send();
}
