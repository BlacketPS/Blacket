var sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

var spamOpenBox = async () => {
let boxName = prompt('Which box would you like to open? Please do not include "box" after the name.');
let currentTokens = document.getElementById("tokensText").innerHTML;
let amountToOpen = prompt(`How many boxes would you like to open? You currently have ${currentTokens} tokens.`);
alert('Check your console to see what blooks you get.');
i = 0;
for (let i = 0; i <= amountToOpen; i++) {
await sleep(550);
openBox(boxName);
}
alert("Done opening boxes! Go check your blooks.");
window.location.reload();
}

spamOpenBox();

function openBox(boxName) {
document.getElementById("loaderScreen").style.display = "none";
var currentTokens = document.getElementById("tokensText").innerHTML
var currentTokens = currentTokens - window.currentBoxPrice;
document.getElementById("tokensText").innerHTML = currentTokens;
document.getElementById("buyMenu").style.display = "none";
var postData = 'box=' + boxName;
$.post('/worker/box/openbox.php', postData, function(data) {
if (data === "NO TOKENS") {
document.getElementById("loaderScreen").style.display = "none";
return
}
if (data === "UNAUTHORIZED") {
document.body.innerHTML = 'UNAUTHORIZED';
window.location = '/login';
}
dataSplit = data.split('|')
window.blookUnlocked = dataSplit[0];
window.blookRarity = dataSplit[1];
window.blookImage = dataSplit[2];
if (blookRarity === "Uncommon") {
console.log('%c%s', 'color: white; font-size: 25px; text-shadow: 0px 0px 15px lime;', `${blookUnlocked}`);
} else if (blookRarity === "Rare") {
console.log('%c%s', 'color: white; font-size: 25px; text-shadow: 0px 0px 15px blue;', `${blookUnlocked}`);
} else if (blookRarity === "Epic") {
console.log('%c%s', 'color: white; font-size: 25px; text-shadow: 0px 0px 15px red;', `${blookUnlocked}`);
} else if (blookRarity === "Legendary") {
console.log('%c%s', 'color: white; font-size: 25px; text-shadow: 0px 0px 15px gold;', `${blookUnlocked}`);
} else if (blookRarity === "Chroma") {
console.log('%c%s', 'color: white; font-size: 25px; text-shadow: 0px 0px 15px skyblue;', `${blookUnlocked}`);
} else if (blookRarity === "Perfect") {
console.log('%c%s', 'color: white; font-size: 25px; text-shadow: 0px 0px 15px lemonchiffon;', `${blookUnlocked}`);
} else if (blookRarity === "Mystical") {
console.log('%c%s', 'color: white; font-size: 25px; text-shadow: 0px 0px 15px plum;', `${blookUnlocked}`);
} else if (blookRarity === "Divine") {
console.log('%c%s', 'color: white; font-size: 25px; text-shadow: 0px 0px 15px violet;', `${blookUnlocked}`);
} else if (blookRarity === undefined) {
}
var blookUnlockedUser = window.blookUnlocked.replace(' ', '');
$.get(`/worker/blook/getuserblook.php?blook=${blookUnlockedUser}`, function(data) {
if (data - 1 < 1) {
document.getElementById("newBlookText").innerHTML = "NEW BLOOK";
} else {
document.getElementById("newBlookText").innerHTML = "";
}
});
updateTokens();
});
}