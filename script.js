// script.js — mobile nav, whatsapp, simple reveal on scroll, video open/close

// Mobile nav toggle (small, robust)
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if(navToggle){
    navToggle.addEventListener('click', () => {
      const open = navMenu.style.display === 'flex';
      navMenu.style.display = open ? 'none' : 'flex';
      navToggle.setAttribute('aria-expanded', !open);
    });
    // initial state on small screens
    if(window.innerWidth <= 820) navMenu.style.display = 'none';
    window.addEventListener('resize', () => {
      if(window.innerWidth > 820) navMenu.style.display = 'flex';
      else navMenu.style.display = 'none';
    });
  }

  // IntersectionObserver for reveal animations
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // hook Watch Intro to play/unmute & scroll to video
  const watchBtn = document.getElementById('watchIntro');
  if(watchBtn){
    watchBtn.addEventListener('click', () => {
      const v = document.querySelector('.hero-video');
      if(v){
        try { v.muted = false; v.play(); v.scrollIntoView({behavior:'smooth', block:'center'}); }
        catch(e){}
      }
    });
  }
});

// WhatsApp chooser opens with your two numbers (shows prompt)
function openWhatsApp(){
  const nums = ['+971581285338','+971547410141'];
  const choice = prompt('Choose WhatsApp number:\n1: +971 58 128 5338\n2: +971 54 741 0141','1');
  const idx = choice === '2' ? 1 : 0;
  const link = 'https://wa.me/' + nums[idx].replace(/\+/g,'');
  window.open(link, '_blank');
}

// optional: close video overlay (if later used)
function closeVideo(){
  const overlay = document.getElementById('videoOverlay');
  if(overlay) overlay.style.display = 'none';
}
