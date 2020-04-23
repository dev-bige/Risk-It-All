var gamePhase = new Array("Skyblue Recruit", "Skyblue Attack", "Red Recruit", "Red Attack", "Orange Recruit", "Orange Attack", "Green Recruit", 
						"Green Attack", "Violet Recruit", "Violet Attack", "Pink Recruit", "Pink Attack");
var gameStart = new Array("Skyblue Select", "Red Select", "Orange Select", "Green Select", "Violet Select", "Pink Select");
var tileTitle = new Array("bluesquare", "redsquare", "orangesquare", "greensquare", "violetsquare", "pinksquare");
var currPhase = -1;
var currStart = 0;

function endPhase() {
	if(currPhase === 11) currPhase = 0;
	document.getElementById("currentPhase").innerHTML = (gamePhase[++currPhase]);
}



function tilePlay(tileId) {
	//board setup code
	if (currPhase === -1){
		document.getElementById(tileId).className = (tileTitle[currStart]);
		document.getElementById("currentPhase").innerHTML = (gameStart[++currStart]);	
		if(currStart === 6) currStart = 0;		
	}
}