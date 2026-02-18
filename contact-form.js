class ContactForm {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!this.accessKey) {
      console.error('Missing Web3Forms key in .env');
      return;
    }

    this.init();
  }

  init() {
    this.form = this.container.querySelector('.modal-form');
    this.bindEvents();
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    const btn = this.form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const formData = new FormData(this.form);
    formData.append('access_key', this.accessKey);
    formData.append('subject', 'New Contact Form Message');

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(result => {
        if (result.success) {
          console.log('✅ Email sent:', result);
          alert('Message sent to info@skauto.dk!');
          this.form.reset();
        } else {
          throw new Error(result.message || 'Unknown error');
        }
      })
      .catch(error => {
        console.error('❌ Send failed:', error);
        alert('Failed to send. Check console.');
      })
      .finally(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ContactForm('.modal-form-container');
});
