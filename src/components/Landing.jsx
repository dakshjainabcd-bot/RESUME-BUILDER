import { useState, useEffect, useRef } from 'react';
import { FileText, ArrowRight, Sparkles, Layout, Download, Zap, CheckCircle, TrendingUp, Users, Award, Star, Quote, Shield, BarChart3, Target } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { getInitialTheme } from './ThemeToggle';
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

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    text: 'I landed 3 interviews in my first week after rebuilding my resume with ResumeAI. The AI suggestions were incredibly accurate.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Product Manager at Meta',
    text: 'The ATS optimization feature alone is worth it. My application response rate went from 5% to over 40%.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Data Scientist at Amazon',
    text: 'Clean, professional, and the AI knew exactly how to phrase my achievements. Got my dream job within a month.',
    rating: 5,
  },
];

const companyLogos = [
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
  { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg' },
];

// Animated counter hook
function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started, startOnView]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return [count, ref];
}

// SVG Success Rate Graph
function SuccessGraph() {
  const [visible, setVisible] = useState(false);
  const graphRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (graphRef.current) observer.observe(graphRef.current);
    return () => observer.disconnect();
  }, []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const withoutAI = [12, 15, 14, 18, 16, 20];
  const withAI = [28, 42, 55, 62, 71, 78];

  const maxVal = 90;
  const graphW = 520;
  const graphH = 220;
  const padL = 40;
  const padR = 20;
  const padT = 10;
  const padB = 30;
  const plotW = graphW - padL - padR;
  const plotH = graphH - padT - padB;

  const toX = (i) => padL + (i / (months.length - 1)) * plotW;
  const toY = (val) => padT + plotH - (val / maxVal) * plotH;

  const makeLine = (data) =>
    data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ');

  const makeArea = (data) => {
    const linePath = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ');
    return `${linePath} L ${toX(data.length - 1)} ${toY(0)} L ${toX(0)} ${toY(0)} Z`;
  };

  return (
    <div className="success-graph" ref={graphRef}>
      <svg viewBox={`0 0 ${graphW} ${graphH}`} className={`graph-svg ${visible ? 'visible' : ''}`}>
        <defs>
          <linearGradient id="aiGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="noAiGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--text-muted)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--text-muted)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 25, 50, 75].map((val) => (
          <g key={val}>
            <line
              x1={padL} y1={toY(val)} x2={graphW - padR} y2={toY(val)}
              stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4"
            />
            <text x={padL - 8} y={toY(val) + 4} textAnchor="end" className="graph-label">
              {val}%
            </text>
          </g>
        ))}

        {/* Month labels */}
        {months.map((m, i) => (
          <text key={m} x={toX(i)} y={graphH - 4} textAnchor="middle" className="graph-label">
            {m}
          </text>
        ))}

        {/* Without AI area + line */}
        <path d={makeArea(withoutAI)} fill="url(#noAiGradient)" className="graph-area graph-area-no-ai" />
        <path d={makeLine(withoutAI)} fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="graph-line graph-line-no-ai" />

        {/* With AI area + line */}
        <path d={makeArea(withAI)} fill="url(#aiGradient)" className="graph-area graph-area-ai" />
        <path d={makeLine(withAI)} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="graph-line graph-line-ai" />

        {/* Data points — With AI */}
        {withAI.map((v, i) => (
          <circle key={`ai-${i}`} cx={toX(i)} cy={toY(v)} r="3.5" fill="var(--accent)" stroke="var(--bg-secondary)" strokeWidth="2" className="graph-dot" />
        ))}

        {/* End labels */}
        <g className="graph-end-label">
          <rect x={toX(5) + 8} y={toY(withAI[5]) - 12} width="72" height="22" rx="6" fill="var(--accent)" />
          <text x={toX(5) + 44} y={toY(withAI[5]) + 3} textAnchor="middle" fill="white" fontSize="11" fontWeight="600">
            With AI ↑
          </text>
        </g>
        <g className="graph-end-label">
          <rect x={toX(5) + 8} y={toY(withoutAI[5]) - 12} width="78" height="22" rx="6" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x={toX(5) + 47} y={toY(withoutAI[5]) + 3} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontWeight="500">
            Without AI
          </text>
        </g>
      </svg>
    </div>
  );
}

