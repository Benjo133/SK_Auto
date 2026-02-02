// EmailJS CDN still needed in index.html
class ContactForm {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    this.templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    this.publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!this.serviceId || !this.templateId || !this.publicKey) {
      console.error('Missing EmailJS config in .env');
      return;
    }

    this.init();
  }

  init() {
    this.form = this.container.querySelector('.modal-form');
    this.bindEvents();
    emailjs.init(this.publicKey);
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const btn = this.form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const result = await emailjs.sendForm(this.serviceId, this.templateId, this.form);
      console.log('✅ Email sent:', result);
      alert('Message sent to info@skauto.dk!');
      this.form.reset();
    } catch (error) {
      console.error('❌ Send failed:', error);
      alert('Failed to send. Check console.');
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  }
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm('.modal-form-container');
});
