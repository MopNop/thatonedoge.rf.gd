//statistics
var clicks = 0; //amount of clicks
var cpp = 1; //clicks per press
var cps = 0; //clicks per second
var multreduct = 0; //mult reduction
var mult = 1; //cpp multiplier
var totalClicks = 0;
var ascensionMult = 1;

//upgrades
const baseexclickcost = 10 / 1.1; //base cost of extra click
const exclickpricemult = 1.1; //extra click price multiplier
const basecpscost = 50 / 1.25; //base cost of click per second
const cpsclickpricemult = 1.25; //click per second price multiplier
const basemultreductcost = 250 / 1.75; //multbar reduction base cost
const multreductpricemult = 1.75; //multbar reduction price multiplier

var exclickcost;
var cpsclickcost;
var multreductcost;

//misc vars
var intervalID = window.setInterval(cpsTick, 100); //sets a variable for some random shit man idk
var click = false; //what
var clicktimer = 0; // this just makes it so the bar doenst immediately go down when you stop clicking
var multbarmax = 20; //maximum of the multiplier bar
const multbarincrease = 1.2; //multiplier for the max
var goldenClickTime = 0;
var normal = true;
var ascensions = 0;

//element constants
const clickbutton = document.getElementById("clickbutton"); //button that you click
const counter = document.getElementById("counter"); //text for each click
const cpptracker = document.getElementById("cpptracker"); //click per press tracker
const cpstracker = document.getElementById("cpstracker"); //clicks per second tracker
const totalTracker = document.getElementById("clicksTracker"); //click per press tracker
const ascensionTracker = document.getElementById("ascTracker"); //click per press tracker
const multiplierTracker = document.getElementById("multTracker"); //click per press tracker
const exclickbutton = document.getElementById("exclickbutton"); //button to buy extra clicks
const cpsclickbutton = document.getElementById("cpsclickbutton"); //button to buy clicks per second
const multbar = document.getElementById("multiplierprog"); //multiplier progress bar
const multtext = document.getElementById("multipliernum"); //multiplier text
const multreducttext = document.getElementById("multreductbutton"); //multiplier button text
const ascensionMultLabel = document.getElementById("ascensionMult");
const nextAscensionLabel = document.getElementById("ascendFuture");
const ascendButton = document.getElementById("ascendButton");


//run loaded() when the window is loaded
window.onload = loaded();

//when the page is loaded
function loaded() {
	updateLabels(); //update the labels
	updateCosts(); //update the costs
	load(); //load the last save
}

//every tenth of a second
function cpsTick() {
	updateClick(cps); //add a cps to clicks
	updateLabels(); //update the labels
	updateCosts(); //hehe this is slow
}

//when main button clicked
function clickd() {
	click = true;
	clicktimer = 3;
	updateClick(cpp*mult); //add the cpp to clicks
	updateLabels(); //update the labels
	if (multbar.value == multbarmax) { //if the bar is at the max value
		++mult; //up the multiplier
		multbarmax = Math.round(multbarmax * multbarincrease); //set the maximum to a rounded version of the current max * 1.2
		multbar.value = 0; //reset the multiplier bar value
	}
	else {
		multbar.value = multbar.value + multreduct; //increase the value 
	}
	save(); //save the game
}

//when extra click button clicked
function exclick() {
	//if affordable
	if (clicks >= exclickcost) {
		clicks -= exclickcost; //subtract the cost
		++cpp; //add 1 to the cpp
		updateCosts(); //update the costs
		updateLabels(); //update the labels
	}
	save(); //save the game
}

//when click per second button clicked
function cpsclick() {
	//if affordable
	if (clicks >= cpsclickcost) {
		clicks -= cpsclickcost; //subtract the cost
		++cps; //add 1 to the cps
		updateCosts(); //update the costs
		updateLabels(); //update the labels
	}
	save(); //save the game
}

//when reduce mult button clicked
function multreductclick() {
	//if affordable
	if (clicks >= multreductcost) {
		clicks -= multreductcost; //subtract the cost
		++multreduct; //add one to mult reduct
		updateCosts(); //update the costs
		updateLabels(); //update the labels
	}
	save(); //save the game
}


//update costs
function updateCosts() {
	exclickcost = priceEquation(baseexclickcost, exclickpricemult, cpp); //update the price of cpp
	cpsclickcost = priceEquation(basecpscost, cpsclickpricemult, cps, 1); //update the price of cps
	multreductcost = priceEquation(basemultreductcost, multreductpricemult, multreduct, 1); //update the price of mult reduction
}

