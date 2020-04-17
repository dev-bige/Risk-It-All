var gamePhase = new Array("Skyblue Recruit", "Skyblue Attack", "Red Recruit", "Red Attack", "Orange Recruit", "Orange Attack", "Green Recruit", 
						"Green Attack", "Violet Recruit", "Violet Attack", "Pink Recruit", "Pink Attack");
var currPhase = 0;

function endPhase() {
	if(currPhase === 11) currPhase = 0;
	document.getElementById("currentPhase").innerHTML = (gamePhase[currPhase++]);
}