export default function Landing({ onGetStarted, onViewInsights }) {
  const [count1, ref1] = useCountUp(12400, 2200);
  const [count2, ref2] = useCountUp(78, 1800);
  const [count3, ref3] = useCountUp(94, 2000);
  const [count4, ref4] = useCountUp(4.9, 2000);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', getInitialTheme());
  }, []);

  return (
    <div className="landing">
      {/* Ambient background */}
      <div className="landing-bg">
        <div className="landing-grid"></div>
        <div className="landing-scanner"></div>
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
            <button className="btn btn-ghost btn-sm" onClick={onGetStarted}>
              View Templates
            </button>
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
            <button className="btn btn-ghost btn-lg" onClick={onViewInsights}>
              Resume Insights
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

      {/* Trusted By */}
      <section className="landing-trusted container">
        <p className="trusted-label">Trusted by professionals hired at</p>
        <div className="trusted-logos">
          {companyLogos.map((company) => (
            <div key={company.name} className="trusted-logo-item" title={company.name}>
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="trusted-logo-img"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Stats Counters */}
      <section className="landing-stats container">
        <div className="stats-grid">
          <div className="stat-item" ref={ref1}>
            <div className="stat-icon"><Users size={20} /></div>
            <div className="stat-number">{count1.toLocaleString()}+</div>
            <div className="stat-label">Resumes Created</div>
          </div>
          <div className="stat-item" ref={ref2}>
            <div className="stat-icon"><TrendingUp size={20} /></div>
            <div className="stat-number">{count2}%</div>
            <div className="stat-label">Interview Callback Rate</div>
          </div>
          <div className="stat-item" ref={ref3}>
            <div className="stat-icon"><Target size={20} /></div>
            <div className="stat-number">{count3}%</div>
            <div className="stat-label">ATS Pass Rate</div>
          </div>
          <div className="stat-item" ref={ref4}>
            <div className="stat-icon"><Star size={20} /></div>
            <div className="stat-number">{Number.isInteger(count4) ? count4 : count4.toFixed(1)}</div>
            <div className="stat-label">User Rating</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features container">
        <div className="section-header">
          <div className="badge"><Zap size={11} /> Core Features</div>
          <h2>Everything you need to stand out</h2>
          <p>Powerful tools wrapped in a simple, intuitive interface.</p>
        </div>
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

      {/* Success Graph Section */}
      <section className="landing-graph container">
        <div className="graph-section">
          <div className="graph-content">
            <div className="badge"><BarChart3 size={11} /> Proven Results</div>
            <h2>Dramatically higher interview rates</h2>
            <p>
              Our users see a significant increase in interview callbacks after
              using AI-enhanced resumes compared to traditional methods.
            </p>
            <div className="graph-highlights">
              <div className="graph-highlight">
                <div className="highlight-bar highlight-bar--ai"></div>
                <div>
                  <strong>78% callback rate</strong>
                  <span>With ResumeAI</span>
                </div>
              </div>
              <div className="graph-highlight">
                <div className="highlight-bar highlight-bar--no-ai"></div>
                <div>
                  <strong>20% callback rate</strong>
                  <span>Industry average</span>
                </div>
              </div>
            </div>
          </div>
          <div className="graph-visual">
            <SuccessGraph />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="landing-steps container">
        <div className="section-header">
          <div className="badge"><Shield size={11} /> Simple Process</div>
          <h2>How it works</h2>
          <p>Four simple steps to your perfect resume.</p>
        </div>
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

      {/* Testimonials */}
      <section className="landing-testimonials container">
        <div className="section-header">
          <div className="badge"><Award size={11} /> Success Stories</div>
          <h2>Loved by thousands</h2>
          <p>Hear from professionals who landed their dream jobs.</p>
        </div>
        <div className="testimonials-grid stagger-children">
          {testimonials.map((t, i) => (
            <div className="testimonial-card glass-card" key={i}>
              <div className="testimonial-quote-icon">
                <Quote size={16} />
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={13} fill="currentColor" />
                ))}
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="landing-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to build your perfect resume?</h2>
            <p>Join thousands of professionals who've accelerated their careers with AI-powered resumes.</p>
            <button className="btn btn-primary btn-lg" onClick={onGetStarted}>
              Get Started — It's Free <ArrowRight size={16} />
            </button>
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
