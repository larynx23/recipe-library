const receiptName = new URLSearchParams(window.location.search).get("name");
const toMainPage = () => window.location.replace(window.location.origin + window.location.pathname.replace("receipt.html", "index.html"));
let receipt;
if (!receiptName) {
  toMainPage();
} else {
  receipt = receiptData[receiptName];
  if (!receipt) {toMainPage();}
}