// Form Handler - Support API via call.ob5.dev
const form = document.getElementById('support-form');
const submitBtn = document.getElementById('submit-btn');
const messageDiv = document.getElementById('message');
const loadingDiv = document.getElementById('loading');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Formular deaktivieren
  submitBtn.disabled = true;
  loadingDiv.classList.add('show');
  messageDiv.className = 'message';

  // Formular-Daten sammeln
  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    telefon: document.getElementById('telefon').value.trim(),
    kategorie: document.getElementById('kategorie').value,
    nachricht: document.getElementById('nachricht').value.trim()
  };

  try {
    // Validierung
    if (!formData.name || !formData.email || !formData.kategorie || !formData.nachricht) {
      throw new Error('Bitte alle erforderlichen Felder ausfüllen');
    }

    if (!isValidEmail(formData.email)) {
      throw new Error('Ungültige E-Mail-Adresse');
    }

    // Support API: POST zu call.ob5.dev
    const response = await fetch('https://call.ob5.dev/support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Fehler beim Absenden der Anfrage');
    }

    const result = await response.json();

    // Erfolg
    showMessage('✅ Anfrage erhalten! Wir kümmern uns darum.', 'success');
    form.reset();

  } catch (error) {
    showMessage(`❌ Fehler: ${error.message}`, 'error');
  } finally {
    submitBtn.disabled = false;
    loadingDiv.classList.remove('show');
  }
});

// Hilfsfunktionen
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
}
