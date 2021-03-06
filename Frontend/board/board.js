var gamePhase = new Array("Skyblue Recruit", "Skyblue Attack", "Red Recruit", "Red Attack", "Orange Recruit", "Orange Attack", "Green Recruit", 
						"Green Attack", "Violet Recruit", "Violet Attack", "Pink Recruit", "Pink Attack");
var gameStart = new Array("Skyblue Select", "Red Select", "Orange Select", "Green Select", "Violet Select", "Pink Select");
var tileTitle = new Array("bluesquare", "redsquare", "orangesquare", "greensquare", "violetsquare", "pinksquare");
var currTileTitle = -1;
var currPhase = -1;
var maxPhases = 11; // Starts at 0
var maxTileTitles = 5; //Starts at 0
var currStart = 0;
var occupiedSpacesSet = 0; //Max for board is 60
var gameBoardSize = 60; 

var attackPhase = 0; //keep track of which step of attack is occuring
var attackCommit = false;
var attackerTileId = null;
var initialAttackSel = true;
var attackingTroopCount = 0;
var defendingClass = false;

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
//variables indicating the removal of players
var blueElim = false;
var redElim = false;
var orangeElim = false;
var greenElim = false;
var violetElim = false;
var pinkElim = false;
//variables for tile value
var blueTileVal = 0;
var redTileVal = 1;
var orangeTileVal = 2;
var greenTileVal = 3;
var violetTileVal = 4;
var pinkTileVal = 5;
//varibale for phase value
var bluePhaseVal = 0;
var redPhaseVal = 2;
var orangePhaseVal = 4;
var greenPhaseVal = 6;
var violetPhaseVal = 8;
var pinkPhaseVal = 10;

function endPhase() {
	removeEliminated();
	winCondition();
	if(currPhase >= maxPhases) currPhase = -1;
	document.getElementById("currentPhase").innerHTML = (gamePhase[++currPhase]);
	//incrament the current tile doing things when switching from attack to recruit 
	if (currPhase % 2 == 0) {
		currTileTitle++; //increase which color is active
		if (currTileTitle > maxTileTitles) currTileTitle = 0;
		document.getElementById("commitAttack").style.visibility = "hidden";
		document.getElementById("continueAttack").style.visibility = "hidden";
		document.getElementById("directionHead").innerHTML = "Choose Fortification";
		document.getElementById("directions").innerHTML = tileTitle[currTileTitle] + ": Select any tile occupied by your color to add 1 troop number to the territory until troop income is 0";
	} else {
		attackPhase = 0;
		document.getElementById("directionHead").innerHTML = "Attack Phase";
		document.getElementById("directions").innerHTML = tileTitle[currTileTitle] + ": Select any tile occupied by your color and then select a neighboring tile not occupied by you to attack";
	}
	document.getElementById("battleReport").innerHTML = "";
}

function removeEliminated() {
	if(blueTerr == 0 && !blueElim) {
		removePhase("Skyblue");
		removeTileTitle("bluesquare");
		blueElim = true;
	}
	if (redTerr == 0 && !redElim) {
		removePhase("Red");
		removeTileTitle("redsquare");
		redElim = true;
	}
	if (orangeTerr == 0 && !orangeElim) {
		removePhase("Orange");
		removeTileTitle("orangesquare");
		orangeElim = true;
	}
	if (greenTerr == 0 && !greenElim) {
		removePhase("Green");
		removeTileTitle("greensquare");
		greenElim = true;
	}
	if (violetTerr == 0 && !violetElim) {
		removePhase("Violet");
		removeTileTitle("violetsquare");
		violetElim = true;
	}
	if (pinkTerr == 0 && !pinkElim) {
		removePhase("Pink");
		removeTileTitle("pinksquare");
		pinkElim = true;
	}
}

