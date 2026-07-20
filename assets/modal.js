(function() {
  window.openModal = function(type) {
    const modal = document.getElementById('contact-modal');
    const iframe = document.getElementById('modal-content');
    
    if (type === 'calendar') {
      iframe.src = 'https://cal.com/wbgrds/rueckruf';
    } else if (type === 'maps') {
      iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2338.8394684630325!2d12.078469515941887!3d54.11204892478131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ac51cd396e4261%3A0x38c11e5072bd6d77!2sWEBGUARDS%20Internet%20Service!5e0!3m2!1sde!2sde!4v1638797737726!5m2!1sde!2sde';
    }
    
    modal.style.display = 'flex';
    modal.focus();
  };
  
  window.closeModal = function() {
    const modal = document.getElementById('contact-modal');
    modal.style.display = 'none';
  };
  
  // Schließen beim Klick außerhalb des Modal Content
  document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
      
      // ESC-Taste zum Schließen
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          closeModal();
        }
      });
    }
  });
})();
