import { useState } from 'react';
import { Sparkles, Wand2, Check, X, RotateCcw, AlertCircle, Key } from 'lucide-react';
import { enhanceFullResume, hasApiKey } from '../utils/geminiApi';
import './AIEnhancer.css';

export default function AIEnhancer({ data, onChange, onNext, onBack, onOpenApiKey }) {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const [error, setError] = useState('');
  const [originalData, setOriginalData] = useState(null);

  const handleEnhance = async () => {
    if (!hasApiKey()) {
      onOpenApiKey();
      return;
    }

    setIsEnhancing(true);
    setError('');
    setOriginalData(JSON.parse(JSON.stringify(data)));

    try {
      const result = await enhanceFullResume(data);
      // Merge enhanced data while preserving IDs and structure
      const merged = {
        ...data,
        summary: result.summary || data.summary,
        experience: data.experience.map((exp, i) => ({
          ...exp,
          bullets: result.experience?.[i]?.bullets || exp.bullets,
        })),
        projects: data.projects.map((proj, i) => ({
          ...proj,
          description: result.projects?.[i]?.description || proj.description,
        })),
      };
      onChange(merged);
      setEnhanced(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleRevert = () => {
    if (originalData) {
      onChange(originalData);
      setEnhanced(false);
      setOriginalData(null);
    }
  };

  return (
    <div className="ai-enhancer animate-fade-in-up">
      <div className="ai-header">
        <div className="ai-icon-wrapper">
          <Sparkles size={24} />
        </div>
        <h2>AI Content Enhancement</h2>
        <p>
          Let AI transform your plain text into polished, professional, ATS-optimized content
          with strong action verbs and quantified achievements.
        </p>
      </div>

      {!hasApiKey() && (
        <div className="ai-notice">
          <AlertCircle size={18} />
          <div>
            <strong>API Key Required</strong>
            <p>Add your free Google Gemini API key to enable AI enhancement.</p>
          </div>
          <button className="btn btn-primary btn-sm" onClick={onOpenApiKey}>
            <Key size={14} /> Add API Key
          </button>
        </div>
      )}

      {error && (
        <div className="ai-error">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Preview of what will be enhanced */}
      <div className="ai-preview">
        <h3>Content to Enhance</h3>
        <div className="ai-preview-items">
          {data.summary && (
            <div className="ai-preview-item">
              <span className="ai-preview-label">Summary</span>
              <p className="ai-preview-text">{data.summary}</p>
            </div>
          )}
          {data.experience.map((exp) => (
            <div key={exp.id} className="ai-preview-item">
              <span className="ai-preview-label">{exp.title} at {exp.company}</span>
              {exp.bullets?.map((b, i) => (
                <p key={i} className="ai-preview-text">• {b}</p>
              ))}
            </div>
          ))}
          {data.projects.map((proj) => (
            <div key={proj.id} className="ai-preview-item">
              <span className="ai-preview-label">{proj.name}</span>
              <p className="ai-preview-text">{proj.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="ai-actions">
        {!enhanced ? (
          <button
            className="btn btn-primary btn-lg ai-enhance-btn"
            onClick={handleEnhance}
            disabled={isEnhancing}
          >
            {isEnhancing ? (
              <>
                <div className="spinner" />
                Enhancing with AI...
              </>
            ) : (
              <>
                <Wand2 size={18} />
                Enhance with AI
              </>
            )}
          </button>
        ) : (
          <div className="ai-success">
            <Check size={18} />
            <span>Content enhanced successfully!</span>
            <button className="btn btn-ghost btn-sm" onClick={handleRevert}>
              <RotateCcw size={14} /> Revert
            </button>
          </div>
        )}
      </div>

      <div className="ai-nav">
        <button className="btn btn-secondary" onClick={onBack}>← Back to Editor</button>
        <button className="btn btn-primary" onClick={onNext}>
          Choose Template →
        </button>
      </div>

      <p className="ai-skip-note">
        You can skip AI enhancement and proceed directly to template selection.
      </p>
    </div>
  );
}
