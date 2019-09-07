// Code your JavaScript / jQuery solution here
var turn = 0
    
const winCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
//const squares = document.querySelectorAll('td');
// function turnCount(){
//     for(i = 0; i <= 2; i++){
//         for(j = 0; j <= 2; j++){
//             if(document.querySelector(`[data-x="${i}"][data-y="${j}"]`).textContent){
//                 turn++
//             }
//         }
//     }
//     return turn
// }

function doTurn(square){
    turn++
    updateState(square)
    checkWinner()
    if(turn === 9){
        setMessage("Tie game.")
    } 
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
    const squares = document.querySelectorAll('td');
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

    // $.get("/games/" + nextId + ".json", function(data) {
    //     var product = data;
    //     $(".productName").text(product["name"]);
    //     $(".productPrice").text(product["price"]);
    //     $(".productDescription").text(product["description"]);
    //     $(".productInventory").text(product["inventory"]);
    //     // re-set the id to current on the link
    //     $(".js-next").attr("data-id", product["id"]);
    // });