const containerCart = document.querySelector(".container-cart");

const finalCostElement = document.querySelector(".final-cost");

const containerProduct = document.querySelector(".container-product");
const addToCart = document.querySelectorAll(".add-to-cart");
const errorMessage = document.querySelector(".error-message");

const productData = [
    {
        id: 1,
        image: "./assets//img/1.jpg",
        name: "کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه",
        cost: 127000000,
        offer: 10,
    },
    {
        id: 2,
        image: "./assets//img/2.jpg",
        name: " بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو ",
        cost: 150000000,
        offer: 15,
    },
    {
        id: 3,
        image: "./assets//img/3.jpg",
        name: "لکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای",
        cost: 138000000,
        offer: 10,
    },
    {
        id: 4,
        image: "./assets//img/4.png",
        name: " تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته",
        cost: 120000000,
        offer: 0,
    },
];

// ! start;
// * array for cartData;
let cartData = [
    /*
    {
        id: 4,
        image: "image",
        name: "name",
        cost: 120000000,
        offer: 0,
        fainalCost:120000000,
        count: 1,
    },
    */
];

let setTimer = null;
function errorMessageByCart(){
    errorMessage.classList.remove("w-0");
    errorMessage.classList.add("w-68");

    clearTimeout(setTimer);
    setTimer = setTimeout(() => {
        errorMessage.classList.add("w-0");
        errorMessage.classList.remove("w-68");
    }, 1500);
};

function calculateCost(){
    let totalCost = 0;
    if (cartData.length){
        cartData.forEach(function(elem){
            totalCost += (elem.finalCost * elem.count);
        });
    }
    

    finalCostElement.textContent = totalCost.toLocaleString();
};

function setItemInLocalStoraget(){
    localStorage.setItem("cartData", JSON.stringify(cartData));
};

function getItemInLocalStoraget(){
    return JSON.parse(localStorage.getItem("cartData")) || [];
};

function clearItemInLocalStoraget(){
    localStorage.clear();
};

function emptyCart(){
    if (!cartData.length){
        containerCart.insertAdjacentHTML(
            "beforeend",
            `
            <p class="empty-cart text-2xl text-pink-600 p-2 mt-4 bg-pink-50 rounded-md">سبد خرید شما خالی است</p>
            `
        )
    } else {
        const emptyCartElement = document.querySelector(".empty-cart");
        if (emptyCartElement) emptyCartElement.remove();
    }
};

function addToCartHandler(event){
    const allCartItems = Array.from(containerCart.children);
    const getId = +event.dataset.productId;

    getTargetProductData = productData.find((elem)=> {
        if (elem.id === getId) {
            return elem;
        };
    });

    isAlreadyAdded = allCartItems.some((elem)=> {
        return getId === +elem.dataset.productId;
    });

    if (isAlreadyAdded) {
        errorMessageByCart();
    } else {
        containerCart.insertAdjacentHTML(
            "beforeend",
            `
            <div data-product-id="${getTargetProductData.id}" class="cart flex gap-3 my-3 py-4">
                <div>
                    <div class="relative w-25 h-25">
                        <img src="${getTargetProductData.image}" alt="" class="object-cover w-full h-full rounded-sm mb-2 shadow-sm">
                        <span class="absolute top-1 right-1 h-5 leading-5.75 text-xs text-white px-2 bg-white/0.13 backdrop-blur-xs rounded-md shadow-2xs">${getTargetProductData.offer}%</span>
                    </div>
                </div>
                <div class="grow">
                    <h2 class="line-clamp-2 text-lg h-12 mb-2 text-neutral-950 dark:text-white leading-6">${getTargetProductData.name}</h2>
                    <div class="flex items-center gap-2 mb-4">
                        <!-- original price -->
                        <span class="text-teal-600 dark:text-green-400">
                            <span class="cetain-cost">${getTargetProductData.cost.toLocaleString()}</span>
                            <span class="text-sm">تومان</span>
                        </span>
                        <!-- offer -->
                        <span class="${getTargetProductData.offer === 0 ? 'hidden' : ""} offer text-neutral-400 *:font-Shabnam-Thin">
                            <span class="text-sm offer-cost">${getTargetProductData.id !== 0 ? Math.floor((100 - getTargetProductData.offer) * getTargetProductData.cost / 100).toLocaleString() : ""}</span>
                            <span class="text-sm">تومان</span>
                        </span>
                    </div>
                    <!-- switch number -->
                    <div class="container-button-cart flex items-center justify-self-end gap-2.5 px-3 py-1.5 bg-gray-100 rounded-md">
                        <p class="font-Shabnam-Thin text-xs text-zinc-700 select-none">تعداد:</p>
                        <button class="plus-product cursor-pointer bg-gray-200 hover:bg-gray-50 p-1.5 transition-colors rounded-md">
                            <svg class="w-3.5 h-3.5 text-zinc-700">
                                <use href="#plus"></use>
                            </svg>
                        </button>
                        
                        <span class="product-count font-Shabnam-Thin text-sm text-zinc-700 select-none">${1}</span>
    
                        <button class="minus-product cursor-pointer bg-gray-200 hover:bg-gray-50 p-1.5 transition-colors rounded-md">
                            <svg class="w-3.5 h-3.5 text-zinc-700">
                                <use href="#minus"></use>
                            </svg>
                        </button>
    
                        <button class="trash-product p-1.5 bg-rose-500 cursor-pointer hover:bg-rose-600 transition-colors rounded-md">
                            <svg class="w-4 h-4 text-gray-100">
                                <use href="#trash"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            `
        );

        let newCart = {
            id: getTargetProductData.id,
            image: getTargetProductData.image,
            name: getTargetProductData.name,
            cost: getTargetProductData.cost,
            offer: getTargetProductData.offer,
            finalCost: Math.floor((100 - getTargetProductData.offer) * getTargetProductData.cost) / 100,
            count: 1,
        };
        // ! push new cart to cartData;
        cartData.push(newCart);
        
        // ! switch finalCost elem;
        calculateCost();
        emptyCart();
        setItemInLocalStoraget();
    };
};


