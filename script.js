const container = document.querySelector("#container");
const buttonContainer = document.querySelector("#button-container");
const clearGridButton = document.querySelector("#clear-grid");
const toggleGridLine = document.getElementById("toggle-grid-line");
const randomColorButton = document.getElementById("random-color-button");

let currentSketchColor;

// calculate width of grid-box based on input-grid-number and creates  dynamic grids
function createGrid(num){
    if (num === null || !(num) || typeof num !== 'number') return;    // keeps previous grid on prompt input cancel/empty

    num = Math.min(num, 100);
    let boxwidth = 100 / num;             //height is handeled by aspect ratio property in css 
    num = num*num;
    container.replaceChildren();          // removes old grid 
    
    for (let i=1; i<=num; i++ ){          // adds new grid 
        const div = document.createElement("div");
        div.classList.add("grid");
        div.style.width = `${boxwidth}%` ;
        if (toggleGridLine.classList.contains("active")) {div.classList.add("grid-line")};
        container.appendChild(div);
    }
}



function getRandomColor(){
    let hexValue = Math.floor(Math.random()* 0xffffff).toString(16);
    return "#" + hexValue.padStart(6,"0");
}



// ====== EVENT HANDLERS ====== //

toggleGridLine.addEventListener("click", ()=>{
    toggleGridLine.classList.toggle("active");
    
    const grid = document.querySelectorAll(".grid");
    grid.forEach(box => box.classList.toggle("grid-line"));
});

clearGridButton.addEventListener("click", ()=>{
    const grid = document.querySelectorAll("#container div");
    grid.forEach(box => box.style.backgroundColor="");    
});


//  handles all static buttons in #button-container
buttonContainer.addEventListener("click", (e)=>{  
    let btn = e.target.dataset;
    
    if (btn.type == "color"){
        randomColorButton.classList.remove("active");    // color-preset butttons
        currentSketchColor = btn.color;
    }
    
    if (btn.type == "grid"){                           //grid-preset buttons
        createGrid(Number(btn.grid));
    }

    if (btn.type == "custom-grid"){                    // custom-grid-button
        createGrid(+prompt("Enter box per sides: \n 100 is max"));
    }
});

randomColorButton.addEventListener("click", (e)=> e.target.classList.toggle("active"));


// DRAWING LOGIC -> main event that draws on mouse hover
container.addEventListener("mouseover", (e)=>{
    
    if (randomColorButton.classList.contains("active") && e.target.classList.contains("grid")){
        e.target.style.backgroundColor = getRandomColor();
    }
    else if (e.target.classList.contains("grid")){
        e.target.style.backgroundColor = currentSketchColor;
    }
});




// ===== Initialization ====

createGrid(8); // starting grid

currentSketchColor = "#e8eaed";