function removePhase(removing) {
	if (removing == "Skyblue") {
		gamePhase.splice(bluePhaseVal,2); //Remove Skyblue from gamePhase array
		redPhaseVal = redPhaseVal - 2;
		orangePhaseVal = orangePhaseVal - 2;
		greenPhaseVal = greenPhaseVal - 2;
		violetPhaseVal = violetPhaseVal - 2;
		pinkPhaseVal = pinkPhaseVal - 2;
	}
	else if (removing == "Red") {
		gamePhase.splice(redPhaseVal,2); //Remove Red from gamePhase array		
		orangePhaseVal = orangePhaseVal - 2;
		greenPhaseVal = greenPhaseVal - 2;
		violetPhaseVal = violetPhaseVal - 2;
		pinkPhaseVal = pinkPhaseVal - 2;
	}
	else if (removing == "Orange") {
		gamePhase.splice(orangePhaseVal,2); //Remove Orange from gamePhase array
		greenPhaseVal = greenPhaseVal - 2;
		violetPhaseVal = violetPhaseVal - 2;
		pinkPhaseVal = pinkPhaseVal - 2;
	}
	else if (removing == "Green") {
		gamePhase.splice(greenPhaseVal,2); //Remove Green from gamePhase array
		violetPhaseVal = violetPhaseVal - 2;
		pinkPhaseVal = pinkPhaseVal - 2;
	}
	else if (removing == "Violet") {
		gamePhase.splice(violetPhaseVal,2); //Remove Violet from gamePhase array
		pinkPhaseVal = pinkPhaseVal - 2;
	}
	else if (removing == "Pink") {
		gamePhase.splice(pinkPhaseVal,2); //Remove Pink from gamePhase array
	}
	maxPhases = maxPhases - 2;
	updatePhase();
}

function removeTileTitle(removing) {
	if (removing == "bluesquare") {
		tileTitle.splice(blueTileVal,1); //Remove bluesquare from tileTitle array
		blueTileVal--;
		orangeTileVal--;
		greenTileVal--;
		violetTileVal--;
		pinkTileVal--;
	}
	else if (removing == "redsquare") {
		tileTitle.splice(redTileVal,1); //Remove redsquare from tileTitle array
		orangeTileVal--;
		greenTileVal--;
		violetTileVal--;
		pinkTileVal--;
	}
	else if (removing == "orangesquare") {
		tileTitle.splice(orangeTileVal,1); //Remove orangesquare from tileTitle array
		greenTileVal--;
		violetTileVal--;
		pinkTileVal--;
	}
	else if (removing == "greensquare") {
		tileTitle.splice(greenTileVal,1); //Remove greensquare from tileTitle array
		violetTileVal--;
		pinkTileVal--;
	}
	else if (removing == "violetsquare") {
		tileTitle.splice(violetTileVal,1); //Remove violetsquare from tileTitle array
		pinkTileVal--;
	}
	else if (removing == "pinksquare") {
		tileTitle.splice(pinkTileVal,1); //Remove pinksquare from tileTitle array
	}
	maxTileTitles--;
}

function winCondition() {
	if (blueTerr == gameBoardSize) {
		alert("Player Skyblue has won the game!  The game will be reset.  Play again if you wish");
		location.reload();
	} else if (redTerr == gameBoardSize) {
		alert("Player Red has won the game!  The game will be reset.  Play again if you wish");
		location.reload();
	} else if (orangeTerr == gameBoardSize) {
		alert("Player Orange has won the game!  The game will be reset.  Play again if you wish");
		location.reload();
	} else if (greenTerr == gameBoardSize) {
		alert("Player Green has won the game!  The game will be reset.  Play again if you wish");
		location.reload();
	} else if (violetTerr == gameBoardSize) {
		alert("Player Violet has won the game!  The game will be reset.  Play again if you wish");
		location.reload();
	} else if (pinkTerr == gameBoardSize) {
		alert("Player Pink has won the game!  The game will be reset.  Play again if you wish");
		location.reload();
	} else if (maxTileTitles == 0) {
		alert("Player " + lastStanding() + " has won the game!  The game will be reset.  Play again if you wish");
		location.reload();
	}
}

function lastStanding() {
	var winingTeam;
	var lastTitle = tileTitle[0];
	if (lastTitle == "bluesquare") winingTeam = "Skyblue";
	else if (lastTitle == "redsquare") winingTeam = "Red";
	else if (lastTitle == "orangesquare") winingTeam = "Orange";
	else if (lastTitle == "greensquare") winingTeam = "Green";
	else if (lastTitle == "violetsquare") winingTeam = "Violet";
	else winingTeam = "Pink";
	return winingTeam;
}

function tilePlay(tileId) {
	//call board setup code when needed
	if (currPhase === -1) boardSet(tileId);	
	else {		
		//game play interaction
		//When the phase is even - will be a recruiting phase
		if (currPhase % 2 == 0) {
			recruiting(tileId);
		} else {
			//Else the phase will be odd - attack phase
			attacking(tileId);
			resetTerritoryVal();
			resetIncomeVal();
		}
	}
}

