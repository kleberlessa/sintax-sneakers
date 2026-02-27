/**
 * SYNTAX SNEAKERS - Main JavaScript
 * Cart functionality and interactions
 * v1.2.0-premium: Quantity controls, toast notifications, order history, animations
 */

// Product Hardware Specifications Database
const PRODUCT_SPECS = {
    'AIR_ERROR v1.0': {
        cpu: 'Cloud-Walk 2.0',
        ram: 'High-Density Foam',
        features: ['Buffer Overflow Protection', 'Air-Cooled Mesh', 'Zero-Latency Sole'],
        description: 'Projetado para lidar com exceções de impacto. O AIR_ERROR oferece uma resposta rápida para movimentos imprevisíveis, perfeito para longas sessões de deploy.'
    },
    'NULL_POINTER': {
        cpu: 'Deep-Comfort x64',
        ram: 'Static-Memory Insole',
        features: ['Reference Integrity', 'Seamless Upper', 'Memory-Safe Support'],
        description: 'Para quem não quer apontar para lugar nenhum além do topo. Conforto absoluto sem vazamentos de energia.'
    },
    'STACK_OVERFLOW': {
        cpu: 'Recursion-Max V3',
        ram: 'Infinite-Layer Cushion',
        features: ['Deep-Stack Support', 'Recursive Traction', 'Overclocked Style'],
        description: 'Empilhe estilo sobre conforto. Suporta qualquer carga de trabalho diária sem comprometer a performance.'
    },
    'DEPLOY_MODE': {
        cpu: 'Production-Ready Engine',
        ram: 'Optimized-Path Support',
        features: ['Zero-Downtime Comfort', 'Hot-Reload Flexibility', 'CI/CD Durability'],
        description: 'Pronto para produção e para o mundo real. Conforto que passa em todos os testes e está sempre pronto para o próximo deployment.'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Estado e Persistência
    let cartItems = JSON.parse(localStorage.getItem('syntax_cart')) || [];
    let orderHistory = JSON.parse(localStorage.getItem('syntax_orders')) || [];

    const MAX_QUANTITY = 10;

    const saveCart = () => localStorage.setItem('syntax_cart', JSON.stringify(cartItems));
    const saveOrderHistory = () => localStorage.setItem('syntax_orders', JSON.stringify(orderHistory));

    // 2. Seletores
    const cartToggle = document.getElementById('cart-toggle');
    const cart = document.getElementById('cart');
    const cartClose = document.getElementById('cart-close');
    const cartContent = document.querySelector('.cart__content');
    const cartTotalValue = document.querySelector('.cart__total-value');

    // 3. Overlay (Criação dinâmica)
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    document.body.appendChild(overlay);

    // 4. Toast Notifications System
    const showToast = (message, type = 'success', duration = 3000) => {
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast--exit');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };

    // 4. Funções de Controle
    const openCart = () => {
        cart.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeCart = () => {
        cart.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    // 5. Renderização da UI
    function updateCartUI() {
        if (!cartContent) return;

        if (cartItems.length === 0) {
            cartContent.innerHTML = `
                <div class="cart__empty">
                    <code style="color: var(--text-muted);">cart.isEmpty()</code>
                    <p>Nenhum item no carrinho</p>
                </div>`;
            if (cartTotalValue) cartTotalValue.textContent = 'R$ 0,00';
            return;
        }

        cartContent.innerHTML = cartItems.map((item, idx) => {
            const canIncrease = item.quantidade < MAX_QUANTITY;
            return `
            <div class="cart__item">
                <div class="cart__item-info">
                    <span class="cart__item-name">${item.name}</span>
                    <span class="cart__item-price">${item.price}</span>
                </div>
                <div class="cart__item-controls" style="display: flex; gap: 8px; align-items: center;">
                    <button class="cart__qty-btn cart__qty-decrease" data-index="${idx}" style="cursor: pointer; width: 28px; height: 28px; border: 1px solid var(--text-muted); background: transparent; color: var(--text-muted); border-radius: 4px; font-size: 14px;">−</button>
                    <span class="cart__qty-display" style="min-width: 24px; text-align: center; font-weight: 500;">${item.quantidade}</span>
                    <button class="cart__qty-btn cart__qty-increase" data-index="${idx}" style="cursor: pointer; width: 28px; height: 28px; border: 1px solid var(--primary); background: transparent; color: var(--primary); border-radius: 4px; font-size: 14px; ${!canIncrease ? 'opacity: 0.5; cursor: not-allowed;' : ''};"${!canIncrease ? 'disabled' : ''}>+</button>
                    <button class="cart__remove" data-index="${idx}" title="Remover item" style="cursor: pointer; margin-left: 8px; width: 28px; height: 28px; border: 1px solid #ff6b6b; background: transparent; color: #ff6b6b; border-radius: 4px; font-size: 14px;">×</button>
                </div>
            </div>
        `}).join('');

        // Eventos de Quantidade
        cartContent.querySelectorAll('.cart__qty-increase').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                if (cartItems[idx].quantidade < MAX_QUANTITY) {
                    cartItems[idx].quantidade++;
                    saveCart();
                    updateCartUI();
                } else {
                    showToast(`Máximo de ${MAX_QUANTITY} unidades atingido`, 'warning', 2000);
                }
            });
        });

        cartContent.querySelectorAll('.cart__qty-decrease').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                if (cartItems[idx].quantidade > 1) {
                    cartItems[idx].quantidade--;
                    saveCart();
                    updateCartUI();
                }
            });
        });

        // Eventos de Remoção
        cartContent.querySelectorAll('.cart__remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                const itemName = cartItems[idx].name;
                cartItems.splice(idx, 1);
                saveCart();
                updateCartUI();
                showToast(`${itemName} removido do carrinho`, 'success', 2000);
            });
        });

        // Cálculo do Total
        const total = cartItems.reduce((sum, item) => {
            const valor = parseFloat(item.price.replace('R$', '').replace('.', '').replace(',', '.'));
            return sum + (isNaN(valor) ? 0 : valor * (item.quantidade || 1));
        }, 0);

        if (cartTotalValue) {
            cartTotalValue.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
    }

    // 5.1 Renderização do Histórico de Pedidos
    function updateOrdersUI() {
        const ordersList = document.getElementById('orders-list');
        if (!ordersList) return;

        if (orderHistory.length === 0) {
            ordersList.innerHTML = `
                <div class="orders__empty">
                    <code style="color: var(--text-muted);">orders.find() // null</code>
                    <p>Você ainda não realizou nenhum pedido</p>
                </div>`;
            return;
        }

        ordersList.innerHTML = orderHistory.map(order => `
            <div class="order-card">
                <div class="order-card__header">
                    <span class="order-card__id">ID: ${order.id}</span>
                    <span class="order-card__date">${order.date}</span>
                </div>
                <div class="order-card__items">
                    ${order.items.map(item => `
                        <div class="order-card__item-entry">
                            <span class="order-card__item-name">${item.name}</span>
                            <span class="order-card__item-qty">x${item.quantidade}</span>
                            <span>${item.price}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-card__total">
                    <span class="order-card__total-label">Total:</span>
                    <span class="order-card__total-value">${order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
                <div class="order-card__actions">
                    <button class="order-card__btn order-card__copy-btn" data-order-id="${order.id}" data-order-date="${order.date}">copy.id()</button>
                    <button class="order-card__btn order-card__track-btn" data-order-id="${order.id}">track()</button>
                </div>
            </div>
        `).join('');

        // Event Listeners para botões de cópia
        ordersList.querySelectorAll('.order-card__copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const orderId = btn.getAttribute('data-order-id');
                const orderDate = btn.getAttribute('data-order-date');
                const text = `Pedido #${orderId} - ${orderDate}`;
                navigator.clipboard.writeText(text).then(() => {
                    showToast('ID do pedido copiado para clipboard!', 'success', 2000);
                }).catch(() => {
                    showToast('Erro ao copiar ID', 'error', 2000);
                });
            });
        });

        // Event Listeners para botões de rastreamento
        ordersList.querySelectorAll('.order-card__track-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const orderId = btn.getAttribute('data-order-id');
                alert(`Rastreamento do pedido #${orderId}\nStatus: Enviado\nEstimativa: 5-7 dias úteis`);
            });
        });
    }

    // 6. Event Listeners
    cartToggle?.addEventListener('click', openCart);
    cartClose?.addEventListener('click', closeCart);
    overlay?.addEventListener('click', closeCart);

    // Close cart on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cart.classList.contains('active')) {
            closeCart();
        }
    });

    // Add to cart buttons
    document.querySelectorAll('[data-action="add-to-cart"]').forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const name = productCard.querySelector('.product-card__name').textContent.trim();
            const price = productCard.querySelector('.product-card__price').textContent.trim();

            // Verifica se o item já existe no carrinho
            const existingItem = cartItems.find(item => item.name === name);
            if (existingItem) {
                if (existingItem.quantidade >= MAX_QUANTITY) {
                    showToast(`Máximo de ${MAX_QUANTITY} unidades para ${name}`, 'warning', 2000);
                    openCart();
                    return;
                }
                existingItem.quantidade++;
            } else {
                cartItems.push({ name, price, quantidade: 1 });
            }
            saveCart();

            button.textContent = 'add_to_cart() // done';
            button.classList.add('btn--success');
            setTimeout(() => {
                button.textContent = 'add_to_cart()';
                button.classList.remove('btn--success');
            }, 1500);

            showToast(`${name} adicionado ao carrinho`, 'success', 2000);
            updateCartUI();
            openCart();
        });
    });

    // Checkout button
    const checkoutBtn = document.querySelector('.btn--full');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cartItems.length === 0) {
                showToast('Seu carrinho está vazio. Adicione itens antes de fazer checkout.', 'warning', 2000);
                return;
            }

            const total = cartItems.reduce((sum, item) => {
                const valor = parseFloat(item.price.replace('R$', '').replace('.', '').replace(',', '.'));
                return sum + (isNaN(valor) ? 0 : valor * (item.quantidade || 1));
            }, 0);

            const confirmation = confirm(
                `Processar compra no valor de R$ ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).substring(2)}?\n\nEste é um site de demonstração. Nenhuma cobrança será realizada.`
            );

            if (confirmation) {
                // Animação no botão
                checkoutBtn.style.transition = 'all 0.3s ease-out';
                checkoutBtn.style.opacity = '0.6';
                checkoutBtn.style.transform = 'scale(0.98)';
                checkoutBtn.disabled = true;

                setTimeout(() => {
                    // Salvar pedido no histórico
                    const order = {
                        id: Date.now(),
                        items: [...cartItems],
                        total: total,
                        date: new Date().toLocaleDateString('pt-BR')
                    };
                    orderHistory.push(order);
                    saveOrderHistory();

                    // Toast de sucesso em vez de alert
                    showToast('✓ Pedido realizado com sucesso! Seus Syntax Sneakers estão a caminho 🎉', 'success', 5000);

                    // Limpar carrinho
                    cartItems = [];
                    saveCart();
                    updateCartUI();
                    updateOrdersUI();
                    closeCart();

                    // Restaurar botão
                    checkoutBtn.style.opacity = '1';
                    checkoutBtn.style.transform = 'scale(1)';
                    checkoutBtn.disabled = false;
                }, 600);
            }
        });
    }

    // 7. Product Details Modal
    function openDetails(productName) {
        const spec = PRODUCT_SPECS[productName] || PRODUCT_SPECS['AIR_ERROR v1.0'];

        let detailsModal = document.getElementById('product-details-modal');
        if (!detailsModal) {
            detailsModal = document.createElement('div');
            detailsModal.id = 'product-details-modal';
            detailsModal.className = 'product-details';
            document.body.appendChild(detailsModal);
        }

        detailsModal.innerHTML = `
            <div class="product-details__header">
                <h2 class="product-details__title">${productName} // Specs</h2>
                <button class="product-details__close" aria-label="Fechar detalhes">×</button>
            </div>
            <p class="product-details__description">${spec.description}</p>
            <div class="spec-grid">
                <div class="spec-item">
                    <span class="spec-label">CORE_UNIT</span>
                    <span class="spec-value">${spec.cpu}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">MEMORY_CACHE</span>
                    <span class="spec-value">${spec.ram}</span>
                </div>
            </div>
            <div class="features-list">
                <span class="features-label">ENABLED_FEATURES:</span>
                <ul>
                    ${spec.features.map(f => `<li><code class="feature-tag">${f}</code></li>`).join('')}
                </ul>
            </div>
        `;

        detailsModal.classList.add('active');
        overlay.classList.add('active');

        // Close button handler
        const closeBtn = detailsModal.querySelector('.product-details__close');
        closeBtn.addEventListener('click', closeDetails);

        // Close on overlay click
        overlay.addEventListener('click', closeDetails);
    }

    function closeDetails() {
        const detailsModal = document.getElementById('product-details-modal');
        if (detailsModal) {
            detailsModal.classList.remove('active');
        }
        overlay.classList.remove('active');
    }

    // Vincular detalhes aos cards de produtos
    document.querySelectorAll('.product-card').forEach(card => {
        const productName = card.querySelector('.product-card__name').textContent.trim();
        const cardImage = card.querySelector('.product-card__image');
        const cardName = card.querySelector('.product-card__name');

        cardImage.style.cursor = 'zoom-in';
        cardImage.addEventListener('click', () => openDetails(productName));

        cardName.style.cursor = 'pointer';
        cardName.addEventListener('click', () => openDetails(productName));
    });

    // Inicialização
    updateCartUI();
    updateOrdersUI();
    console.log('%c Syntax Sneakers v1.2.0-premium carregado ', 'background: #00f5d4; color: #0b0e14; font-weight: bold;');
});
