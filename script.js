const container = document.querySelector("#container");
const button = document.querySelectorAll("button");

function createGrid(num){
    let boxwidth = 100 / num;
    num *= num;

    for (let i=1; i<=num; i++ ){
        const div = document.createElement("div");
        div.classList.add("grid");
        div.style.width = `${boxwidth}%` ;
        container.appendChild(div);
    }
}

button[0].addEventListener("click", () => {
    container.replaceChildren(); 
    createGrid(prompt());
});

createGrid(3); // starting grid


container.addEventListener("mouseover", (e)=>{

    if (e.target.classList == "grid"){
        e.target.classList.add("white");
    }
})


function clearGrid(){
    const grid = document.querySelectorAll("#container div");
    grid.forEach(box => box.classList.remove("white"));
}

button[1].addEventListener("click", clearGrid);

button[2].addEventListener("click", (e)=>gridTemplate(e.target.dataset.grid));
button[3].addEventListener("click", (e)=>gridTemplate(e.target.dataset.grid));
button[4].addEventListener("click", (e)=>gridTemplate(e.target.dataset.grid));
button[5].addEventListener("click", (e)=>gridTemplate(e.target.dataset.grid));
function gridTemplate(target){
    container.replaceChildren(); 
    createGrid(target);
}