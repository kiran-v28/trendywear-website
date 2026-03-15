// 1. Cart Initialization
let cart = JSON.parse(localStorage.getItem('myCart')) || [];

// 2. Add to Cart Function (Sabhi pages ke liye)
function addToCart(name, price) {
    // Fresh data load karein
    let currentCart = JSON.parse(localStorage.getItem('myCart')) || [];
    
    // Naya item add karein
    currentCart.push({ name: name, price: price });
    
    // Save karein
    localStorage.setItem('myCart', JSON.stringify(currentCart));
    
    // Navbar update karein
    updateCartCount();
    
    alert(name + " added to cart!");
}

// 3. Navbar Count Update Function
function updateCartCount() {
    const navCount = document.querySelector('.nav-links li a[href="cart.html"]');
    const cartData = JSON.parse(localStorage.getItem('myCart')) || [];
    if (navCount) {
        navCount.innerText = `Cart (${cartData.length})`;
    }
}

// 4. Cart Page par Items Load karna
function loadCart() {
    const itemsDiv = document.querySelector('.cart-items');
    const totalDiv = document.querySelector('.cart-summary h3');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Agar hum cart page par nahi hain, toh ye function yahi ruk jayega
    if (!itemsDiv) return; 

    const cartData = JSON.parse(localStorage.getItem('myCart')) || [];

    if (cartData.length === 0) {
        itemsDiv.innerHTML = "<p style='text-align:center; padding:20px;'>Your cart is empty.</p>";
        if (totalDiv) totalDiv.innerText = "Total: Rs. 0";
        if (checkoutBtn) checkoutBtn.style.display = "none";
    } else {
        itemsDiv.innerHTML = "";
        let total = 0;
        cartData.forEach((item, index) => {
            total += item.price;
            itemsDiv.innerHTML += `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:15px; border-bottom:1px solid #ddd;">
                    <div>
                        <strong>${item.name}</strong><br>
                        <span>Rs. ${item.price}</span>
                    </div>
                    <button onclick="removeItem(${index})" style="background:red; color:white; border:none; padding:5px 10px; border-radius:3px; cursor:pointer;">Remove</button>
                </div>`;
        });
        if (totalDiv) totalDiv.innerText = "Total Amount: Rs. " + total;
        if (checkoutBtn) checkoutBtn.style.display = "block";
    }
}

// 5. Remove Item Function
function removeItem(index) {
    let cartData = JSON.parse(localStorage.getItem('myCart')) || [];
    cartData.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cartData));
    loadCart();
    updateCartCount();
}

// 6. Proceed to Payment Logic
function processPayment() {
    const cartData = JSON.parse(localStorage.getItem('myCart')) || [];
    if (cartData.length === 0) {
        alert("Cart khali hai!");
        return;
    }

    const confirmPay = confirm("Proceed to payment for total items: " + cartData.length + "?");
    if (confirmPay) {
        alert("Processing Payment...");
        setTimeout(() => {
            alert("Payment Successful! Order Placed.");
            localStorage.removeItem('myCart');
            window.location.href = "index.html";
        }, 1500);
    }
}

// 7. Event Listeners (Page load hone par)
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadCart();
});