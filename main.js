const container = document.querySelector("#gridContainer")
const containerDim = document.querySelector("#gridContainer").clientHeight

function createGrid(numRows) {
    for (let i = 0; i < (numRows * numRows); i++){
        const newDiv = document.createElement("div")
        newDiv.style.width = `${containerDim / numRows}px`
        newDiv.style.height = `${containerDim / numRows}px`
        newDiv.className = "grid"
        newDiv.addEventListener("mouseover", (e) => {
            e.target.style.background = "grey"
        })
        container.appendChild(newDiv)
    }
}

let squares = 16 //default grid dimension is 16x16
createGrid(squares)

// whites out all grids
function clearGrid(){
    document.querySelectorAll(".grid").forEach((grid) => {
        grid.remove()
    })
}

// prompt user for new side dim
function getNewDim(){
    let validInput = false
    while (!validInput){
        let squares = Number(prompt("Please enter a number of squares per side for the new grid (1-50): "))
        if (squares >= 0 && squares <= 50){
            validInput = true
            return squares
        }
    }  
}

function newCanvas(){
    clearGrid()
    squares = getNewDim()
    createGrid(squares)
}

const clearBut = document.querySelector("#clear")
clearBut.addEventListener("click", newCanvas)