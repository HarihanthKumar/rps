function initializeGame(){
    const body = document.querySelector('body');
    body.style.backgroundColor = '#09162e';
    document.querySelector('.score-tag').style.color = '#9b9b9b';
    const resultContainer = document.querySelector('.result-container');
    resultContainer.innerHTML = '';
    document.querySelector('.user').textContent = 0;
    document.querySelector('.computer').textContent = 0;
    userWon = 0;
    computerWon = 0;
    let bodyContainer = document.querySelector('.body-container');
    bodyContainer.classList.toggle('fade-in');
    playGame();
}

function generateComputerChoice(){
    choices = ["Rock", "Scissor", "Paper"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function findWinner(userChoice, computerChoice){
    if(userChoice === computerChoice) return "tie";
    else if((userChoice === "Paper" && computerChoice === "Rock") || (userChoice === "Rock" && computerChoice === "Scissor") ||
            (userChoice === "Scissor" && computerChoice === "Paper")){
                return "user";
    }
    else return "computer";
}

function resultDisplayUpdate(winner, userChoice = undefined, computerChoice = undefined){
    const resultContainer = document.querySelector('.result-container');
    const h2Element = document.createElement('h2');
    if(userChoice===undefined && computerChoice===undefined){
        if(winner==='user') h2Element.textContent = 'Congrats. Mankind lives another day!';
        else if(winner==='computer') h2Element.textContent = 'Game over. You failed to save the mankind';
        resultContainer.innerHTML = '';
        h2Element.style.cssText = 'color: black; font-size: 2.5rem; margin: 0 auto';
        resultContainer.appendChild(h2Element);
        const tag = document.querySelector('.score-tag');
        tag.style.color = 'black'; 
        return;
    }

    else if(winner === 'user'){
        h2Element.textContent = `${userChoice} beats ${computerChoice}. You win!`;
    }

    else if(winner === 'computer'){
        h2Element.textContent = `${computerChoice} beats ${userChoice}. You lose!`;
    }

    else{
        h2Element.textContent = 'It is a tie!';
    }
    resultContainer.innerHTML = '';
    h2Element.style.cssText = 'color: #9b9b9b; font-size: 2.5rem; margin: 0 auto';
    resultContainer.appendChild(h2Element);
}


function endGame(userWon, computerWon){
    const bodyContainer = document.querySelector('.body-container');
    const body = document.querySelector('body');
    if(userWon > computerWon){
        body.style.backgroundColor = '#57d557';
        resultDisplayUpdate("user");
    }

    else if(computerWon > userWon){
        body.style.backgroundColor = '#be4848';
        resultDisplayUpdate("computer");
    }
    mainContainer.removeEventListener('click', clickFunction)
}

function clickFunction(e){
    const userChoice = e.srcElement.parentNode.getAttribute('class');
    if(userChoice==="Rock" || userChoice==="Scissor" || userChoice === "Paper"){
        const computerChoice = generateComputerChoice();
        let winner = findWinner(userChoice, computerChoice);
        resultDisplayUpdate(winner, userChoice, computerChoice);
        if(winner ==="user"){
            userWon+= 1;
            const userScorecard = document.querySelector(`.${winner}`);
            userScorecard.textContent = userWon;
        }
        else if(winner === "computer"){
            computerWon+= 1;
            const computerScorecard = document.querySelector(`.${winner}`);
            computerScorecard.textContent = computerWon;
        }
        if(userWon === 5 || computerWon === 5){
            endGame(userWon, computerWon);
            return;
        }
    }
    
}

function playGame(){
    mainContainer.addEventListener('click', clickFunction);
}

let startButton = document.querySelector('.button');
const mainContainer = document.querySelector('.main-container');
let userWon=0, computerWon=0;
startButton.addEventListener('click', function(e){
    initializeGame();
});