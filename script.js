const equation = document.querySelector("#equation");
const inputResult = document.querySelector("#input-result");
const buttons = document.querySelectorAll(".btn");

// -----------------------functions & Classes----------------------

class Display {
  constructor() {
    this.equation = '';
    this.input = '0';
    this.result = 0;
  }
  updateScreen() {
    equation.textContent = this.equation;
    inputResult.textContent = this.input === '0' ? this.result : this.input;

  }
  backSpace() {
    this.input = this.input.length == 1 ? '0' : this.input.slice(0, -1);
  }
}

var divide = (a, b) => a / b;
var multiply = (a, b) => a * b;
var add = (a, b) => a + b;
var subtract = (a, b) => a - b;
var remainder = (a, b) => a % b;

function reset() {
  screen.equation = '';
  screen.input = '0';
  screen.result = input1 = input2 = 0;
  currentOperator = null;
}

function equals(operator, TF) {
  if (input2) {
    screen.result = Math.round(operations(operator, input1, input2) * 1000) / 1000; 
    screen.equation = TF ? `${input1} ${operator} ${input2} =` : `${screen.result} ${operator}`;
    input1 = screen.result;
    input2 = 0;
  }
  else {
    screen.equation = `${input1} ${operator}`;
  }
}

function dotHandling(key) {
  if (screen.input == '0' || screen.input == '') screen.input = '0';
  screen.input += screen.input.includes(".") ? '' : key;
}

function numberHandling(key) {
  screen.input = screen.input == '0' ? key : screen.input + key;
  screen.result = 0;
}

function operatorConverter(key) {
  if (key == '*') return "×";
  if (key == "Backspace" || key == "⌫") return "⌫";
  if (key == '-') return "−";
  if (key == '/') return '÷';
  if (key == '=' || key == 'Enter') return '=';
  return key;
}

function operations(operator, a, b) {
  screen.input = '0';
  if (b) {
    switch (operator) {
      case '×': return multiply(a, b);
      case '÷': return divide(a, b);
      case '−': return subtract(a, b);
      case '+': return add(a, b);
      case '%': return remainder(a, b);
      default: return null;
    }
  }
}

function machine(key) {
  let numbers = ".0123456789";
  let operators = "÷×−+%";
  let inputOperator = operatorConverter(key);
  if (operators.includes(inputOperator)) {
    operations(inputOperator, input1, input2);
    currentOperator = inputOperator;
    equals(currentOperator, false);
  }
  if (key == 'AC' || key == "Escape") reset();
  if (operatorConverter(key) == '⌫') screen.backSpace();
  if (operatorConverter(key) == '=' && input2) equals(currentOperator, true);
  if (numbers.includes(key)) {
    if (key == '.') dotHandling(key);
    else numberHandling(key);
  }
  if (input1 && currentOperator) {
    input2 = Number(screen.input);
  }
  else {
    input1 = Number(screen.input);
  }
  screen.updateScreen();
}

// ----------------------------Execution---------------------------

var input1 = 0;
var input2 = 0;
var currentOperator = null;
var screen = new Display();

buttons.forEach(button => {
  button.addEventListener("click", function () {
    machine(this.textContent);
  });
});

document.addEventListener('keydown', function (e) {
  e.preventDefault();
  machine(e.key);
});

