let time = 60;
let currentPlayer = 1;
let i = time;
let randomLetter;
let players = []
players = JSON.parse(localStorage.getItem("choosenPlayers"));

generateLayout();

function generateLayout(){
    document.querySelectorAll(".player").forEach((player, index) => {
       
        player.innerHTML = players[index];
    })

    let choosenCates = [];
    choosenCates = JSON.parse(localStorage.getItem("choosenCategories"));

    document.querySelectorAll(".categoryColumn").forEach((cate, index) => {
        let div;
        div = '<div class="categoryItem"><span>'+ choosenCates[index] +'</span></div><input id="'+ choosenCates[index] +'" class="inputItem" type="text" placeholder="type text">'
        cate.innerHTML += div;
    })

    document.querySelectorAll(".categoryColumn2").forEach((cate, index) => {
        let div;
        div = '<div class="categoryItem2"><span>'+ choosenCates[index] +'</span></div><input id="'+ choosenCates[index] +'2" class="inputItem2" type="text" placeholder="type text">'
        cate.innerHTML += div;
    })

    let count = 1;
    let zahl = 7;

    document.querySelectorAll(".ratingAreas").forEach(rating => {
   
        let div;
        while(count < zahl){
            div = '<div class="ratingColumn" id="ratingColumn' + count +'">'
            rating.innerHTML += div;
            count += 1;
        }
        count = 7;
        zahl = 13;
    })
    
    document.querySelectorAll(".ratingColumn").forEach(rating => {
        let div;
        div = '<div class="rightButton"><span><i class="fas fa-check"></i></span></div><div class="equalButton"><span><i class="fas fa-equals"></i></span></div><div class="wrongButton"><span><i class="fas fa-times"></i></span></div>'
        rating.innerHTML += div;
    })
}

let submitButton1 = document.querySelector("#submitButton1");
submitButton1.addEventListener("click", clickStartButton);

function clickStartButton(){
    submitButton1.removeEventListener("click", clickStartButton)
    randomLetter = getRandomLetter();
    submitButton1.innerHTML = randomLetter;
    setTimeout( () => {
        document.querySelector("#PopUpName").style.display = "none";
        StartGame();
    }, 1000 );
}

let submitButton2 = document.querySelector("#submitButton2");
submitButton2.addEventListener("click", clickStartButton2);
let PopUpName2 = document.querySelector("#PopUpName2");

function clickStartButton2(){
    submitButton2.innerHTML = randomLetter;
    setTimeout( () => {
        PopUpName2.style.display = "none";
        StartGame2();
    }, 1000 );
}

let letterSection = document.querySelector("#letterSection");
let containerInner = document.querySelector("#container-inner");

function StartGame(){
    letterSection.innerHTML = randomLetter 
    sekunden();
    containerInner.style.display = "grid";
    window.setInterval("sekunden()", 1000); 
}

let containerInner2 = document.querySelector("#container-inner2");

function StartGame2(){
    letterSection.innerHTML = randomLetter;
    containerInner.style.display = "none";
    containerInner2.style.display = "grid";
    i = time;
    sekunden();
}

let ratingArea = document.querySelector("#ratingArea");
let ratingArea2 = document.querySelector("#ratingArea2");
let confirmButton = document.querySelector("#confirmButton");
let roundSection = document.querySelector("#roundSection");

function sekunden() {
    if(i == 100){
        roundSection.innerHTML = "Results";
        containerInner.style.display = "grid";
        containerInner2.style.display = "grid";
        ratingArea.style.display = "grid";
        ratingArea2.style.display = "grid";
        confirmButton.style.display ="flex";
        document.querySelectorAll(".buttons").forEach(button => {
            button.style.display = "none";
        })
        return;
    }
    
    if(i == 200){
        return;
    }
    
    if (i > 0) {
       roundSection.innerHTML = i;
    }else{
       
        if(currentPlayer == 1){
            SaveData1();
            roundSection.innerHTML = "Time";
            letterSection.innerHTML = "Letter";
            containerInner.style.display = "none";
            containerInner2.style.display = "grid";
            PopUpName2.style.display = "flex";
            confirmButton.style.display ="flex";
            i = 200;
            currentPlayer = 2;
            return;
        }
       
        if(currentPlayer == 2){
            
            roundSection.innerHTML = "Results";
            containerInner.style.display = "grid";
            containerInner2.style.display = "grid";
            ratingArea.style.display = "grid";
            ratingArea2.style.display = "grid";
            confirmButton.style.display ="flex";
            document.querySelectorAll(".buttons").forEach(button => {
                button.style.display = "none";
            })
            return;
        }
    }
    i--;
}

let restTime = [];
document.querySelector("#buttonSubmit").addEventListener("click", clickedButton);

function clickedButton(){
    restTime[0] = roundSection.innerHTML;
    SaveData1();
    roundSection.innerHTML = "Time";
    letterSection.innerHTML = "Letter";
    containerInner.style.display = "none";
    containerInner2.style.display = "grid";
    PopUpName2.style.display = "flex";
    i = 200;
    currentPlayer = 2;
    sekunden();
}

document.querySelector("#buttonSubmit2").addEventListener("click", clickedButton2);

function clickedButton2(){
    restTime[1] = roundSection.innerHTML;
    SaveData2();
    containerInner2.style.display = "none";
    i = 100;
    sekunden();
}

function getRandomLetter() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    result = characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

