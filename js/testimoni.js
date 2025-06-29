// === Testimoni & Rating ===
const testimoniList = document.getElementById('testimoni-list');
const testimoniForm = document.getElementById('testimoni-form');
const testimoniMenu = document.getElementById('testimoni-menu');
const testimoniNama = document.getElementById('testimoni-nama');
const testimoniText = document.getElementById('testimoni-text');
const testimoniRating = document.getElementById('testimoni-rating');
let currentRating = 0;

// Animasi bintang rating
[...testimoniRating.children].forEach(star => {
  star.addEventListener('mouseenter', function() {
    highlightStars(this.dataset.rate);
  });
  star.addEventListener('mouseleave', function() {
    highlightStars(currentRating);
  });
  star.addEventListener('click', function() {
    currentRating = this.dataset.rate;
    highlightStars(currentRating);
  });
});
function highlightStars(rate) {
  [...testimoniRating.children].forEach(star => {
    star.style.color = star.dataset.rate <= rate ? '#ff9800' : '#ccc';
    star.style.transform = star.dataset.rate <= rate ? 'scale(1.2) rotate(-8deg)' : '';
  });
}
highlightStars(0);

// Simpan testimoni di localStorage
function getTestimoni() {
  return JSON.parse(localStorage.getItem('testimoniList') || '[]');
}
function saveTestimoni(list) {
  localStorage.setItem('testimoniList', JSON.stringify(list));
}
function renderTestimoni() {
  const data = getTestimoni();
  testimoniList.innerHTML = '';
  if (!data.length) {
    testimoniList.innerHTML = '<div class="testimoni-empty">Belum ada testimoni, jadilah yang pertama! 🎉</div>';
    return;
  }
  data.reverse().forEach(t => {
    const div = document.createElement('div');
    div.className = 'testimoni-item';
    div.innerHTML = `
      <div class="testimoni-head">
        <span class="testimoni-menu">${t.menu}</span>
        <span class="testimoni-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5-t.rating)}</span>
      </div>
      <div class="testimoni-body">${t.text}</div>
      <div class="testimoni-foot">- ${t.nama}</div>
    `;
    testimoniList.appendChild(div);
  });
}
renderTestimoni();

testimoniForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (!currentRating) {
    alert('Pilih rating bintang dulu ya!');
    return;
  }
  const t = {
    menu: testimoniMenu.value,
    nama: testimoniNama.value.trim(),
    text: testimoniText.value.trim(),
    rating: parseInt(currentRating)
  };
  const data = getTestimoni();
  data.push(t);
  saveTestimoni(data);
  renderTestimoni();
  testimoniForm.reset();
  currentRating = 0;
  highlightStars(0);
  testimoniMenu.selectedIndex = 0;
});
