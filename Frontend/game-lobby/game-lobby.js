var arr = [
    new game("gameOne"), 
    new game("gameTwo"),
    new game("gameThree"),
    new game("gameFour"),
    new game("gameFive")];

function game(id) {
    this.id = id;
    this.gameSize = 0;
}

window.onload = function() {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].gameSize >= 6) {
            document.getElementById(arr[i].id).style.color = "red";
        }
    }
}

function checkPlayers(id) {
    var index = 0;
    var gameFound;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            gameFound = arr[i];
            index = i;
            break;
        }
    }

    if (gameFound.gameSize < 6) {
        arr[index].gameSize += 1;
        window.open('../board/board.html','_self', false);
    }
    else {
        alert("Game is already full");
    }
}
