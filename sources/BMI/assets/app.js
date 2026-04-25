const inputContainer = document.querySelector(".input-container");
const form = document.querySelector("form");
const heightInput = document.querySelector(".height-input");
const weightInput = document.querySelector(".weight-input");
const submitBtn = document.querySelector(".submit-btn");

const modalContainer = document.querySelector(".modal-container");
const closeModal = document.querySelector(".close-modal");
const getResult = document.querySelector(".get_result");
const valueResult = document.querySelector(".value-result");
const definitionResult = document.querySelector(".definition-result");
const returnBtn = document.querySelector(".return");

//*start;
function heightInputHandler(event){
    if (isNaN(+event.target.value)){
        event.target.classList.remove("bg-zinc-700");
        event.target.classList.add("outline", "outline-red-500", "bg-rose-500/20");
    }else{
        event.target.classList.add("bg-zinc-700");
        event.target.classList.remove("outline", "outline-red-500", "bg-rose-500/20");
    };    
};

function weightInputHandler(event){
    if (isNaN(+event.target.value)){
        event.target.classList.remove("bg-zinc-700");
        event.target.classList.add("outline", "outline-red-500", "bg-rose-500/20");
    }else{
        event.target.classList.add("bg-zinc-700");
        event.target.classList.remove("outline", "outline-red-500", "bg-rose-500/20");
    };
};

heightInput.addEventListener("keyup", heightInputHandler)
weightInput.addEventListener("keyup", weightInputHandler)

function formHandler(event){
    event.preventDefault();

    const height = heightInput.value;
    const weight = weightInput.value;

    const BMI = (weight / ((height / 100)**2)).toFixed(2);    

    switch (true){
        case BMI < 18.5:{
            getResult.dataset.result = "low";
            valueResult.innerHTML = BMI;
            definitionResult.innerHTML = "کم وزن";
            break;
        }case BMI > 18.5 && BMI < 25:{
            getResult.dataset.result = "normal";
            valueResult.innerHTML = BMI;
            definitionResult.innerHTML = "نرمال";
            break;
        }case BMI >= 25 && BMI < 30:{
            getResult.dataset.result = "redundent";
            valueResult.innerHTML = BMI;
            definitionResult.innerHTML = "اضافه وزن";
            break;
        }case BMI >= 30 && BMI < 35:{
            getResult.dataset.result = "fat-1";
            valueResult.innerHTML = BMI;
            definitionResult.innerHTML = "چاقی درجه یک";
            break;
        }case BMI >= 35 && BMI < 40:{
            getResult.dataset.result = "fat-2";
            valueResult.innerHTML = BMI;
            definitionResult.innerHTML = "چاقی درجه دو";
            break;
        }case BMI >= 40:{
            getResult.dataset.result = "fat-3";
            valueResult.innerHTML = BMI;
            definitionResult.innerHTML = "چاقی درجه سه";
            break;
        }default:{
            alert("خطایی رخ داده");
            return;
        };
    };
    
    inputContainer.classList.add("hidden");
    modalContainer.classList.remove("hidden");

    heightInput.value = "";
    weightInput.value = "";
};

form.addEventListener("submit", formHandler);

//* close;
function closeModalHandler(){
    inputContainer.classList.remove("hidden");
    modalContainer.classList.add("hidden");
};

closeModal.addEventListener("click", closeModalHandler);
returnBtn.addEventListener("click", closeModalHandler);
document.body.addEventListener("keyup", function(event){
    if (event.key === "Escape"){
        closeModalHandler();
    };
});