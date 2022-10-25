let defaultCategories = [];
let defaultPlayers = [];

defaultSetting();

document.querySelector("#startGameButton").addEventListener("click", clickMenuStart);

function clickMenuStart(){
    let choosenCategories = [];
    let choosenPlayers = [];
    document.querySelectorAll(".categoryInputs").forEach(inputValue => {
        if(inputValue.value === ""){
            choosenCategories.push(inputValue.placeholder);
        }else{
            choosenCategories.push(inputValue.value);
        }
    })
    document.querySelectorAll(".playerSettingName > #inputName").forEach(inputValue => {
        if(inputValue.value === ""){
            choosenPlayers.push(inputValue.placeholder);
        }else{
            choosenPlayers.push(inputValue.value);
        }
    })
    localStorage.setItem("choosenCategories", choosenCategories);
    localStorage.setItem("choosenPlayers", choosenPlayers);
    window.location="/main.html";
}

function defaultSetting(){
  
   defaultCategories.push("Animal", "Useless Power", "Breakup Reason", "Movie/Series", "Songtitle", "Dump Babyname");
    defaultPlayers.push("Player 1", "Player 2");
   localStorage.setItem("defaultCategories", defaultCategories);
   localStorage.setItem("defaultPlayers", defaultPlayers);
   LoadDefaultInputs();
}

function LoadDefaultInputs(){
    document.querySelectorAll(".categoryInputs").forEach((inputField, index) => {
        inputField.placeholder = defaultCategories[index];
    
    })
    document.querySelectorAll(".playerSettingName > #inputName").forEach((playerField , index)=>  {
        playerField.placeholder = defaultPlayers[index];
    })
}