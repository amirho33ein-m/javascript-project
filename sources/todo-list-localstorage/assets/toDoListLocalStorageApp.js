const showManage = document.querySelector(".show-manage");
const managings = document.querySelector(".managings");

const addTasks = document.querySelector(".add-tasks");
const formContainer = document.querySelector(".form-container");
const cancleTasks = document.querySelectorAll(".cancle-task");
const confirmTask = document.querySelector(".confirm-task");
const formTask = document.querySelector(".form-task");
const inputTask = document.querySelector(".input-task");
const listsSet = document.querySelector(".lists-set");
const removeTask = document.querySelectorAll(".remove-task");
const statusTask = document.querySelectorAll(".status-task");
const doingTask = document.querySelectorAll(".doing-task");
const overlay = document.querySelector(".overlay");
const test = document.querySelector(".test");
//* start;
//* open & close;
function openTaskForm(){
    formContainer.classList.remove("hidden");
    overlay.classList.remove("hidden");
};


function closeTaskForm(){
    formContainer.classList.add("hidden");
    overlay.classList.add("hidden");
};

addTasks.addEventListener("click", openTaskForm);  

cancleTasks.forEach(function(event){
    event.addEventListener("click", closeTaskForm);
});
overlay.addEventListener("click", closeTaskForm);
document.addEventListener("keyup", function(event){
    if (event.key === "Escape") {
        closeTaskForm();
    };
});

//* get tasks & create template;
inputTask.addEventListener("focus", function(event){
    if (event.target.className.includes("bg-rose-500/60")) {
        inputTask.classList.add("bg-zinc-700");
        inputTask.classList.remove("bg-rose-500/60");
        inputTask.placeholder = "";
    };
});


/*
* instruction of localStorage;
template = [
    {id:1, text:"test", status:false, star:false},
    ]
*/


let templateData = [];
let randomIdArray = [];
let newId;
   
function createRandomId(){
    while (true) {
        const randomId = Math.floor(Math.random() * 1000);
        if (!(randomId in randomIdArray)) {
            newId = randomId;
            break;
        };
    };
};

//* on load; 
let filterTemplateData = [];
function loadFilter(){
    //* reset listsSet;
    listsSet.innerHTML = "";
    if (filterTemplateData.length) {
    
            //* show spacial tasks;
            filterTemplateData.forEach(function(event){
                listsSet.insertAdjacentHTML(
                    "beforeend",
                    `
                    <div class="flex items-center justify-between gap-x-1.5 bg-zinc-700 p-3 rounded-md">
                        <div class="flex items-center justify-start gap-1.5">
                            <div class="${event.status === true ? 'compeleted-arrow': ''} doing-task size-6 rounded-md bg-zinc-800 cursor-pointer"></div> <!-- compeleted-arrow -->
                            <h3 id="task-${event.id}" class="${event.status === true ? 'compeleted-text': 'text-white'} line-clamp-1">${event.text}</h3> <!-- compeleted-text -->
                        </div>
                        <div class="flex items-center gap-1.5">
                            <button class="remove-task text-white px-4 py-1 bg-rose-700/60 rounded-sm cursor-pointer">حذف</button>
                            <button class="mr-2">
                                <svg class="${event.star === true ? 'text-orange-300': 'text-gray-500 hover:text-gray-300'} star-task size-6 transition-colors cursor-pointer"> <!-- text-orange-300 -->
                                    <use href="#star"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                    `
                );
            }); 
    }else{
        listsSet.insertAdjacentHTML(
            "beforeend",
            `
            <div class="empty-task flex items-center justify-between gap-x-1.5 bg-zinc-700/60 p-3 rounded-md">
                <h3 class="text-white line-clamp-1 w-60">لیست وظیفه ای با این عنوان ندارید!</h3>
            </div>
            `
        );
    };

}
function loadLocalStorage(){
    if (localStorage.getItem("template")) {
        templateData = JSON.parse(localStorage.getItem("template"));

        //* reset listsSet;
        listsSet.innerHTML = "";

        templateData.forEach(function(event){
            //* elicit all ids;
            if (!randomIdArray.includes(event.id)) {
                randomIdArray.push(event.id);                
            };

            //* show tasks;
            listsSet.insertAdjacentHTML(
                "beforeend",
                `
                <div class="flex items-center justify-between gap-x-1.5 bg-zinc-700 p-3 rounded-md">
                    <div class="flex items-center justify-start gap-1.5">
                        <div class="${event.status === true ? 'compeleted-arrow': ''} doing-task size-6 rounded-md bg-zinc-800 cursor-pointer"></div> <!-- compeleted-arrow -->
                        <h3 id="task-${event.id}" class="${event.status === true ? 'compeleted-text': 'text-white'} line-clamp-1">${event.text}</h3> <!-- compeleted-text -->
                    </div>
                    <div class="flex items-center gap-1.5">
                        <button class="remove-task text-white px-4 py-1 bg-rose-700/60 rounded-sm cursor-pointer">حذف</button>
                        <button class="mr-2">
                            <svg class="${event.star === true ? 'text-orange-300': 'text-gray-500 hover:text-gray-300'} star-task size-6 transition-colors cursor-pointer"> <!-- text-orange-300 -->
                                <use href="#star"></use>
                            </svg>
                        </button>
                    </div>
                </div>
                `
            );
        });
    }else{
        listsSet.insertAdjacentHTML(
            "beforeend",
            `
            <div class="empty-task flex items-center justify-between gap-x-1.5 bg-zinc-700/60 p-3 rounded-md">
                <h3 class="text-white line-clamp-1 w-60">لیست وظیفه ای ندارید!</h3>
                <button class="add-tasks text-sky-500 rounded-sm cursor-pointer">
                    ایجاد
                </button>
            </div>
            `
        );
    };
};

