document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // ==========================================
    // Smooth Scrolling for Anchors
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            navLinks.classList.remove('active'); 
            
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // Cart Functionality
    // ==========================================
    const cartIcon = document.getElementById('cartIcon');
    const cartPopup = document.getElementById('cartPopup');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalValue = document.getElementById('cartTotalValue');
    const cartCountElement = document.querySelector('.cart-count');

    // Array to store cart items
    let cart = [];

    // Toggle Cart Popup
    cartIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        cartPopup.classList.toggle('active');
    });

    // Close Cart Popup when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!cartPopup.contains(e.target) && !cartIcon.contains(e.target)) {
            cartPopup.classList.remove('active');
        }
    });

    // Add to Cart Button Logic
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get product info from data attributes
            const product = {
                id: btn.getAttribute('data-id'),
                name: btn.getAttribute('data-name'),
                price: parseFloat(btn.getAttribute('data-price'))
            };

            addToCart(product);
            
            // Visual feedback on button
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Added';
            btn.style.backgroundColor = '#dfb2a9';
            btn.style.color = '#fff';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 2000);
            
            // Open cart popup to show item was added
            cartPopup.classList.add('active');
        });
    });

    // Add Item to Cart Array
    function addToCart(product) {
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1; // Increase quantity
        } else {
            cart.push({ ...product, quantity: 1 }); // Add new item
        }
        
        updateCartUI();
    }

    // Remove Item from Cart Array
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
    }

    // Update Cart HTML and Totals
    function updateCartUI() {
        // Update Cart Count Badge
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;

        // Clear current cart HTML
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
            cartTotalValue.textContent = '$0.00';
            return;
        }

        let total = 0;

        // Render each item in cart
        cart.forEach(item => {
            total += item.price * item.quantity;
            
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="remove-item" data-id="${item.id}" title="Remove Item">
                    <i class="fas fa-trash"></i>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Update Total Price
        cartTotalValue.textContent = '$' + total.toFixed(2);

        // Add event listeners to newly created remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                removeFromCart(btn.getAttribute('data-id'));
            });
        });
    }

    // ==========================================
    // Navbar Scroll Effect
    // ==========================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
            navbar.style.padding = '1rem 5%';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            navbar.style.padding = '1.5rem 5%';
        }
    });
});
