import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Building2, CheckCircle2, Star, TrendingUp, Briefcase, Code, Users, Target, Lightbulb, Award, Shield, Zap, Globe, Heart, BarChart3, Cpu, Palette, Package, Rocket } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import './InsightsPage.css';

const companies = [
  {
    id: 'google',
    name: 'Google',
    color: '#4285F4',
    tagline: 'Innovation & Technical Excellence',
    hiringRate: '2.3%',
    avgSalary: '$185K',
    topRole: 'Software Engineer L4',
    pieData: [
      { label: 'Technical Skills', value: 30, color: '#4285F4' },
      { label: 'Projects & Impact', value: 25, color: '#34A853' },
      { label: 'Experience', value: 20, color: '#FBBC05' },
      { label: 'Education', value: 10, color: '#EA4335' },
      { label: 'Open Source', value: 10, color: '#8B5CF6' },
      { label: 'Soft Skills', value: 5, color: '#06B6D4' },
    ],
    resumeTraits: [
      { icon: <Code size={16} />, title: 'Deep Technical Expertise', desc: 'Demonstrated mastery of data structures, algorithms, and system design. Projects at scale (millions of users).' },
      { icon: <BarChart3 size={16} />, title: 'Quantified Impact', desc: 'Every bullet point includes metrics: "Reduced latency by 40%", "Served 2M+ daily active users".' },
      { icon: <Globe size={16} />, title: 'Open Source Contributions', desc: 'Active GitHub profiles with well-documented repos. Contributions to major open source projects.' },
      { icon: <Lightbulb size={16} />, title: 'Problem-Solving Showcase', desc: 'Competitive programming achievements, hackathon wins, and novel solutions to complex problems.' },
      { icon: <Users size={16} />, title: 'Collaboration Signals', desc: 'Cross-functional work with designers, PMs, and other teams. Mentoring junior engineers.' },
    ],
    tips: ['Use "Googley" language â€” curiosity, ambiguity tolerance, impact at scale', 'Highlight projects with massive user bases', 'Show growth mindset and continuous learning'],
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    color: '#00A4EF',
    tagline: 'Growth Mindset & Scalable Impact',
    hiringRate: '3.1%',
    avgSalary: '$175K',
    topRole: 'Senior SDE',
    pieData: [
      { label: 'Growth Mindset', value: 25, color: '#00A4EF' },
      { label: 'Cloud & AI', value: 25, color: '#7FBA00' },
      { label: 'Leadership', value: 20, color: '#F25022' },
      { label: 'Enterprise Scale', value: 15, color: '#FFB900' },
      { label: 'Accessibility', value: 10, color: '#8B5CF6' },
      { label: 'Education', value: 5, color: '#06B6D4' },
    ],
    resumeTraits: [
      { icon: <TrendingUp size={16} />, title: 'Growth Mindset Language', desc: '"Learned and implemented...", "Evolved architecture from X to Y". Show how you grew.' },
      { icon: <Shield size={16} />, title: 'Enterprise-Scale Systems', desc: 'Experience with large-scale cloud services, distributed systems, and enterprise software.' },
      { icon: <Users size={16} />, title: 'Cross-Team Leadership', desc: 'Led initiatives across multiple teams. Drove alignment between engineering, design, and business.' },
      { icon: <Cpu size={16} />, title: 'Cloud & AI Focus', desc: 'Azure, AI/ML experience highly valued. Highlight any cloud architecture or AI-driven features.' },
      { icon: <Heart size={16} />, title: 'Inclusive & Accessible Design', desc: 'Experience building accessible products, i18n support, and inclusive user experiences.' },
    ],
    tips: ['Emphasize growth and learning in every role', 'Show experience with cloud-native architectures', 'Demonstrate customer empathy and accessibility focus'],
  },
  {
    id: 'amazon',
    name: 'Amazon',
    color: '#FF9900',
    tagline: 'Leadership Principles & Customer Obsession',
    hiringRate: '4.2%',
    avgSalary: '$170K',
    topRole: 'SDE II',
    pieData: [
      { label: 'Leadership Principles', value: 30, color: '#FF9900' },
      { label: 'Data-Driven', value: 20, color: '#232F3E' },
      { label: 'Ownership', value: 20, color: '#E47911' },
      { label: 'System Design', value: 15, color: '#146EB4' },
      { label: 'Ops Excellence', value: 10, color: '#22C55E' },
      { label: 'Education', value: 5, color: '#8B5CF6' },
    ],
    resumeTraits: [
      { icon: <Target size={16} />, title: 'Leadership Principles Alignment', desc: 'Each bullet maps to an LP: "Customer Obsession", "Ownership", "Dive Deep", "Bias for Action".' },
      { icon: <BarChart3 size={16} />, title: 'Data-Driven Decisions', desc: '"Analyzed 1M+ data points", "A/B tested to increase conversion by 23%". Metrics everywhere.' },
      { icon: <Rocket size={16} />, title: 'Ownership & Autonomy', desc: 'End-to-end ownership of features from design to deployment. On-call responsibility.' },
      { icon: <Zap size={16} />, title: 'Bias for Action', desc: 'Fast iteration, shipping quickly, and learning from failures. Show velocity and decisiveness.' },
      { icon: <Package size={16} />, title: 'Operational Excellence', desc: 'CI/CD pipelines, monitoring, alerting, and post-mortem culture. Zero-downtime deployments.' },
    ],
    tips: ['Structure bullets using STAR format (Situation, Task, Action, Result)', 'Map every achievement to a Leadership Principle', 'Show you can own projects end-to-end'],
  },
  {
    id: 'meta',
    name: 'Meta',
    color: '#0668E1',
    tagline: 'Move Fast & Build Things That Matter',
    hiringRate: '1.8%',
    avgSalary: '$190K',
    topRole: 'Software Engineer E5',
    pieData: [
      { label: 'Speed & Shipping', value: 25, color: '#0668E1' },
      { label: 'Scale Experience', value: 25, color: '#1877F2' },
      { label: 'Full-Stack Skills', value: 20, color: '#42B72A' },
      { label: 'Innovation', value: 15, color: '#F7B928' },
      { label: 'Impact Metrics', value: 10, color: '#E4405F' },
      { label: 'Education', value: 5, color: '#8B5CF6' },
    ],
    resumeTraits: [
      { icon: <Zap size={16} />, title: 'Speed & Iteration', desc: '"Shipped in 2 weeks", "Rapid prototyping". Show you can move fast without breaking things.' },
      { icon: <Globe size={16} />, title: 'Massive Scale Experience', desc: 'Systems serving billions of users. Real-time data processing, news feed algorithms, social graph.' },
      { icon: <Lightbulb size={16} />, title: 'Innovation & Hackathons', desc: 'Internal hackathon projects that became products. Creative solutions to user problems.' },
      { icon: <Code size={16} />, title: 'Full-Stack Versatility', desc: 'React, React Native, GraphQL, mobile development. Show breadth across the stack.' },
      { icon: <BarChart3 size={16} />, title: 'Impact Metrics', desc: 'User engagement metrics, revenue impact, performance improvements with exact numbers.' },
    ],
    tips: ['Show you can build and ship products quickly', 'Highlight experience with social/consumer products', 'Demonstrate comfort with ambiguity and rapid change'],
  },
  {
    id: 'apple',
    name: 'Apple',
    color: '#A2AAAD',
    tagline: 'Design Excellence & Attention to Detail',
    hiringRate: '1.5%',
    avgSalary: '$180K',
    topRole: 'Software Engineer ICT3',
    pieData: [
      { label: 'Design & Craft', value: 30, color: '#A2AAAD' },
      { label: 'Performance', value: 20, color: '#555555' },
      { label: 'Privacy & Security', value: 20, color: '#0071E3' },
      { label: 'Product Sense', value: 15, color: '#34C759' },
      { label: 'Technical Depth', value: 10, color: '#FF9500' },
      { label: 'Education', value: 5, color: '#AF52DE' },
    ],
    resumeTraits: [
      { icon: <Palette size={16} />, title: 'Design-Minded Engineering', desc: 'Pixel-perfect implementations, smooth animations, intuitive UX. Show you care about craft.' },
      { icon: <Shield size={16} />, title: 'Privacy & Security Focus', desc: 'End-to-end encryption, on-device processing, GDPR compliance. Privacy as a feature.' },
      { icon: <Cpu size={16} />, title: 'Performance Optimization', desc: 'Battery life optimization, memory management, 60fps animations. Every millisecond matters.' },
      { icon: <Star size={16} />, title: 'Product Sense', desc: 'Understanding of user needs, competitive landscape, and how technology serves people.' },
      { icon: <Award size={16} />, title: 'Secrecy & Discretion', desc: 'Apple values discretion. Resumes should be professional and understated â€” they speak for themselves.' },
    ],
    tips: ['Keep your resume visually clean and minimal', 'Emphasize craft and attention to detail', 'Show passion for products that delight users'],
  },
  {
    id: 'netflix',
    name: 'Netflix',
    color: '#E50914',
    tagline: 'Freedom & Responsibility Culture',
    hiringRate: '2.0%',
    avgSalary: '$200K',
    topRole: 'Senior Software Engineer',
    pieData: [
      { label: 'Senior Impact', value: 30, color: '#E50914' },
      { label: 'Business Acumen', value: 20, color: '#B81D24' },
      { label: 'Distributed Systems', value: 20, color: '#221F1F' },
      { label: 'Innovation', value: 15, color: '#F5F5F1' },
      { label: 'Global Scale', value: 10, color: '#8B5CF6' },
      { label: 'Culture Fit', value: 5, color: '#06B6D4' },
    ],
    resumeTraits: [
      { icon: <Star size={16} />, title: 'Senior-Level Impact', desc: 'Netflix hires senior. Show you operate independently, make judgment calls, and drive strategy.' },
      { icon: <TrendingUp size={16} />, title: 'Business Acumen', desc: 'Understanding of how engineering decisions impact revenue, engagement, and customer retention.' },
      { icon: <Code size={16} />, title: 'Distributed Systems Mastery', desc: 'Microservices, event-driven architecture, chaos engineering. Building resilient systems.' },
      { icon: <Lightbulb size={16} />, title: 'Innovation in Streaming', desc: 'Adaptive bitrate, content recommendation, A/B testing at scale. Media technology expertise.' },
      { icon: <Globe size={16} />, title: 'Global Scale Thinking', desc: 'Multi-region deployments, CDN optimization, serving diverse audiences worldwide.' },
    ],
    tips: ['Netflix looks for "stunning colleagues" â€” show mastery', 'Demonstrate you can operate without heavy process', 'Show business impact, not just technical output'],
  },
];

