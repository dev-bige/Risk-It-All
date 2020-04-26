var gamePhase = new Array("Skyblue Recruit", "Skyblue Attack", "Red Recruit", "Red Attack", "Orange Recruit", "Orange Attack", "Green Recruit", 
						"Green Attack", "Violet Recruit", "Violet Attack", "Pink Recruit", "Pink Attack");
var gameStart = new Array("Skyblue Select", "Red Select", "Orange Select", "Green Select", "Violet Select", "Pink Select");
var tileTitle = new Array("bluesquare", "redsquare", "orangesquare", "greensquare", "violetsquare", "pinksquare");
var currTileTitle = 0;
var currPhase = -1;
var currStart = 0;
var occupiedSpacesSet = 0; //Max for board is 60

//variables for Territories controled by players
var blueTerr = 0;
var redTerr = 0;
var orangeTerr = 0;
var greenTerr = 0;
var violetTerr = 0;
var pinkTerr = 0;
//variables for Income for each player
var blueIn = 0;
var redIn = 0;
var orangeIn = 0;
var greenIn = 0;
var violetIn = 0;
var pinkIn = 0;

function endPhase() {
	winCondition();
	if(currPhase === 11) currPhase = 0;
	document.getElementById("currentPhase").innerHTML = (gamePhase[++currPhase]);
	//incrament the current tile doing things when switching from attack to recruit 
	if (currPhase % 2 == 0) {
		document.getElementById("directionHead").innerHTML = "Choose Fortification";
		document.getElementById("directions").innerHTML = tileTitle[currTileTitle] + ": Select any tile occupied by your color to add 1 troop number to the territory until troop income is 0";
	} else {
		document.getElementById("directionHead").innerHTML = "Attack Phase";
		document.getElementById("directions").innerHTML = tileTitle[currTileTitle] + ": Select any tile occupied by your color and then select a neighboring tile not occupied by you to attack";
		currTileTitle++;
	}
}

function winCondition() {
	if (blueTerr === occupiedSpacesSet) {
		alert("Player Skyblue has won the game!  The game will be reset.  Play again if you wish");
		location.reload();
	} else if (redTerr === occupiedSpacesSet) {
		alert("Player Red has won the game!  The game will be reset.  Play again if you wish");
		location.reload();
	} else if (orangeTerr === occupiedSpacesSet) {
		alert("Player Orange has won the game!  The game will be reset.  Play again if you wish");
		location.reload();
	} else if (greenTerr === occupiedSpacesSet) {
		alert("Player Green has won the game!  The game will be reset.  Play again if you wish");
		location.reload();
	} else if (violetTerr === occupiedSpacesSet) {
		alert("Player Violet has won the game!  The game will be reset.  Play again if you wish");
		location.reload();
	} else if (pinkTerr === occupiedSpacesSet) {
		alert("Player Pink has won the game!  The game will be reset.  Play again if you wish");
		location.reload();
	}
}

function tilePlay(tileId) {
	//call board setup code when needed
	if (currPhase === -1) boardSet(tileId);	
	else {		
		//game play interaction
		//When the phase is even - will be a recruiting phase
		if (currPhase % 2 == 0) {
			recruiting(tileId);
			resetIncomeVal();
		} else {
			//Else the phase will be odd - attack phase
			attacking(tileId);
		}
	}
}

function resetIncomeVal(){
	blueIn == blueTerr;
	document.getElementById("blueIncome").innerHTML = ('Income: ' + blueIn);
	redIn == redTerr;
	document.getElementById("redIncome").innerHTML = ('Income: ' + redIn);
	orangeIn == orangeTerr;
	document.getElementById("orangeIncome").innerHTML = ('Income: ' + orangeIn);
	greenIn == greenTerr;
	document.getElementById("greenIncome").innerHTML = ('Income: ' + greenIn);
	violetIn == violetTerr;
	document.getElementById("violetIncome").innerHTML = ('Income: ' + violetIn);
	pinkIn == pinkTerr;
	document.getElementById("pinkIncome").innerHTML = ('Income: ' + pinkIn);
}

