// Init AOS
AOS.init({ duration: 700, once: true });

// small helper
const $ = q => document.querySelector(q);
const $$ = q => document.querySelectorAll(q);

// HERO Ball animation with GSAP
gsap.to("#ball", {
  y: -24,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  duration: 1.25
});
gsap.to(".ball", { rotation: 360, repeat: -1, duration: 8, ease: "none" });

// Populate some example matches
const matches = [
  {home:"Galatasaray", away:"Fenerbahçe", date:"12 Ekim 2025", time:"20:45"},
  {home:"Beşiktaş", away:"Trabzonspor", date:"13 Ekim 2025", time:"18:00"},
  {home:"Başakşehir", away:"Antalyaspor", date:"14 Ekim 2025", time:"16:30"},
  {home:"Konyaspor", away:"Sivasspor", date:"15 Ekim 2025", time:"19:00"}
];

const grid = $("#matchesGrid");
matches.forEach(m => {
  const card = document.createElement('div');
  card.className = 'match-card';
  card.innerHTML = `
    <h3>${m.home} <span style="color:var(--muted);font-weight:500">vs</span> ${m.away}</h3>
    <div class="match-meta">
      <div>${m.date} • ${m.time}</div>
      <div><button class="btn small" style="padding:6px 10px;font-size:0.9rem;background:transparent;color:var(--accent);border:1px solid rgba(255,255,255,0.04);">Detay</button></div>
    </div>
  `;
  grid.appendChild(card);
});

// Simple news slider
let currentNews = 0;
const slides = Array.from(document.querySelectorAll('.news-slide'));
function showNews(i){
  slides.forEach((s,idx) => {
    s.style.transform = `translateX(${(idx - i) * 100}%)`;
  });
}
showNews(0);

$('#prevNews').addEventListener('click', ()=> {
  currentNews = (currentNews - 1 + slides.length) % slides.length;
  showNews(currentNews);
});
$('#nextNews').addEventListener('click', ()=> {
  currentNews = (currentNews + 1) % slides.length;
  showNews(currentNews);
});

// Stats counter when visible
const stats = document.querySelectorAll('.stat');
let statsDone = false;
function runCounters(){
  if(statsDone) return;
  const rect = document.querySelector('#stats').getBoundingClientRect();
  if(rect.top < window.innerHeight - 120){
    stats.forEach(s => {
      const target = +s.getAttribute('data-target');
      const numEl = s.querySelector('.stat-number');
      let count = 0;
      const step = Math.ceil(target / 90);
      const t = setInterval(()=> {
        count += step;
        if(count >= target){
          numEl.textContent = target;
          clearInterval(t);
        } else numEl.textContent = count;
      }, 12);
    });
    statsDone = true;
  }
}
window.addEventListener('scroll', runCounters);
runCounters(); // in case already visible

// small nav smooth scroll
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const href = a.getAttribute('href');
    document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
  })
});
