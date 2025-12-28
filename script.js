// المنت‌های اصلی
const hamburgerMenu = document.getElementById('hamburgerMenu');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const favoritesBtn = document.getElementById('favoritesBtn');
const favoritesModal = document.getElementById('favoritesModal');
const closeFavorites = document.getElementById('closeFavorites');
const trackOrderBtn = document.getElementById('trackOrderBtn');
const supportModal = document.getElementById('supportModal');
const closeSupport = document.getElementById('closeSupport');
const overlay = document.getElementById('overlay');
const trackBtn = document.getElementById('trackBtn');
const supportResponse = document.getElementById('supportResponse');
const orderNumber = document.getElementById('orderNumber');

// داده‌های نمونه
let cartItems = [];
let favorites = [];
let amazingProducts = [];
let newProducts = [];

// تولید محصولات نمونه
function generateSampleProducts() {
    amazingProducts = [
        { id: 1, name: "نمونه محصول ۱", price: "۱۲۹,۰۰۰", isFavorite: false },
        { id: 2, name: "نمونه محصول ۲", price: "۸۹,۰۰۰", isFavorite: false },
        { id: 3, name: "نمونه محصول ۳", price: "۲۵۰,۰۰۰", isFavorite: false },
        { id: 4, name: "نمونه محصول ۴", price: "۷۵,۰۰۰", isFavorite: false },
        { id: 5, name: "نمونه محصول ۵", price: "۱۸۰,۰۰۰", isFavorite: false },
        { id: 6, name: "نمونه محصول ۶", price: "۳۲۰,۰۰۰", isFavorite: false },
        { id: 7, name: "نمونه محصول ۷", price: "۱۵۰,۰۰۰", isFavorite: false },
        { id: 8, name: "نمونه محصول ۸", price: "۲۱۰,۰۰۰", isFavorite: false }
    ];
    
    newProducts = [
        { id: 9, name: "محصول جدید ۱", price: "۹۵,۰۰۰", isFavorite: false },
        { id: 10, name: "محصول جدید ۲", price: "۱۷۵,۰۰۰", isFavorite: false },
        { id: 11, name: "محصول جدید ۳", price: "۲۲۰,۰۰۰", isFavorite: false },
        { id: 12, name: "محصول جدید ۴", price: "۱۳۰,۰۰۰", isFavorite: false }
    ];
}

// نمایش محصولات شگفت‌انگیز
function renderAmazingProducts() {
    const sliderTrack = document.getElementById('amazingSlider');
    sliderTrack.innerHTML = '';
    
    amazingProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <i class="fas fa-box"></i>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price} تومان</div>
            </div>
            <div class="product-actions">
                <button class="fav-btn ${product.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${product.id})">
                    <i class="${product.isFavorite ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <button class="add-to-cart" onclick="addToCart(${product.id})">افزودن به سبد</button>
            </div>
        `;
        sliderTrack.appendChild(productCard);
    });
    
    // تنظیم اسلایدر
    setupSlider();
}

// نمایش محصولات جدید
function renderNewProducts() {
    const newProductsContainer = document.getElementById('newProducts');
    newProductsContainer.innerHTML = '';
    
    newProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <i class="fas fa-gift"></i>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price} تومان</div>
            </div>
            <div class="product-actions">
                <button class="fav-btn ${product.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${product.id})">
                    <i class="${product.isFavorite ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <button class="add-to-cart" onclick="addToCart(${product.id})">افزودن به سبد</button>
            </div>
        `;
        newProductsContainer.appendChild(productCard);
    });
}

// تنظیم اسلایدر محصولات شگفت‌انگیز
function setupSlider() {
    const sliderTrack = document.getElementById('amazingSlider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentPosition = 0;
    const cardWidth = 240; // عرض هر کارت + گپ
    
    prevBtn.addEventListener('click', () => {
        currentPosition += cardWidth * 2;
        if (currentPosition > 0) currentPosition = 0;
        sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    });
    
    nextBtn.addEventListener('click', () => {
        const maxPosition = -cardWidth * (amazingProducts.length - 4);
        currentPosition -= cardWidth * 2;
        if (currentPosition < maxPosition) currentPosition = maxPosition;
        sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    });
}

// اضافه کردن به سبد خرید
function addToCart(productId) {
    // یافتن محصول
    let product = amazingProducts.find(p => p.id === productId);
    if (!product) {
        product = newProducts.find(p => p.id === productId);
    }
    
    if (product) {
        // بررسی وجود محصول در سبد
        const existingItem = cartItems.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
        
        updateCartUI();
        showNotification(`"${product.name}" به سبد خرید اضافه شد`);
    }
}

// حذف از سبد خرید
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCartUI();
    showNotification("محصول از سبد خرید حذف شد");
}