//*filter tasks;
function managingHandler(event){
    if (!event.target.classList.contains("select")) {
        const select = document.querySelector(".select");
        select.classList.remove("select", "text-orange-300");
        event.target.classList.add("select", "text-orange-300");

        showManage.firstElementChild.innerHTML = event.target.innerHTML;
    };

    switch (showManage.firstElementChild.innerHTML){
        case "تکمیل شده ها":{
            filterTemplateData = templateData.filter(function(event){
                return event.status === true;
            });
            break;
        } case "تکمیل نشده ها":{
            filterTemplateData = templateData.filter(function(event){
                return event.status === false;
            });
            break;
        } case "ضروری ها":{
            filterTemplateData = templateData.filter(function(event){
                return event.star === true;
            });
            break;
        } default:{
            loadLocalStorage();
            return;
        };
    };

    loadFilter();
};

managings.addEventListener("click", managingHandler);

//* remove - status - doing;
listsSet.addEventListener("click", function (e) {
    //* add task when todo is empty;
    if (e.target.classList.contains("add-tasks")) {
        e.target.addEventListener("click", openTaskForm);
    };

    //* remove tasks;
    if (e.target.classList.contains("remove-task")) {
        const targetToDo = e.target.parentElement.parentElement;
        const infoTargetToDo = targetToDo.querySelector("h3");

        const stringId = infoTargetToDo.id;
        const numberId = +stringId.slice(5);

        let templateInfo = JSON.parse(localStorage.getItem("template"));

        templateInfo = templateInfo.filter(function(event){
            return event.id !== numberId;
        });

        if (templateInfo.length === 0) {
            localStorage.clear();
        }else{
            localStorage.setItem("template", JSON.stringify(templateInfo));
        };

        targetToDo.remove();
        loadLocalStorage();
    };

    //? in future will be impelemented;
    if (e.target.classList.contains("status-task")) {
        console.log("وضعیت تغییر کرد");
    };

    //* compelete task;
    if(e.target.classList.contains("doing-task")){
        const addSign = e.target;
        const h3Id = +addSign.nextElementSibling.id.slice(5);

        if (addSign.className.includes("compeleted-arrow")) {
            addSign.classList.remove("compeleted-arrow");
            addSign.nextElementSibling.classList.add("text-white");
            addSign.nextElementSibling.classList.remove("compeleted-text");
            templateData.some(function(event){
                if (event.id === h3Id) {
                    return event.status = false;  
                };
            });
            
            localStorage.setItem("template", JSON.stringify(templateData));
        } else {
            addSign.classList.add("compeleted-arrow");
            addSign.nextElementSibling.classList.remove("text-white");
            addSign.nextElementSibling.classList.add("compeleted-text");
            templateData.some(function(event){
                if (event.id === h3Id) {
                    return event.status = true;  
                };
            })
            
            localStorage.setItem("template", JSON.stringify(templateData));
        }
    };

    if (e.target.classList.contains("star-task")) {
        const svgElem = e.target;
        const h3Elem = e.target.parentElement.parentElement.parentElement.querySelector("h3");
        const h3Id = +h3Elem.id.slice(5);

        if (svgElem.classList.contains("text-gray-500")) {
            svgElem.classList.remove("text-gray-500", "hover:text-gray-300");
            svgElem.classList.add("text-orange-300");
            templateData.some(function(event){
                if (event.id === h3Id) {
                    return event.star = true;  
                };
            });
        } else {
            svgElem.classList.add("text-gray-500", "hover:text-gray-300");
            svgElem.classList.remove("text-orange-300");
            templateData.some(function(event){
                if (event.id === h3Id) {
                    return event.star = false;  
                };
            });
        };

        localStorage.setItem("template", JSON.stringify(templateData))
        
    };
});

function createTasks(event){
    event.preventDefault();
    if (!inputTask.value){
        inputTask.classList.remove("bg-zinc-700");
        inputTask.classList.add("bg-rose-500/60");
        inputTask.placeholder = "این فیلد را خالی نگذارید.";
    }else{
        const empty = document.querySelector(".empty-task");
        if (empty) {
            listsSet.innerHTML = "";
        };
        //* push all previous ids;
        templateData.forEach(function(event){
            if (!randomIdArray.includes(event.id)){
                randomIdArray.push(event.id);
            };
        });

        //* create random id;
        createRandomId();

        listsSet.insertAdjacentHTML(
            "beforeend",
            `
            <div class="flex items-center justify-between gap-x-1.5 bg-zinc-700 p-3 rounded-md">
                <div class="flex items-center justify-start gap-1.5">
                    <div class="doing-task size-6 rounded-md bg-zinc-800 cursor-pointer"></div> <!-- compeleted-arrow -->
                    <h3 id="task-${newId}" class="text-white line-clamp-1">${inputTask.value}</h3> <!-- compeleted-text -->
                </div>
                <div class="flex items-center gap-1.5">
                    <button class="remove-task text-white px-4 py-1 bg-rose-700/60 rounded-sm cursor-pointer">حذف</button>
                    <button class="mr-2">
                        <svg class="star-task size-6 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
                            <use href="#star"></use>
                        </svg>
                    </button>
                </div>
            </div>
            `
        );
        
        //* save in localStorage;
        const newTask = {
            id: newId,
            text: inputTask.value,
            status:false,
            star:false,
        };

        templateData.push(newTask);
        localStorage.setItem("template", JSON.stringify(templateData));

        inputTask.value = "";
        closeTaskForm();      
    };  
};

confirmTask.addEventListener("click", createTasks);
