let time = 5;
let currentPlayer = 1;
let i = time;
let randomLetter;

document.querySelector("#buttonSubmit").addEventListener("click", clickedButton);
document.querySelector("#buttonSubmit2").addEventListener("click", clickedButton2);
document.querySelector("#submitButton").addEventListener("click", clickStartButton);
document.querySelector("#submitButton2").addEventListener("click", clickStartButton2);

document.querySelectorAll(".wrongButton").forEach(button => {
    button.addEventListener("click", clickWrongButton);
})

document.querySelectorAll(".rightButton").forEach(button => {
    button.addEventListener("click", clickRightButton);
})

document.querySelectorAll(".equalButton").forEach(button => {
    button.addEventListener("click", clickEqualButton);
})

function clickStartButton(){
    randomLetter = getRandomLetter();
    document.querySelector("#submitButton").innerHTML = randomLetter;
    setTimeout( () => {
        document.querySelector("#PopUpName").style.display = "none";
        StartGame();

    }, 1000 );
}

function clickStartButton2(){
    document.querySelector("#submitButton2").innerHTML = randomLetter;
    setTimeout( () => {
        document.querySelector("#PopUpName2").style.display = "none";
        StartGame2();

    }, 1000 );
  
}

function StartGame(){
     document.querySelector("#letterSection").innerHTML = randomLetter 
    sekunden();
    document.querySelector("#container-inner").style.display = "grid";
    window.setInterval("sekunden()", 1000); 
}

function StartGame2(){
    document.querySelector("#letterSection").innerHTML = randomLetter;
    document.querySelector("#container-inner").style.display = "none";
    document.querySelector("#container-inner2").style.display = "grid";
    i = time;
    sekunden();
}

function sekunden() {
    if(i == 100){
        document.getElementById("roundSection").innerHTML = "Results";
        document.querySelector("#container-inner").style.display = "grid";
        document.querySelector("#container-inner2").style.display = "grid";
        document.querySelector("#ratingArea").style.display = "grid";
        document.querySelector("#ratingArea2").style.display = "grid";

        document.querySelectorAll(".buttons").forEach(button => {
            button.style.display = "none";
        })
        return;
    }
    
    if(i == 200){
        return;
    }
    
    if (i > 0) {
        document.getElementById("roundSection").innerHTML = i;
    }else{
       
        if(currentPlayer == 1){
            SaveData1();
            document.getElementById("roundSection").innerHTML = "Time";
            document.querySelector("#letterSection").innerHTML = "Letter";
            document.querySelector("#container-inner").style.display = "none";
            document.querySelector("#container-inner2").style.display = "grid";
            document.querySelector("#PopUpName2").style.display = "flex";
            i = 200;
            currentPlayer = 2;
            return;
        }
       
        if(currentPlayer == 2){
            document.getElementById("roundSection").innerHTML = "Results";
            document.querySelector("#container-inner").style.display = "grid";
            document.querySelector("#container-inner2").style.display = "grid";
            document.querySelector("#ratingArea").style.display = "grid";
            document.querySelector("#ratingArea2").style.display = "grid";

            document.querySelectorAll(".buttons").forEach(button => {
                button.style.display = "none";
            })
            return;
        }
    }
    i--;
}

function clickedButton(){
    SaveData1();
    document.getElementById("roundSection").innerHTML = "Time";
    document.querySelector("#letterSection").innerHTML = "Letter";
    document.querySelector("#container-inner").style.display = "none";
    document.querySelector("#container-inner2").style.display = "grid";
    document.querySelector("#PopUpName2").style.display = "flex";
    i = 200;
    currentPlayer = 2;
    sekunden();
}

function clickedButton2(){
    SaveData2();
    document.querySelector("#container-inner2").style.display = "none";
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
        console.log(category.value);
        player1.push(category.value);
    })

    window.sessionStorage.setItem("player1Scores", JSON.stringify(player1));
}

function SaveData2(){
    let player2 = [];

    document.querySelectorAll(".inputItem2").forEach(category => {
        console.log(category.value);
        player2.push(category.value);
    })

    window.sessionStorage.setItem("player2Scores", JSON.stringify(player2));
}

// let lsScores = localStorage.getItem("playerScores");

// if(lsScores) {
//     highscores = JSON.parse(lsScores);
// 

function clickRightButton(event){
    console.log("Clicked Right Button");
    let currentClickedButton = event.target.parentNode.parentNode.parentNode.parentNode;
}

function clickWrongButton(event){
    console.log("Clicked Wrong Button");
    let currentClickedButton = event.target.parentNode.parentNode.parentNode.parentNode;
    
}
function clickEqualButton(event){
    console.log("Clicked Equal Button");
    let currentClickedButton = event.target.parentNode.parentNode.parentNode.parentNode;
}

