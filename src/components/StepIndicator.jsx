import { Check } from 'lucide-react';
import './StepIndicator.css';

const steps = [
  { id: 1, label: 'Details' },
  { id: 2, label: 'AI Enhance' },
  { id: 3, label: 'Template' },
  { id: 4, label: 'Export' },
];

export default function StepIndicator({ currentStep, onStepClick }) {
  return (
    <div className="step-indicator">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <div key={step.id} className="step-indicator-item">
            <button
              className={`step-dot ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => onStepClick(step.id)}
              disabled={step.id > currentStep + 1}
              aria-label={`Step ${step.id}: ${step.label}`}
            >
              {isCompleted ? <Check size={14} strokeWidth={3} /> : step.id}
            </button>
            <span className={`step-label ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`step-connector ${isCompleted ? 'completed' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