// * cart buttons;
function cartButtonsHandler(event){
    const parent = event.target.closest(".cart");
    
    const buttonPlus = event.target.closest(".plus-product");
    const buttonMinus = event.target.closest(".minus-product");
    const buttonTrash = event.target.closest(".trash-product");

    const targetCartIndex = cartData.findIndex(function(elem){
        return elem.id === +parent.dataset.productId;
    });
    const targetCart = cartData[targetCartIndex]

    if (buttonPlus) {
        const containerButtonCart = buttonPlus.closest(".container-button-cart");
        const countSpan = containerButtonCart.querySelector(".product-count");
        
        ++targetCart.count;
        countSpan.textContent = targetCart.count;
        // ?
        calculateCost();
        setItemInLocalStoraget();
    };

    if (buttonMinus) {
        const containerButtonCart = buttonMinus.closest(".container-button-cart");
        const countSpan = containerButtonCart.querySelector(".product-count");
        
        if (+countSpan.textContent > 1){
            --targetCart.count;
            countSpan.textContent = targetCart.count;
            // ?
            calculateCost();
            setItemInLocalStoraget();
        };
    };
    
    if (buttonTrash) {
        const containerButtonCart = buttonTrash.closest(".cart");
        
        containerButtonCart.remove();
        cartData.splice(targetCartIndex, 1);
        setItemInLocalStoraget();

        if (getItemInLocalStoraget().length === 0) {
            clearItemInLocalStoraget();
        };

        cartData = getItemInLocalStoraget();

        calculateCost();
        emptyCart();
    };
};

// * show cart details;
function showCartDetails(){
    cartData.forEach(function (elem){
        containerCart.insertAdjacentHTML(
            "beforeend",
            `
            <div data-product-id="${elem.id}" class="cart flex gap-3 my-3 py-4">
                <div>
                    <div class="relative w-25 h-25">
                        <img src="${elem.image}" alt="" class="object-cover w-full h-full rounded-sm mb-2 shadow-sm">
                        <span class="absolute top-1 right-1 h-5 leading-5.75 text-xs text-white px-2 bg-white/0.13 backdrop-blur-xs rounded-md shadow-2xs">${elem.offer}%</span>
                    </div>
                </div>
                <div class="grow">
                    <h2 class="line-clamp-2 text-lg h-12 mb-2 text-neutral-950 dark:text-white leading-6">${elem.name}</h2>
                    <div class="flex items-center gap-2 mb-4">
                        <!-- original price -->
                        <span class="text-teal-600 dark:text-green-400">
                            <span class="cetain-cost">${elem.cost.toLocaleString()}</span>
                            <span class="text-sm">تومان</span>
                        </span>
                        <!-- offer -->
                        <span class="${elem.offer === 0 ? 'hidden' : ""} offer text-neutral-400 *:font-Shabnam-Thin">
                            <span class="text-sm offer-cost">${elem.id !== 0 ? Math.floor((100 - elem.offer) * elem.cost / 100).toLocaleString() : ""}</span>
                            <span class="text-sm">تومان</span>
                        </span>
                    </div>
                    <!-- switch number -->
                    <div class="container-button-cart flex items-center justify-self-end gap-2.5 px-3 py-1.5 bg-gray-100 rounded-md">
                        <p class="font-Shabnam-Thin text-xs text-zinc-700 select-none">تعداد:</p>
                        <button class="plus-product cursor-pointer bg-gray-200 hover:bg-gray-50 p-1.5 transition-colors rounded-md">
                            <svg class="w-3.5 h-3.5 text-zinc-700">
                                <use href="#plus"></use>
                            </svg>
                        </button>
                        
                        <span class="product-count font-Shabnam-Thin text-sm text-zinc-700 select-none">${elem.count}</span>
    
                        <button class="minus-product cursor-pointer bg-gray-200 hover:bg-gray-50 p-1.5 transition-colors rounded-md">
                            <svg class="w-3.5 h-3.5 text-zinc-700">
                                <use href="#minus"></use>
                            </svg>
                        </button>
    
                        <button class="trash-product p-1.5 bg-rose-500 cursor-pointer hover:bg-rose-600 transition-colors rounded-md">
                            <svg class="w-4 h-4 text-gray-100">
                                <use href="#trash"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            `
        );
    });
    calculateCost();
};

