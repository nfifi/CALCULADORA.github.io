const numbers = document.querySelectorAll("[data_number]");
const operations = document.querySelectorAll("[data_operator]");
const equal = document.querySelector("[data_equal]");
const del = document.querySelector("[data_delete]");
const allClear = document.querySelector("[data_all_clear]");
const signal = document.querySelector("[data_signal]");
const previousOperandTextElement = document.querySelector("[data_previous_operand]");
const currentOperandTextElement = document.querySelector("[data_current_operand]");


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    formatDisplayNumber(number) {
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    changeSignal() {
        if (this.currentOperand === "") return;
        this.currentOperand = this.currentOperand.toString() * (-1);
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (this.currentOperand.includes('.') && number === '.') return;
        if (this.currentOperand === '' && number === '.') return;
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    calculate() {
        let result;

        const _previousOperand = parseFloat(this.previousOperand);
        const _currentOperand = parseFloat(this.currentOperand);
        if (isNaN(_currentOperand) || isNaN(_previousOperand)) return;

        switch (this.operation) {
            case '+':
                result = _previousOperand + _currentOperand;
                break;
            case '-':
                result = _previousOperand - _currentOperand;
                break;
            case '*':
                result = _previousOperand * _currentOperand;
                break;
            case '/':
                result = _previousOperand / _currentOperand;
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.calculate()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ""}`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
    }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

for (const number of numbers) {
    number.addEventListener('click', () => {
        calculator.appendNumber(number.innerText);
        calculator.updateDisplay();
    });
}

for (const operation of operations) {
    operation.addEventListener('click', () => {
        calculator.chooseOperation(operation.innerText);
        calculator.updateDisplay();
    });
}



allClear.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

equal.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});

del.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

signal.addEventListener('click', () => {
    calculator.changeSignal();
    calculator.updateDisplay();
});

