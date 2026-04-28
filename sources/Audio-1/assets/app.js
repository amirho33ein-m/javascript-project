const audio = document.querySelector("audio");
const image = document.querySelector(".image");
const settingsMenu = document.querySelector(".settings-menu");
const playBackRate = document.querySelector(".play-back-rate");
const resetPlayBackRate = document.querySelector(".reset-play-back-rate");
const playCenter = document.querySelector(".play-center");
const playCenterPlayBtn = playCenter.querySelector(".play");
const playCenterPauseBtn = playCenter.querySelector(".pause");
const playPause = document.querySelector(".play-pause");

const tenSecForword = document.querySelector(".ten-sec-forword");
const tenSecBackword = document.querySelector(".ten-sec-backword");
const tenSecForwordShow = document.querySelector(".ten-sec-forword-show");
const tenSecBackwordShow = document.querySelector(".ten-sec-backword-show");

const nextAudio = document.querySelector(".next-audio");
const previousAudio = document.querySelector(".previous-audio");

const playBtns = document.querySelectorAll(".play");
const pauseBtns = document.querySelectorAll(".pause");

const durationElem = document.querySelector(".duration");
const currentTimeElem = document.querySelector(".current-time");
const range = document.querySelector(".range");

//* audio array;
listAudio = [
    ["Metamorphosis.mp3", "Wo.png"],
    ["MohsenEbrahimzadeZangBezani.mp3", "jeurny.jpg"],
    ["Skins.mp3", "shinon.jpg"],
];

const listAudioLength = listAudio.length;
let isOpenMenu = false;
let howManyClickRate = 0;
let isPlayed = false;
let turnAudio = 1;
let isDragging = false;

//* Menu Tools 
const MenuHandler = (event) => {
    if (isOpenMenu){
        event.currentTarget.parentElement.classList.add("w-7");
        event.currentTarget.parentElement.classList.remove("w-full");
        event.currentTarget.firstElementChild.classList.remove("hidden"); 
        event.currentTarget.lastElementChild.classList.add("hidden");
        isOpenMenu = false;
    }else{
        event.currentTarget.parentElement.classList.remove("w-7");
        event.currentTarget.parentElement.classList.add("w-full");
        event.currentTarget.firstElementChild.classList.add("hidden"); 
        event.currentTarget.lastElementChild.classList.remove("hidden");
        isOpenMenu = true;
    };
};

//* Speed Rate;
const playBackRateHandler = (event) => {
    ++howManyClickRate;
    switch (howManyClickRate){
        case 0:{
            audio.playbackRate = 1;
            break;
        }case 1:{
            audio.playbackRate = 1.1;
            break;
        }case 2:{
            audio.playbackRate = 1.25;
            break;
        }case 3:{
            audio.playbackRate = 1.5;
            break;
        }case 4:{
            audio.playbackRate = 1.75;
            break;
        }case 5:{
            audio.playbackRate = 2;
            break;
        }case 6:{
            audio.playbackRate = 1;
            howManyClickRate = 0;
            break;
        }default:{
            audio.playbackRate = 1;
        };
    };

    if (!(howManyClickRate === 0)){
        resetPlayBackRate.classList.remove("invisible");
    }else{
        resetPlayBackRate.classList.add("invisible");;
    };
    event.currentTarget.lastElementChild.innerHTML = audio.playbackRate;
};

const resetPlayBackRateHandler = (event) => {
    howManyClickRate = 0;
    audio.playbackRate = 1;
    playBackRate.lastElementChild.innerHTML = 1;
    event.currentTarget.classList.add("invisible");
};

//* Play & Pause;
const playPauseAudio = () => {
    if (isPlayed){
        playCenterPauseBtn.classList.add("scale-110");
        setTimeout(function (){
            playCenterPauseBtn.classList.remove("scale-110");
            audio.pause();
            playBtns.forEach(function (playBtn){
                playBtn.classList.remove("hidden");
            });
            pauseBtns.forEach(function (pauseBtn){
                pauseBtn.classList.add("hidden");
            });
        }, 250);
        isPlayed = false;
    }else{
        playCenterPlayBtn.classList.add("scale-110");
        setTimeout(function() {
            playCenterPlayBtn.classList.remove("scale-110");
            audio.play();
            playBtns.forEach(function (playBtn){
                playBtn.classList.add("hidden");
            });
            pauseBtns.forEach(function (pauseBtn){
                pauseBtn.classList.remove("hidden");
            });
        }, 250);
        isPlayed = true;
    };
};

