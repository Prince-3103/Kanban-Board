const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const columns = [todo, progress, done];

let dragElement = null;

function init(){
    loadTasks();
    updateTaskCount();

    dragEnterLeave(todo);
    dragEnterLeave(progress);
    dragEnterLeave(done);
}
init();

function loadTasks(){
    if(localStorage.getItem("tasks")){
        const data = JSON.parse(localStorage.getItem("tasks"));

        for(const col in data){
            const column = document.querySelector(`#${col}`);
            data[col].forEach(task => {
                createTask(task.title, task.desc, column);
            })
        }
    }
}



function createTask(title, desc, column){
    
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
    column.appendChild(taskOverview)

    
    const deleteBtn = taskOverview.querySelector(".dlt-btn");
    deleteBtn.addEventListener("click", (e)=>{
        taskOverview.remove();
        saveTasks();
        updateTaskCount();
    })

    return taskOverview;
}

function saveTasks(){
    let tasksData = {};

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
        saveTasks();


        updateTaskCount()
    })
}




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
    const taskTitleInp = document.querySelector("#task-title-inp");
    const taskDescInp = document.querySelector("#task-desc-inp");

    if(taskTitleInp.value.trim()==="" || taskDescInp.value.trim()===""){
        return;
    }

    createTask(taskTitleInp.value, taskDescInp.value, todo);

    updateTaskCount()

    saveTasks();

    modal.classList.remove("active")
    taskTitleInp.value="";
    taskDescInp.value="";
})