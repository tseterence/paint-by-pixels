// define grid container
const container = document.querySelector("#gridContainer")
const containerDim = container.clientHeight

// define buttons
const colorPicker = document.querySelector("#colorPicker")
const selectBtn = document.querySelector("#selectColor")
const rainbowBtn = document.querySelector("#rainbowColor")
const eraserBtn = document.querySelector("#eraser")
const clearBtn = document.querySelector("#clear")

// define grid size slider
const slider = document.querySelector("#gridSlider")
const output = document.querySelector("#gridSize")

// add event listeners
selectBtn.addEventListener("click", () => {
    colorMode = "picker"
    toggleBtns(colorMode)
})

rainbowBtn.addEventListener("click", () => {
    colorMode = "rainbow"
    toggleBtns(colorMode)
})

eraserBtn.addEventListener("click", () => {
    colorMode = "eraser"
    toggleBtns(colorMode)
})

clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the grid?")){
        newGrid()
    }
})

slider.addEventListener("change", newGrid)
slider.addEventListener("input", () => output.innerText = `${slider.value}x${slider.value}`)

document.body.onmousedown = () => mouseDown = true
document.body.onmouseup = () => mouseDown = false

// draw grid function
function drawGrid(numRows) {
    for (let i = 0; i < (numRows * numRows); i++){
        const square = document.createElement("div")
        square.style.width = `${containerDim / numRows}px`
        square.style.height = `${containerDim / numRows}px`
        square.className = "grid"
        square.addEventListener("mousedown", paintSquare)
        square.addEventListener("mouseover", paintSquare)
        container.appendChild(square)
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
    if (colorMode === "eraser"){
        colorMode = "picker"
        selectBtn.classList.add("active")
        rainbowBtn.classList.remove("active")
        eraserBtn.classList.remove("active")
    }
    rainbowH = -1
}

// paint square function
function paintSquare(e){
    if ((e.type === "mousedown") || (mouseDown)){
        if (colorMode === "picker"){
            e.target.style.background = `${colorPicker.value}`
        } else if (colorMode === "rainbow"){
            e.target.style.background = rainbowHSL()
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

// truly "rainbow" hsl generator
const rainbowHSelector = [0, 39, 60, 120, 240, 275, 300]
let rainbowH = -1
function rainbowHSL(){
    rainbowH += 1
    rainbowH %= 7
    return `hsl(${rainbowHSelector[rainbowH]}, 100%, 50%)`
}

// toggle buttons function
function toggleBtns(mode){
    switch (mode){
        case "picker":
            selectBtn.classList.add("active")
            rainbowBtn.classList.remove("active")
            eraserBtn.classList.remove("active")
            break
        case "rainbow":
            rainbowBtn.classList.add("active")
            selectBtn.classList.remove("active")
            eraserBtn.classList.remove("active")
            break
        case "eraser":
            eraserBtn.classList.add("active")
            selectBtn.classList.remove("active")
            rainbowBtn.classList.remove("active")
            break
    }
}


// DEFAULT: 24x24 grid with color picker mode
let squares = 24
let colorMode = "picker"
drawGrid(squares)
output.innerText = `${slider.value}x${slider.value}`
let mouseDown = false