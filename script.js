//global variables
let firstOperand = "0";
let secondOperand = "";
let operatorMethod  = "";
let displayWert = '';
let reset = false;


//DOM elements
const numbers = document.querySelectorAll("button[data-number]");
const secondDisplay  = document.getElementById("vorherigerScreen");
const firstDisplay = document.getElementById("aktuellerScreen");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const loeschen = document.getElementById('delete');
const operateButtons = document.querySelectorAll("button[data-operator]")
const pointButton = document.getElementById("point"); 
const bildschirm = document.getElementById('bildschirm')

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
pointButton.addEventListener('click', appendPoint)
window.addEventListener('keydown', handleKeyboardInput)


//functions


function limitDisplay() {
    firstDisplay.innerText = displayWert;
    if(displayWert.length > 9) {
        firstDisplay.innerText = displayWert.substring(0, 9); 
    }
}


function loesch() {
    firstDisplay.textContent = firstDisplay.textContent.slice(0,-1)
}

/*

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
    if(displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}
  
updateDisplay();

*/



function allClear() {
    firstDisplay.textContent = "0";
    secondDisplay.textContent = "";
    firstOperand = "";
    secondOperand = "";
    operatorMethod = "";
}

function appendNumber(number) {
    if(firstDisplay.textContent === "0" || reset){
     resetDisplay()
     firstDisplay.textContent += number;
     displayWert = firstDisplay.textContent;

     if(displayWert.length > 16){
        firstDisplay.textContent = displayWert.substring(0,16)
    }
    }else{
    firstDisplay.textContent += number;
    displayWert = firstDisplay.textContent;
    if(displayWert.length > 16){
        firstDisplay.textContent = displayWert.substring(0,16)
    }
}
}
  

function resetDisplay() {
    firstDisplay.textContent = "";
    reset = false;
}

function getOperator(operator) {
    if(operatorMethod === "÷" || operatorMethod === "x" || operatorMethod === "+" || operatorMethod === "-") 
        toOperate()
    
        //store first operand
      firstOperand = firstDisplay.textContent;
      //store operating method
      operatorMethod = operator;
      //clear display
      firstDisplay.textContent = "";
      //keep track of calculation
      secondDisplay.textContent = `${firstOperand} ${operatorMethod}`;
      //reset = true;
    
}

function appendPoint() {
    if (firstDisplay.textContent.includes(".")){
        return
    }else{
        firstDisplay.textContent += ".";
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
       if(operator === "÷") {
           return divide(a,b);
       }
    }
    
    
    function addi(a, b) {
        //string to Integer with parseInt()
        let result = parseFloat(a) + parseFloat(b);
        return Math.round(result * 10000) / 10000;
    }
    
     const subtract = function(a, b) {
        let result = parseFloat(a) - parseFloat(b);
        return Math.round(result * 10000) / 10000;
          
      }
    
      const multiply = function(a, b) {
        let result = parseFloat(a) * parseFloat(b);
        return Math.round(result * 10000) / 10000;
      }
    
      const divide = function(a, b) {
        if( b == 0) {
            firstDisplay.innerHTML = "Can not divide with 0"
        }else{  
        let result = parseFloat(a) / parseFloat(b);
        return Math.round(result * 10000) / 10000;

v        }
      }

      //keyboard support
      function handleKeyboardInput(e) {
        if (e.which >= 47 && e.which <= 57) appendNumber(e.key)
        if (e.key === '.') appendPoint()
        if (e.key === '=' || e.key === 'Enter') toOperate()
        if (e.key === 'Backspace') loesch()
        if (e.key === 'Escape') allClear()
        if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === 'x')
          getOperator(keyReturn(e.key))
      }
      

      function keyReturn(keyInput) {
          if(keyInput === "/") return "÷";
          if(keyInput === "+") return "+";
          if(keyInput === "-") return "-";
          if(keyInput === "x") return "x";

      }