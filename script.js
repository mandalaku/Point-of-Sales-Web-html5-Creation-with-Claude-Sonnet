// Data Dummy Menu
const dummyMenus = [
    { id: 1, name: 'Super Delicious Steak', price: 189000, category: 'food' },
    { id: 2, name: 'Super Delicious Pizza', price: 159000, category: 'pizza' },
    { id: 3, name: 'Super Delicious Pasta', price: 129000, category: 'food' },
    { id: 4, name: 'Super Delicious Soup', price: 79000, category: 'soup' },
    { id: 5, name: 'Super Delicious Wine', price: 299000, category: 'wine' },
    { id: 6, name: 'Super Delicious Cocktail', price: 159000, category: 'bar' },
    { id: 7, name: 'Super Delicious Fish', price: 169000, category: 'fish' },
    { id: 8, name: 'Super Delicious Salad', price: 89000, category: 'food' },
    { id: 9, name: 'Super Delicious Burger', price: 129000, category: 'food' },
    { id: 10, name: 'Super Delicious Sushi', price: 199000, category: 'fish' },
    { id: 11, name: 'Super Delicious Beer', price: 89000, category: 'bar' },
    { id: 12, name: 'Super Delicious Ramen', price: 119000, category: 'soup' }
];

// State Aplikasi
const state = {
    cart: [],
    activeCategory: 'all',
    orderNumber: Math.floor(Math.random() * 90000) + 10000,
    tableNumber: Math.floor(Math.random() * 20) + 1
};

// Format Harga
const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);
};

// Generate Menu Grid
const generateMenuGrid = (category = 'all') => {
    const menuGrid = document.getElementById('menuGrid');
    const filteredMenus = category === 'all' 
        ? dummyMenus 
        : dummyMenus.filter(menu => menu.category === category);

    menuGrid.innerHTML = filteredMenus.map(menu => `
        <div class="col-md-4 col-lg-3">
            <div class="menu-item">
                <img src="https://picsum.photos/seed/${menu.id}/300/300" class="w-100" alt="${menu.name}">
                <div class="p-3">
                    <h6 class="mb-2">${menu.name}</h6>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold">${formatPrice(menu.price)}</span>
                        <button class="btn btn-add" onclick="addToCart(${menu.id})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
};

// Tambah ke Keranjang
const addToCart = (menuId) => {
    const menu = dummyMenus.find(m => m.id === menuId);
    const cartItem = state.cart.find(item => item.menuId === menuId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        state.cart.push({
            menuId,
            name: menu.name,
            price: menu.price,
            quantity: 1
        });
    }

    updateOrderPanel();
    showNotification('Item ditambahkan ke keranjang');
};

// Update Panel Pesanan
const updateOrderPanel = () => {
    const orderItems = document.querySelector('.order-items');
    
    // Update items
    orderItems.innerHTML = state.cart.map(item => `
        <div class="order-item">
            <div class="d-flex justify-content-between mb-2">
                <h6 class="mb-0">${item.name}</h6>
                <button class="btn btn-sm text-danger" onclick="removeFromCart(${item.menuId})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div class="input-group input-group-sm" style="width: 100px">
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.menuId}, -1)">-</button>
                    <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.menuId}, 1)">+</button>
                </div>
                <span>${formatPrice(item.price * item.quantity)}</span>
            </div>
        </div>
    `).join('') || '<p class="text-center text-muted my-4">Belum ada item</p>';

    // Update summary
    updateOrderSummary();
};

// Update Jumlah Item
const updateQuantity = (menuId, change) => {
    const cartItem = state.cart.find(item => item.menuId === menuId);
    if (cartItem) {
        cartItem.quantity = Math.max(0, cartItem.quantity + change);
        if (cartItem.quantity === 0) {
            removeFromCart(menuId);
        } else {
            updateOrderPanel();
        }
    }
};

// Hapus dari Keranjang
const removeFromCart = (menuId) => {
    state.cart = state.cart.filter(item => item.menuId !== menuId);
    updateOrderPanel();
    showNotification('Item dihapus dari keranjang');
};

// Update Ringkasan Pesanan
const updateOrderSummary = () => {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const serviceCharge = subtotal * 0.05; // 5% biaya layanan
    const tax = subtotal * 0.10; // 10% pajak
    const total = subtotal + serviceCharge + tax;

    document.querySelector('.summary-item:nth-child(1) span:last-child').textContent = formatPrice(subtotal);
    document.querySelector('.summary-item:nth-child(3) span:last-child').textContent = formatPrice(serviceCharge);
    document.querySelector('.summary-item:nth-child(4) span:last-child').textContent = formatPrice(tax);
    document.querySelector('.summary-total span:last-child').textContent = formatPrice(total);
};

// Notifikasi
const showNotification = (message) => {
    // Cek apakah sudah ada notifikasi
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Buat elemen notifikasi baru
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Hapus notifikasi setelah 3 detik
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Generate menu awal
    generateMenuGrid();

    // Set nomor order dan meja
    document.querySelector('.order-info span:first-child').textContent = `Order #${state.orderNumber}`;
    document.querySelector('.order-info span:last-child').textContent = `Meja #${state.tableNumber.toString().padStart(2, '0')}`;

    // Category buttons
    const categoryButtons = document.querySelectorAll('.category-bar button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.textContent.trim().toLowerCase().split(' ')[1];
            state.activeCategory = category;
            generateMenuGrid(category);
        });
    });

    // Sidebar navigation
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});

// Animasi CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);