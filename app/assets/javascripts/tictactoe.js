// Code your JavaScript / jQuery solution here
var turn = 0
let squares
const winCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
let currentGameId

window.onload = function(){
    squares = document.querySelectorAll('td');
    attachListeners()
}

function doTurn(square){

    updateState(square)
    turn++
    
    if(checkWinner()){
        saveGame()
        resetBoard()
    }else if(turn === 9){
        saveGame()
        resetBoard()
        setMessage("Tie game.")
    } 
}

function position_open(square){
    return square.textContent === ''
} 

function gameOver(){
    return (checkWinner() || turn === 9)
}

function player(){
    if ( turn % 2 == 0) {
        return 'X'
    }else{
        return 'O'
    }
}

function updateState(td){
    td.textContent = player()
}

function setMessage(message){
    document.querySelector("#message").textContent = message
}

function checkWinner(){
    console.log('checked for winner')
    for (let winCombination of winCombinations) {
        let winSquares = [squares[winCombination[0]], squares[winCombination[1]], squares[winCombination[2]]]
        if(areEqual(winSquares)){
            setMessage(`Player ${winSquares[0].innerHTML} Won!`)
            return true
        }
    }
    return false
}

function areEqual(winSquares){
    if (!!winSquares[0].innerHTML && winSquares[0].innerHTML === winSquares[1].innerHTML && winSquares[0].innerHTML === winSquares[2].innerHTML){
        return true;
    }
    return false;
 }

 function resetBoard(){
    currentGameId = null
    turn = 0
    for(let square of squares){
        square.textContent = ''
    }
 }

 function saveGame(){
    const board = Array.from(squares).map(s => s.innerHTML);
    if(currentGameId){
        updateGame()
    }else{
        var postting = $.post('/games', {state: board})
        postting.done(function(data){
            currentGameId = data["data"]["id"]
        })
    }
 }

 function updateGame(){
    const state = Array.from(squares).map(s => s.innerHTML);
    $.ajax({
        type: "Patch",
        url: `/games/${currentGameId}`,
        data: {state: state}
    });
 }

 function previousGames(){
    $.get("/games", function(data) {
        var games = data["data"];

        for(let game of games){
            let id = game["id"]
            if(!document.getElementById(`game-${id}`)){
                let btn = document.createElement('BUTTON')
                btn.id = `game-${id}`
                btn.setAttribute("gameId", id)
                btn.addEventListener('click',function(){
                    loadGame(this.getAttribute("gameId"))
                })
                document.getElementById("games").appendChild(btn);
            }
        }
    });
 }


 function loadGame(gameId){
    $.get(`/games/${gameId}`, function(data) {
        let game = data["data"]
        currentGameId = game["id"]
        populateBoard(game["attributes"]["state"])
    })
    
}

function populateBoard(arr) {
    turn = 0
    for (let i = 0; i < 9; i++) {
        if(arr[i]){
            turn++
        }
      squares[i].innerHTML = arr[i];
    }
  }

  function clearBoard(){
      currentGameId = 0
  }

function attachListeners(){
    for(let square of squares){
        square.addEventListener("click", function(){
            if(position_open(square) && !gameOver()){
                doTurn(this)
            }
        }
        )
    }

    document.getElementById("save").addEventListener("click", function(event){
        event.preventDefault()
        saveGame()
    })    

    document.getElementById("previous").addEventListener("click", function(event){
        event.preventDefault()
        previousGames()
    })    

    document.getElementById("clear").addEventListener("click", function(event){
        event.preventDefault()
        resetBoard()
    })  
 }


//  let elementsArray = document.querySelectorAll("whatever");

// elementsArray.forEach(function(elem) {
//     elem.addEventListener("input", function() {
//         //this function does stuff
//     });
// });
//  document.getElementById("myBtn").addEventListener("click", function(){
    // document.getElementById("demo").innerHTML = "Hello World";
//   });
// $(function () {
//   $(".js-next").on("click", function(event) {
//     event.preventDefault()
