var gamePhase = new Array("Skyblue Recruit", "Skyblue Attack", "Red Recruit", "Red Attack", "Orange Recruit", "Orange Attack", "Green Recruit", 
						"Green Attack", "Violet Recruit", "Violet Attack", "Pink Recruit", "Pink Attack");
var gameStart = new Array("Skyblue Select", "Red Select", "Orange Select", "Green Select", "Violet Select", "Pink Select");
var tileTitle = new Array("bluesquare", "redsquare", "orangesquare", "greensquare", "violetsquare", "pinksquare");
var currPhase = -1;
var currStart = 0;
var occupiedSpacesSet = 0; //Max for board is 56

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
	if(currPhase === 11) currPhase = 0;
	document.getElementById("currentPhase").innerHTML = (gamePhase[++currPhase]);
}



function tilePlay(tileId) {
	//call board setup code
	boardSet(tileId);	
	
	//game play interaction
}


function boardSet(tileId) {
	//variable for the current class
	var curClass = document.getElementById(tileId).className
	//board setup code
	if (currPhase === -1){
		//check to see if the tile is occupied
		if (curClass !== "square") alert("Please select an unoccupied tile");
		else {
			//Change the class of the tile to change color
			document.getElementById(tileId).className = (tileTitle[currStart]);	
			curClass = document.getElementById(tileId).className;
			//Update territory and income for that player
			territorySet(curClass);
			//incomeSet(curClass);
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

function incomeSet(curClass) {
	
}