//statistics
var clicks = 0; //amount of clicks
var cpp = 1; //clicks per press
var cps = 1; //clicks per second

//upgrades
var exclickcost = 10; //cost of extra click
var exclickpricemult = 1.2; //extra click price multiplier
var cpsclickcost = 50; //cost of click per second
var cpsclickpricemult = 1.5; //click per second price multiplier

//misc vars
var intervalID = window.setInterval(cpsTick, 100); //sets a variable for some random shit man idk

//element constants
const clickbutton = document.getElementById("clickbutton"); //button that you click
const counter = document.getElementById("counter"); //text for each click
const cpptracker = document.getElementById("cpptracker"); //click per press tracker
const cpstracker = document.getElementById("cpstracker"); //clicks per second tracker
const exclickbutton = document.getElementById("exclickbutton"); //button to buy extra clicks
const cpsclickbutton = document.getElementById("cpsclickbutton"); //button to buy clicks per second

//run loaded() when the window is loaded
window.onload = loaded();

//when the page is loaded
function loaded() {
	updateLabels(); //update the labels
}

//every tenth of a second
function cpsTick() {
	clicks += (cps - 1) / 10; //add a tenth of cps to clicks
	updateLabels();
}

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
		exclickcost = Math.round(exclickcost * exclickpricemult); //update the price
		updateLabels(); //update the labels
	}  
}

//when click per second button clicked
function cpsclick() {
	//if affordable
	if (clicks >= cpsclickcost) {
		clicks -= cpsclickcost; //subtract the cost
		++cps; //add 1 to the cps
		cpsclickcost = Math.round(50 * (1.25 ** cps); //update the price
		updateLabels(); //update the labels
	}
}

//update labels
function updateLabels() {
	cpptracker.textContent = cpp + " Clicks per Press"; //update the clicks per press label
	counter.textContent = Math.round(clicks) + " Clicks"; //update the clicks label
	cpstracker.textContent = (cps - 1) + " Clicks per Second"; //update the clicks per second label
	exclickbutton.textContent = "Extra Click - " + exclickcost + "c";  //update the extra click cost
	cpsclickbutton.textContent = "+1 Click per Second - " + cpsclickcost + "c"; //update the click per second cost
}

//echos weird ass solution to unfocus the button
document.querySelectorAll("button").forEach( function(item) {
    item.addEventListener('focus', function() {
        this.blur();
    })
})
