// script.js - WhatsApp chooser, mailto quote, video modal

function openWhatsApp(){
  // Two numbers; prompt user to choose
  try {
    const nums = ['+971581285338','+971547410141'];
    const choice = prompt('Contact Exponab on WhatsApp — enter 1 or 2:\\n1: +971 58 128 5338\\n2: +971 54 741 0141','1');
    const idx = (choice === '2') ? 1 : 0;
    const link = 'https://wa.me/' + nums[idx].replace(/\+/g,'');
    window.open(link, '_blank');
  } catch (e) {
    window.open('https://wa.me/971581285338','_blank');
  }
}

// Quote form mailto (used on contact page)
function sendQuote(e){
  e.preventDefault();
  const name = (document.getElementById('qname') || {}).value || 'No name';
  const company = (document.getElementById('qcompany') || {}).value || '';
  const product = (document.getElementById('qproduct') || {}).value || '';
  const qty = (document.getElementById('qqty') || {}).value || '';
  const dest = (document.getElementById('qdest') || {}).value || '';
  const message = (document.getElementById('qmessage') || {}).value || '';
  const subject = encodeURIComponent('Quote request from ' + name + ' — ' + product);
  let bodyText = 'Name: ' + name + '\\n';
  bodyText += 'Company/Country: ' + company + '\\n';
  bodyText += 'Product: ' + product + '\\n';
  bodyText += 'Quantity & Packaging: ' + qty + '\\n';
  bodyText += 'Destination: ' + dest + '\\n\\n';
  bodyText += 'Message:\\n' + message + '\\n\\n';
  bodyText += '----\\nThis message sent from the Exponab website.';
  const body = encodeURIComponent(bodyText);
  window.location.href = 'mailto:info@exponab.com?subject=' + subject + '&body=' + body;
  return false;
}

/* Intro video modal */
function showIntro(){
  const modal = document.getElementById('introModal');
  const video = document.getElementById('introVideo');
  if(!modal) return;
  modal.style.display = 'flex';
  try{ video.currentTime = 0; video.play(); }catch(e){}
}
function hideIntro(e){
  // hide if clicked outside or close button
  e = e || window.event;
  const modal = document.getElementById('introModal');
  const video = document.getElementById('introVideo');
  if(!modal) return;
  // if click target is modal background or close button, hide
  if(e.target === modal || e.target.classList.contains('close-btn')){
    try{ video.pause(); video.currentTime = 0; }catch(err){}
    modal.style.display = 'none';
  }
}
