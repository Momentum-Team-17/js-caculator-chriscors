//Collecting page elements

// let num1 = document.querySelector("#1");
// let num2 = document.querySelector("#2");
// let num3 = document.querySelector("#3");
// let num4 = document.querySelector("#4");
// let num5 = document.querySelector("#5");
// let num6 = document.querySelector("#6");
// let num7 = document.querySelector("#7");
// let num8 = document.querySelector("#8");
// let num9 = document.querySelector("#9");
// let num0 = document.querySelector("#0");

//Vars
let total = 0; //Number that tracks running total
let calc = 0; //Number that is going to be added/subtracted/etc to the total
let displayNum = 0; //Number displayed on the calc
let newEntry = false; //If the number being entered is ongoing, ie, not just calculated, build the number, otherwise start a new value
let computed = false; //Was the equals operater the last button clicked
let calculations = 0; //# Calculations performed in this calculation
let computation = "base"; //Computation state

//Update display content
let output = document.querySelector("#output");
function updateDisplay() {
  output.textContent = displayNum;
}

//Num behavior
let nums = document.querySelectorAll(".num");

for (let num of nums) {
  num.setAttribute("data-number", num.innerText);
  num.addEventListener("click", function (event) {
    if (!newEntry) {
      displayNum = "".concat(
        displayNum + Number(num.getAttribute("data-number"))
      );
    } else {
      displayNum = Number(num.getAttribute("data-number"));
      newEntry = false;
      if (computed) {
        total = 0;
        calculations = 0;
        computed = false;
        computation = "base";
      }
    }
    updateDisplay();
  });
}

//clear behavior
let clear = document.querySelector("#clear");
clear.addEventListener("click", function (event) {
  total = 0;
  calc = 0;
  displayNum = 0;
  calculations = 0;
  computation = "base";
  updateDisplay();
  console.log("total:", total, "Display:", displayNum);
});

//decimal behavior
let decimal = document.querySelector("#decimal");
decimal.addEventListener("click", function (event) {
  if (!newEntry) {
    displayNum = "".concat(displayNum + ".");
  } else {
    displayNum = ".";
    newEntry = false;
  }
  updateDisplay();
  console.log("total:", total, "Display:", displayNum);
});

//Plus behavior
let plus = document.querySelector("#plus");
plus.addEventListener("click", function (event) {
  computed = false;
  operate();
  computation = "add";
  calculations++;
  compute();
});

//Minus behavior
let minus = document.querySelector("#minus");
minus.addEventListener("click", function (event) {
  computed = false;
  operate();
  computation = "subtract";
  calculations++;
  compute();
});

//Times behavior
let times = document.querySelector("#times");
times.addEventListener("click", function (event) {
  computed = false;
  operate();
  computation = "multiply";
  calculations++;
  compute();
});

//Divide behavior
let divide = document.querySelector("#divide");
divide.addEventListener("click", function (event) {
  computed = false;
  operate();
  computation = "divide";
  calculations++;
  compute();
});

function compute() {
  displayNum = total;
  newEntry = true;
  updateDisplay();
  console.log("total:", total, "Display:", displayNum);
}

//Equals behavior
let equals = document.querySelector("#equals");
equals.addEventListener("click", function (event) {
  operate();
  displayNum = total;
  newEntry = true;
  computed = true;
  computation = "base";
  updateDisplay();
  console.log("total:", total, "Display:", displayNum);
});

function operate() {
  if (!computed) {
    switch (computation) {
      case "add":
        total += Number(displayNum);
        break;
      case "subtract":
        total -= Number(displayNum);
        break;
      case "divide":
        total /= Number(displayNum);
        break;
      case "multiply":
        total *= Number(displayNum);
        break;
      case "base":
        total = Number(displayNum);
        break;
      default:
        break;
    }
  }
}
