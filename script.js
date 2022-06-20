const screen1 = document.querySelector(".screen1")
const screen2 = document.querySelector(".screen2")

const MUL_DIV_REGX = /(?<operand1>\S+)(?<operation>[\/\*])(?<operand2>\S+)/

document.addEventListener("click", e => {
    if(!e.target.matches("button")) return
    parse(e.target.value)
})


function parse(data) {
    if (screen2.textContent === "0" && data !== ".") {
        if (data === "ac" || data === "del") {
            screen2.textContent = "0"
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
            screen2.textContent = handleMath(data)
        } else {
            screen2.textContent += data
        }   
    }
    
}


function handleMath(equation) {
    // const data = equation.match(REGX_MUL_DIV)
    // console.log(data)
    return "answer"
}

