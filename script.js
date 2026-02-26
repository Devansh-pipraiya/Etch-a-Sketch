const container = document.querySelector("#container");
const buttonContainer = document.querySelector("#button-container");
const clearGridButton = document.querySelector("#clear-grid");
const toggleGridLine = document.getElementById("toggle-grid-line");
const randomColorButton = document.getElementById("random-color-button");

let currentSketchColor = "#e8eaed ";


function createGrid(num){
    if (num === null || !(num) || typeof num !== 'number') return;

    num = Math.min(num, 100);
    let boxwidth = 100 / num;
    num = num*num;
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


function getRandomColor(){
    let hexValue = Math.floor(Math.random()* 0xffffff).toString(16);
    return "#" + hexValue.padStart(6,"0");
}



toggleGridLine.addEventListener("click", ()=>{
    toggleGridLine.classList.toggle("active");
    
    const grid = document.querySelectorAll("#container div");
    grid.forEach(box => box.classList.toggle("grid-line"));
});

clearGridButton.addEventListener("click", ()=>{
    const grid = document.querySelectorAll("#container div");
    grid.forEach(box => box.style.backgroundColor="");    
});


buttonContainer.addEventListener("click", (e)=>{
    let btn = e.target.dataset;
    
    if (btn.type == "color"){
        currentSketchColor = btn.color;
    }
    
    if (btn.type == "grid"){
        createGrid(Number(btn.grid));
    }

    if (btn.type == "custom-grid"){
        createGrid(+prompt("Enter box per sides: \n 100 is max"));
    }
});

randomColorButton.addEventListener("click", (e)=> e.target.classList.toggle("active"));



container.addEventListener("mouseover", (e)=>{
    
    if (randomColorButton.classList.contains("active") && e.target.classList.contains("grid")){
        e.target.style.backgroundColor = getRandomColor();
    }
    else if (e.target.classList.contains("grid")){
        e.target.style.backgroundColor = currentSketchColor;
    }
});