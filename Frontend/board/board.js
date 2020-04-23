var gamePhase = new Array("Skyblue Recruit", "Skyblue Attack", "Red Recruit", "Red Attack", "Orange Recruit", "Orange Attack", "Green Recruit", 
						"Green Attack", "Violet Recruit", "Violet Attack", "Pink Recruit", "Pink Attack");
var gameStart = new Array("Skyblue Select", "Red Select", "Orange Select", "Green Select", "Violet Select", "Pink Select");
var tileTitle = new Array("bluesquare", "redsquare", "orangesquare", "greensquare", "violetsquare", "pinksquare");
var currPhase = -1;
var currStart = 0;
var occupiedSpacesSet = 0; //Max for board is 56

function endPhase() {
	if(currPhase === 11) currPhase = 0;
	document.getElementById("currentPhase").innerHTML = (gamePhase[++currPhase]);
}



function tilePlay(tileId) {
	//call board setup code
	boardSet(tileId);
}


function boardSet(tileId) {
	//board setup code
	if (currPhase === -1){
		//check to see if the tile is occupied
		if (document.getElementById(tileId).className !== "square") alert("Please select an unoccupied tile");
		else {
			//Change the class of the tile to change color
			document.getElementById(tileId).className = (tileTitle[currStart]);			
			//Change the indicator of what is happening			
			currStart++;
			if(currStart === 6) currStart = 0;
			document.getElementById("currentPhase").innerHTML = (gameStart[currStart]);
			occupiedSpacesSet++;
			//check to see if the board is fully setup - if it is it will change phase
			if (occupiedSpacesSet === 56) document.getElementById("currentPhase").innerHTML = (gamePhase[++currPhase]);			
		}
	}
}