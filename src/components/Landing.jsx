import { FileText, ArrowRight, Sparkles, Layout, Download, Zap, CheckCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { getInitialTheme } from './ThemeToggle';
import { useEffect } from 'react';
import './Landing.css';

const features = [
  {
    icon: <Sparkles size={18} />,
    title: 'AI-Powered Writing',
    desc: 'Transform plain text into polished, professional resume content instantly.',
  },
  {
    icon: <Layout size={18} />,
    title: 'Premium Templates',
    desc: 'Choose from beautifully crafted templates optimized for ATS systems.',
  },
  {
    icon: <Download size={18} />,
    title: 'Export Anywhere',
    desc: 'Download your resume as PDF or DOCX, ready to submit.',
  },
  {
    icon: <Zap size={18} />,
    title: 'Instant Preview',
    desc: 'See your resume take shape in real-time as you type.',
  },
];

export default function Landing({ onGetStarted }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', getInitialTheme());
  }, []);

  return (
    <div className="landing">
      {/* Ambient background */}
      <div className="landing-bg">
        <div className="landing-orb landing-orb-1"></div>
        <div className="landing-orb landing-orb-2"></div>
      </div>

      {/* Navbar */}
      <nav className="landing-nav">
        <div className="landing-nav-inner container">
          <div className="landing-logo">
            <FileText size={20} strokeWidth={1.5} />
            <span>ResumeAI</span>
          </div>
          <div className="landing-nav-actions">
            <ThemeToggle />
            <button className="btn btn-primary btn-sm" onClick={onGetStarted}>
              Get Started <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero container">
        <div className="hero-content">
          <div className="badge animate-fade-in">
            <Sparkles size={11} />
            AI-Powered Resume Builder
          </div>
          <h1 className="hero-title animate-fade-in-up">
            Build a resume that<br />
            <span className="hero-gradient-text">gets you hired</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Enter your details in plain language. Our AI transforms them into a
            polished, ATS-optimized professional resume in seconds.
          </p>
          <div className="hero-actions animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <button className="btn btn-primary btn-lg" onClick={onGetStarted}>
              Create Your Resume <ArrowRight size={16} />
            </button>
            <button className="btn btn-ghost btn-lg" onClick={onGetStarted}>
              View Templates
            </button>
          </div>
          <div className="hero-proof animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="hero-proof-item">
              <CheckCircle size={13} />
              <span>ATS Optimized</span>
            </div>
            <div className="hero-proof-item">
              <CheckCircle size={13} />
              <span>Free to Use</span>
            </div>
            <div className="hero-proof-item">
              <CheckCircle size={13} />
              <span>No Sign-up Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features container">
        <div className="features-grid stagger-children">
          {features.map((f, i) => (
            <div className="feature-card glass-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="landing-steps container">
        <h2 className="steps-title">How it works</h2>
        <div className="steps-grid stagger-children">
          <div className="step-item">
            <div className="step-number">01</div>
            <h3>Enter your details</h3>
            <p>Fill in your information — education, skills, experience — in plain language.</p>
          </div>
          <div className="step-item">
            <div className="step-number">02</div>
            <h3>AI enhances it</h3>
            <p>Our AI polishes your content with professional language and action verbs.</p>
          </div>
          <div className="step-item">
            <div className="step-number">03</div>
            <h3>Pick a template</h3>
            <p>Choose from premium templates designed for different industries.</p>
          </div>
          <div className="step-item">
            <div className="step-number">04</div>
            <h3>Download & apply</h3>
            <p>Export your polished resume as PDF or DOCX and start applying.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <p>Built with ❤️ — ResumeAI © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
