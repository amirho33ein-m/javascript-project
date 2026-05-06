const contextMenuContainer = document.querySelector(".context-menu-container");

class AssignPlace{
    constructor({top = 0, left = 0}){
        this.top = top;
        this.left = left;
    };

    assign = () => {
        contextMenuContainer.style.top = `${this.top}px`;
        contextMenuContainer.style.left = `${this.left}px`;
        contextMenuContainer.style.display = "block"
    };
};


const contextMenuHandler = event => {
    event.preventDefault();
    
    const assign = new AssignPlace({});
    const {offsetY} = event;
    const {offsetX} = event;
    const {innerHeight} = window;
    const {innerWidth} = window;
    const {offsetHeight} = contextMenuContainer;
    const {offsetWidth} = contextMenuContainer;

    const remainedHeight = innerHeight - offsetY;
    const remainedWidth = innerWidth- offsetX;

    if (remainedHeight > offsetHeight) {
        assign.top = offsetY;
    } else {
        const maxTop = innerHeight - offsetHeight;
        assign.top = maxTop;
        console.log(20);
        
    }; 

    if (remainedWidth > offsetWidth) {
        assign.left = offsetX;
    } else {
        const maxLeft = innerWidth - offsetWidth;
        assign.left = maxLeft;
    };

    assign.assign();
};

document.addEventListener("contextmenu", contextMenuHandler);