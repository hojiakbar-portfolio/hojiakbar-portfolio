const TELEGRAM_USERNAME = 'hojiakbar_dasturlash';

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const toTop = document.getElementById('toTop');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Menyuni yopish' : 'Menyuni ochish');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  toTop.classList.toggle('visible', window.scrollY > 450);
}, { passive: true });
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('year').textContent = new Date().getFullYear();

function openTelegramWithMessage(message) {
  const text = encodeURIComponent(message);
  const url = `https://t.me/${TELEGRAM_USERNAME}?text=${text}`;
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) {
    // Popup bloklangan holatda ham xabarni yo‘qotmaymiz.
    const temporaryLink = document.createElement('a');
    temporaryLink.href = url;
    temporaryLink.target = '_blank';
    temporaryLink.rel = 'noopener noreferrer';
    temporaryLink.click();
  }
}

document.getElementById('orderForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('clientName').value.trim();
  const service = document.getElementById('serviceType').value;
  const budget = document.getElementById('budget').value;
  const details = document.getElementById('projectDetails').value.trim();
  if (!name || !service || !details) {
    showToast('Iltimos, yulduzcha (*) bilan belgilangan maydonlarni to‘ldiring.');
    return;
  }
  const message = `Assalomu alaykum, Hojiakbar! Saytga buyurtma bermoqchiman.\n\nIsmim: ${name}\nKerakli xizmat: ${service}\nBudjet: ${budget}\nLoyiha tafsilotlari: ${details}\n\nSaytdagi buyurtma formasidan yuborildi.`;
  openTelegramWithMessage(message);
  document.getElementById('formStatus').textContent = 'Telegram ochilishi kerak. Xabarni tekshirib, yuborish tugmasini bosing.';
  showToast('Buyurtma matni Telegram uchun tayyorlandi.');
});

document.getElementById('suggestionForm').addEventListener('submit', event => {
  event.preventDefault();
  const suggestion = document.getElementById('suggestionText').value.trim();
  if (!suggestion) {
    showToast('Avval taklifingizni yozing.');
    return;
  }
  openTelegramWithMessage(`Assalomu alaykum, Hojiakbar! Saytingiz uchun taklifim bor:\n\n${suggestion}`);
  document.getElementById('suggestionStatus').textContent = 'Telegram ochilishi kerak. Taklifni tekshirib, o‘zingiz yuboring.';
  showToast('Taklif matni Telegram uchun tayyorlandi.');
});

// Navigatsiya bo‘limlarini klaviatura orqali ham qulay ishlatish uchun oddiy focus uslubi CSS’da berilgan.
