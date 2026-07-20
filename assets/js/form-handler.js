// GitHub API Config
const GITHUB_TOKEN = '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';
const GITHUB_OWNER = 'WEBGUARDS-DE';
const GITHUB_REPO = 'help';

// Form Handler
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

    // GitHub API: repository_dispatch Event
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_type: 'support-form-submitted',
          client_payload: formData
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Fehler beim Absenden der Anfrage');
    }

    // Erfolg
    showMessage('Anfrage erhalten! Wir kümmern uns darum.', 'success');
    form.reset();

  } catch (error) {
    showMessage(`Fehler: ${error.message}`, 'error');
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