function resetTerritoryVal() {
	document.getElementById("blueTerritories").innerHTML = ('Territories: ' + blueTerr);
	document.getElementById("redTerritories").innerHTML = ('Territories: ' + redTerr);
	document.getElementById("orangeTerritories").innerHTML = ('Territories: ' + orangeTerr);
	document.getElementById("greenTerritories").innerHTML = ('Territories: ' + greenTerr);
	document.getElementById("violetTerritories").innerHTML = ('Territories: ' + violetTerr);
	document.getElementById("pinkTerritories").innerHTML = ('Territories: ' + pinkTerr);
}

function resetIncomeVal(){
	blueIn = blueTerr;
	document.getElementById("blueIncome").innerHTML = ('Income: ' + blueIn);
	redIn = redTerr;
	document.getElementById("redIncome").innerHTML = ('Income: ' + redIn);
	orangeIn = orangeTerr;
	document.getElementById("orangeIncome").innerHTML = ('Income: ' + orangeIn);
	greenIn = greenTerr;
	document.getElementById("greenIncome").innerHTML = ('Income: ' + greenIn);
	violetIn = violetTerr;
	document.getElementById("violetIncome").innerHTML = ('Income: ' + violetIn);
	pinkIn = pinkTerr;
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
			endRecruit(curClass);
		}
		document.getElementById("blueIncome").innerHTML = ('Income: ' + blueIn);
	} else if (curClass == "redsquare") {
		if (redIn > 0) {
			redIn--;
			recruitValid = true;
		} else {
			endRecruit(curClass)
		}
		document.getElementById("redIncome").innerHTML = ('Income: ' + redIn);
	} else if (curClass == "orangesquare") {
		if (orangeIn > 0) {
			orangeIn--;
			recruitValid = true;
		} else {
			endRecruit(curClass);
		}
		document.getElementById("orangeIncome").innerHTML = ('Income: ' + orangeIn);
	} else if (curClass == "greensquare") {
		if (greenIn > 0) {
			greenIn--;
			recruitValid = true;
		} else {
			endRecruit(curClass);
		}
		document.getElementById("greenIncome").innerHTML = ('Income: ' + greenIn);
	} else if (curClass == "violetsquare") {
		if (violetIn > 0) {
			violetIn--;
			recruitValid = true;
		} else {
			endRecruit(curClass);
		}
		document.getElementById("violetIncome").innerHTML = ('Income: ' + violetIn);
	} else {
		if (pinkIn > 0) {
			pinkIn--;
			recruitValid = true;
		} else {
			endRecruit(curClass);
		}
		document.getElementById("pinkIncome").innerHTML = ('Income: ' + pinkIn);
	}
	return recruitValid;
}

function endRecruit(curClass) {
	alert("No more troops to recruit for " + curClass);
	endPhase();
}

