
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');

function showToast(message, type = 'success') {
  toast.innerText = message;
  toast.className = `toast show ${type}`;
  
  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent default page reload

  const formData = new FormData(form);

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      showToast('Message sent successfully!', 'success');
      form.reset();
    } else {
      showToast('Error sending message. Please try again.', 'error');
    }
  } catch (error) {
    showToast('Network error. Please try again.', 'error');
    console.error(error);
  }
});