function recruiting(tileId) {
	//variable for the current class
	var curClass = document.getElementById(tileId).className;
	//if selected tile owned by other player
	if (curClass !== tileTitle[currTileTitle]) {
		alert("Please select your own tile: " + tileTitle[currTileTitle]);
	}
	else {
		var recruitValid = getRecruiter(curClass);
		//Incrament troop count on tile when owned with income
		if (recruitValid) {
			var troopId = tileId + ' Troops';
			document.getElementById(troopId).textContent++;
		}		
	}
}

//Manage if recruit is valid and edit the income
function getRecruiter(curClass) {
	var recruitValid = false;
	if (curClass == "bluesquare") {
		if (blueIn > 0){
			blueIn--;	
			recruitValid = true;
		} else {
			endRecruit(curClass)
		}
	} else if (curClass == "redsquare") {
		if (redIn > 0) {
			redIn--;
			recruitValid = true;
		} else {
			endRecruit(curClass)
		}
	} else if (curClass == "orangesquare") {
		if (orangeIn > 0) {
			orangeIn--;
			recruitValid = true;
		} else {
			endRecruit(curClass)
		}
	} else if (curClass == "greensquare") {
		if (greenIn > 0) {
			greenIn--;
			recruitValid = true;
		} else {
			endRecruit(curClass)
		}
	} else if (curClass == "violetsquare") {
		if (violetIn > 0) {
			violetIn--;
			recruitValid = true;
		} else {
			endRecruit(curClass)
		}
	} else {
		if (pinkIn > 0) {
			pinkIn--;
			recruitValid = true;
		} else {
			endRecruit(curClass)
		}
	}
	return recruitValid;
}

function endRecruit(curClass) {
	alert("No more troops to recruit for " + curClass);
	endPhase();
}

function attacking(tileId) {
	
}

//Code for setting up the board
function boardSet(tileId) {
	//variable for the current class
	var curClass = document.getElementById(tileId).className;
	//board setup code	
	//check to see if the tile is occupied
	if (curClass !== "square") alert("Please select an unoccupied tile");
	else {
		//Change the class of the tile to change color
		document.getElementById(tileId).className = (tileTitle[currStart]);	
		curClass = document.getElementById(tileId).className;
		//Update territory and income for that player
		territorySet(curClass);
		incomeSet(curClass);
		//Change the indicator of what is happening			
		currStart++;
		if(currStart === 6) currStart = 0;
		document.getElementById("currentPhase").innerHTML = (gameStart[currStart]);
		occupiedSpacesSet++;
		//check to see if the board is fully setup - if it is it will change phase
		if (occupiedSpacesSet === 60) {
			endPhase();
		}
	}	
}

//Adds in territory tracker when picking starting tiles
function territorySet(curClass) {
	if(curClass === "bluesquare") {
		document.getElementById("blueTerritories").innerHTML = ('Territories: ' + ++blueTerr);
	}
	else if (curClass === "redsquare") {
		document.getElementById("redTerritories").innerHTML = ('Territories: ' + ++redTerr);
	}
	else if (curClass === "orangesquare") {
		document.getElementById("orangeTerritories").innerHTML = ('Territories: ' + ++orangeTerr);
	}
	else if (curClass === "greensquare") {
		document.getElementById("greenTerritories").innerHTML = ('Territories: ' + ++greenTerr);
	}
	else if (curClass === "violetsquare") {
		document.getElementById("violetTerritories").innerHTML = ('Territories: ' + ++violetTerr);
	}
	else {
		document.getElementById("pinkTerritories").innerHTML = ('Territories: ' + ++pinkTerr);
	}
}

//Adds in income tracker when picking starting tiles
function incomeSet(curClass) {
	if(curClass === "bluesquare") {
		document.getElementById("blueIncome").innerHTML = ('Income: ' + ++blueIn);
	}
	else if (curClass === "redsquare") {
		document.getElementById("redIncome").innerHTML = ('Income: ' + ++redIn);
	}
	else if (curClass === "orangesquare") {
		document.getElementById("orangeIncome").innerHTML = ('Income: ' + ++orangeIn);
	}
	else if (curClass === "greensquare") {
		document.getElementById("greenIncome").innerHTML = ('Income: ' + ++greenIn);
	}
	else if (curClass === "violetsquare") {
		document.getElementById("violetIncome").innerHTML = ('Income: ' + ++violetIn);
	}
	else {
		document.getElementById("pinkIncome").innerHTML = ('Income: ' + ++pinkIn);
	}
}