function attacking(tileId) {
	var curClass = document.getElementById(tileId).className;
	//Attacking part 0: Select your own tile
	if (attackPhase === 0) {
		document.getElementById("directions").innerHTML = tileTitle[currTileTitle] + ": Select any tile occupied by your color and then click again until it is at 1 or until you hit the commit attack button.";
		//if selected tile owned by other player
		if (curClass !== tileTitle[currTileTitle]) {
			alert("Please select your own tile: " + tileTitle[currTileTitle]);
		} else {
			if (initialAttackSel) {
				attackerTileId = tileId;			
				initialAttackSel = false;
			}
			//Incrament attack phase and reduce troop count	appropriately		
			var troopId = tileId + ' Troops';
			document.getElementById("commitAttack").style.visibility = "visible";
			document.getElementById("continueAttack").style.visibility = "visible";
			var troopCount = document.getElementById(troopId).textContent
			if (troopCount > 1 && !attackCommit) {
				document.getElementById(troopId).textContent--;
				attackingTroopCount++;
			} else {
				attackPhase++;
				initialAttackSel = true;
			}			
		}
	} else if (attackPhase === 1) {
		//Attacking part 1: Select valid tile to attack
		document.getElementById("directions").innerHTML = tileTitle[currTileTitle] + ": Select neighboring tile to your attacking tile.";
		if (curClass == tileTitle[currTileTitle]) {
			alert("Please select a tile other than your own: " + tileTitle[currTileTitle]);
		} else if (validAttack(tileId)){
			//Attack code to determine winners and stuff
			var attackingRoll = 0;
			var defendingRoll = 0;
			var troopId = tileId + ' Troops';
			while(document.getElementById(troopId).textContent > 0 && attackingTroopCount > 0){
				attackingRoll = dieRoll();
				defendingRoll = dieRoll();
				if (attackingRoll > defendingRoll) {
					//Lower the defending troop count					
					document.getElementById(troopId).textContent--;
				} else {
					//Lower the attacking troop count
					attackingTroopCount--;
				}				
			}
			attackPhase = 0;
			if (attackingTroopCount > 0) {
				//The attacker has won - switch ownership
				document.getElementById("battleReport").innerHTML = "The Attacker Won the Battle with " + attackingTroopCount + " troops remaining";
				document.getElementById(tileId).className = (tileTitle[currTileTitle]);
				document.getElementById(troopId).textContent = attackingTroopCount;
				updateTerrVict(tileTitle[currTileTitle]);
				updateTerrLoss(curClass);
				winCondition();
				defendingClass = document.getElementById(tileId).className;
			} else {
				document.getElementById("battleReport").innerHTML = "The Defender Won the Battle with " + document.getElementById(troopId).textContent + " remaining";
			}
			attackingTroopCount = 0; //Reset the troop count
			attackCommit = 0; //Reset for other attacking
		} else {
			alert("Please select a valid tile to attack: " + tileTitle[currTileTitle]);
		}
	}
}

function updatePhase() {
	attackersClass = document.getElementById(attackerTileId).class;
	if(attackersClass == "redsquare" && defendingClass == "bluesquare") {
		currPhase = currPhase - 2;
	} else if (attackersClass == "orangesquare" && defendingClass == "redsquare") {
		currPhase = currPhase - 2;
	} else if (attackersClass == "orangesquare" && defendingClass == "bluesquare") {
		currPhase = currPhase - 2;
	} else if (attackersClass == "greensquare" && defendingClass == "bluesquare") {
		currPhase = currPhase - 2;
	} else if (attackersClass == "greensquare" && defendingClass == "redsquare") {
		currPhase = currPhase - 2;
	} else if (attackersClass == "greensquare" && defendingClass == "orangesquare") {
		currPhase = currPhase - 2;
	} else if (attackersClass == "violetsquare" && defendingClass == "redsquare") {
		currPhase = currPhase - 2;
	} else if (attackersClass == "violetsquare" && defendingClass == "orangesquare") {
		currPhase = currPhase - 2;
	} else if (attackersClass == "violetsquare" && defendingClass == "greensquare") {
		currPhase = currPhase - 2;
	} else if (attackersClass == "violetsquare" && defendingClass == "bluesquare") {
		currPhase = currPhase - 2;
	} else if (attackersClass == "pinksquare" && defendingClass == "orangesquare") {
		currPhase = currPhase - 2;
	} else if (attackersClass == "pinksquare" && defendingClass == "redsquare") {
		currPhase = currPhase - 2;
	} else if (attackersClass == "pinksquare" && defendingClass == "bluesquare") {
		currPhase = currPhase - 2;
	} else if (attackersClass == "pinksquare" && defendingClass == "greensquare") {
		currPhase = currPhase - 2;
	} else if (attackersClass == "pinksquare" && defendingClass == "pinksquare") {
		currPhase = currPhase - 2;
	}
	document.getElementById("currentPhase").innerHTML = (gamePhase[currPhase]);
}

function updateTerrVict(curClass) {
	var colorNewOwner = curClass.substring(0,3);
	if (colorNewOwner == "blu") blueTerr++;
	else if (colorNewOwner == "red") redTerr++;
	else if (colorNewOwner == "ora") orangeTerr++;
	else if (colorNewOwner == "gre") greenTerr++;
	else if (colorNewOwner == "vio") violetTerr++;
	else if (colorNewOwner == "pin") pinkTerr++;
	resetTerritoryVal();
}

function updateTerrLoss(defClass) {
	var colorOldOwner = defClass.substring(0,3);
	if (colorOldOwner == "blu") blueTerr--;
	else if (colorOldOwner == "red") redTerr--;
	else if (colorOldOwner == "ora") orangeTerr--;
	else if (colorOldOwner == "gre") greenTerr--;
	else if (colorOldOwner == "vio") violetTerr--;
	else if (colorOldOwner == "pin") pinkTerr--;
	resetTerritoryVal();
}