//update labels
function updateLabels() {
	var ascendMult = Math.pow(totalClicks, 0.1);
	cpptracker.textContent = cpp + " Clicks per Press (x" + mult + ")"; //update the clicks per press label
	counter.textContent = Math.round(clicks) + " Clicks"; //update the clicks label
	cpstracker.textContent = (cps * 10)+ " Clicks per Second"; //update the clicks per second label
	totalTracker.textContent = "Total Clicks: " + Math.round(totalClicks); //update the total clicks label
	ascensionTracker.textContent = "Ascensions: " + ascensions; //update the ascension label
	multiplierTracker.textContent = "Multiplier Reduction: " + multreduct; //update the multiplier label
	exclickbutton.textContent = "Extra Click - " + exclickcost + "c";  //update the extra click cost
	cpsclickbutton.textContent = "+10 Clicks per Second - " + cpsclickcost + "c"; //update the click per second cost
	multtext.textContent = "x"+mult+" Clicks per Press"; //set the multiplier text
	multreducttext.textContent = "Increase Clicks for Multiplier by 1 - " + multreductcost + "c";
	ascensionMultLabel.textContent = "Ascension Multiplier: x" + ascensionMult.toFixed(2);
	nextAscensionLabel.textContent = "Next Ascension Multiplier: x" + ascendMult.toFixed(2);

	multbar.max = multbarmax;
	
	if (clicktimer > 0) { //makes it so that it doesn't go off immediately
		--clicktimer; //subtract from clicktimer
	}
	else {
		click = false; //start counting down
	}

	
	if (multbar.value > 0 && !click) { //if the bar value is counting down and greater than 0
		multbar.value -= Math.round((mult * 0.3) * (multbarmax * 0.1)); //count the bar down
	}
	else if (multbar.value >= 0 && mult > 1 && !click) { //if the bar value is counting down and at 0
		multbarmax = multbarmax / multbarincrease; //reduce the max by 2
		multbar.max = multbarmax;
		multbar.value = multbarmax; //set the value to the max
		--mult; //reduce the multiplier
	}

	if (ascendMult <= ascensionMult) {
		ascendButton.disabled = true;
	} else {
		ascendButton.disabled = false;
	}

	goldenClickTick();
	
	
}

function w3_open() {
	document.getElementById("mySidebar").style.display = "block";
}
  
function w3_close() {
	document.getElementById("mySidebar").style.display = "none";
}

//save the game
function save() {
	setCookie("clicks", clicks); //save the clicks
	setCookie("cpp", cpp); //save the cpp
	setCookie("cps", cps); //save the cps
	setCookie("multreduct", multreduct); //save the multreduct
	setCookie("ascMult", ascensionMult);
	setCookie("totalClicks", totalClicks);
	setCookie("ascensions", ascensions);
}

//load the game
function load() {
	if(getCookie("clicks") != "NaN" && getCookie("clicks") != "") {
		clicks = parseFloat(getCookie("clicks")); //load the clicks
		cpp = parseFloat(getCookie("cpp")); //load the cpp
		cps = parseFloat(getCookie("cps")); //load the cps
		multreduct = parseFloat(getCookie("multreduct")); //load the multreduct
		ascensionMult = parseFloat(getCookie("ascMult"));
		totalClicks = parseFloat(getCookie("totalClicks"));
		ascensions = parseFloat(getCookie("ascensions"));
	}
}

//Sets a cookie
function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";";
}

//Gets a cookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//clears the cookies
function clearData() {
    document.cookie = "clicks=0";
    document.cookie = "cpp=1";
    document.cookie = "cps=0";
	document.cookie = "multreduct=0";
	document.cookie = "ascMult=1";
	document.cookie = "totalClicks=0";
	document.cookie = "ascensions=0";
	ascensions = 0;
	setVars(); //reset the variables
	loaded(); //update labels and stuff
}

//sets some variables
function setVars() {
	//statistics
	clicks = 0; //amount of clicks
	cpp = 1; //clicks per press
	cps = 0; //clicks per second
	multbarmax = 20;
	mult = 1;
	multreduct = 0
	totalClicks = 0;
}

//function for the equation for calculating prices
function priceEquation(basecost, costmult, unit, add = 0) {
	return Math.round(basecost * (costmult ** (unit + add)));
}

function goldenClickTick() {
	++goldenClickTime;
	if (goldenClickTime == 1000000) {
		console.log("GOLDEN CLICK");
		goldenClickTime = 0;
		goldenClick();
	}
}

function updateClick(clicksToAdd) {
	clicks += clicksToAdd * ascensionMult;
	totalClicks += clicksToAdd * ascensionMult;
}

function goldenClick () {
	return; //if you dont start commenting your code im going to kiss you i mean kiss you i mean kill you
}

function ascend() {
	var ascensionTemp = Math.pow(totalClicks, 0.1);
	console.log(ascensions);
	if(ascensionMult < ascensionTemp) {
		console.log("logic met");
		ascensionMult = ascensionTemp;
		setVars();
		ascensions = ascensions + 1;
		save();
	}
}

//echos weird ass solution to unfocus the button
document.querySelectorAll("button").forEach( function(item) {
	item.addEventListener('focus', function() {
		this.blur();
	})
})
