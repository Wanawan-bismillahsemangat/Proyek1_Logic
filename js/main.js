// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Fitur keranjang
let cartCount = 0;
const cartCountElem = document.getElementById('cart-count');
const orderBtns = document.querySelectorAll('.order-btn');
const cartModal = document.getElementById('cart-modal');
const cartIcon = document.getElementById('cart-icon');
const cartItemsElem = document.getElementById('cart-items');
const closeCartBtn = document.getElementById('close-cart');
let cart = [];

function renderCart() {
  cartItemsElem.innerHTML = '';
  if (cart.length === 0) {
    cartItemsElem.innerHTML = '<li style="text-align:center;color:#888;">Keranjang kosong</li>';
    return;
  }
  cart.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <span>${item.name} x <input type="number" min="1" value="${item.qty}" data-idx="${idx}" class="cart-qty-input" style="width:40px;"> </span>
      <button class="cart-remove-btn" data-idx="${idx}">Hapus</button>
    `;
    cartItemsElem.appendChild(li);
  });
}

cartIcon.addEventListener('click', () => {
  renderCart();
  cartModal.classList.add('show');
});
closeCartBtn.addEventListener('click', () => {
  cartModal.classList.remove('show');
});

cartItemsElem.addEventListener('input', function(e) {
  if (e.target.classList.contains('cart-qty-input')) {
    const idx = e.target.getAttribute('data-idx');
    let val = parseInt(e.target.value);
    if (val < 1 || isNaN(val)) val = 1;
    cart[idx].qty = val;
    updateCartCount();
  }
});
cartItemsElem.addEventListener('click', function(e) {
  if (e.target.classList.contains('cart-remove-btn')) {
    const idx = e.target.getAttribute('data-idx');
    cart.splice(idx, 1);
    updateCartCount();
    renderCart();
  }
});

function updateCartCount() {
  cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountElem.textContent = cartCount;
}

orderBtns.forEach((btn, i) => {
  btn.addEventListener('click', function(e) {
    btn.classList.add('clicked');
    // Simulasi nama produk
    const name = 'Produk ' + (i+1);
    const found = cart.find(item => item.name === name);
    if (found) {
      found.qty++;
    } else {
      cart.push({ name, qty: 1 });
    }
    updateCartCount();
    cartCountElem.classList.add('bump');
    showToast('Pesanan ditambahkan ke keranjang!');
    setTimeout(() => {
      btn.classList.remove('clicked');
      cartCountElem.classList.remove('bump');
    }, 300);
    // Efek ripple pada tombol order
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = e.offsetX + 'px';
    ripple.style.top = e.offsetY + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
    // Shake cart icon
    shakeCartIcon();
  });
});

// Notifikasi sederhana
function showToast(msg) {
  let toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.classList.add('show'); }, 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 1500);
}

// Efek animasi pada tombol menu utama
const menuBtn = document.querySelector('.hero .btn');
if (menuBtn) {
  menuBtn.addEventListener('mouseenter', () => {
    menuBtn.style.transform = 'scale(1.08) rotate(-2deg)';
    menuBtn.style.boxShadow = '0 6px 24px #7b3f0033';
  });
  menuBtn.addEventListener('mouseleave', () => {
    menuBtn.style.transform = '';
    menuBtn.style.boxShadow = '';
  });
}

// Efek parallax sederhana pada hero section
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    hero.style.backgroundPosition = `center ${offset * 0.3}px`;
  });
}

// Animasi fade-in saat scroll untuk section
const sections = document.querySelectorAll('section, .footer');
const fadeInOnScroll = () => {
  const trigger = window.innerHeight * 0.92;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < trigger) {
      sec.classList.add('fade-in');
    }
  });
};
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Greeting waktu (selamat pagi/siang/sore/malam)
function greetingTime() {
  const h = new Date().getHours();
  if (h < 11) return 'Selamat pagi!';
  if (h < 15) return 'Selamat siang!';
  if (h < 18) return 'Selamat sore!';
  return 'Selamat malam!';
}
const logo = document.querySelector('.logo');
if (logo) {
  logo.title = greetingTime();
}

// Animasi shake pada ikon cart saat item ditambah
cartIcon.addEventListener('animationend', () => {
  cartIcon.classList.remove('shake');
});
function shakeCartIcon() {
  cartIcon.classList.add('shake');
}
