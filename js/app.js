/* =========================================================
   GENIAL FOOD
   Main JavaScript
   ========================================================= */

/*
   LEARNING NOTE:
   This file controls the interactive parts of the website:

   1. Intro screen
   2. Food menu
   3. Category filtering
   4. Shopping cart
   5. Quantity controls
   6. Delivery / pickup
   7. Order preview
   8. WhatsApp order creation
*/

/* =========================================================
   1. FOOD DATA
   ========================================================= */

const foodItems = [
    {
        id: 1,
        name: "Puff Puff",
        category: "mains",
        price: 1000,
        description: "Perfection in every bite.",
        emoji: "🍗",
        image: "images/puffpuff.jpeg"
    },
    {
        id: 2,
        name: "Spring Roll",
        category: "mains",
        price: 1500,
        description: "Freshly made. Perfectly seasoned",
        emoji: "🍚",
        image: "images/springroll.jpe"
    },
    {
        id: 3,
        name: "Samosa",
        category: "mains",
        price: 1500,
        description: "Perfection in every bite",
        emoji: "🍝",
        image: "images/samosa.jpg"
    },
    {
        id: 4,
        name: "Filled Doughnut",
        category: "mains",
        price: 3000,
        description: "Freshly made. Perfectly seasoned",
        emoji: "🍗",
        image: "images/filled-doughnut.jpeg"
    },
    {
        id: 5,
        name: "Chicken Kebab",
        category: "mains",
        price: 3500,
        description: "Perfection in every bite.",
        emoji: "🍖",
        image: "images/chicken-kebab.jpeg"
    },
    {
        id: 6,
        name: "Fish Roll",
        category: "snacks",
        price: 3000,
        description: "Freshly made. Perfectly seasoned",
        emoji: "🥩",
        image: "images/fishroll.jpeg"
    },
    {
        id: 7,
        name: "Egg Roll",
        category: "snacks",
        price: 1800,
        description: "Perfection in every bite.",
        emoji: "🍟",
        image: "images/eggroll.jpeg"
    },
    {
        id: 8,
        name: "Meat Pie",
        category: "snacks",
        price: 2000,
        description: "Freshly made. Perfectly seasoned",
        emoji: "🥗",
        image: "images/meatpie.jpeg"
    },
    {
        id: 9,
        name: "Marriage Cake",
        category: "cakes",
        price: 1500,
        description: "Baked with lots of love.",
        emoji: "🍌",
        image: "images/cake2.jpg"
    },
    {
        id: 10,
        name: "Birthday Cake",
        category: "cakes",
        price: 1500,
        description: "Baked with lots of love.",
        emoji: "🍌",
        image: "images/cake3.jpg"
    },
    {
        id: 11,
        name: "Aniversary Cake",
        category: "cakes",
        price: 1500,
        description: "Baked with lots of love.",
        emoji: "🍌",
        image: "images/cake4.jpg"
    }
];

/* =========================================================
   2. APPLICATION STATE
   ========================================================= */

let cart = [];

const DELIVERY_FEE = 1000;

/*
   This number is a placeholder.

   Replace it with the actual WhatsApp number
   for the Genial Food business.

   IMPORTANT:
   WhatsApp numbers should be written with the
   country code and without + or spaces.

   Example:
   2348012345678
*/
const WHATSAPP_NUMBER = "2348060647257";


/* =========================================================
   3. DOM ELEMENTS
   ========================================================= */

const mainContent = document.getElementById("mainContent");


const foodGrid = document.getElementById("foodGrid");
const categories = document.querySelectorAll(".category");

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");
const cartCountDown = document.getElementById("cartcountdown")

const cartItems = document.getElementById("cartItems");

const subtotalElement = document.getElementById("subtotal");
const deliveryFeeElement = document.getElementById("deliveryFee");
const totalElement = document.getElementById("total");

const orderForm = document.getElementById("orderForm");
const orderPreview = document.getElementById("orderPreview");

const addressGroup = document.getElementById("addressGroup");

const orderTypeInputs = document.querySelectorAll(
    'input[name="orderType"]'
);

const nameInput = document.getElementById("name");
const nameError = document.getElementById("nameError");

const phoneError = document.getElementById("phoneError");
const phoneInput = document.getElementById("phone");

