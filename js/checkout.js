// === Checkout Modal Logic ===
const checkoutModal = document.getElementById('checkout-modal');
const checkoutItemsElem = document.getElementById('checkout-items');
const checkoutTotalElem = document.getElementById('checkout-total');
const checkoutForm = document.getElementById('checkout-form');
const closeCheckoutBtn = document.getElementById('close-checkout');

// Tambah tombol checkout di cart modal
const cartModalFooter = document.querySelector('.cart-modal-footer');
let checkoutBtn = document.getElementById('open-checkout');
if (!checkoutBtn) {
  checkoutBtn = document.createElement('button');
  checkoutBtn.id = 'open-checkout';
  checkoutBtn.className = 'auth-btn';
  checkoutBtn.style.marginRight = '10px';
  checkoutBtn.innerHTML = 'Checkout 🛒';
  cartModalFooter.insertBefore(checkoutBtn, cartModalFooter.firstChild);
}

function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

function getCartData() {
  // Ambil data cart dari main.js
  if (window.cart) return window.cart;
  return [];
}

function getMenuData() {
  // Data harga menu (harus sama urutan dengan menu di index.html)
  return [
    { name: 'Espresso', price: 18000 },
    { name: 'Cappuccino', price: 22000 },
    { name: 'Caramel Latte', price: 25000 },
    { name: 'Kopi Susu Gula Aren', price: 20000 }
  ];
}

function renderCheckout() {
  const cart = getCartData();
  const menu = getMenuData();
  let total = 0;
  checkoutItemsElem.innerHTML = '';
  if (!cart.length) {
    checkoutItemsElem.innerHTML = '<div style="text-align:center;color:#888;">Keranjang kosong, yuk pilih menu dulu!</div>';
    checkoutTotalElem.textContent = formatRupiah(0);
    return;
  }
  cart.forEach(item => {
    const menuItem = menu.find(m => m.name === item.name);
    const price = menuItem ? menuItem.price : 0;
    const subtotal = price * item.qty;
    total += subtotal;
    const div = document.createElement('div');
    div.className = 'checkout-item';
    div.innerHTML = `<span>${item.name} x ${item.qty}</span> <span class='checkout-item-price'>${formatRupiah(subtotal)}</span>`;
    checkoutItemsElem.appendChild(div);
  });
  checkoutTotalElem.textContent = formatRupiah(total);
}

checkoutBtn.addEventListener('click', () => {
  renderCheckout();
  checkoutModal.classList.add('show');
});
closeCheckoutBtn.addEventListener('click', () => {
  checkoutModal.classList.remove('show');
});

checkoutForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('checkout-name').value.trim();
  const phone = document.getElementById('checkout-phone').value.trim();
  const address = document.getElementById('checkout-address').value.trim();
  if (!name || !phone || !address) return;
  checkoutModal.classList.remove('show');
  setTimeout(() => {
    alert(`🎉 Terima kasih, ${name}! Pesanan kamu sedang diproses.\n\nDetail pesanan akan dikirim ke WhatsApp: ${phone}`);
  }, 300);
});
