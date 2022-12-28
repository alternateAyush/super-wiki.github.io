const publicKey = "8b1cb8c10d30cb2c35d692ed4443de1d";
// const publicKey = "e0833ff3614ccd2e5cc45846e5dea799";
const privateKey = "1177006cf0d82a0537b047de61b01eef0cc27e7b";
// const privateKey = "ce478785cb35b9a5016a860498a5e04e8b7af6ad";
const queryHead = "https://gateway.marvel.com/v1/public/";

function getTimeHash() {
  var date = new Date();
  var ts = date.getTime();
  var hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
  return `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
}