const addressError = document.getElementById("addressError");
const addressInput = document.getElementById("address");



/* =========================================================
   3B. TOAST NOTIFICATION
   ========================================================= */

const toast = document.createElement("div");

toast.className = "toast";

toast.innerHTML = `
    <span class="toast-icon">✓</span>
    <span class="toast-message"></span>
`;

document.body.appendChild(toast);

let toastTimer;

function showToast(message) {
    const messageElement =
        toast.querySelector(".toast-message");

    messageElement.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}



/* =========================================================
   4. HELPER FUNCTIONS
   ========================================================= */

/**
 * Format a number as Nigerian Naira.
 */
function formatPrice(amount) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(amount);
}


/**
 * Find one food item by its ID.
 */
function findFoodItem(id) {
    return foodItems.find(item => item.id === Number(id));
}


/**
 * Calculate the cart subtotal.
 */
function calculateSubtotal() {
    return cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}


/**
 * Get the selected order type.
 */
function getOrderType() {
    const selected = document.querySelector(
        'input[name="orderType"]:checked'
    );

    return selected ? selected.value : "delivery";
}


/**
 * Calculate the delivery fee.
 */
function calculateDeliveryFee() {
    return getOrderType() === "delivery"
        ? DELIVERY_FEE
        : 0;
}


/**
 * Calculate the final total.
 */
function calculateTotal() {
    return calculateSubtotal() + calculateDeliveryFee();
}



/* =========================================================
   6. DISPLAY FOOD MENU
   ========================================================= */

function renderFoodItems(category = "all") {

    /*
       Filter the food items.

       If category is "all", show everything.
    */
    const filteredItems =
        category === "all"
            ? foodItems
            : foodItems.filter(item => item.category === category);


    /*
       Clear the current food grid.
    */
    foodGrid.innerHTML = "";


    /*
       Create a card for every food item.
    */
    filteredItems.forEach(item => {

        const card = document.createElement("article");

        card.className = "food-card";

        card.innerHTML = `
            <div class="food-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    loading="lazy"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">

                <div class="food-image-placeholder" style="display:none;">
                    ${item.emoji}
                </div>

            </div>

            <div class="food-info">

                <h3>${item.name}</h3>

                <p>
                    ${item.description}
                </p>

                <div class="food-bottom">

                    <span class="food-price">
                        ${formatPrice(item.price)}
                    </span>

                    <button
                        class="add-button"
                        data-id="${item.id}">
                        ORDER +
                    </button>

                </div>

            </div>
        `;

        foodGrid.appendChild(card);
    });
}


/*
   Show all food when the page loads.
*/
renderFoodItems();


/* =========================================================
   7. CATEGORY FILTERING
   ========================================================= */

categories.forEach(categoryButton => {

    categoryButton.addEventListener("click", () => {

        /*
           Get the category stored in the
           data-category attribute.
        */
        const category =
            categoryButton.dataset.category;


        /*
           Remove active state from all buttons.
        */
        categories.forEach(button => {
            button.classList.remove("active");
        });


        /*
           Activate the clicked button.
        */
        categoryButton.classList.add("active");


        /*
           Display the selected food category.
        */
        renderFoodItems(category);
    });

});


/* =========================================================
   8. ADD TO CART
   ========================================================= */

/*
   Event delegation:

   The food cards are created dynamically with JavaScript,
   so instead of adding an event listener to every button
   individually, we listen on the food grid.
*/
foodGrid.addEventListener("click", event => {

    const button =
        event.target.closest(".add-button");


    if (!button) {
        return;
    }


    const foodId =
        Number(button.dataset.id);


    addToCart(foodId);
});


function addToCart(foodId) {

    const food = findFoodItem(foodId);

    if (!food) {
        return;
    }


    /*
       Check whether the item is already in the cart.
    */
    const existingItem =
        cart.find(item => item.id === foodId);


    if (existingItem) {

        /*
           If it exists, increase quantity.
        */
        existingItem.quantity += 1;

    } else {

        /*
           Otherwise create a new cart item.
        */
        cart.push({
            id: food.id,
            name: food.name,
            price: food.price,
            quantity: 1
        });
    }


    updateCart();

    showToast(`${food.name} added to your cart.`);
}