// آپدیت نمایش سبد خرید
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    // آپدیت تعداد
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // آپدیت لیست سبد خرید
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>سبد خرید شما خالی است</p>
            </div>
        `;
        cartTotal.textContent = "۰ تومان";
    } else {
        let totalPrice = 0;
        cartItemsContainer.innerHTML = '';
        
        cartItems.forEach(item => {
            const priceNumber = parseInt(item.price.replace(/,/g, ''));
            totalPrice += priceNumber * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${item.price} تومان</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        // فرمت قیمت
        const formattedPrice = totalPrice.toLocaleString('fa-IR');
        cartTotal.textContent = `${formattedPrice} تومان`;
    }
}

// تغییر تعداد محصول در سبد
function changeQuantity(productId, change) {
    const item = cartItems.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity < 1) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// اضافه/حذف از علاقه‌مندی‌ها
function toggleFavorite(productId) {
    // یافتن محصول
    let product = amazingProducts.find(p => p.id === productId);
    let productList = amazingProducts;
    
    if (!product) {
        product = newProducts.find(p => p.id === productId);
        productList = newProducts;
    }
    
    if (product) {
        product.isFavorite = !product.isFavorite;
        
        // آپدیت لیست علاقه‌مندی‌ها
        if (product.isFavorite && !favorites.includes(productId)) {
            favorites.push(productId);
        } else if (!product.isFavorite && favorites.includes(productId)) {
            favorites = favorites.filter(id => id !== productId);
        }
        
        // آپدیت UI
        updateFavoritesUI();
        renderAmazingProducts();
        renderNewProducts();
        
        // نمایش نوتیفیکیشن
        if (product.isFavorite) {
            showNotification(`"${product.name}" به علاقه‌مندی‌ها اضافه شد`);
        }
    }
}

// آپدیت نمایش علاقه‌مندی‌ها
function updateFavoritesUI() {
    const favoritesCount = document.getElementById('favoritesCount');
    const favoritesItems = document.getElementById('favoritesItems');
    
    // آپدیت تعداد
    favoritesCount.textContent = favorites.length;
    
    // آپدیت لیست علاقه‌مندی‌ها
    if (favorites.length === 0) {
        favoritesItems.innerHTML = `
            <div class="empty-favorites">
                <i class="far fa-heart"></i>
                <p>هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید</p>
            </div>
        `;
    } else {
        favoritesItems.innerHTML = '';
        
        favorites.forEach(productId => {
            let product = amazingProducts.find(p => p.id === productId);
            if (!product) {
                product = newProducts.find(p => p.id === productId);
            }
            
            if (product) {
                const favoriteItem = document.createElement('div');
                favoriteItem.className = 'favorite-item';
                favoriteItem.innerHTML = `
                    <div class="favorite-item-info">
                        <h4>${product.name}</h4>
                        <div class="favorite-item-price">${product.price} تومان</div>
                    </div>
                    <div class="favorite-item-actions">
                        <button class="add-to-cart" onclick="addToCart(${product.id})">افزودن به سبد</button>
                        <button class="remove-favorite" onclick="toggleFavorite(${product.id})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
                favoritesItems.appendChild(favoriteItem);
            }
        });
    }
}