function SaveData1(){
    let player1 = [];

    document.querySelectorAll(".inputItem").forEach(category => {  
       
        player1.push(category.value);
    })
}

function SaveData2(){
    let player2 = [];

    document.querySelectorAll(".inputItem2").forEach(category => {
   
        player2.push(category.value);
    })
}
 
confirmButton.addEventListener("click", handleClickConfirmButton);

document.querySelectorAll(".wrongButton").forEach(button => {
    button.addEventListener("click", clickWrongButton);
})

document.querySelectorAll(".rightButton").forEach(button => {
    button.addEventListener("click", clickRightButton);
})

document.querySelectorAll(".equalButton").forEach(button => {
    button.addEventListener("click", clickEqualButton);
})

function clickRightButton(event){

    let currentClickedButton = event.target.parentNode.parentNode.parentNode.id;

    let ratingColumnElement = document.getElementById(currentClickedButton);

    setAreaActiveAndRemoveClass(ratingColumnElement);

    ratingColumnElement.children[1].classList.add("notCurrent");
    ratingColumnElement.children[2].classList.add("notCurrent");
}

function clickWrongButton(event){
    let currentClickedButton = event.target.parentNode.parentNode.parentNode.id;

    let ratingColumnElement = document.getElementById(currentClickedButton);

    setAreaActiveAndRemoveClass(ratingColumnElement);

    ratingColumnElement.children[0].classList.add("notCurrent");
    ratingColumnElement.children[1].classList.add("notCurrent");
}

function clickEqualButton(event){
    let currentClickedButton = event.target.parentNode.parentNode.parentNode.id;

    let ratingColumnElement = document.getElementById(currentClickedButton);

    setAreaActiveAndRemoveClass(ratingColumnElement);

    ratingColumnElement.children[0].classList.add("notCurrent");
    ratingColumnElement.children[2].classList.add("notCurrent");
}

function setAreaActiveAndRemoveClass(element){

    element.classList.add("active");
    let childrenLength = element.children.length;

    for(let i = 0; i < childrenLength; i++){
        element.children[i].classList.remove("notCurrent");
    }
}

function handleClickConfirmButton(){
    let all = proveAllActive();
    if(!all){
        return;
    }

    let filledPlayerRating = fillPlayerRatingArrays();
    let filledPlayerPoints = calcPlayersPoints(filledPlayerRating);

    showWinner(filledPlayerPoints);    
}

function proveAllActive(){
    let prove = false;
    let proveAll = [];

    document.querySelectorAll(".ratingAreas").forEach((area, index) => {
        proveAll.push(false);
        for(let j = 0; j < area.children.length; j++){
            prove = area.children[j].classList.contains("active");
            if(!prove){
                return;
            }  
        }
        proveAll[index] = prove;
    })
    return !proveAll.includes(false)
}

function fillPlayerRatingArrays(){
    let playerRatings = [];
    let resultOptions = 3;

    document.querySelectorAll(".ratingAreas").forEach((area, index) => {
        playerRatings.push([]);
        for(let j = 0; j < area.children.length; j++){
            for(let i = 0; i < resultOptions; i++){
                let prove = area.children[j].children[i].classList.contains("notCurrent");
                if(!prove){
                    playerRatings[index].push(area.children[j].children[i].className);
                }
            }
        }
    })
    return playerRatings;
}

function calcPlayersPoints(playerRatings_){
    let playerPoints = [];
    let playerPoints1 = 0;
    let playerPoints2 = 0;
  
    for(let i = 0; i < playerRatings_[0].length; i++) {
        
        switch(playerRatings_[0][i]){
            case "rightButton": 
                if(playerRatings_[1][i] === "rightButton"){
                    playerPoints1 += 10;
                    playerPoints2 += 10;
                }
                if(playerRatings_[1][i] === "wrongButton"){
                    playerPoints1 += 20;
                    playerPoints2 += 0;
                }
                break;
            case "wrongButton":
                if(playerRatings_[1][i] === "rightButton"){
                    playerPoints1 += 0;
                    playerPoints2 += 20;
                }
                if(playerRatings_[1][i] === "wrongButton"){
                    playerPoints1 += 0;
                    playerPoints2 += 0;
                }
                break;
            case "equalButton":
                playerPoints1 += 5;
                playerPoints2 += 5;
                break;    
        } 
    }
  
    playerPoints1 += parseInt(restTime[0]);
    playerPoints2 += parseInt(restTime[1]);
    
    playerPoints.push(playerPoints1);
    playerPoints.push(playerPoints2);
    return playerPoints;
}

function showWinner(arrrayPlayerPoints){
    let winner;

    if(arrrayPlayerPoints[0] > arrrayPlayerPoints[1]){
        winner = players[0] + " wins";
    }
    
    if(arrrayPlayerPoints[0] < arrrayPlayerPoints[1]){
        winner = players[1] + " wins";
    }
    
    if(arrrayPlayerPoints[0] == arrrayPlayerPoints[1]){
        winner = "Everyone is a winner"
    }
    
    document.querySelector("#winnerText").innerHTML = winner;
    document.querySelector("#PopUpWinner").style.display = "flex";
}

document.querySelector("#backToButton").addEventListener("click", backToMenu)

function backToMenu()
{
    window.location="/menu.html";
}

document.querySelector("#restartButton").addEventListener("click", restartGame)

function restartGame()
{
    window.location="/main.html";
}