var croupier = 0;
var user = 0;
var userPass = false, croupierPass = false;
var finished = false;

var fullDeck = ["2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S","7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","JC","JD","JH","JS","QC","QD","QH","QS","KC","KD","KH","KS","AC","AD","AH","AS"];
var playDeck = fullDeck.slice();
var croupierCards = [];

const values = {"J": 10, "Q": 10, "K": 10, "A": 11};



function playRound(){
    const croupierField = document.getElementById("croupier_field");
    const userField = document.getElementById("user_field");
    if(!userPass){
        var cardName = getCard("user");
        var img = document.createElement("img");
        img.src = `cards/playcards/${cardName}`;
        img.width = 100;
        userField.appendChild(img);
    }

    if(user > 21){
        userPass = true;
        endGame("croupier");
        return
    }

    if(!croupierPass){
        var cardName = getCard("croupier");
        var img = document.createElement("img");
        img.src = `cards/bg/blue_back.png`;
        img.width = 100;
        croupierField.appendChild(img);
        croupierCards.push(cardName);
    }

    if(croupier > 21){
        croupierPass = true;
        endGame("user");
        return
    }

    if(croupier > 15){
        if(Math.random() < croupier/20){
            croupierPass = true;
        }
    }

    console.log(`user ${user}, ${userPass}`, `croupier ${croupier}, ${croupierPass}`);

    if(croupierPass && userPass){
        if (croupier == user){
            var winner = "tie";
        } else {
            var winner = croupier-21 > user-21 ? "croupier" : "user";
            console.log(winner);
            console.log(croupier-21, user-21);
        }
        endGame(winner);
        return
    }
}

function endGame(winner){
    userPass = false;
    croupierPass = false;
    finished = true;
    document.getElementById("hit").disabled = true;
    document.getElementById("pass").disabled = true;
    const croupierField = document.getElementById("croupier_field");
    croupierField.innerHTML = "";
    croupierCards.forEach(element => {
        var img = document.createElement("img");
        img.src = `cards/playcards/${element}`;
        img.width = 100;
        croupierField.appendChild(img);
    });
    
    if(winner == "tie"){
        // alert(`Remis croupier ${croupier}, user ${user}`);
        result(`Remis croupier ${croupier}, user ${user}`);
    } else {
        // alert(`Wygrał ${winner} croupier ${croupier}, user ${user}`);
        result(`Wygrał ${winner} croupier ${croupier}, user ${user}`);
    }
    return
}

function pass(){
    userPass = true;
    while(!finished){
        playRound();
        console.log(finished);
    }
}

function getCard(name){
    var number = Math.floor(Math.random()*playDeck.length);
    var card = playDeck[number];
    if(isNaN(parseInt(card))){
        var value = values[card[0]];
    } else {
        var value = parseInt(card);
    }
    playDeck.pop(number);
    var imageName = card + ".png";
    console.log(playDeck, card);

    if(name=="croupier"){
        croupier += value;
    } else if(name=="user") {
        user += value
    }

    return imageName;
}

function start(){
    const croupierField = document.getElementById("croupier_field");
    const userField = document.getElementById("user_field");
    croupierField.innerHTML = "";
    userField.innerHTML = "";
    croupierCards = [];
    playDeck = fullDeck.slice();
    document.getElementById("hit").disabled = false;
    document.getElementById("pass").disabled = false;
    croupier = 0;
    user = 0;
    userPass = false, croupierPass = false;
    finished = false;
    playRound();
    playRound();
}

function rules(){
    document.getElementById("rules_field").style.display = "block";
}

function closeRules(){
    document.getElementById("rules_field").style.display = "none";
}

function result(msg){
    document.getElementById("result_field").style.display = "block";
    var resultText = document.getElementById("result");
    resultText.innerHTML = msg;
    // document.getElementById("result_field").appendChild(resultText);
}

function closeResult(){
    document.getElementById("result_field").style.display = "none";
}

window.addEventListener("DOMContentLoaded", function(){
    document.getElementById("hit").addEventListener("click", playRound);
    document.getElementById("pass").addEventListener("click", pass);
    document.getElementById("reset").addEventListener("click", start);
    document.getElementById("rules").addEventListener("click", rules);
    document.getElementById("close_rsesult").addEventListener("click", closeResult);
    document.getElementById("close_rules").addEventListener("click", closeRules);
});

window.onload = function(){
    start();
}