// نمایش نوتیفیکیشن
function showNotification(message) {
    // ساخت عنصر نوتیفیکیشن
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--pink-color);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 4000;
        animation: fadeInOut 3s ease;
    `;
    
    // استایل انیمیشن
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            10% { opacity: 1; transform: translateX(-50%) translateY(0); }
            90% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // حذف پس از 3 ثانیه
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// نمایش/پنهان کردن overlay
function toggleOverlay(show) {
    if (show) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
}

// بستن همه مودال‌ها
function closeAllModals() {
    sideMenu.classList.remove('active');
    cartModal.classList.remove('active');
    favoritesModal.classList.remove('active');
    supportModal.classList.remove('active');
    toggleOverlay(false);
}

// پیگیری سفارش
function trackOrder() {
    const orderNum = orderNumber.value.trim();
    
    if (!orderNum) {
        supportResponse.innerHTML = '<p style="color: #e74c3c;">لطفاً شماره سفارش را وارد کنید</p>';
        return;
    }
    
    // پاسخ‌های نمونه
    const responses = [
        "سفارش شما در مرحله پردازش است.",
        "سفارش شما تایید شده و در حال آماده‌سازی است.",
        "سفارش شما تحویل پست شده و در راه است.",
        "سفارش شما تحویل داده شده است.",
        "سفارش شما در انتظار پرداخت است."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const orderStatus = `سفارش شماره <strong>${orderNum}</strong>: ${randomResponse}`;
    
    supportResponse.innerHTML = `<p>${orderStatus}</p>`;
    orderNumber.value = '';
}

// رویدادهای کلیک
document.addEventListener('DOMContentLoaded', () => {
    // تولید محصولات نمونه
    generateSampleProducts();
    renderAmazingProducts();
    renderNewProducts();
    updateCartUI();
    updateFavoritesUI();
    
    // منوی سه خطی
    hamburgerMenu.addEventListener('click', () => {
        sideMenu.classList.add('active');
        toggleOverlay(true);
    });
    
    // بستن منو
    closeMenu.addEventListener('click', closeAllModals);
    
    // سبد خرید
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        toggleOverlay(true);
    });
    
    closeCart.addEventListener('click', closeAllModals);
    
    // علاقه‌مندی‌ها
    favoritesBtn.addEventListener('click', () => {
        favoritesModal.classList.add('active');
        toggleOverlay(true);
    });
    
    closeFavorites.addEventListener('click', closeAllModals);
    
    // پیگیری سفارش
    trackOrderBtn.addEventListener('click', () => {
        closeAllModals();
        setTimeout(() => {
            supportModal.classList.add('active');
            toggleOverlay(true);
        }, 300);
    });
    
    closeSupport.addEventListener('click', closeAllModals);
    
    // دکمه پیگیری سفارش در پنل پشتیبانی
    trackBtn.addEventListener('click', trackOrder);
    
    // کلید Enter برای پیگیری سفارش
    orderNumber.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            trackOrder();
        }
    });
    
    // کلیک روی overlay برای بستن همه چیز
    overlay.addEventListener('click', closeAllModals);
    
    // جلوگیری از بسته شدن با کلیک روی خود مودال
    cartModal.addEventListener('click', (e) => e.stopPropagation());
    favoritesModal.addEventListener('click', (e) => e.stopPropagation());
    supportModal.addEventListener('click', (e) => e.stopPropagation());
    sideMenu.addEventListener('click', (e) => e.stopPropagation());
    
    // جستجو
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            showNotification(`جستجو برای: "${query}" (این یک نمونه است)`);
            searchInput.value = '';
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                showNotification(`جستجو برای: "${query}" (این یک نمونه است)`);
                searchInput.value = '';
            }
        }
    });
    
    // دکمه شروع خرید
    const startShoppingBtn = document.querySelector('.btn-primary');
    startShoppingBtn.addEventListener('click', () => {
        showNotification("به بخش محصولات جدید هدایت می‌شوید");
        // اسکرول به بخش محصولات جدید
        document.querySelector('.new-products').scrollIntoView({ behavior: 'smooth' });
    });
    
    // دکمه تکمیل سفارش
    const checkoutBtn = document.querySelector('.btn-checkout');
    checkoutBtn.addEventListener('click', () => {
        if (cartItems.length === 0) {
            showNotification("سبد خرید شما خالی است");
        } else {
            showNotification("سفارش شما با موفقیت ثبت شد (این یک نمونه است)");
            cartItems = [];
            updateCartUI();
            closeAllModals();
        }
    });
});
