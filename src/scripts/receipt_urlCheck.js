const receiptName = new URLSearchParams(window.location.search).get("name");
const toMainPage = () => window.location.replace(window.location.origin + window.location.pathname.replace("receipt.html", "index.html"));
if (!receiptName) {
  toMainPage();
} else {
  const receipt = receiptData[receiptName];
  if (!receipt) {toMainPage();}
}