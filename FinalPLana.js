class Task{
    constructor(taskId, name, descrip, assign, stat, date){
        this.taskId = taskId,
        this.name = name,
        this.descrip = descrip,
        this.assign = assign,
        this.stat = stat,
        this.date =date
    }
    //   addPreLoadedTask(){
    //     return `${this.taskId}, ${this.name}, ${this.descrip}, ${this.assign}, ${this.stat}, ${this.date}`;
    //   }
      
    addToHTML()
    {   
        
        const addHtml = `
        <div  class="itemBox" id="${this.taskId}" class="list-group" >
            <a id= "anchor" href="#" class="list-group-item list-group-item-action "  >
                <div id = "taskNameTag" class="d-flex w-100 justify-content-between style="background-color: rgb(159, 133, 159)">
                    <h5 id="h5" class="mb-1">${this.name}</h5>
                    <button class="delete btn btn-danger btn-sm" value="${this.taskId}" style = "background-color: gainsboro;color: red; border-color:gainsboro;">
                    Delete</button>
             
                    <button class="edit btn btn-danger btn-sm"  value="${this.taskId}" style = "background-color: gainsboro;color: red; border-color:gainsboro;">           
                    Edit</button>
                </div>
                <p class="mb-1"><small>${this.descrip}</small></p>
                <small class= "text-muted">
                    Due by ${this.date}    ${this.assign}   <span style="${this.stat === "To Do" ? "color: green": "color:red"}"> ${this.stat} </span>   
                </small>
            </a>  
            
        </div>
    `;
    return addHtml;
    }
  
}
class TaskManager{
    constructor(task){
          this.task = task;
          this.id = 0;
          this.taskList = [];           
}
addTask(name,descrip,assign,stat,date){
    const task = new Task(
       `task${this.id++}`,
        name,
        descrip,
        assign,
        stat,
        date
    );
    this.taskList.push(task);  
                                     
}
    
deleteTask(taskId){

            alert("I am  into Delete Task");
            
}
updateTask(taskId,name,descrip,assign,stat,date){

    alert("I am into update");
    console.log(taskId,name, descrip,assign,stat,date);
    // const task = taskManager.taskList.find((m) => m.taskId === taskId);
    
    // taskName.value = task.name;
	// description.value = task.descrip;
	// assignee.value = task.assign;
	// taskDate.value = task.taskDate;
	// statusSelect.value = task.stat;
    for(let i=0;i< this.taskList.length;i++){
        if(this.taskList[i].taskId === taskId){
            this.taskList[i].taskId=taskId,
            this.taskList[i].name=name,
            this.taskList[i].descrip=descrip,
            this.taskList[i].assign=assign,
            this.taskList[i].stat=stat,
            this.taskList[i].date=date
            console.log(this.taskList[i],"Task List");
            // let myTaskList = JSON.parse(localStorage.getItem("Mundiri"));  
            // myTaskList[i].taskId = taskId,
            // myTaskList[i].name = name,
            // myTaskList[i].descrip = descrip,
            // myTaskList[i].assign = assign,
            // myTaskList[i].stat = stat,
            // myTaskList[i].date = date;
            // localStorage.setItem("Mundiri", JSON.stringify(myTaskList));
            break;
     }
    }

}
assignTask(taskId, assign){}
}

    
// document.addEventListener('DOMContentLoaded', function(){


//MODAL Form Elements Initialising

const taskName=document.querySelector("#taskName");
const description=document.querySelector("#description");
const assignee=document.querySelector("#assignee");
const taskDate=document.querySelector("#taskDate");
const statusSelect=document.querySelector("#statusSelect");

const hiddenTaskId=document.querySelector("#hiddenTaskId");
const taskNameEdit=document.querySelector("#taskNameEdit");
const descriptionEdit=document.querySelector("#descriptionEdit");
const assigneeEdit=document.querySelector("#assigneeEdit");
const taskDateEdit=document.querySelector("#taskDateEdit");
const statusSelectEdit=document.querySelector("#statusSelectEdit");

//Modal and Form Buttons 
// const taskModal=document.querySelector("#task-modal");

const btnSave=document.querySelector("#btnSave");
btnSave.addEventListener("click",saveButtonClicked);

const btnEditSave=document.querySelector("#btnEditSave");
btnEditSave.addEventListener("click",editSaveButtonClicked);

// const btnReset=document.querySelector("#btnReset");
// const btnClose=document.querySelector("#btnClose");

// Add, Edit and Delete Buttons on PAGE
// const btnSave=document.querySelector("#btnSave");

// const btnEdit=document.querySelector("#btnEdit");


const listGroupContainer=document.querySelector("#listGroupContainer");

