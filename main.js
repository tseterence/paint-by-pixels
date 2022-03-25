const container = document.querySelector("#gridContainer")
const containerDim = document.querySelector("#gridContainer").clientHeight


const pickerBtn = document.querySelector("#pickerColor")
pickerBtn.addEventListener("click", () => {
    colorMode = "picker"
    pickerBtn.classList.add("active")
    rainbowBtn.classList.remove("active")
    eraserBtn.classList.remove("active")
})

const rainbowBtn = document.querySelector("#rainbowColor")
rainbowBtn.addEventListener("click", () => {
    colorMode = "rainbow"
    rainbowBtn.classList.add("active")
    pickerBtn.classList.remove("active")
    eraserBtn.classList.remove("active")
})

const eraserBtn = document.querySelector("#eraser")
eraserBtn.addEventListener("click", () => {
    colorMode = "eraser"
    eraserBtn.classList.add("active")
    pickerBtn.classList.remove("active")
    rainbowBtn.classList.remove("active")
})


// default: 24x24 grid with color picker mode
let squares = 24
drawGrid(squares)

const colorPicker = document.querySelector("#colorPicker")

let colorMode = "picker"

// initialize and declare mouseDown variable
let mouseDown = false
document.body.onmousedown = () => mouseDown = true
document.body.onmouseup = () => mouseDown = false

// draw grid function
function drawGrid(numRows) {
    for (let i = 0; i < (numRows * numRows); i++){
        const newDiv = document.createElement("div")
        newDiv.style.width = `${containerDim / numRows}px`
        newDiv.style.height = `${containerDim / numRows}px`
        newDiv.className = "grid"
        newDiv.addEventListener("mousedown", paint)
        newDiv.addEventListener("mouseover", paint)
        container.appendChild(newDiv)
    }
}

// clear grid function
function clearGrid(){
    document.querySelectorAll(".grid").forEach((grid) => {
        grid.remove()
    })
}

// new grid function
function newGrid(){
    clearGrid()
    drawGrid(slider.value)
    // colorMode = "picker"
    // pickerBtn.classList.add("active")
    // rainbowBtn.classList.remove("active")
    // eraserBtn.classList.remove("active")
}

// paint function
function paint(e){
    if ((e.type === "mousedown") || (mouseDown)){
        if (colorMode === "picker"){
            e.target.style.background = `${colorPicker.value}`
        } else if (colorMode === "rainbow"){
            e.target.style.background = randomRGB()
        } else if (colorMode === "eraser"){
            e.target.style.background = "white"
        }
    }
}

// random rgb generator
function randomRGB(){
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    return `rgb(${randomR}, ${randomG}, ${randomB})`
}

// clear grid button
const clearBtn = document.querySelector("#clear")
clearBtn.addEventListener("click", newGrid)

// grid size slider
const slider = document.querySelector("#gridSlider")
const output = document.querySelector("#gridSize")
output.innerText = `${slider.value}x${slider.value}`

slider.addEventListener("change", newGrid)
slider.addEventListener("input", function() {
    output.innerText = `${this.value}x${this.value}`;
})