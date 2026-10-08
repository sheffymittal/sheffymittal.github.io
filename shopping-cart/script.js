// selects all the elements with the class add-cart, assuming to be buttons.
let carts = document.querySelectorAll('.add-cart');

// An array of shirt objects.
// An array of shirt objects.
// Each shirt has a name, tag (used as an ID), price, and inCart (used to track how many are added).

let products = [
    {
        name: 'shirt 1',
        tag: 'shirt1',
        price: 10,
        inCart: 0
    },
    {
        name: 'shirt 2',
        tag: 'shirt2',
        price: 20,
        inCart: 0
    },
    {
        name: 'shirt 3',
        tag: 'shirt3',
        price: 25,
        inCart: 0
    },
    {
        name: 'shirt 4',
        tag: 'shirt4',
        price: 35,
        inCart: 0
    },
    {
        name: 'shirt 5',
        tag: 'shirt5',
        price: 30,
        inCart: 0
    },
    {
        name: 'shirt 6',
        tag: 'shirt6',
        price: 15,
        inCart: 0
    },
   
];

//Add event listener to "Add to Cart" buttons
// Adds the product to the cart using cartNumbers()
// Updates the total cost using totalCost()
for (let i = 0; i<carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalcost(products[i]);
    });
}

//Display Cart Count on Page Load
// Retrieves the number of items in cart from localStorage and updates the UI (.cart span).
function onLoadNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
// Manage Cart Numbers
// Updates the cart count (add/remove).
// Calls setItems(product) to update cart items in storage.
function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (action) {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1; 
    } else {
        localStorage.setItem('cartNumbers',1);
        document.querySelector ('.cart span').textContent = 1;
    }
    setItems(product);
}
// Store Cart Items in localStorage
// Adds product to the cart in localStorage.
// If the product is already there, it increases its inCart value.
// Uses the tag property as a unique key.

function setItems(product) {
    //let productNumbers = localStorage.getItem('cartNumbers');
    // ProductNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;

        if(cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems, [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }
 localStorage.setItem('productInCart', JSON.stringify(cartItems));
}

//calculate Total cost
function totalcost(product, action) {
    let cart = localstorage.getItem("totalcost");

    if(action) {
        cart = parseInt(cart);
        localStorage.setItem("totalcart", cart - product.price);
    } else if(cart != null) {
        cart = parseint(cart);
        localStorage.setItem("totalcost", cart + product.price);
    } else {
        localStorage.setItem("totalcost", product.price);
    }
}

// Render Cart Page
// Retrive cart items and cost from localstorage.
// Displays each item with:
// Name, Image, Price, Quantity Controls, and Item Total.
// Calls: deleteButtons() - to enable removing products
// Calls: manageQuantity() - to enable quantity increase/decrease

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalcost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');

    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map((item, index) => {
            productContainer.innerHTML +=
            `<div class = "product">
            <ion-icon name="close-circle"></ion-icon>< img src = "./images/">
            <span class="price sm-hide">${item.name}</span>
            </div>
            <div class = "price sm-hide">$${item.price},00(</div>
            <div class="quantity">
            <ion-icon class="decrease" name = "arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
            <ion-icon class="increase" name = "arrow-dropright-circle"></ion-icon>
            </div>
            <div class="total">$${item.incart * item.price},00 </div>;
            `
        });
        productContainer.innerHTML += 
        `
        <div class = "basketTotalconatiner">
        <h4 class = "baskettotalTitle">Basket Total</h4>
        <h4 class = "basketTotal">$${cart}, 00</h4>
        </div>
        `
        deleteButton();
        manageQuantity();
    }
}

// Remove Items from Cart
// Adds event listeners to delete icons
// onClick: Remove product from localstorage
// onClick: Update total count and cost
//onClick: Refreshes cart display
function deleteButton(){
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localstorage.getItem('totalcost');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for (let i=0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLowerCase().replace(/ /g,'').trim();

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadNumbers();
        })
    }
}

//Increase/Decrease product quantity
// Listem for click on .increase and .decrease buttons
//Update incart quantity
//Update cart count and total price accordingly

function manageQuantity(){
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productinCart');
    cartItems = JSON.parse(cartItems);

    for(let i = 0; i < increaseButtons.length; i++){
        decreaseButtons[i].addEventListener('click',() => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if(cartItems[currentProduct].incart > 1){
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalcost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart()
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalcost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart()
        });
    }

}