const form = document.querySelector('#new-task-form');
const input =  document.querySelector('#new-task-input');
const list_tasks = document.querySelector('#tasks');
const backdrop = document.querySelector('#backdrop');


// localstorage functions
// to fetch item
const fetchItem_Ls = ()=>{
    
    let tasks ;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse( localStorage.getItem('tasks'));
    }
    return tasks;
}
// to add item to local storage
const addItem_Ls = (task) =>{

    const tasks = fetchItem_Ls();
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    return tasks ;
}
// to remove item from local storage
const removeItem_Ls = (task)=>{

    const tasks = fetchItem_Ls();
    console.log('attemped');
    tasks.forEach((task_Lc , index)=>{
        if(task_Lc === task){
            tasks.splice(index , 1);
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
    return tasks;
}
// to display tasks from local storage
const displayTasks_Ls = ()=>{
    const tasks = fetchItem_Ls();
    tasks.forEach((task)=>{
        renderList(task);
    })
}
// to create renderlist
const renderList = (task)=>{
    const task_el = document.createElement('div');
    task_el.classList.add('task');

    const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement('input')
    task_input_el.classList.add('text');
    task_input_el.type = 'text';
    task_input_el.value = task;
    task_input_el.setAttribute('readonly','readonly');

    task_content_el.appendChild(task_input_el);
    

    const task_action_el = document.createElement('div');
    task_action_el.classList.add('actions');
    
    task_el.appendChild(task_action_el);

    const task_button_edit = document.createElement('button');
    task_button_edit.classList.add('edit');
    task_button_edit.innerText = 'Edit';

    task_action_el.appendChild(task_button_edit);

    const task_button_delete = document.createElement('button');
    task_button_delete.classList.add('delete');
    task_button_delete.innerText = 'Delete';

    task_action_el.appendChild(task_button_delete);

    list_tasks.appendChild(task_el);

    input.value = '';

    // eventlistner to edit function
    const editHandler = (event)=>{
        if(task_button_edit.innerText.toLowerCase() === 'edit'){
            task_button_edit.innerText = 'Save';
            task_input_el.removeAttribute('readonly');
            task_input_el.focus();
        }else{
            task_input_el.setAttribute('readonly','readonly');
            task_button_edit.innerText = 'Edit';
        }
    }
    // eventlistner to delete function
    const deleteHandler = (event) =>{

        list_tasks.removeChild(task_el);
        removeItem_Ls(task);
    }
    task_button_edit.addEventListener('click',editHandler);
    task_button_delete.addEventListener('click',deleteHandler);
    // console.log(task_button_edit)

}
// submitHandler funcitons
const submitHandler = (event)=>{
    event.preventDefault();

    const task = input.value ;
    const backdrop_el = 
    `
    <div class = 'card'>
        <h2>Reminder</h2>
        <p>Please enter the task !<p>
        <button id='closecard'>Close</button>
    </div>
    `
    
    if(!task){
        backdrop.classList.add('backdrop');
        backdrop.innerHTML = backdrop_el;
        // event Handler to remove the backdrop
        document.querySelector('#closecard').addEventListener('click',()=>{
            backdrop.classList.remove('backdrop');
            backdrop.innerHTML = '';
        })
        return ;
    }
    
    // add task to local storage
    addItem_Ls(task);

    renderList(task);   
}
// All eventlisterns to load when page reloads
const loadEventListners = ()=>{
    form.addEventListener('submit',submitHandler);
}
// window context to load functions
window.onload = (event)=>{
    loadEventListners();
    displayTasks_Ls();
}

