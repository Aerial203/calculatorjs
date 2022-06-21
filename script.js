const screen1 = document.querySelector(".screen1")
const screen2 = document.querySelector(".screen2")

const MUL_DIV_REGX = /(?<operand1>\d+)(?<operation>[\/\*])(?<operand2>\d+)/
const ADD_SUB_REGX = /(?<operand1>\d+)(?<operation>[\+\-])(?<operand2>\d+)/


document.addEventListener("click", e => {
    if(!e.target.matches("button")) return
    parse(e.target.value)
})


function parse(data) {
    if (screen2.textContent === "0" && data !== ".") {
        if (data === "ac" || data === "del") {
            screen2.textContent = "0"
            screen1.textContent = ""
        } else {
            screen2.textContent = ""
            screen2.textContent += data
        }
    } else {
        if (data === "ac") {
            screen2.textContent = "0"
            screen1.textContent = ""
        } else if(data === "del") {
            if (screen1.textContent) {
                screen2.textContent = screen1.textContent
                screen1.textContent = ""
            }
            screen2.textContent = screen2.textContent.slice(0, screen2.textContent.length - 1) 
            if (!screen2.textContent) screen2.textContent = "0"
        } else if(data === "=") {
            screen1.textContent =  screen2.textContent
            screen2.textContent = handleMath(screen1.textContent)
        } else {
            screen2.textContent += data
        }   
    }
    
}


function handleMath(equation) {
    if (equation.match(MUL_DIV_REGX)) {
        const result = calculate(equation.match(MUL_DIV_REGX).groups)
        const newEquation = equation.replace(equation.match(MUL_DIV_REGX)[0], result)
        return handleMath(newEquation)
    } else if(equation.match(ADD_SUB_REGX)) {
        const result = calculate(equation.match(ADD_SUB_REGX).groups)
        const newEquation = equation.replace(equation.match(ADD_SUB_REGX)[0], result)
        return handleMath(newEquation)
    }
    return equation
}

function calculate({ operand1, operand2, operation }) {
    operand1 = parseFloat(operand1)
    operand2 = parseFloat(operand2)
    switch(operation) {
        case '*':
            return operand1 * operand2
        case '/':
            return operand1 / operand2
        case '+':
            return operand1 + operand2
        case '-':
            return operand1 - operand2
    }
}