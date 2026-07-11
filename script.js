const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const columns = [todo, progress, done];

let dragElement = null;
let tasksData = {};

function createTask(title, desc){
    const taskOverview = document.createElement("div");
    taskOverview.classList.add("task");
    taskOverview.setAttribute("draggable", "true");

    const taskTitle = document.createElement("h2");
    taskTitle.innerText = title;

    const taskDesc = document.createElement("p");
    taskDesc.innerText = desc;

    const dltBtn = document.createElement("button");
    dltBtn.textContent = "Delete"
    dltBtn.classList.add("dlt-btn");
    
    taskOverview.appendChild(taskTitle);
    taskOverview.appendChild(taskDesc);
    taskOverview.appendChild(dltBtn)

    taskOverview.addEventListener("drag", ()=>{
        dragElement = taskOverview;
    });
    return taskOverview;
}

if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"));

    for(const col in data){
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            column.appendChild(createTask(task.title, task.desc))
        })
    }
    updateTaskCount();
}


function updateTaskCount(){
    columns.forEach((col)=>{
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        count.textContent = tasks.length;
    })
}
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
        column.appendChild(dragElement)
        column.classList.remove("hover-over")

        updateTaskCount()
    })
}

dragEnterLeave(todo);
dragEnterLeave(progress);
dragEnterLeave(done);


// Poping the add task modal
const toggleModal = document.querySelector(".modal-toggle");
const modal = document.querySelector(".modal");
const bg = document.querySelector(".bg");
const addTask = document.querySelector("#add-new-task");

toggleModal.addEventListener("click", function(){
    modal.classList.add("active");
})
bg.addEventListener("click", ()=>{
    modal.classList.remove("active");
})

addTask.addEventListener("click", ()=>{
    const taskTitleInp = document.querySelector("#task-title-inp").value;
    const taskDescInp = document.querySelector("#task-desc-inp").value;

    todo.appendChild(createTask(taskTitleInp, taskDescInp));

    updateTaskCount()

    columns.forEach((col)=>{
        const tasks = col.querySelectorAll(".task");

        tasksData[col.id] = Array.from(tasks).map((t)=>{

            return{
                title:  t.querySelector("h2").textContent,
                desc: t.querySelector("p").textContent
            }
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasksData));

    modal.classList.remove("active")
    document.querySelector("#task-title-inp").value=""
    document.querySelector("#task-desc-inp").value=""
})