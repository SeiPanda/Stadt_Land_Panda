let time = 60;
let currentPlayer = 1;
let i = time;
let randomLetter;

document.querySelector("#buttonSubmit").addEventListener("click", clickedButton);
document.querySelector("#buttonSubmit2").addEventListener("click", clickedButton2);
document.querySelector("#submitButton").addEventListener("click", clickStartButton);
document.querySelector("#submitButton2").addEventListener("click", clickStartButton2);

document.querySelector("#confirmButton").addEventListener("click", handleClickConfirmButton);



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
    document.querySelector("#submitButton").removeEventListener("click", clickStartButton)
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
        document.querySelector("#confirmButton").style.display ="flex";
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
            document.querySelector("#confirmButton").style.display ="flex";
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
            document.querySelector("#confirmButton").style.display ="flex";
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

}

function SaveData2(){
    let player2 = [];

    document.querySelectorAll(".inputItem2").forEach(category => {
        console.log(category.value);
        player2.push(category.value);
    })
}
 

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

//button erstellen, eventListener darein prove All aufrufen bei false return button nicht ausführbar, bei true load date calc points, print winner


function handleClickConfirmButton(){
    let all = proveAllActive();
    if(!all){
        return;
    }

    let filledPlayerRating = fillPlayerRatingArrays();
    calcPlayersPoints(filledPlayerRating);

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

function calcPlayersPoints(playerRatings){
    for(let i = 0; i < playerRatings.length; i++) {
        for(let j = 0; j < playerRating[i].length; j++){
            
        }
    }
    
}