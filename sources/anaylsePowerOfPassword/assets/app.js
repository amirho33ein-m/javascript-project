const input1 = document.querySelector("#input-1");
const input2 = document.querySelector("#input-2");
const showSecure = document.querySelector(".show-secure");
const showPassword = document.querySelector(".show-password");
const submit = document.querySelector(".submit");

let isHide = true;

const focusInput1 = event => {
    event.target.classList.add("outline-2");
};

const focusInput2 = event => {
    event.target.classList.add("outline-2");
};

const blurInput1 = event => {
    event.target.classList.remove("outline-2");
};

const blurInput2 = event => {
    event.target.classList.remove("outline-2");
};

const showPasswordHandler = event => {
    event.preventDefault();
    if (isHide) {
        input2.type = "text";
        isHide = false;
    } else {
        input2.type = "password";
        isHide = true;
    }
};

const checkSecurePassword = event => {
    event.preventDefault();

    const {value} = event.target;
    const symbolPattern = /^[!@#$%^&*()_+_=]+$/;
    const numericalPattern = /^\d+$/;
    const alSymbPattern = /^[a-zA-Z]+$/;
    const numAlephbPattern = /^\w+$/
    const alephbaPattern = /^[a-zA-Z!@#$%^&*()_+_=]+$/;
    const numSymbPattern = /^[\d!@#$%^&*()_+_=]+$/;
    const generallPatern = /^[\w!@#$%^&*()_+_=]+$/;

    if (!value.length) {
        showSecure.style.width = "0";
        showSecure.style.backgroundColor = "";
    };

    if (symbolPattern.test(value) || 
        numericalPattern.test(value) || 
        alSymbPattern.test(value)
    ) {
        if (value.length <= 3) {
            showSecure.style.width = "10%";        
            showSecure.style.backgroundColor = "#ec003f";
        } else if (3 < value.length && value.length <= 6) {
            showSecure.style.width = "20%";        
            showSecure.style.backgroundColor = "#ff2056";
        } else if (6 < value.length && value.length) {
            showSecure.style.width = "30%";
            showSecure.style.backgroundColor = "#ff637e";
        };
    }else if(
        numAlephbPattern.test(value) ||
        alephbaPattern.test(value) ||
        numSymbPattern.test(value)
    ){
        if (value.length <= 4) {
            showSecure.style.width = "40%";        
            showSecure.style.backgroundColor = "#9ae600";
        } else if (4 < value.length && value.length <= 7) {
            showSecure.style.width = "50%";        
            showSecure.style.backgroundColor = "#9ae600";
        } else if (7 < value.length && value.length) {
            showSecure.style.width = "60%";
            showSecure.style.backgroundColor = "#9ae600";
        }
    } else if(generallPatern.test(value)){
        if (value.length <= 6) {
            showSecure.style.width = "70%";        
            showSecure.style.backgroundColor = "#00d5be";
        } else if (6 < value.length && value.length <= 9) {
            showSecure.style.width = "85%";        
            showSecure.style.backgroundColor = "#00bba7";
        } else if (9 < value.length && value.length) {
            showSecure.style.width = "100%";
            showSecure.style.backgroundColor = "#009689";
        }
    };
    
};

input1.addEventListener("focus", focusInput1);
input2.addEventListener("focus", focusInput2);
input1.addEventListener("blur", blurInput1);
input2.addEventListener("blur", blurInput2);
input2.addEventListener("keyup", checkSecurePassword);
showPassword.addEventListener("click", showPasswordHandler);