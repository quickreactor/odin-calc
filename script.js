let model = {
    num1: [],
    num2: [],
    result: 0,
    opPressed: false,
    decPointPressed: false,
    operator: '',
    operate: function () {
        switch (this.operator) {
            case '+':
                return +this.num1.join('') + +this.num2.join('');
            case '-':
                return +this.num1.join('') - +this.num2.join('');
            case '*':
                return +this.num1.join('') * +this.num2.join('');
            case '/':
                return +this.num1.join('') / +this.num2.join('');
        }
    }
}
let elements = {
    calcContainer: document.querySelector('#calc-container'),
    numberButtons: document.querySelectorAll('.number-button'),
    opButtons: document.querySelectorAll('.op-button'),
    display: document.querySelector('#maxi-display'),
    miniDisplay: document.querySelector('#mini-display'),
    equalsButton: document.querySelector('#equals-button'),
    clearButton: document.querySelector('#clear-button'),
    decPointButton: document.querySelector('#decimal-point-button'),
}

elements.numberButtons.forEach(e => e.addEventListener('click', handleNumber));
elements.opButtons.forEach(e => e.addEventListener('click', handleOp));
elements.equalsButton.addEventListener('click', handleEquals);
elements.clearButton.addEventListener('click', handleClear);
elements.decPointButton.addEventListener('click', handleDecPoint);

function handleNumber(e) {
    let number = e.target.textContent;
    console.log(number);
    if (model.opPressed) {
        if (+model.num2 === 0) {
            model.num2 = [];
        }
        model.num2.push(number)
    } else {
        if (+model.num1 === 0) {
            model.num1 = [];
        }
        model.num1.push(number);
    }
    updateDisplay();
}

function handleOp(e) {
    let op = e.target.textContent;
    model.decPointPressed = false;
    console.log(op);
    model.operator = op;
    if (model.opPressed === true) {
        handleEquals();
    } else {
        model.opPressed = true;
    }
    model.num2 = [0];
    elements.miniDisplay.textContent = `${model.num1.join("")} ${model.operator}`
}

function handleEquals() {
    model.opPressed = false;
    if (model.operator === '/' && (+model.num1 === 0 || +model.num2 === 0)) {
        handleClear();
        elements.display.textContent = 'Nice try, bucko!';
        return
    }
    model.result = model.operate();
    elements.display.textContent = model.result;
    elements.miniDisplay.textContent = `${model.num1.join("")} ${model.operator} ${model.num2.join("")} = ${model.result}`
    model.num1 = model.result.toString().split("");
}

function handleDecPoint() {
    if (model.decPointPressed === true) {
        return
    } else {
        model.decPointPressed = true;
        if (model.opPressed) {
            model.num2.push('.')
        } else {
            model.num1.push('.');
        }
        updateDisplay();
    };
}

function handleClear() {
    model.num1 = [];
    model.num1 = [];
    model.operator = '';
    model.result = 0;
    elements.display.textContent = 0;
    elements.miniDisplay.textContent = '';
}
function updateDisplay() {
    elements.display.textContent = model.opPressed ? model.num2.join("") : model.num1.join("");
}


handleClear();