/* =========================================================
   9. REMOVE FROM CART
   ========================================================= */

function removeFromCart(foodId) {

    cart = cart.filter(item => item.id !== foodId);

    updateCart();
}


/* =========================================================
   10. CHANGE QUANTITY
   ========================================================= */

function changeQuantity(foodId, change) {

    const item =
        cart.find(item => item.id === foodId);


    if (!item) {
        return;
    }


    item.quantity += change;


    /*
       Remove the item if its quantity
       becomes zero.
    */
    if (item.quantity <= 0) {
        removeFromCart(foodId);
        return;
    }


    updateCart();
}


/* =========================================================
   11. RENDER CART
   ========================================================= */

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");


        cartItem.className = "cart-item";


        cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>

                <p>
                    ${formatPrice(item.price)}
                    each
                </p>
            </div>

            <div class="quantity-controls">

                <button
                    type="button"
                    class="quantity-minus"
                    data-id="${item.id}">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    type="button"
                    class="quantity-plus"
                    data-id="${item.id}">
                    +
                </button>

            </div>

            <button
                type="button"
                class="remove-item"
                data-id="${item.id}">
                Remove
            </button>
        `;


        cartItems.appendChild(cartItem);
    });
}


/* =========================================================
   12. CART CONTROLS
   ========================================================= */

cartItems.addEventListener("click", event => {

    const button =
        event.target.closest("button");


    if (!button) {
        return;
    }


    const foodId =
        Number(button.dataset.id);


    if (button.classList.contains("quantity-plus")) {

        changeQuantity(foodId, 1);

    }


    if (button.classList.contains("quantity-minus")) {

        changeQuantity(foodId, -1);

    }


    if (button.classList.contains("remove-item")) {

        removeFromCart(foodId);

    }

});


/* =========================================================
   13. UPDATE CART TOTALS
   ========================================================= */

function updateCart() {

    renderCart();


    /*
       Count every individual item.

       Example:
       2 burgers + 3 drinks = cart count of 5.
    */
    const itemCount =
        cart.reduce((total, item) => {
            return total + item.quantity;
        }, 0);


    cartCount.textContent = itemCount;
    cartCountDown.textContent = itemCount;


    const subtotal =
        calculateSubtotal();


    const deliveryFee =
        calculateDeliveryFee();


    const total =
        subtotal + deliveryFee;


    subtotalElement.textContent =
        formatPrice(subtotal);


    deliveryFeeElement.textContent =
        formatPrice(deliveryFee);


    totalElement.textContent =
        formatPrice(total);


    renderOrderPreview();
}


/* =========================================================
   14. CART BUTTON
   ========================================================= */

cartButton.addEventListener("click", () => {

    document
        .getElementById("cartSection")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =========================================================
   15. DELIVERY / PICKUP
   ========================================================= */

orderTypeInputs.forEach(input => {

    input.addEventListener("change", () => {

        /*
           Update the visual active state.
        */
        document
            .querySelectorAll(".order-option")
            .forEach(option => {
                option.classList.remove("active");
            });


        input
            .closest(".order-option")
            .classList.add("active");


        /*
           Hide the address field for pickup.
        */
        if (input.value === "pickup") {

            addressGroup.style.display = "none";

        } else {

            addressGroup.style.display = "block";

        }


        updateCart();
    });

});


/* =========================================================
   16. ORDER PREVIEW
   ========================================================= */

function renderOrderPreview() {

    if (cart.length === 0) {

        orderPreview.innerHTML = `
            <p>
                ✨ Your order summary
                will appear here.
            </p>
        `;

        return;
    }


    const subtotal =
        calculateSubtotal();


    const deliveryFee =
        calculateDeliveryFee();


    const total =
        calculateTotal();


    const itemRows =
        cart.map(item => {

            const itemTotal =
                item.price * item.quantity;

            return `
                <div class="preview-row">

                    <span>
                        ${item.name}
                        × ${item.quantity}
                        (${formatPrice(item.price)} each)
                    </span>

                    <strong>
                        ${formatPrice(itemTotal)}
                    </strong>

                </div>
            `;

        }).join("");


    orderPreview.innerHTML = `
        ${itemRows}

        <div class="preview-row">
            <span>Subtotal</span>
            <strong>${formatPrice(subtotal)}</strong>
        </div>

        <div class="preview-row">
            <span>
                ${getOrderType() === "delivery"
                    ? "Delivery"
                    : "Pickup"}
            </span>

            <strong>
                ${formatPrice(deliveryFee)}
            </strong>
        </div>

        <div class="preview-row">
            <span class="tot">Total</span>
            <strong class="tot">${formatPrice(total)}</strong>
        </div>
    `;
}


/* =========================================================
   17. FORM VALIDATION
   ========================================================= */

function isValidPhone(rawValue) {
    const cleaned = rawValue.replace(/[\s-]/g, "");
    return /^(?:\+?234|0)[789]\d{9}$/.test(cleaned);
}

orderForm.addEventListener("submit", event => {

    event.preventDefault();

    const phone = phoneInput.value.trim();
    const name = nameInput.value.trim();
    const address = addressInput.value.trim();

    const orderType = getOrderType();

    if (name === "") {
        nameError.textContent = "Name is required";

        nameInput.scrollIntoView({
            behavior: "smooth",
            block: "center"
        })

        nameInput.focus();
        return;
    }

    nameError.textContent = "";

    if (phone === "") {
        phoneError.textContent = "Phone number is required";

        phoneInput.scrollIntoView({
            behavior: "smooth",
            block: "center"
        })

        phoneInput.focus();
        return;
    }

    if (!isValidPhone(phone)) {
        phoneError.textContent ="Please enter a valid number"

        phoneInput.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        phoneInput.focus();
        return;        
    }

    phoneError.textContent = "";

    if (orderType === "delivery" && address === "") {
        addressError.textContent = "Address is required";

        addressInput.scrollIntoView({
            behavior: "smooth",
            block: "center"
        })

        addressInput.focus();
        return;
    }

    addressError.textContent = "";

    /*
       The customer cannot place an empty order.
    */
    if (cart.length === 0) {

        alert(
            "Please add at least one item to your cart."
        );

        return;
    }

    const notes =
        document.getElementById("notes")
            .value.trim();


    /*
       Basic required information.
    */
    if (!name || !phone) {

        alert(
            "Please enter your name and WhatsApp number."
        );

        return;
    }

    sendWhatsAppOrder({
        name,
        phone,
        address,
        notes,
        orderType
    });

});


/* =========================================================
   18. CREATE WHATSAPP ORDER
   ========================================================= */

function sendWhatsAppOrder(customer) {

    const subtotal =
        calculateSubtotal();


    const deliveryFee =
        calculateDeliveryFee();


    const total =
        calculateTotal();


    /*
       Build the list of ordered items.
    */
    const itemLines =
        cart.map(item => {

            const itemTotal =
                item.price * item.quantity;

            return `• ${item.name} x${item.quantity} — ${formatPrice(itemTotal)}`;

        }).join("\n");


    /*
       Create a clean WhatsApp message.
    */
    const message = `
Hello Genial Food! 👋

I would like to place an order.

CUSTOMER DETAILS
Name: ${customer.name}
Phone: ${customer.phone}

ORDER TYPE
${customer.orderType === "delivery" ? "Delivery" : "Pickup"}

${customer.orderType === "delivery"
    ? `Delivery Address: ${customer.address}`
    : ""}

ORDER
${itemLines}

Subtotal: ${formatPrice(subtotal)}
Delivery Fee: ${formatPrice(deliveryFee)}
TOTAL: ${formatPrice(total)}

${customer.notes
    ? `Special Notes: ${customer.notes}`
    : ""}

Thank you!
`.trim();


    /*
       Encode the message so it can safely
       be included inside a URL.
    */
    const encodedMessage =
        encodeURIComponent(message);


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


    /*
       Open WhatsApp in a new tab/window.
    */
    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );
}


/* =========================================================
   19. LIVE FORM PREVIEW
   ========================================================= */

/*
   Update the order preview whenever
   customer details change.
*/
orderForm.addEventListener("input", () => {
    renderOrderPreview();
});


/* =========================================================
   20. INITIALIZE
   ========================================================= */

updateCart();

console.log(
    "Genial Food app loaded successfully."
);
