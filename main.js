//Vars
let total = 0; //Number that tracks running total
let calc = 0; //Number that is going to be added/subtracted/etc to the total
let displayNum = 0; //Number displayed on the calc
let calculations = 0; //# Calculations performed in this calculation
let computation = "base"; //Computation state

let newEntry_flag = false; //If the number being entered is ongoing, ie, not just calculated, build the number, otherwise start a new value
let computed_flag = false; //Was the equals operater the last button clicked
let operating_flag = false; //Was an operator button pushed

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
    if (!newEntry_flag) {
      displayNum = "".concat(
        displayNum + Number(num.getAttribute("data-number"))
      );
    } else {
      displayNum = Number(num.getAttribute("data-number"));
      newEntry_flag = false;
      if (computed_flag) {
        total = 0;
        calculations = 0;
        computed_flag = false;
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
  if (!newEntry_flag) {
    displayNum = "".concat(displayNum + ".");
  } else {
    displayNum = ".";
    newEntry_flag = false;
  }
  updateDisplay();
  console.log("total:", total, "Display:", displayNum);
});

//Plus behavior
let plus = document.querySelector("#plus");
plus.addEventListener("click", function (event) {
  computed_flag = false;
  operate();
  computation = "add";
  calculations++;
  compute();
});

//Minus behavior
let minus = document.querySelector("#minus");
minus.addEventListener("click", function (event) {
  computed_flag = false;
  operate();
  computation = "subtract";
  calculations++;
  compute();
});

//Times behavior
let times = document.querySelector("#times");
times.addEventListener("click", function (event) {
  computed_flag = false;
  operate();
  computation = "multiply";
  calculations++;
  compute();
});

//Divide behavior
let divide = document.querySelector("#divide");
divide.addEventListener("click", function (event) {
  computed_flag = false;
  operate();
  computation = "divide";
  calculations++;
  compute();
});

function compute() {
  displayNum = total;
  newEntry_flag = true;
  updateDisplay();
  console.log("total:", total, "Display:", displayNum);
}

//Equals behavior
let equals = document.querySelector("#equals");
equals.addEventListener("click", function (event) {
  operate();
  displayNum = total;
  newEntry_flag = true;
  computed_flag = true;
  computation = "base";
  updateDisplay();
  console.log("total:", total, "Display:", displayNum);
});

function operate() {
  if (!computed_flag) {
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
