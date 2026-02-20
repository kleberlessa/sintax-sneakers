/**
 * SYNTAX SNEAKERS - Main JavaScript
 * Cart functionality and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Cart Toggle
    const cartToggle = document.getElementById('cart-toggle');
    const cart = document.getElementById('cart');
    const cartClose = document.getElementById('cart-close');

    // Create cart overlay
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    document.body.appendChild(overlay);

    function openCart() {
        cart.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cart.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (cartToggle) {
        cartToggle.addEventListener('click', openCart);
    }

    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }

    if (overlay) {
        overlay.addEventListener('click', closeCart);
    }

    // Close cart on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cart.classList.contains('active')) {
            closeCart();
        }
    });

    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.btn--primary');

    addToCartButtons.forEach(button => {
        if (button.textContent.includes('add_to_cart')) {
            button.addEventListener('click', () => {
                // Visual feedback
                button.textContent = 'add_to_cart() // done';
                button.style.background = 'var(--success)';
                button.style.color = 'var(--bg-main)';
                button.style.borderColor = 'var(--success)';

                setTimeout(() => {
                    button.textContent = 'add_to_cart()';
                    button.style.background = '';
                    button.style.color = '';
                    button.style.borderColor = '';
                }, 1500);

                openCart();
            });
        }
    });

    console.log('%c Syntax Sneakers loaded ', 'background: #00f5d4; color: #0b0e14; font-weight: bold;');
});