// Animated Pie Chart Component
function SuccessPieChart({ data, companyColor }) {
  const [animated, setAnimated] = useState(false);
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimated(true);
      },
      { threshold: 0.3 }
    );
    if (chartRef.current) observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset animation when data changes
  useEffect(() => {
    setAnimated(false);
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [data]);

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = 120, cy = 120, radius = 100, innerRadius = 55;

  let currentAngle = -90;
  const slices = data.map((item, i) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const midRad = ((startAngle + endAngle) / 2 * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const ix1 = cx + innerRadius * Math.cos(startRad);
    const iy1 = cy + innerRadius * Math.sin(startRad);
    const ix2 = cx + innerRadius * Math.cos(endRad);
    const iy2 = cy + innerRadius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    const path = `M ${ix1} ${iy1} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1}`;

    const isHovered = hoveredSlice === i;
    const hoverRadius = isHovered ? 6 : 0;
    const tx = hoverRadius * Math.cos(midRad);
    const ty = hoverRadius * Math.sin(midRad);

    return { ...item, path, tx, ty, index: i, percentage: Math.round((item.value / total) * 100) };
  });

  return (
    <div className="pie-chart-container" ref={chartRef}>
      <div className="pie-chart-visual">
        <svg viewBox="0 0 240 240" className={`pie-svg ${animated ? 'animated' : ''}`}>
          {slices.map((slice, i) => (
            <path
              key={i}
              d={slice.path}
              fill={slice.color}
              stroke="var(--bg-secondary)"
              strokeWidth="2"
              transform={`translate(${slice.tx}, ${slice.ty})`}
              className="pie-slice"
              style={{ animationDelay: `${i * 0.12}s` }}
              onMouseEnter={() => setHoveredSlice(i)}
              onMouseLeave={() => setHoveredSlice(null)}
              opacity={hoveredSlice !== null && hoveredSlice !== i ? 0.5 : 1}
            />
          ))}
          {/* Center text */}
          <circle cx={cx} cy={cy} r={innerRadius - 4} fill="var(--bg-secondary)" />
          <text x={cx} y={cy - 6} textAnchor="middle" className="pie-center-value">
            {hoveredSlice !== null ? `${slices[hoveredSlice].percentage}%` : '100%'}
          </text>
          <text x={cx} y={cy + 12} textAnchor="middle" className="pie-center-label">
            {hoveredSlice !== null ? slices[hoveredSlice].label : 'Success Factors'}
          </text>
        </svg>
      </div>
      <div className="pie-legend">
        {slices.map((slice, i) => (
          <div
            key={i}
            className={`pie-legend-item ${hoveredSlice === i ? 'active' : ''}`}
            onMouseEnter={() => setHoveredSlice(i)}
            onMouseLeave={() => setHoveredSlice(null)}
          >
            <div className="pie-legend-dot" style={{ background: slice.color }} />
            <span className="pie-legend-label">{slice.label}</span>
            <span className="pie-legend-value">{slice.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InsightsPage({ onBack }) {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  return (
    <div className="insights-page">
      {/* Header */}
      <header className="insights-header">
        <div className="insights-header-inner container">
          <button className="btn btn-ghost btn-sm" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="insights-page-title">
            <Building2 size={20} />
            Resume Insights
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <div className="insights-layout container">
        {/* Sidebar â€” Company List */}
        <aside className="insights-sidebar">
          <div className="insights-sidebar-title">Select Company</div>
          {companies.map((company) => (
            <button
              key={company.id}
              className={`insights-company-btn ${selectedCompany.id === company.id ? 'active' : ''}`}
              onClick={() => setSelectedCompany(company)}
            >
              <div className="insights-company-dot" style={{ background: company.color }}></div>
              <div>
                <div className="insights-company-name">{company.name}</div>
                <div className="insights-company-tag">{company.tagline}</div>
              </div>
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="insights-main" key={selectedCompany.id}>
          {/* Company Header */}
          <div className="insights-company-header">
            <div>
              <h2 className="insights-company-title">
                <span className="insights-company-color" style={{ background: selectedCompany.color }}></span>
                {selectedCompany.name}
              </h2>
              <p className="insights-company-tagline">{selectedCompany.tagline}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="insights-quick-stats">
            <div className="insights-stat">
              <div className="insights-stat-value">{selectedCompany.hiringRate}</div>
              <div className="insights-stat-label">Acceptance Rate</div>
            </div>
            <div className="insights-stat">
              <div className="insights-stat-value">{selectedCompany.avgSalary}</div>
              <div className="insights-stat-label">Avg. Salary</div>
            </div>
            <div className="insights-stat">
              <div className="insights-stat-value">{selectedCompany.topRole}</div>
              <div className="insights-stat-label">Top Hired Role</div>
            </div>
          </div>

          {/* Pie Chart Section */}
          <div className="insights-section">
            <h3 className="insights-section-title">
              <BarChart3 size={18} />
              Resume Success Breakdown
            </h3>
            <p className="insights-section-desc">
              What matters most on resumes that get selected at {selectedCompany.name}
            </p>
            <SuccessPieChart data={selectedCompany.pieData} companyColor={selectedCompany.color} />
          </div>

          {/* Resume Traits */}
          <div className="insights-section">
            <h3 className="insights-section-title">
              <CheckCircle2 size={18} />
              What gets resumes selected
            </h3>
            <div className="insights-traits-grid">
              {selectedCompany.resumeTraits.map((trait, i) => (
                <div className="insights-trait-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="insights-trait-icon" style={{ '--company-color': selectedCompany.color }}>
                    {trait.icon}
                  </div>
                  <div className="insights-trait-content">
                    <h4>{trait.title}</h4>
                    <p>{trait.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="insights-section">
            <h3 className="insights-section-title">
              <Lightbulb size={18} />
              Pro Tips
            </h3>
            <div className="insights-tips">
              {selectedCompany.tips.map((tip, i) => (
                <div className="insights-tip" key={i}>
                  <span className="insights-tip-number">{String(i + 1).padStart(2, '0')}</span>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
