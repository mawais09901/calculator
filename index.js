const digits = document.querySelectorAll('.number');
const display = document.querySelector('.number-display');
const operators = document.querySelectorAll('.operator');
const zeroButton = document.querySelector('.zero');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0 || num2 === "0") {
        return "Error! Division By Zero";
    }
    return num1 / num2;
}

function operate(operator, num1, num2) {

    let result;

    if (operator === "+") {
        result = add(num1, num2)
    }

    if (operator === "-") {
        result = subtract(num1, num2)
    }

    if (operator === "x") {
        result = multiply(num1, num2)
    }

    if (operator === "÷") {
        result = divide(num1, num2)
    }

    return result;
}

let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let result = '';
let currentNumber = '';
let euqalClicked = false;
let modified = '';

digits.forEach(digit => digit.addEventListener('click', () => {

    if (euqalClicked) {
        result = '';
        firstNumber = '';
        secondNumber = '';
        currentOperator = '';
        euqalClicked = false;
    }

    currentNumber = digit.getAttribute('data-value');

    if (currentOperator === '') {
        firstNumber += currentNumber
        display.textContent = firstNumber
    }

    else {
        secondNumber += currentNumber
        display.textContent = secondNumber
    }

    currentNumber = '';

}))

operators.forEach(operator => operator.addEventListener('click', (e) => {

    if (currentOperator !== '') {

        display.textContent = '';
        result = operate(currentOperator, parseInt(firstNumber), parseInt(secondNumber))
        display.textContent = result;
        firstNumber = result;
        secondNumber = '';
        currentOperator = operator.getAttribute('data-operator');
        
    }

    else {
        display.textContent = ''
        currentOperator = operator.getAttribute('data-operator');
    }

}))

equalsButton.addEventListener('click', () => {

    if (firstNumber !== "" && secondNumber !== "") {
        euqalClicked = true
        result = operate(currentOperator, parseInt(firstNumber), parseInt(secondNumber))
        if (result === result.toString()) {
            display.textContent = result;
        }
        else {
            display.textContent = Math.floor(result * 100) / 100;
        }
    }
})

clearButton.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    result = '';
    currentNumber = '';
    euqalClicked = false;
    display.textContent = 0;
})

deleteButton.addEventListener('click', () => {
    modified = display.textContent.slice(0, -1);
    display.textContent = modified

    if (currentOperator === '') {
        firstNumber = modified;
    }
    else {
        secondNumber = modified;
    }
})