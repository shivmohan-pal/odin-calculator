const equation = document.querySelector("#equation");
const inputResult = document.querySelector("#input-result");
const buttons = document.querySelectorAll(".btn");

// -----------------------functions & Classes----------------------

class Display {
  constructor() {
    this.lastEquation = '';
    this.input = '0';
    this.result = 0;
  }
  updateScreen() {
    equation.textContent = this.lastEquation;
    inputResult.textContent = this.input === '0' ? this.result : this.input;

  }
  backSpace() {
    let a = this.input.split('');
    a.pop();
    this.input = a.join('');
    this.updateScreen();
  }
  reset() {
    this.lastEquation = '';
    this.input = '0';
    this.result = 0;
    this.updateScreen();
  }
  equalsTo() {
    equation.textContent = `${this.lastEquation} ${this.input} =`;
    this.result = Number(eval(this.lastEquation + this.input));
    inputResult.textContent = this.result;
    this.input = '0';
  }
}
class Calculator {
  constructor() {
    this.screen = new Display();
  }
  allClear() {
    this.screen.reset();
  }
  equals() {
    if (this.screen.input !== '0') this.screen.equalsTo();
  }
  add() {
    if (!this.screen.result) {
      this.screen.result = Number(this.screen.input);
    } else
      this.screen.result += Number(this.screen.input);
    this.screen.lastEquation = `${this.screen.result} +`;
    this.screen.updateScreen();
    this.screen.input = '';
  }
  subtract() {
    if (!this.screen.result) {
      this.screen.result = Number(this.screen.input);
    } else
      this.screen.result -= Number(this.screen.input);
    this.screen.lastEquation = `${this.screen.result} −`;
    this.screen.updateScreen();
    this.screen.input = '';
  }
  divide() {
    if (!this.screen.result) {
      this.screen.result = Number(this.screen.input);
    } else
      this.screen.result /= Number(this.screen.input);
    this.screen.lastEquation = `${this.screen.result} ÷`;
    this.screen.updateScreen();
    this.screen.input = '';
  }
  multiply() {
    if (!this.screen.result) {
      this.screen.result = Number(this.screen.input);
    } else
      this.screen.result *= Number(this.screen.input);
    this.screen.lastEquation = `${this.screen.result} ×`;
    this.screen.updateScreen();
    this.screen.input = '';
  }
  remainder() {
    if (!this.screen.result) {
      this.screen.result = Number(this.screen.input);
    } else
      this.screen.result = this.screen.result % Number(this.screen.input);
    this.screen.lastEquation = `${this.screen.result} %`;
    this.screen.updateScreen();
    this.screen.input = '';
  }
}
function taskManager(key) {
  let numbers = ".0123456789";
  let k = (key === '*') ? "×" : key;
  k = (key == "backspace") ? "⌫" : key;
  k = (key == '-') ? "−" : key;
  k = (key == '/') ? '÷' : key;
  k = (key == '=' || key == 'enter') ? '=' : key;
  switch (k) {
    case '×': calc.multiply();
      break;
    case '÷': calc.divide();
      break;
    case '−': calc.subtract();
      break;
    case '+': calc.add(); console.log(k);
      break;
    case '%': calc.remainder();
      break;
    case 'AC': calc.allClear();
      break;
    case '⌫': calc.screen.backSpace();
      break;
    case '=': calc.equals();
      break;
    default: if (numbers.includes(k)) {
      if (calc.screen.input == '0' || !calc.screen.input) {
        if (k == '.') {
          calc.screen.input = '0' + key;
        } else calc.screen.input = key;
        console.log(calc.screen.result);
      } else {
        if (k == '.') {
          calc.screen.input += calc.screen.input.includes(".") ? '' : key;
        } else
          calc.screen.input += key;
      }
      calc.screen.updateScreen();
    }
      break;
  }
}
// ----------------------------Execution---------------------------

var calc = new Calculator();

buttons.forEach(element => {
  element.addEventListener("click", function () {
    taskManager(this.textContent);
  });
});

document.addEventListener('keypress', function (e) {
  // e.preventDefault();
  console.log(e)
  taskManager(e.key);
});

