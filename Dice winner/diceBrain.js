
var playerOne ,playerTwo;

function randomNumber(){
    playerOne = Math.floor(Math.random() * 6) + 1;
    
    playerTwo = Math.floor(Math.random() * 6) + 1;

    console.log(playerOne +" " + playerTwo);

    playerOnePictuer(playerOne);
    playerTwoPictuer(playerTwo);

    displayWinner();
}

function playerOnePictuer(number){
    document.getElementById("player1pic").src = "pic/dice"+number+".png";

}

function playerTwoPictuer(number){
    document.getElementById("player2pic").src = "pic/dice"+number+".png";
}

function displayWinner(){
    var stringWinner;
    if(playerOne>playerTwo){
        stringWinner = "Player 1";
    }
    else if(playerOne<playerTwo){   
        stringWinner = "Player 2";
    }
    else{
        stringWinner = "Its a Tie !!";
    }
    document.getElementById("Winner").textContent = "The winner: "+stringWinner;
}