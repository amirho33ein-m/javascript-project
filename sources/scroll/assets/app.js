const ul = document.querySelector("ul");
const goUp = document.querySelector(".go-up");

const goToArticles = target => {
    const data = target.dataset.address;
    const article = document.querySelector(`.${data}`);
    const height = article.offsetTop;

    window.scrollTo({
        top: height - window.innerHeight / 2,
        behavior: "smooth",
    });

    article.classList.add("text-orange-300");
    setTimeout(() => {
        article.classList.remove("text-orange-300");
    }, 1000);
};

const goUpHandler = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

ul.addEventListener("click", event => {
    const target = event.target.closest(".group");
    if (target) {
        if (target.matches(".group")) goToArticles(target);
    };
});
goUp.addEventListener("click", goUpHandler);