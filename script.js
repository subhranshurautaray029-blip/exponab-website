// script.js - WhatsApp chooser and mailto-based quote submit

function openWhatsApp(){
  // Open a choice for the two numbers you provided.
  // We will show a simple prompt that lets the user pick which number to open.
  try {
    const nums = ['+971581285338','+971547410141'];
    const choice = prompt('Contact Exponab on WhatsApp — enter 1 or 2:\\n1: +971 58 128 5338\\n2: +971 54 741 0141','1');
    const idx = (choice === '2') ? 1 : 0;
    const link = 'https://wa.me/' + nums[idx].replace(/\+/g,'');
    window.open(link, '_blank');
  } catch (e) {
    // fallback to first number
    window.open('https://wa.me/971581285338','_blank');
  }
}

// Form submit: open user's email client with prefilled content
function sendQuote(e){
  e.preventDefault();
  const name = document.getElementById('qname').value || 'No name';
  const company = document.getElementById('qcompany').value || '';
  const product = document.getElementById('qproduct').value || '';
  const qty = document.getElementById('qqty').value || '';
  const dest = document.getElementById('qdest').value || '';
  const message = document.getElementById('qmessage').value || '';

  const subject = encodeURIComponent('Quote request from ' + name + ' — ' + product);
  let bodyText = 'Name: ' + name + '\\n';
  bodyText += 'Company/Country: ' + company + '\\n';
  bodyText += 'Product: ' + product + '\\n';
  bodyText += 'Quantity & Packaging: ' + qty + '\\n';
  bodyText += 'Destination: ' + dest + '\\n\\n';
  bodyText += 'Message:\\n' + message + '\\n\\n';
  bodyText += '----\\nThis message sent from the Exponab website.';

  const body = encodeURIComponent(bodyText);
  // Open mail client
  window.location.href = 'mailto:info@exponab.com?subject=' + subject + '&body=' + body;
  return false;
}
