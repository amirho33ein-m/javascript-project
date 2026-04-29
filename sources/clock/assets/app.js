const hourHand = document.querySelector("#hourHand");
const minuteHand = document.querySelector("#minuteHand");
const secondHand = document.querySelector("#secondHand");
const digitalTime = document.querySelector("#digitalTime");
const showTime = document.querySelector(".time");

const loadPage = () => {

    setInterval(() => {
        const getDate = new Date();
        
        let second = getDate.getSeconds();    
        let minute = getDate.getMinutes();    
        let hour = getDate.getHours();

        showTime.textContent = `${hour >= 10 ? "" : "0"}${hour}:${minute >= 10 ? "" : "0"}${minute}:${second >= 10 ? "" : "0"}${second}`;
        hourHand.style.rotate = `${hour * 30 + minute / 2}deg`;
        minuteHand.style.rotate = `${minute * 6}deg`;
        secondHand.style.rotate = `${second * 6}deg`;
    }, 1000);
};



window.addEventListener("load", loadPage)