var taskNameEvent = new Boolean(true);
var assigneeEvent = new Boolean(true);
var descriptionEvent = new Boolean(true);
var statusEvent = new Boolean(true);
var dateEvent = new Boolean(true);

    // Initialising(creating instances) classes
    const task = new Task();
    const taskManager = new TaskManager();

function saveButtonClicked(event){
    if(taskNameEvent && assigneeEvent && descriptionEvent && statusEvent){
        taskManager.addTask(taskName.value, description.value, assignee.value, statusSelect.value, taskDate.value);
        displayTask();    
        clearAll();
        $('#staticBackdrop').modal("hide");   
        return true;        
    }
    else{
        return false;
    }
}

function editSaveButtonClicked(event){
    alert("I am Mr. Edit, I am clicked");
    // if(taskName.value && assignee.value && description.value !== ""){
    //     alert("I am checking values");
    //     if(taskNameEvent || assigneeEvent || descriptionEvent){
    alert("I am calling Update");
    alert()
    taskManager.updateTask(hiddenTaskId.value, taskNameEdit.value, descriptionEdit.value, assigneeEdit.value, statusSelectEdit.value, taskDateEdit.value);
    displayTask();    
    // clearEdit();
    $('#staticBackdropEdit').modal("hide");   
//         return true;        
//         }
//     }
//     else{
//         return false;
//     }
}

function displayTask(){ 
    listGroupContainer.innerHTML="";
    for(let i=0; i< taskManager.taskList.length;i++){
            const task = new Task(
                taskManager.taskList[i].taskId,
                taskManager.taskList[i].name,
                taskManager.taskList[i].descrip,
                taskManager.taskList[i].assign,
                taskManager.taskList[i].stat,         
                taskManager.taskList[i].date
            );

            console.log(task);
            const addHtml=task.addToHTML();
            const element = document.createRange().createContextualFragment(addHtml);
            btnDelete=element.querySelector("button.delete");
            btnEdit=element.querySelector("button.edit");
            
            btnDelete.addEventListener("click",deleteButtonClicked);
            btnEdit.addEventListener("click", editButtonClicked);
            listGroupContainer.append(element);
   }
}

function deleteButtonClicked(event)
{
    // alert("I am Mr. Delete, and I am Clicked");
    const id= event.target.value;
    console.log(event.target);
    taskManager.taskList=taskManager.taskList.filter(m => m.taskId !== id);
    displayTask();       
}    

function editButtonClicked(event)
{
    // alert("I am Mr. Edit, and I am Clicked");
    $('#staticBackdropEdit').modal("show");
    const id= event.target.value;
    console.log(event.target);
    
    const task = taskManager.taskList.find((m) => m.taskId === id);

    hiddenTaskId.value = task.taskId;
    taskNameEdit.value = task.name;
	descriptionEdit.value = task.descrip;
	assigneeEdit.value = task.assign;
	taskDateEdit.value = task.taskDate;
	statusSelectEdit.value = task.stat;
    
	
    // taskManager.updateTask(id);

    // console.log(id);
    // taskManager.taskList=taskManager.taskList.filter(m => m.taskId !== id);
    // console.log(taskManager.taskList);
    // displayTask();       
} 


function clearAll(){

    taskName.value=null;
    description.value=null;
    assignee.value=null;
    taskDate.value=null;
    statusSelect.value=null;

     taskName.classList.remove("is-valid", "is-valid");
     description.classList.remove("is-valid", "is-valid");
     assignee.classList.remove("is-valid", "is-valid");
     statusSelect.classList.remove("is-valid", "is-valid");
     taskDate.classList.remove("is-valid", "is-valid");

}

//Task form validation  Begins here
taskName.addEventListener("input",function(event){
        if (event.target.value && event.target.value.length >= 3) {
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            
            taskNameEvent= true;         
        } else {
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
        taskNameEvent= false;
        }
    });
   
assignee.addEventListener("input",function(event){
        if (event.target.value && event.target.value.length >= 3) {
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            assigneeEvent= true;
        } else {
        event.target.classList.remove("is-valid");
        event.target.classList.add("is-invalid");
        assigneeEvent = false;
        }
    });
description.addEventListener("input",function(event){
        if (event.target.value && event.target.value.length >= 3) {
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            descriptionEvent=true;
        } else {
            event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
            descriptionEvent=false;
        }
    });

statusSelect.addEventListener("input",function(event){
        if (event.target.value ) {
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            statusEvent=true;
        } else {
            event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
            statusEvent=false;
        }
    });
taskDate.addEventListener("input",function(event){
        if (event.target.value ) {
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            statusEvent=true;
        } else {
            event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
            statusEvent=false;
        }
    });

 
 ///Task Form Validation Ends here

 

// }); 