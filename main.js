let numRow = 16 //adjust for number of rows/columns in gridbox

const container = document.querySelector("#gridContainer")
const containerDim = document.querySelector("#gridContainer").clientHeight
const gridDim = containerDim / numRow

function createGrid() {
    for (let i = 0; i < (numRow * numRow); i++){
        const newDiv = document.createElement("div")
        newDiv.style.width = `${gridDim}px`
        newDiv.style.height = `${gridDim}px`
        newDiv.className = "grid"
        container.appendChild(newDiv)
    }
}
createGrid()


let grids = document.querySelectorAll(".grid")
grids.forEach((grid) => {
    grid.addEventListener("mouseover", (e) => {
        e.target.style.background = "grey"
    })
})

const clearBut = document.querySelector("#clear")
clearBut.addEventListener("click", clearGrid)
function clearGrid(){
    grids.forEach((grid) => grid.style.background = "white")
}