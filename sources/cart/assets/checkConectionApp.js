const conection = document.querySelector(".conection");

function onlineHandler(){
    conection.dataset.conection = "online";
    setTimeout(() => {
        conection.dataset.conection = "";
    }, 3000);
};
function offlineHandler(){
    conection.dataset.conection = "offline";
    console.log(100);
    
};

window.addEventListener("online", onlineHandler);
window.addEventListener("offline", offlineHandler);