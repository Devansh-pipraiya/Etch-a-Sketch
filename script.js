const container = document.querySelector("#container");
const buttonContainer = document.querySelector("#button-container");
const clearGridButton = document.querySelector("#clear-grid");
const toggleGridLine = document.getElementById("toggle-grid-line");

let currentSketchColor = "#e8eaed ";


function createGrid(num){
    if (num === null || !(num) || typeof num !== 'number') return;

    num = Math.min(num, 100);
    let boxwidth = 100 / num;
    num *= num;
    container.replaceChildren();
    
    for (let i=1; i<=num; i++ ){
        const div = document.createElement("div");
        div.classList.add("grid");
        div.style.width = `${boxwidth}%` ;
        if (toggleGridLine.classList.contains("active")) {div.classList.add("grid-line")};
        container.appendChild(div);
    }
}
createGrid(7); // starting grid


container.addEventListener("mouseover", (e)=>{
    if (e.target.classList.contains("grid")){
        e.target.style.backgroundColor = currentSketchColor;
    }
});


function clearGrid(){
    const grid = document.querySelectorAll("#container div");
    grid.forEach(box => box.style.backgroundColor="");
}
clearGridButton.addEventListener("click", clearGrid);



toggleGridLine.addEventListener("click", ()=>{
    toggleGridLine.classList.toggle("active");
    
    const grid = document.querySelectorAll("#container div");
    grid.forEach(box => box.classList.toggle("grid-line"));
})


buttonContainer.addEventListener("click", (e)=>{

    if (e.target.dataset.type == "grid"){
        createGrid(Number(e.target.dataset.grid));
    }

    if (e.target.dataset.type == "custom-grid"){
        createGrid(+prompt("Enter box per sides: \n 100 is max"));
    }

    if (e.target.dataset.type == "color"){
        currentSketchColor = e.target.dataset.color;
    }
});