import './style.css';

const root = document.querySelector('#root');
const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
const savedTheme = localStorage.getItem('digital-clock-theme') || 'system';

document.documentElement.dataset.theme = savedTheme;

root.innerHTML = `
  <main class="app-shell">
    <section class="clock-card" aria-label="Digital Clock">
      <header class="header">
        <div class="brand">
          <div class="brand-mark" aria-hidden="true">88</div>
          <div>
            <p class="eyebrow">LOCAL TIME</p>
            <h1>Digital Clock</h1>
          </div>
        </div>
        <div class="theme-switcher" role="group" aria-label="Theme">
          <button type="button" data-theme="system">System</button>
          <button type="button" data-theme="light">Light</button>
          <button type="button" data-theme="dark">Dark</button>
        </div>
      </header>

      <div class="clock-wrap">
        <div class="clock" aria-label="現在時刻">
          <span id="time">00:00:</span><span id="seconds" class="seconds">00</span>
        </div>
      </div>
      <div id="date" class="date">0000年00月00日（土）</div>
      <div id="timezone" class="timezone">LOCAL TIME</div>
    </section>
  </main>
`;

const time = document.querySelector('#time');
const seconds = document.querySelector('#seconds');
const date = document.querySelector('#date');
const timezone = document.querySelector('#timezone');
const buttons = document.querySelectorAll('.theme-switcher button');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('digital-clock-theme', theme);
  buttons.forEach((button) => {
    const active = button.dataset.theme === theme;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

buttons.forEach((button) => button.addEventListener('click', () => setTheme(button.dataset.theme)));

function updateClock() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  time.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:`;
  seconds.textContent = pad(now.getSeconds());
  date.textContent = `${now.getFullYear()}年${pad(now.getMonth() + 1)}月${pad(now.getDate())}日（${weekdays[now.getDay()]}）`;
  timezone.textContent = `${Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local'}  •  LOCAL TIME`;
}

setTheme(savedTheme);
updateClock();
setInterval(updateClock, 250);
