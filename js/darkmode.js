// === Dark Mode Toggle ===
const darkBtn = document.getElementById('darkmode-toggle');
const root = document.documentElement;
const darkKey = 'afifan-darkmode';

function setDarkMode(on) {
  if (on) {
    root.classList.add('dark');
    darkBtn.textContent = '☀️';
    localStorage.setItem(darkKey, '1');
  } else {
    root.classList.remove('dark');
    darkBtn.textContent = '🌙';
    localStorage.setItem(darkKey, '0');
  }
}
darkBtn.addEventListener('click', () => {
  setDarkMode(!root.classList.contains('dark'));
});
// Load mode on page load
if (localStorage.getItem(darkKey) === '1') setDarkMode(true);
