//statistics
var clicks = 0; //amount of clicks
var cpp = 1; //clicks per press

//upgrades
var exclickcost = 10; //cost of extra click
var exclickpricemult = 0.2; //extra click price multiplier

//element constants
const clickbutton = document.getElementById("clickbutton"); //button that you click
const counter = document.getElementById("counter"); //text for each click
const cpptracker = document.getElementById("cpptracker"); //click per press tracker

//when main button clicked
function clickd() {
	clicks += cpp; //add the cpp to clicks
	updateLabels(); //update the labels
}

//when extra click button clicked
function exclick() {
	//if affordable
	if (clicks >= exclickcost) {
		clicks -= exclickcost; //subtract the cost
		++cpp; //add 1 to the cpp
		exclickcost = exclickcost * exclickpricemult; //update the price
		updateLabels(); //update the labels
	}  
}

//update labels
function updateLabels() {
	cpptracker.textContent = cpp + " clicks per press"; //update the clicks per press label
	counter.textContent = clicks + " Clicks"; //update the clicks label
}

//echos weird ass solution to unfocused the button
document.querySelectorAll("button").forEach( function(item) {
    item.addEventListener('focus', function() {
        this.blur();
    })
})
