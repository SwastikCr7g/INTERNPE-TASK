let cart = {};

function addToCart(product, price) {
    if (cart[product]) {
        cart[product].quantity++;
    } else {
        cart[product] = { price, quantity: 1 };
    }
    updateCartCount();
    updateCartList();
}

function updateCartCount() {
    let count = 0;
    for (let item in cart) {
        count += cart[item].quantity;
    }
    document.getElementById('cart-count').textContent = count;
}

function updateCartList() {
    const list = document.getElementById('cart-list');
    list.innerHTML = '';
    for (let product in cart) {
        const li = document.createElement('li');
        const total = (cart[product].price * cart[product].quantity).toFixed(2);
        li.textContent = `${product} x ${cart[product].quantity} = Rs ${total}`;
        list.appendChild(li);
    }
}

function clearCart() {
    cart = {};
    updateCartCount();
    updateCartList();
}
