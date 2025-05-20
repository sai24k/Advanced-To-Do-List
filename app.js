document.addEventListener('DOMContentLoaded',()=>{
    const tasksJSON=localStorage.getItem('tasks');
    if (tasksJSON) {
        const storedTasks = JSON.parse(tasksJSON);
        storedTasks.forEach(task => {
            tasks.push(task);
        });
        updateTasksList();
        updateStats();
    }
})
let tasks=[];

const saveTasks=()=>{
    const tasksJSON=JSON.stringify(tasks);  
    localStorage.setItem('tasks',tasksJSON);
}


const addTask=()=>{
    const taskInput=document.getElementById('taskInput');
    const text= taskInput.value.trim()
    if(text){
        tasks.push({text:text,completed:false});
        updateTasksList();
        updateStats();
    }
    console.log(tasks)
};
const toggleTaskCompleted=(index)=>{
    tasks[index].completed=!tasks[index].completed;
    console.log(tasks);
    updateTasksList();
    updateStats();
    saveTasks();
}
const deleteTask=(index)=>{
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
}
const editTask=(index)=>{
    const taskInput=document.getElementById('taskInput');
    taskInput.value=tasks[index].text;
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
}

const updateStats=()=>{ 
    const completedTasks=tasks.filter(task=>task.completed).length;
    const totalTasks=tasks.length;
    let progress = 0;
    if (totalTasks > 0) {
        progress = completedTasks/totalTasks*100;
    }
    // Update the progress bar width
    const progressElem=document.getElementById('progress');
    if(progressElem) {
        progressElem.style.width = progress + '%';
    }
    // Update the numbers display
    const numbersElem = document.getElementById('numbers');
    if(numbersElem) {
        numbersElem.textContent = `${completedTasks}/${totalTasks}`;
    }
    if(tasks.length && completedTasks===totalTasks){
       blastConfetti();
    }
}

const updateTasksList=()=>{
    const taskList=document.getElementById('task-list')
    taskList.innerHTML="";
    tasks.forEach((task,index) =>{
        const listItem=document.createElement("li");
        listItem.innerHTML=`
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed?'checked':""} />
                <p>${task.text}</p>
            </div>   
            <div class="icons">
                <img src="./images/edit.png" alt="edit" onClick="editTask(${index})"/>
                <img src="./images/delete.png" alt="delete" onClick="deleteTask(${index})" />
            </div>
        </div>
        `;
        // Add event listener to the checkbox only
        const checkbox = listItem.querySelector('.checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                toggleTaskCompleted(index);
                updateStats();
            });
        }
        taskList.appendChild(listItem);
    });
}
document.getElementById('newTask').addEventListener('click',function(e){
    e.preventDefault();
    addTask();
})

const blastConfetti=()=>{
   // Confetti logic here
const end = Date.now() + 15 * 1000;

// go Buckeyes!
const colors = ["#bb0000", "#ffffff"];

(function frame() {
  confetti({
    particleCount: 1,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });

  confetti({
    particleCount: 1,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();

}