function loadData(){
    if (localStorage.getItem("cartData")){
        cartData = getItemInLocalStoraget();
        showCartDetails();
    };
    
    containerProduct.innerHTML = "";

    emptyCart();
    
    productData.forEach((elem)=> {
        containerProduct.insertAdjacentHTML(
            "beforeend",
            `
            <aside class="rounded-md">
                <!-- rate - send detail -->
                <div class="flex items-center justify-between mb-2 md:mb-3">
                    <!-- send detail -->
                    <div class="flex items-center gap-1.5 md:gap-3">
                        <button data-product-id="${elem.id}" class="add-to-cart">
                            <svg class="w-5 h-5 text-white cursor-pointer">
                                <use href="#shopping-cart"></use>
                            </svg>
                        </button>
                        <button>
                            <svg class="w-7 h-7 p-1 text-emerald-400 bg-neutral-950 cursor-pointer rounded-full">
                                <use href="#arrows-up-down"></use>
                            </svg>
                        </button>
                        <button>
                            <svg class="w-5 h-5 text-pink-500 cursor-pointer">
                                <use href="#heart"></use>
                            </svg>
                        </button>
                        
                    </div>
                    <!-- rate -->
                    <div class="flex items-center gap-1">
                        <span class="text-orange-300 font-RobotoBold text-sm md:text-base">5.0</span>
                        <svg class="w-5 h-5 text-orange-300">
                            <use href="#star"></use>
                        </svg>
                    </div>
                </div>
                <!-- detail of products -->
                <div>
                    <!-- image of product -->
                    <a href="#" class="flex flex-col items-center gap-y-2 mb-1 pb-2 border-b border-white/20 md:mb-2">
                        <span class="relative">
                            <img src="${elem.image}" loading="lazy" alt="" class="w-36 h-36 sm:w-46 sm:h-46 md:w-50 md:h-50 object-cover shadow-light-snap rounded-md hover:transform hover:scale-105 transition-all">
                            <!-- offer -->
                            <span class="${elem.offer === 0 ? 'hidden' : ""} absolute top-1 right-1">
                                <span class="absolute z-15 h-6 text-xs/6 md:text-sm/6 px-2 text-white bg-orange-400/80 backdrop-blur-xs rounded-full">${elem.offer}%</span>
                            </span>
                        </span>
                        <span class="line-clamp-2 block h-11 text-sm sm:text-base text-white">${elem.name}</span>
                    </a>
                    <div class="flex flex-col md:flex-row items-start md:items-center gap-x-2 h-11">
                        <!-- regular price -->
                        <span class="flex items-center gap-0.5">
                            <span class="text-white">${elem.cost.toLocaleString()}</span>
                            <span class="text-sm font-Shabnam-Thin text-emerald-400">تومان</span>
                        </span>
                        <!-- price with offer -->
                        <span class="${elem.offer === 0 ? 'hidden' : ""} offer text-sm font-Shabnam-Thin text-gray-400">
                            <span>${elem.id !== 0 ? Math.floor((100 - elem.offer) * elem.cost / 100).toLocaleString() : ""}</span>
                            <span class="md:hidden">تخفیف</span>
                        </span>
                    </div>
                </div>
            </aside>
            `
        );
    });
};

window.addEventListener("load", loadData);
containerProduct.addEventListener("click", (event)=> {
    const button = event.target.closest(".add-to-cart");

    if (button) {
        addToCartHandler(button);
    };
});
containerCart.addEventListener("click", cartButtonsHandler);
