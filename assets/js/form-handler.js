// Form Handler - Support Tickets → GitHub Issues mit @wbgrds Erwähnung
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

    // GitHub API: Issue erstellen im WEBGUARDS-DE/customer Repo
    const githubToken = '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'; // SOLLTE AUS ENV KOMMEN!
    
    const issueBody = `@wbgrds – Neues Support-Ticket von help.webguards.de

## Kontakt
**Name:** ${formData.name}
**E-Mail:** ${formData.email}
${formData.telefon ? `**Telefon:** ${formData.telefon}` : ''}

## Kategorie
\`${formData.kategorie}\`

## Nachricht
${formData.nachricht}

---
**Ticket erstellt:** ${new Date().toLocaleString('de-DE')}
`;

    const response = await fetch('https://api.github.com/repos/WEBGUARDS-DE/customer/issues', {
      method: 'POST',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: `Support: ${formData.name} – ${formData.kategorie}`,
        body: issueBody,
        labels: ['support-ticket', `cat/${formData.kategorie}`],
        assignees: ['wbgrds']
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Fehler beim Erstellen des Tickets');
    }

    const result = await response.json();
    
    // Erfolg
    showMessage(`✅ Ticket #${result.number} erstellt! Wir kümmern uns darum.`, 'success');
    form.reset();

  } catch (error) {
    showMessage(`❌ Fehler: ${error.message}`, 'error');
    console.error('Support Ticket Error:', error);
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