function dieRoll() {
	return 1 + Math.floor(Math.random() * 6);
}

function validAttack(targetTileId) {
	var validAttackVar = false;
	var attackerTileIdLen = attackerTileId.length
	var dashLoc = dashLocation(attackerTileIdLen);
	
	var attackerXCor;
	var attackerYCor;
	var subYCor;
	var subXCor;
	
	var validUp;
	var validDown;
	var validLeft;
	var validRight;
	
	var verticalLimitLow = 5;
	var verticalLimitHigh;
	var horizontalLimitLow;
	var horizontalLimitHigh;
	
	if (attackerTileIdLen == 8) {
		//Ex Tile 2-2
		attackerXCor = attackerTileId.substring(5,6);
		attackerYCor = attackerTileId.substring(7,8);
		
		verticalLimitHigh = 7;
		horizontalLimitLow = 6;
		horizontalLimitHigh = 8;
	} else if (attackerTileIdLen == 9) {		
		if (dashLoc == 6) {
			//Ex Tile 2-10
			attackerXCor = attackerTileId.substring(5,6);
			attackerYCor = attackerTileId.substring(7,9);

			verticalLimitHigh = 7;
			horizontalLimitLow = 6;
			horizontalLimitHigh = 9;
		} else {
			//Ex Tile 10-2
			//dashLoc = 7
			attackerXCor = attackerTileId.substring(5,7);
			attackerYCor = attackerTileId.substring(8,9);

			verticalLimitHigh = 8;
			horizontalLimitLow = 7;
			horizontalLimitHigh = 9;
		}
	} else {
		//Ex Tile 10-10
		//length is 10 (starting at 1)
		attackerXCor = attackerTileId.substring(5,7);
		attackerYCor = attackerTileId.substring(8,10);

		verticalLimitHigh = 8;
		horizontalLimitLow = 7;
		horizontalLimitHigh = 10;
	}
	
	subYCor = attackerYCor - 1;
	validUp = attackerTileId.substring(verticalLimitLow,verticalLimitHigh) + (subYCor);
	
	attackerYCor++;
	validDown = attackerTileId.substring(verticalLimitLow,verticalLimitHigh) + attackerYCor;
	
	subXCor = attackerXCor - 1;
	if (subXCor == 0) subXCor = 10;
	validLeft = subXCor + attackerTileId.substring(horizontalLimitLow,horizontalLimitHigh);
	
	attackerXCor++;
	if (attackerXCor == 11) attackerXCor = 1;
	validRight = attackerXCor + attackerTileId.substring(horizontalLimitLow,horizontalLimitHigh);
	
	var targetCord;
	var targetTileIdLen = targetTileId.length;
	if (targetTileIdLen == 8) {
		targetCord = targetTileId.substring(5,8);
	} else if (targetTileIdLen == 9) {
		targetCord = targetTileId.substring(5,9);
	} else {
		//length is 10 (starting at 1)
		targetCord = targetTileId.substring(5,10);
	}
	
	if (targetCord == validUp || targetCord == validDown || targetCord == validLeft || targetCord == validRight) validAttackVar = true;
	return validAttackVar;
}

function dashLocation(attackerTileIdLen) {
	if (attackerTileIdLen == 8){
		//Ex Tile 2-2 (- at 6 for substring)
		return 6;
	} else if (attackerTileIdLen == 9) {
		//Ex Tile 2-10 or 10-2 (- at 6 or 7 for substring)
		if (attackerTileId.substring(6,7) == "-") {
			//- is at 6 for substring
			return 6;
		} else {
			//- is at 7 for substring
			return 7;
		}
	} else {
		//lenth is 10 (- at 7 for substring)
		return 7;
	}
}

function endAttack() {
	attackCommit = true;
	attackPhase = 1;
	initialAttackSel = true;
}

function continueAttacking() {
	attackPhase = 0;
	initialAttackSel = true;
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
		if (occupiedSpacesSet === gameBoardSize) {
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

function endGame() {
	if(confirm("Are you sure you want to quit the game?")) {
		window.open('../home/home.html','_self', false);
	}
	else {
		
	}
}