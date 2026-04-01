import { useState, useEffect } from 'react';
import { FileText, Key, Settings } from 'lucide-react';
import Landing from './components/Landing';
import StepIndicator from './components/StepIndicator';
import ResumeForm from './components/ResumeForm';
import AIEnhancer from './components/AIEnhancer';
import TemplateSelector from './components/TemplateSelector';
import ResumePreview from './components/ResumePreview';
import ExportPanel from './components/ExportPanel';
import ApiKeyModal from './components/ApiKeyModal';
import { emptyResumeData } from './utils/sampleData';
import './App.css';

const STORAGE_KEY = 'resumeai_data';

function loadSavedData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'builder'
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState(() => loadSavedData() || emptyResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
  }, [resumeData]);

  const handleGetStarted = () => {
    setView('builder');
    setStep(1);
  };

  const goToStep = (s) => {
    if (s >= 1 && s <= 4) setStep(s);
  };

  // Landing page
  if (view === 'landing') {
    return (
      <>
        <Landing onGetStarted={handleGetStarted} />
        <ApiKeyModal isOpen={showApiKeyModal} onClose={() => setShowApiKeyModal(false)} />
      </>
    );
  }

  // Builder view
  return (
    <div className="app-builder">
      {/* Top Bar */}
      <header className="app-topbar">
        <div className="app-topbar-inner container-wide">
          <button className="app-logo" onClick={() => setView('landing')}>
            <FileText size={20} strokeWidth={1.5} />
            <span>ResumeAI</span>
          </button>
          <div className="app-topbar-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => setShowApiKeyModal(true)}>
              <Key size={14} /> API Key
            </button>
          </div>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="container">
        <StepIndicator currentStep={step} onStepClick={goToStep} />
      </div>

      {/* Step Content */}
      <main className="app-content container-wide">
        {step === 1 && (
          <ResumeForm
            data={resumeData}
            onChange={setResumeData}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <AIEnhancer
            data={resumeData}
            onChange={setResumeData}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            onOpenApiKey={() => setShowApiKeyModal(true)}
          />
        )}

        {step === 3 && (
          <TemplateSelector
            selected={selectedTemplate}
            onSelect={setSelectedTemplate}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <div className="app-preview-layout">
            <div className="app-preview-main">
              <ResumePreview data={resumeData} template={selectedTemplate} />
            </div>
            <div className="app-preview-sidebar">
              <ExportPanel
                data={resumeData}
                onBack={() => setStep(3)}
                onEdit={() => setStep(1)}
              />
            </div>
          </div>
        )}
      </main>

      <ApiKeyModal isOpen={showApiKeyModal} onClose={() => setShowApiKeyModal(false)} />
    </div>
  );
}
