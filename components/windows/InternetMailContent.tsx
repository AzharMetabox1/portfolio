'use client';

import { useState } from 'react';

export default function InternetMailContent() {
  const [form, setForm] = useState({ to: '', subject: '', body: '' });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!form.to || !form.subject || !form.body) return;
    // Compose a mailto link as the action
    const mailto = `mailto:alexmorgan@email.com?to=${encodeURIComponent(form.to)}&subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.body)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="win98-mail">
      {/* Toolbar */}
      <div className="win98-mail-toolbar">
        <button className="win98-btn" onClick={handleSend}>📤 Send</button>
        <button className="win98-btn" onClick={() => setForm({ to: '', subject: '', body: '' })}>
          🗑️ Clear
        </button>
        <div style={{ flex: 1 }} />
        <button className="win98-btn">📎 Attach</button>
      </div>

      {sent && (
        <div className="win98-mail-sent-banner">
          ✅ Message queued for delivery!
        </div>
      )}

      {/* Form Fields */}
      <div className="win98-mail-fields">
        <div className="win98-mail-field-row">
          <label className="win98-mail-label">To:</label>
          <input
            className="win98-input"
            type="email"
            value={form.to}
            onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))}
            placeholder="recipient@email.com"
          />
        </div>
        <div className="win98-mail-field-row">
          <label className="win98-mail-label">Subject:</label>
          <input
            className="win98-input"
            type="text"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            placeholder="What's this about?"
          />
        </div>
        <div className="win98-mail-divider" />
        <textarea
          className="win98-textarea"
          value={form.body}
          onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          placeholder="Write your message here..."
          rows={8}
        />
      </div>

      {/* Signature */}
      <div className="win98-mail-signature">
        <div className="win98-mail-sig-line" />
        <pre className="win98-mail-sig-text">{`-- 
Alex Morgan | Full-Stack Engineer
GitHub  : https://github.com/alexmorgan
LinkedIn: https://linkedin.com/in/alexmorgan`}</pre>
      </div>

      {/* Status bar */}
      <div className="win98-status-bar" style={{ padding: '2px 8px' }}>
        <span>Ready</span>
        <span>Outbox: 0 messages</span>
      </div>
    </div>
  );
}
