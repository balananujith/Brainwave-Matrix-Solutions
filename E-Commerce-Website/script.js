document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', category: 'electronics', description: 'This is the description for product 1', image: 'https://via.placeholder.com/150', price: 29.99 },
        { id: 2, name: 'Product 2', category: 'fashion', description: 'This is the description for product 2', image: 'https://via.placeholder.com/150', price: 39.99 },
        { id: 3, name: 'Product 3', category: 'home', description: 'This is the description for product 3', image: 'https://via.placeholder.com/150', price: 19.99 },
        { id: 4, name: 'Product 4', category: 'electronics', description: 'This is the description for product 4', image: 'https://via.placeholder.com/150', price: 49.99 }
    ];

    const productContainer = document.querySelector('.product-list');
    const cartCount = document.getElementById('cart-count');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const priceValue = document.getElementById('price-value');
    let cart = [];

    const renderProducts = (filteredProducts) => {
        productContainer.innerHTML = '';
        filteredProducts.forEach(product => {
            const productElem = document.createElement('div');
            productElem.classList.add('product');
            productElem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>$${product.price.toFixed(2)}</p>
                <button class="btn" data-id="${product.id}">Add to Cart</button>
            `;
            productContainer.appendChild(productElem);
        });
    };

    const updateCartCount = () => {
        cartCount.textContent = cart.length;
    };

    const addToCart = (id) => {
        const product = products.find(p => p.id === id);
        if (product) {
            cart.push(product);
            updateCartCount();
        }
    };

    const filterProducts = () => {
        const category = categoryFilter.value;
        const maxPrice = parseFloat(priceFilter.value);
        let filteredProducts = products.filter(product => product.price <= maxPrice);
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }
        renderProducts(filteredProducts);
    };

    productContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const id = parseInt(e.target.dataset.id);
            addToCart(id);
        }
    });

    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('input', (e) => {
        priceValue.textContent = `$0 - $${e.target.value}`;
        filterProducts();
    });

    renderProducts(products);
    filterProducts();

    // Sign-in functionality
    const signinForm = document.getElementById('signin-form');
    const signinMessage = document.getElementById('signin-message');

    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // For simplicity, let's just check if email and password are not empty
            if (email && password) {
                signinMessage.textContent = 'Successfully signed in!';
                signinMessage.style.color = 'green';
                // Redirect to home page or perform other actions
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                signinMessage.textContent = 'Please enter a valid email and password.';
            }
        });
    }
});