//* tenSecForword & tenSecBackword;
const tenSecForwordHandler = () => {
    audio.currentTime += 10;
    tenSecForwordShow.classList.remove("invisible", "opacity-0", "scale-90");
    tenSecForwordShow.classList.add("visible", "opacity-100", "scale-100");
    setTimeout(function() {
        tenSecForwordShow.classList.add("invisible", "opacity-0", "scale-90");
        tenSecForwordShow.classList.remove("visible", "opacity-100", "scale-100");
    }, 600);
};

const tenSecBackwordHandler = () => {
    audio.currentTime -= 10;
    tenSecBackwordShow.classList.remove("invisible", "opacity-0", "scale-90");
    tenSecBackwordShow.classList.add("visible", "opacity-100", "scale-100");
    setTimeout(function() {
        tenSecBackwordShow.classList.add("invisible", "opacity-0", "scale-90");
        tenSecBackwordShow.classList.remove("visible", "opacity-100", "scale-100");
    }, 600);
};

const nextAudioHandler = () => {
    ++turnAudio;
    if (turnAudio > listAudioLength){
        turnAudio = 1;
    };
    audio.src = `./assets/audio/${listAudio[turnAudio - 1][0]}`;
    image.src = `./assets/imgs/${listAudio[turnAudio - 1][1]}`;

    isPlayed = false;
    range.value = 0;

    howManyClickRate = 0;
    audio.playbackRate = 1;

    playBackRate.lastElementChild.innerHTML = 1;
    resetPlayBackRate.classList.add("invisible");

    playPauseAudio();
};

const previousAudioHandler = () => {
    --turnAudio;
    if (turnAudio < 1){
        turnAudio = listAudioLength;
    };
    audio.src = `./assets/audio/${listAudio[turnAudio - 1][0]}`;
    image.src = `./assets/imgs/${listAudio[turnAudio - 1][1]}`;

    isPlayed = false;
    range.value = 0;

    howManyClickRate = 0;
    audio.playbackRate = 1;

    playBackRate.lastElementChild.innerHTML = 1;
    resetPlayBackRate.classList.add("invisible");

    playPauseAudio();
};

const handleSeek = event => {
    const {value} = event.target;
    
    range.style.background = `linear-gradient(to right, rgb(0, 184, 219) ${+value * 100}%, rgba(0, 184, 219, 0.2) ${+value * 100}%)`;

    if (audio.duration && !isNaN(audio.duration)) {
        audio.currentTime = audio.duration * +value;
    };

    isDragging = false;
};

const caculateDurationTime = () => {
    const {duration} = audio;

    const second = Math.floor(duration % 60);
    const minute = (Math.floor(duration / 60));

    durationElem.innerHTML = `${minute >= 10 ? "" : "0"}${minute}:${second >= 10 ? "" : "0"}${second}`;    
};

const caculateCurrentTime = () => {
    const {currentTime} = audio;

    const second = Math.floor(currentTime % 60);
    const minute = (Math.floor(currentTime / 60));

    currentTimeElem.innerHTML = `${minute >= 10 ? "" : "0"}${minute}:${second >= 10 ? "" : "0"}${second}`;    
};

const timeUpdate = () => {
    if (!audio.duration || isNaN(audio.duration) || audio.duration === Infinity) {
        return;
    };

    if (!isDragging) {
        const timeLine = audio.currentTime / audio.duration;
        range.value = timeLine;
        range.style.background = `linear-gradient(to right, rgb(0, 184, 219) ${timeLine * 100}%, rgba(0, 184, 219, 0.2) ${timeLine * 100}%)`;

        caculateDurationTime();
        caculateCurrentTime();
    };
};

// * handlers;
audio.addEventListener("timeupdate", timeUpdate);
playBackRate.addEventListener("click", playBackRateHandler);
settingsMenu.addEventListener("click", MenuHandler);
resetPlayBackRate.addEventListener("click", resetPlayBackRateHandler)
playCenter.addEventListener("click", playPauseAudio);
playPause.addEventListener("click", playPauseAudio);
tenSecForword.addEventListener("click", tenSecForwordHandler);
tenSecBackword.addEventListener("click", tenSecBackwordHandler);
nextAudio.addEventListener("click", nextAudioHandler);
previousAudio.addEventListener("click", previousAudioHandler);
range.addEventListener("mousedown", () => isDragging = true);
range.addEventListener("click", handleSeek);
range.addEventListener("input", (event) => {
    const {value} = event.target;
    range.style.background = `linear-gradient(to right, rgb(0, 184, 219) ${+value * 100}%, rgba(0, 184, 219, 0.2) ${+value * 100}%)`;
});
