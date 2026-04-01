import { useState } from 'react';
import { Key, X, ExternalLink, Check } from 'lucide-react';
import { getApiKey, setApiKey, hasApiKey } from '../utils/geminiApi';

export default function ApiKeyModal({ isOpen, onClose }) {
  const [key, setKey] = useState(getApiKey());
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiKey(key.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Key size={20} />
            API Key Settings
          </h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', lineHeight: 'var(--leading-relaxed)' }}>
          Enter your Google Gemini API key to enable AI-powered content enhancement.
          Your key is stored locally and never sent to any server except Google's API.
        </p>

        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            fontSize: 'var(--text-sm)',
            color: 'var(--accent-light)',
            marginBottom: 'var(--space-4)',
          }}
        >
          Get a free API key from Google AI Studio <ExternalLink size={12} />
        </a>

        <div className="input-group" style={{ marginBottom: 'var(--space-6)' }}>
          <label className="input-label">Gemini API Key</label>
          <input
            type="password"
            className="input-field"
            placeholder="AIza..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
            style={{ fontFamily: 'var(--font-mono)' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={!key.trim()}>
            {saved ? <><Check size={16} /> Saved!</> : 'Save Key'}
          </button>
        </div>
      </div>
    </div>
  );
}
