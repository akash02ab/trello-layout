const boxes = document.querySelectorAll(".box");
const tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
    task.addEventListener("dragstart", (e) => {
        task.classList.add("dragging");
    });

    task.addEventListener("dragend", (e) => {
        task.classList.remove("dragging");
    });
})

boxes.forEach((box) => {
    box.addEventListener("dragover", (e) => {
        e.preventDefault();
        
        let currentTask = document.querySelector(".dragging");
        
        if(box.childElementCount > 1) {
            let element = findNearestTask(e.clientY - (currentTask.clientHeight / 2), box, currentTask);
            
            if(element) {
                element.before(currentTask);
            }
            else {
                box.appendChild(currentTask);
            }
        }
        else {
            box.appendChild(currentTask);
        }
    })
})

function findNearestTask(currentY, box, currentTask) {
    let closestItem = null;
    let min = 1920;

    box.querySelectorAll(".task").forEach(task => {
        if(task != currentTask && currentY - task.offsetTop < 0) {
            if(min > Math.abs(currentY - task.offsetTop)) {
                min = Math.abs(currentY - task.offsetTop);
                closestItem = task;
            }
        }
    });

    return closestItem;
}