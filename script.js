const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done ");

const tasks = document.querySelectorAll(".task");

let dragElement = null;

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        // console.log("dragged "+e);
        dragElement = task;
    })
})

function dragEnterLeave(column){
    column.addEventListener("dragenter", (e) =>{
        e.preventDefault();
        column.classList.add("hover-over");
    });
    column.addEventListener("dragleave", (e)=>{
        e.preventDefault();
        column.classList.remove("hover-over")
    });

    column.addEventListener("dragover", (e)=>{
        e.preventDefault();
    })

    column.addEventListener("drop", (e)=>{
        e.preventDefault();
        console.log(dragElement, column)
        column.appendChild(dragElement)
        column.classList.remove("hover-over")
    })
}

dragEnterLeave(todo);
dragEnterLeave(progress);
dragEnterLeave(done);
