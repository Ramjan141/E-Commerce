// Get the product list element
const productList = document.getElementById('product-list');

// Get the cart list element
const cartList = document.getElementById('cart-list');

// Get the login form element
const loginForm = document.getElementById('login-form');

// Get the register form element
const registerForm = document.getElementById('register-form');

// Get the payment form element
const paymentForm = document.getElementById('payment-form');

// Get the login link element
const loginLink = document.getElementById('login-link');

// Get the register link element
const registerLink = document.getElementById('register-link');

// Get the login section element
const loginSection = document.getElementById('login-section');

// Get the register section element
const registerSection = document.getElementById('register-section');

// Get the payment section element
const paymentSection = document.getElementById('payment-section');

// Add event listener to login link
loginLink.addEventListener('click', () => {
    loginSection.style.display = 'block';
    registerSection.style.display = 'none';
    paymentSection.style.display = 'none';
});

// Add event listener to register link
registerLink.addEventListener('click', () => {
    registerSection.style.display = 'block';
    loginSection.style.display = 'none';
    paymentSection.style.display = 'none';
});

// Add event listener to login form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Send login request to server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            // Login successful, redirect to products page
            window.location.href = '/products';
        } else {
            // Login failed, display error message
            alert('Invalid username or password');
        }
    })
    .catch((error) => {
        console.error(error);
    });
});

// Add event listener to register form
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    // Send register request to server
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password,
            confirmPassword
        })
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            // Register successful, redirect to login page
            window.location.href = '/login';
        } else {
            // Register failed, display error message
            alert('Invalid username or email');
        }
    })
    .catch((error) => {
        console.error(error);
    });
});

// Add event listener to payment form
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cardNumber = document.getElementById('card-number').value;
    const expirationDate = document.getElementById('expiration-date').value;
    const cvv = document.getElementById('cvv').value;
    // Send payment request to server
    fetch('/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cardNumber,
            expirationDate,
            cvv
        })
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            // Payment successful, redirect to products page
            window.location.href = '/products';
        } else {
            // Payment failed, display error message
            alert('Invalid card information');
        }
    })
    .catch((error) => {
        console.error(error);
    });
});

// Add event listener to add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        // Send add to cart request to server
        fetch('/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Add to cart successful, update cart list
                const cartItem = document.createElement('li');
                cartItem.innerHTML = `
                    <span>${data.productName}</span>
                    <span>${data.productPrice}</span>
                    <button class="remove-from-cart" data-product-id="${data.productId}">Remove</button>
                `;
                cartList.appendChild(cartItem);
            } else {
                // Add to cart failed, display error message
                alert('Invalid product ID');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    });
});

// Add event listener to remove from cart buttons
document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        // Send remove from cart request to server
        fetch('/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Remove from cart successful, update cart list
                button.parentNode.remove();
            } else {
                // Remove from cart failed, display error message
                alert('Invalid product ID');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    });
});

// Fetch products from server
fetch('/products')
.then((response) => response.json())
.then((data) => {
    if (data.success) {
        // Products fetched successfully, display products
        data.products.forEach(product => {
            const productItem = document.createElement('li');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            `;
            productList.appendChild(productItem);
        });
    } else {
        // Products failed to fetch, display error message
        alert('Failed to fetch products');
    }
})
.catch((error) => {
    console.error(error);
});