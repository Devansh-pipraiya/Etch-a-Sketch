const container = document.querySelector("#container");
const button = document.querySelector("button");

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

button.addEventListener("click", () => {
    container.replaceChildren(); 
    createGrid(prompt());
});

createGrid(3); // starting grid