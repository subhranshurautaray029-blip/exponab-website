// script.js — small helpers: nav, video autoplay once per session, reveal on scroll

// NAV toggle for mobile
(function(){
  var btn = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if(btn && menu){
    btn.addEventListener('click', function(){
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', (!expanded).toString());
      if(!expanded){
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
        menu.style.position = 'absolute';
        menu.style.right = '18px';
        menu.style.top = '64px';
        menu.style.background = 'linear-gradient(180deg, rgba(4,12,16,0.95), rgba(4,12,16,0.9))';
        menu.style.padding = '10px';
        menu.style.borderRadius = '8px';
        menu.style.zIndex = 120;
      } else {
        menu.style.display = '';
        menu.style.position = '';
        menu.style.background = '';
      }
    });
  }
})();

// WhatsApp helper
function openWhatsApp(){
  window.open('https://wa.me/971581285338', '_blank');
}

// VIDEO: autoplay once per session (muted)
// and only attempt play when allowed; watch button unmutes
(function(){
  var vid = document.getElementById('heroIntroVideo');
  if(!vid) return;

  function tryPlayOnce(){
    try {
      var played = sessionStorage.getItem('exponab_intro_played');
      if(!played){
        vid.muted = true;
        var p = vid.play();
        if(p && p.then){
          p.then(function(){ /* playing */ }).catch(function(){ /* autoplay blocked */ });
        }
        // mark as played when ended or after 25s safety
        vid.addEventListener('ended', function(){ sessionStorage.setItem('exponab_intro_played','1'); }, { once:true });
        setTimeout(function(){ sessionStorage.setItem('exponab_intro_played','1'); }, 25*1000);
      } else {
        vid.pause();
      }
    } catch(e){
      // ignore storage errors
      try{ vid.play(); }catch(e2){}
    }
  }

  document.addEventListener('DOMContentLoaded', tryPlayOnce);

  // Watch intro button unmutes + plays and marks as played
  var watchBtn = document.getElementById('watchIntro');
  if(watchBtn){
    watchBtn.addEventListener('click', function(){
      vid.muted = false;
      vid.play().catch(function(){});
      try{ sessionStorage.setItem('exponab_intro_played','1'); }catch(e){}
      // optionally scroll video into view
      vid.scrollIntoView({ behavior:'smooth', block:'center' });
    });
  }
})();

// Reveal-on-scroll small trigger (adds .revealed)
(function(){
  var revealEls = document.querySelectorAll('.reveal');
  function checkReveal(){
    var h = window.innerHeight;
    revealEls.forEach(function(el){
      var r = el.getBoundingClientRect();
      if(r.top < h - 60) el.classList.add('revealed');
    });
  }
  document.addEventListener('scroll', checkReveal, { passive:true });
  window.addEventListener('resize', checkReveal);
  document.addEventListener('DOMContentLoaded', checkReveal);
})();

// CONTACT FORM: mailto fallback (Formspree integration option)
// The default form in contact.html uses onsubmit="submitContactForm(event)"
function submitContactForm(e){
  e.preventDefault();
  var form = e.target;
  var data = new FormData(form);
  // Build a friendly email body
  var first = data.get('first') || '';
  var last  = data.get('last') || '';
  var email = data.get('email') || '';
  var phone = data.get('phone') || '';
  var product_cat = data.get('product_cat') || '';
  var qty = data.get('quantity') || '';
  var dest = data.get('destination') || '';
  var message = data.get('message') || '';

  // If you want to use Formspree, send a fetch POST here to your Formspree endpoint.
  // Example:
  // fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: data })
  //   .then(...)

  // For quick fallback we'll open the user's email client with mailto:
  var subject = encodeURIComponent('Quote Request from website: ' + (product_cat || 'General'));
  var body = encodeURIComponent(
    'Name: ' + first + ' ' + last + '\n' +
    'Email: ' + email + '\n' +
    'Phone: ' + phone + '\n' +
    'Product/Category: ' + product_cat + '\n' +
    'Quantity & packing: ' + qty + '\n' +
    'Destination: ' + dest + '\n\n' +
    'Message:\n' + message
  );

  // open mail client
  var mailto = 'mailto:info@exponab.com?subject=' + subject + '&body=' + body;
  window.location.href = mailto;
}
