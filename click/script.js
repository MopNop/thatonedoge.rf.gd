var clicks = 0;
var cpp = 1;

//upgrades
var extraClicks = 0;
var exclickcost = 10;
var exclickprice = 0; //price increase

const clickbutton = document.getElementById("clickbutton");
const counter = document.getElementById("counter")
const cpptracker = document.getElementById("cpptracker")

function clickd() {
	clicks += cpp;
	counter.textContent = clicks + " Clicks";
}

function exclick() {
    if (clicks >= exclickcost) {
        ++extraClicks;
        ++cpp;
        clicks -= 10;
        ++exclickprice
        if (exclickprice >= 10) {
            exclickprice = 0;
            exclickcost += 5;
        }
        counter.textContent = clicks + " Clicks";
        cpptracker.textContent = cpp + " clicks per press"
    }  
}
    

document.querySelectorAll("button").forEach( function(item) {
    item.addEventListener('focus', function() {
        this.blur();
    })
})