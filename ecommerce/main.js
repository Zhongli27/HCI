const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
    body.classList.add("active");
})

closeShopping.addEventListener("click", () => {
    body.classList.remove("active");
})


let products = [
    {
        id: 1,
        name:"PRODUCT 1",
        image: "1.PNG",
        price: 2000
    },
    {
        id: 2,
        name:"PRODUCT 2",
        image: "2.PNG",
        price: 2400
    },
    {
        id: 3,
        name:"PRODUCT 3",
        image: "3.PNG",
        price: 2200
    },
    {
        id: 4,
        name:"PRODUCT 4",
        image: "1.PNG",
        price: 2600
    },
    {
        id: 5,
        name:"PRODUCT 5",
        image: "2.PNG",
        price: 1800
    },
    {
        id: 6,
        name:"PRODUCT 6",
        image: "3.PNG",
        price: 1500
    },
]

let listCards = [];

const initApp = () =>{
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
        <img src="img/${value.image}">
        <div class ="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}</div>
        <button onclick="addToCard(${key})">Add To Card</button>
        `
        list.appendChild(newDiv)
    })
}

initApp()


const addToCard = (key) => {
    if (!listCards[key]) {
        listCards[key] = JSON.parse(JSON.stringify(products[key])); 
        listCards[key].quantity = 1;  // Set initial quantity to 1
    } else {
        listCards[key].quantity += 1;  // Increment the quantity if the item is already in the cart
    }

    reloadCard();
}

const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;

            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"></div>
                <div class="cardTitle">${value.name}</div>
                <div class="cardPrice">${(value.price * value.quantity).toLocaleString()}</div>
                <div>
                    <button style="background-color:#560bad" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class ="count">${count}</div>
                    <button style="background-color:#560bad" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }

        total.innerText = totalPrice.toLocaleString();
        quantity.innerText = count;
    });

}

    const changeQuantity = (key, quantity) => {
        if(quantity == 0){
            delete listCards[key]
        }
        else{
            listCards[key].quantity = quantity;
            listCards[key].price = quantity * products[key].price
        }

    reloadCard()
    }


