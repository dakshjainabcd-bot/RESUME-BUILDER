import { Check } from 'lucide-react';
import { sampleResumeData } from '../utils/sampleData';
import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import './TemplateSelector.css';

const templates = [
  { id: 'modern', name: 'Modern', desc: 'Clean two-column layout with accent sidebar', Component: ModernTemplate },
  { id: 'classic', name: 'Classic', desc: 'Traditional single-column, timeless design', Component: ClassicTemplate },
  { id: 'minimal', name: 'Minimal', desc: 'Ultra-clean with generous whitespace', Component: MinimalTemplate },
  { id: 'creative', name: 'Creative', desc: 'Bold header with vibrant accents', Component: CreativeTemplate },
];

export default function TemplateSelector({ selected, onSelect, onNext, onBack }) {
  return (
    <div className="template-selector animate-fade-in-up">
      <div className="ts-header">
        <h2>Choose Your Template</h2>
        <p>Select a professional template that best suits your industry and style.</p>
      </div>

      <div className="ts-grid">
        {templates.map((tmpl) => (
          <button
            key={tmpl.id}
            className={`ts-card ${selected === tmpl.id ? 'selected' : ''}`}
            onClick={() => onSelect(tmpl.id)}
          >
            <div className="ts-preview-wrapper">
              <div className="ts-preview">
                <tmpl.Component data={sampleResumeData} />
              </div>
              {selected === tmpl.id && (
                <div className="ts-selected-badge">
                  <Check size={16} strokeWidth={3} />
                </div>
              )}
            </div>
            <div className="ts-info">
              <h3>{tmpl.name}</h3>
              <p>{tmpl.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="ts-nav">
        <button className="btn btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onNext} disabled={!selected}>
          Preview Resume →
        </button>
      </div>
    </div>
  );
}
