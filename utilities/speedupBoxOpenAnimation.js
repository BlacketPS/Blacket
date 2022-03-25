$('<style>', {
    id: `cssInject`
}).appendTo('#app');

document.getElementById("cssInject").innerHTML = `.styles__mysteryBoxContainerOpen___39AUK-camelCase{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:300px;height:270px;padding-bottom:30px;display:flex;justify-content:center;align-items:center;box-shadow:0 0 8px 3px rgba(0,0,0,.2);font-family:Titan One,sans-serif;color:#fff;font-size:225px;border-radius:7%;background-color:#0bc2cf;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:none;opacity:0;-webkit-animation:styles__open___3b-ns-camelCase 1s linear;animation:styles__open___3b-ns-camelCase 1s linear;}.styles__newUnlockText___zr-gT-camelCase{font-family:Nunito,sans-serif;font-size:44px;font-weight:700;text-align:center;color:#fff;text-shadow:2px 2px 8px grey;top:calc(50% - 215px);opacity:0;transform:translateX(-50%);-webkit-animation:styles__fadeInCenter___1y_-9-camelCase 0.25s linear 1s forwards;animation:styles__fadeInCenter___1y_-9-camelCase 0.25s linear 1s forwards
}.styles__unlockedBlook___OyCN3-camelCase{font-size:47px;color:#fff;text-shadow:2px 2px 8px grey;top:calc(50% + 125px);width:100%;-webkit-animation:styles__fadeInCenter___1y_-9-camelCase 0.25s linear 1s forwards;animation:styles__fadeInCenter___1y_-9-camelCase 0.25s linear 1s forwards}.styles__rarityText___12Y8w-camelCase{font-size:34px;top:calc(50% + 190px);letter-spacing:.5px;text-shadow:-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;-webkit-animation:styles__fadeInCenter___1y_-9-camelCase 0.25s linear 1.1s forwards;animation:styles__fadeInCenter___1y_-9-camelCase 0.25s linear 1.1s forwards}`;

function showBoxOpen() {
    document.getElementById("blookParticles").src = "";
    document.getElementById("mysteryBoxButton").className = "styles__mysteryBoxContainerOpen___39AUK-camelCase";
    document.getElementById("blookName").innerHTML = window.blookUnlocked;
    document.getElementById("blookImage").src = `${window.blookImage}`;
    document.getElementById("blookRarity").innerHTML = `${window.blookRarity}`;
    setTimeout(() => showParticles(), 600);
    if (blookRarity === "Uncommon") {
        document.getElementById("blookRarity").style.color = `#4bc22e`;
    } else if (blookRarity === "Rare") {
        document.getElementById("blookRarity").style.color = `#0a14fa`;
    } else if (blookRarity === "Epic") {
        document.getElementById("blookRarity").style.color = `#be0000`;
    } else if (blookRarity === "Legendary") {
        document.getElementById("blookRarity").style.color = `#ff910f`;
    } else if (blookRarity === "Chroma") {
        document.getElementById("blookRarity").style.color = `#00ccff`;
    } else if (blookRarity === "Mystical") {
        document.getElementById("blookRarity").style.color = `#a335ee`;
    } else if (blookRarity === undefined) {
        document.getElementById("blookRarity").style.color = `#FFFFFF`;
        document.getElementById("blookName").innerHTML = "You're opening boxes too fast...";
        document.getElementById("blookRarity").innerHTML = "Please open boxes slower.";
        document.getElementById("blookImage").src = "/images/blacketImage.png";
        document.getElementById("newBlookText").innerHTML = "ERROR";
    }
    if (blookRarity === "Uncommon") {
        document.getElementById("blookParticles").src = "/images/uncommonParticles.gif";
    } else if (blookRarity === "Rare") {
        document.getElementById("blookParticles").src = "/images/rareParticles.gif";
    } else if (blookRarity === "Epic") {
        document.getElementById("blookParticles").src = "/images/epicParticles.gif";
    } else if (blookRarity === "Legendary") {
        document.getElementById("blookParticles").src = "/images/legendaryParticles.gif";
    } else if (blookRarity === "Chroma") {
        document.getElementById("blookParticles").src = "/images/chromaParticles.gif";
    } else if (blookRarity === "Mystical") {
        document.getElementById("blookParticles").src = "/images/mysticalParticles.gif";
    } else if (blookRarity === undefined) {
        document.getElementById("blookParticles").src = "/images/errorParticles.gif";
    }
    document.getElementById("blookMenu").style.display = "block";
    setTimeout(() => hideParticles(), 2000);
}

function allowClosing() {
    setTimeout(() => document.getElementById("mysteryBoxMenu").onclick = function() {
        closeMysteryMenu();
        resetBoxOpen()
    }, 1250);
}