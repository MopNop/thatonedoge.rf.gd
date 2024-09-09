//statistics
var clicks = 0; //amount of clicks
var cpp = 1; //clicks per press
var cps = 0; //clicks per second


//upgrades
const baseexclickcost = 10 / 1.2; //base cost of extra click
const exclickpricemult = 1.2; //extra click price multiplier
const basecpscost = 50 / 1.5; //base cost of click per second
const cpsclickpricemult = 1.5; //click per second price multiplier

var exclickcost = 10;
var cpsclickcost = 50;

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
	updateCosts(); //update the costs
	load(); //load the last save
}

//every tenth of a second
function cpsTick() {
	clicks += cps / 10; //add a tenth of cps to clicks
	updateLabels(); //update the labels
	updateCosts(); //hehe this is slow
}

//when main button clicked
function clickd() {
	clicks += cpp; //add the cpp to clicks
	updateLabels(); //update the labels
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

//update costs
function updateCosts() {
	exclickcost = Math.round(baseexclickcost * (exclickpricemult ** cpp)); //update the price of cpp
	cpsclickcost = Math.round(basecpscost * (cpsclickpricemult ** (cps + 1))); //update the price of cps
}

//update labels
function updateLabels() {
	cpptracker.textContent = cpp + " Clicks per Press"; //update the clicks per press label
	counter.textContent = Math.round(clicks) + " Clicks"; //update the clicks label
	cpstracker.textContent = cps + " Clicks per Second"; //update the clicks per second label
	exclickbutton.textContent = "Extra Click - " + exclickcost + "c";  //update the extra click cost
	cpsclickbutton.textContent = "+1 Click per Second - " + cpsclickcost + "c"; //update the click per second cost
}

//save the game
function save() {
	if(getCookie("clicks") != "NaN") {
		setCookie("clicks", clicks); //save the clicks
		setCookie("cpp", cpp); //save the cpp
		setCookie("cps", cps); //save the cps
	}
}

//load the game
function load() {
	if(getCookie("clicks") != "NaN") {
		clicks = parseFloat(getCookie("clicks")); //load the clicks
		cpp = parseFloat(getCookie("cpp")); //load the cpp
		cps = parseFloat(getCookie("cps")); //load the cps
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
function clearCookies() {
    document.cookie = "clicks=0";
    document.cookie = "cpp=1";
    document.cookie = "cps=0";
}

//echos weird ass solution to unfocus the button
document.querySelectorAll("button").forEach( function(item) {
    item.addEventListener('focus', function() {
        this.blur();
    })
})
