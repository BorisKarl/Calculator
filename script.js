//global variables
let firstOperand = "";
let secondOperand = "";
let operatorMethod  = "";
let reset = false;


//DOM elements
const numbers = document.querySelectorAll("button[data-number]");
const secondDisplay  = document.getElementById("vorherigerScreen");
const firstDisplay = document.getElementById("aktuellerScreen");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const loeschen = document.getElementById('delete');
const operateButtons = document.querySelectorAll("button[data-operator]")


//eventListeners with more than one button with forEach()

numbers.forEach((button) => {
    button.addEventListener('click', (e) => {
        appendNumber(e.target.id)
    })
})

operateButtons.forEach((button)=> {
        button.addEventListener('click', (e)=> {
            getOperator(e.target.innerHTML)
        })
    })

//eventListener single button

equal.addEventListener('click', toOperate);
clear.addEventListener('click', allClear);
loeschen.addEventListener('click', loesch)


//functions

function loesch() {
    firstDisplay.textContent = firstDisplay.textContent.slice(0,-1)
}

function allClear() {
    firstDisplay.textContent = "";
    secondDisplay.textContent = "";
    firstOperand = "";
    secondOperand = "";
    operatorMethod = "";
}

function appendNumber(number) {
    if(number === NaN) {
        return
    }else if(firstDisplay.textContent === "0" || reset){
     resetDisplay()
     firstDisplay.textContent += number
    }else{
    firstDisplay.textContent += number
    }
  }

function resetDisplay() {
    firstDisplay.textContent = "";
    reset = false;
}

function getOperator(operator) {
    if(operatorMethod !== "") {
        toOperate()
    }else{
        //store first operand
      firstOperand = firstDisplay.textContent;
      //store operating method
      operatorMethod = operator;
      //clear display
      firstDisplay.textContent = "";
      //keep track of calculation
      secondDisplay.textContent = `${firstOperand} ${operatorMethod}`;
      reset = true;
    }
}
    
function toOperate() {
    //store second operand
    secondOperand = firstDisplay.textContent;
    //calculate
    firstDisplay.textContent = operate(operatorMethod, firstOperand, secondOperand)
    //keep track of calculation
    secondDisplay.textContent = `${firstOperand} ${operatorMethod} ${secondOperand} = `;
    operatorMethod = "";
}

function operate(operator, a, b) {

    if (operator === "+") 
       {
           return addi(a,b);
        }
       if(operator === "-"){
           return subtract(a,b);
       }
       if(operator === "x") {
           return multiply(a,b);
       }
       if(operator === "/") {
           return divide(a,b);
       }
    }
    
    
    function addi(a, b) {
        //string to Integer with parseInt()
        return parseInt(a) + parseInt(b);
    }
    
     const subtract = function(a, b) {
        return parseInt(a) - parseInt(b);
          
      }
    
      const multiply = function(a, b) {
        return parseInt(a) * parseInt(b);
      }
    
      const divide = function(a, b) {
        if( b == 0) {
            firstDisplay.innerHTML = "Can not divide with 0"
        }else{  
        return parseInt(a) / parseInt(b);
        }
      }