const successfulMassage = document.querySelector(".successful-massage");
const selectText = document.querySelector(".select-text");
const textarea = document.querySelector("textarea");
const paste = document.querySelector(".paste");

//* start;

const pasteHandler = async (event) => {
    try {
        textarea.value = "";

        const response = await navigator.clipboard.readText();
        textarea.value = response.trim();
    }catch{
        textarea.value = "خطایی رخ داده مجدد امتحان کنید.";
    };
};

const selectTextHandler = async (event) => {
    try {
        await navigator.clipboard.writeText(event.target.innerHTML);

        successfulMassage.classList.remove("invisible");
        successfulMassage.classList.add("visible");
        successfulMassage.classList.remove("w-0");
        successfulMassage.classList.add("w-65");
        
        setTimeout(() => {
            successfulMassage.classList.add("invisible");
            successfulMassage.classList.remove("visible");
            successfulMassage.classList.add("w-0");
            successfulMassage.classList.remove("w-65");
        }, 3000);
    } catch (error) {
        alert("copy is not done.");
    };
};

selectText.addEventListener("click", selectTextHandler);
paste.addEventListener("click", pasteHandler);