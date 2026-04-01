import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical, User, Briefcase, GraduationCap, Wrench, FolderOpen, Award, Trophy, FileText } from 'lucide-react';
import { generateId } from '../utils/sampleData';
import './ResumeForm.css';

const sectionConfig = [
  { key: 'personalInfo', label: 'Personal Information', icon: <User size={18} /> },
  { key: 'summary', label: 'Career Summary', icon: <FileText size={18} /> },
  { key: 'experience', label: 'Work Experience', icon: <Briefcase size={18} /> },
  { key: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
  { key: 'skills', label: 'Skills', icon: <Wrench size={18} /> },
  { key: 'projects', label: 'Projects', icon: <FolderOpen size={18} /> },
  { key: 'certifications', label: 'Certifications', icon: <Award size={18} /> },
  { key: 'achievements', label: 'Achievements', icon: <Trophy size={18} /> },
];

export default function ResumeForm({ data, onChange, onNext }) {
  const [openSections, setOpenSections] = useState(['personalInfo', 'summary']);

  const toggleSection = (key) => {
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const updateField = (section, field, value) => {
    if (section === 'personalInfo') {
      onChange({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
    } else if (section === 'summary') {
      onChange({ ...data, summary: value });
    }
  };

  const updateArrayItem = (section, id, field, value) => {
    onChange({
      ...data,
      [section]: data[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const addItem = (section, template) => {
    onChange({
      ...data,
      [section]: [...data[section], { ...template, id: generateId(section) }],
    });
    if (!openSections.includes(section)) {
      setOpenSections([...openSections, section]);
    }
  };

  const removeItem = (section, id) => {
    onChange({
      ...data,
      [section]: data[section].filter((item) => item.id !== id),
    });
  };

  const updateBullet = (expId, bulletIndex, value) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === expId
          ? { ...exp, bullets: exp.bullets.map((b, i) => (i === bulletIndex ? value : b)) }
          : exp
      ),
    });
  };

  const addBullet = (expId) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === expId ? { ...exp, bullets: [...(exp.bullets || []), ''] } : exp
      ),
    });
  };

  const removeBullet = (expId, bulletIndex) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === expId
          ? { ...exp, bullets: exp.bullets.filter((_, i) => i !== bulletIndex) }
          : exp
      ),
    });
  };

  const isOpen = (key) => openSections.includes(key);

  const renderPersonalInfo = () => (
    <div className="form-fields">
      <div className="form-row">
        <div className="input-group">
          <label className="input-label">Full Name *</label>
          <input className="input-field" placeholder="John Doe" value={data.personalInfo.fullName} onChange={(e) => updateField('personalInfo', 'fullName', e.target.value)} />
        </div>
        <div className="input-group">
          <label className="input-label">Email *</label>
          <input className="input-field" type="email" placeholder="john@example.com" value={data.personalInfo.email} onChange={(e) => updateField('personalInfo', 'email', e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div className="input-group">
          <label className="input-label">Phone</label>
          <input className="input-field" placeholder="+1 (555) 123-4567" value={data.personalInfo.phone} onChange={(e) => updateField('personalInfo', 'phone', e.target.value)} />
        </div>
        <div className="input-group">
          <label className="input-label">Location</label>
          <input className="input-field" placeholder="San Francisco, CA" value={data.personalInfo.location} onChange={(e) => updateField('personalInfo', 'location', e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div className="input-group">
          <label className="input-label">LinkedIn</label>
          <input className="input-field" placeholder="linkedin.com/in/johndoe" value={data.personalInfo.linkedin} onChange={(e) => updateField('personalInfo', 'linkedin', e.target.value)} />
        </div>
        <div className="input-group">
          <label className="input-label">Portfolio / Website</label>
          <input className="input-field" placeholder="johndoe.dev" value={data.personalInfo.portfolio} onChange={(e) => updateField('personalInfo', 'portfolio', e.target.value)} />
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="form-fields">
      <div className="input-group">
        <label className="input-label">Write your career objective or professional summary</label>
        <textarea className="input-field" rows={4} placeholder="Describe your career goals, key strengths, and what you bring to the table. Write naturally — AI will polish it for you." value={data.summary} onChange={(e) => updateField('summary', null, e.target.value)} />
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="form-fields">
      {data.experience.map((exp, idx) => (
        <div key={exp.id} className="form-entry">
          <div className="form-entry-header">
            <span className="form-entry-title">{exp.title || exp.company || `Experience ${idx + 1}`}</span>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => removeItem('experience', exp.id)}>
              <Trash2 size={14} />
            </button>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Job Title *</label>
              <input className="input-field" placeholder="Software Engineer" value={exp.title} onChange={(e) => updateArrayItem('experience', exp.id, 'title', e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Company *</label>
              <input className="input-field" placeholder="Google" value={exp.company} onChange={(e) => updateArrayItem('experience', exp.id, 'company', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Location</label>
              <input className="input-field" placeholder="Mountain View, CA" value={exp.location} onChange={(e) => updateArrayItem('experience', exp.id, 'location', e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Start Date</label>
              <input className="input-field" placeholder="Jan 2022" value={exp.startDate} onChange={(e) => updateArrayItem('experience', exp.id, 'startDate', e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">End Date</label>
              <input className="input-field" placeholder="Present" value={exp.endDate} onChange={(e) => updateArrayItem('experience', exp.id, 'endDate', e.target.value)} />
            </div>
          </div>
          <div className="form-bullets">
            <label className="input-label">Key Responsibilities & Achievements</label>
            {(exp.bullets || []).map((bullet, bi) => (
              <div key={bi} className="bullet-row">
                <span className="bullet-marker">•</span>
                <input className="input-field bullet-input" placeholder="Describe what you did and the impact..." value={bullet} onChange={(e) => updateBullet(exp.id, bi, e.target.value)} />
                <button className="btn btn-ghost btn-icon btn-sm" onClick={() => removeBullet(exp.id, bi)}>
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            <button className="btn btn-ghost btn-sm" onClick={() => addBullet(exp.id)}>
              <Plus size={14} /> Add Bullet Point
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={() => addItem('experience', { title: '', company: '', location: '', startDate: '', endDate: '', bullets: [''] })}>
        <Plus size={16} /> Add Experience
      </button>
    </div>
  );

  const renderEducation = () => (
    <div className="form-fields">
      {data.education.map((edu, idx) => (
        <div key={edu.id} className="form-entry">
          <div className="form-entry-header">
            <span className="form-entry-title">{edu.degree || edu.institution || `Education ${idx + 1}`}</span>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => removeItem('education', edu.id)}>
              <Trash2 size={14} />
            </button>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Degree *</label>
              <input className="input-field" placeholder="Bachelor of Science in CS" value={edu.degree} onChange={(e) => updateArrayItem('education', edu.id, 'degree', e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Institution *</label>
              <input className="input-field" placeholder="MIT" value={edu.institution} onChange={(e) => updateArrayItem('education', edu.id, 'institution', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Location</label>
              <input className="input-field" placeholder="Cambridge, MA" value={edu.location} onChange={(e) => updateArrayItem('education', edu.id, 'location', e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Start Year</label>
              <input className="input-field" placeholder="2018" value={edu.startDate} onChange={(e) => updateArrayItem('education', edu.id, 'startDate', e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">End Year</label>
              <input className="input-field" placeholder="2022" value={edu.endDate} onChange={(e) => updateArrayItem('education', edu.id, 'endDate', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label className="input-label">GPA (optional)</label>
              <input className="input-field" placeholder="3.8/4.0" value={edu.gpa} onChange={(e) => updateArrayItem('education', edu.id, 'gpa', e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Additional Details</label>
              <input className="input-field" placeholder="Honors, relevant coursework..." value={edu.details} onChange={(e) => updateArrayItem('education', edu.id, 'details', e.target.value)} />
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={() => addItem('education', { degree: '', institution: '', location: '', startDate: '', endDate: '', gpa: '', details: '' })}>
        <Plus size={16} /> Add Education
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="form-fields">
      {data.skills.map((skill, idx) => (
        <div key={skill.id} className="form-entry form-entry-compact">
          <div className="form-row">
            <div className="input-group" style={{ flex: '0 0 200px' }}>
              <label className="input-label">Category</label>
              <input className="input-field" placeholder="e.g. Languages" value={skill.category} onChange={(e) => updateArrayItem('skills', skill.id, 'category', e.target.value)} />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">Skills (comma separated)</label>
              <input className="input-field" placeholder="JavaScript, Python, Go, SQL" value={skill.items} onChange={(e) => updateArrayItem('skills', skill.id, 'items', e.target.value)} />
            </div>
            <button className="btn btn-ghost btn-icon btn-sm" style={{ alignSelf: 'flex-end', marginBottom: '2px' }} onClick={() => removeItem('skills', skill.id)}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={() => addItem('skills', { category: '', items: '' })}>
        <Plus size={16} /> Add Skill Category
      </button>
    </div>
  );

  const renderProjects = () => (
    <div className="form-fields">
      {data.projects.map((proj, idx) => (
        <div key={proj.id} className="form-entry">
          <div className="form-entry-header">
            <span className="form-entry-title">{proj.name || `Project ${idx + 1}`}</span>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => removeItem('projects', proj.id)}>
              <Trash2 size={14} />
            </button>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Project Name *</label>
              <input className="input-field" placeholder="My Awesome Project" value={proj.name} onChange={(e) => updateArrayItem('projects', proj.id, 'name', e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Technologies</label>
              <input className="input-field" placeholder="React, Node.js, PostgreSQL" value={proj.technologies} onChange={(e) => updateArrayItem('projects', proj.id, 'technologies', e.target.value)} />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea className="input-field" rows={2} placeholder="What does this project do? What was your role?" value={proj.description} onChange={(e) => updateArrayItem('projects', proj.id, 'description', e.target.value)} />
          </div>
          <div className="input-group">
            <label className="input-label">Link (optional)</label>
            <input className="input-field" placeholder="github.com/user/project" value={proj.link} onChange={(e) => updateArrayItem('projects', proj.id, 'link', e.target.value)} />
          </div>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={() => addItem('projects', { name: '', technologies: '', description: '', link: '' })}>
        <Plus size={16} /> Add Project
      </button>
    </div>
  );

  const renderCertifications = () => (
    <div className="form-fields">
      {data.certifications.map((cert, idx) => (
        <div key={cert.id} className="form-entry form-entry-compact">
          <div className="form-row">
            <div className="input-group" style={{ flex: 2 }}>
              <label className="input-label">Certification Name</label>
              <input className="input-field" placeholder="AWS Solutions Architect" value={cert.name} onChange={(e) => updateArrayItem('certifications', cert.id, 'name', e.target.value)} />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">Issuer</label>
              <input className="input-field" placeholder="Amazon" value={cert.issuer} onChange={(e) => updateArrayItem('certifications', cert.id, 'issuer', e.target.value)} />
            </div>
            <div className="input-group" style={{ flex: '0 0 100px' }}>
              <label className="input-label">Year</label>
              <input className="input-field" placeholder="2024" value={cert.date} onChange={(e) => updateArrayItem('certifications', cert.id, 'date', e.target.value)} />
            </div>
            <button className="btn btn-ghost btn-icon btn-sm" style={{ alignSelf: 'flex-end', marginBottom: '2px' }} onClick={() => removeItem('certifications', cert.id)}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={() => addItem('certifications', { name: '', issuer: '', date: '' })}>
        <Plus size={16} /> Add Certification
      </button>
    </div>
  );

  const renderAchievements = () => (
    <div className="form-fields">
      {data.achievements.map((ach, idx) => (
        <div key={ach.id} className="form-entry form-entry-compact">
          <div className="form-row">
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">Achievement</label>
              <input className="input-field" placeholder="Won first place at XYZ Hackathon" value={ach.description} onChange={(e) => updateArrayItem('achievements', ach.id, 'description', e.target.value)} />
            </div>
            <button className="btn btn-ghost btn-icon btn-sm" style={{ alignSelf: 'flex-end', marginBottom: '2px' }} onClick={() => removeItem('achievements', ach.id)}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={() => addItem('achievements', { description: '' })}>
        <Plus size={16} /> Add Achievement
      </button>
    </div>
  );

  const renderSection = (key) => {
    switch (key) {
      case 'personalInfo': return renderPersonalInfo();
      case 'summary': return renderSummary();
      case 'experience': return renderExperience();
      case 'education': return renderEducation();
      case 'skills': return renderSkills();
      case 'projects': return renderProjects();
      case 'certifications': return renderCertifications();
      case 'achievements': return renderAchievements();
      default: return null;
    }
  };

  return (
    <div className="resume-form animate-fade-in-up">
      <div className="form-header">
        <h2>Enter Your Details</h2>
        <p>Fill in your information below. Don't worry about perfect wording — AI will polish it in the next step.</p>
      </div>

      <div className="form-sections">
        {sectionConfig.map(({ key, label, icon }) => (
          <div key={key} className={`form-section ${isOpen(key) ? 'open' : ''}`}>
            <button className="form-section-header" onClick={() => toggleSection(key)}>
              <div className="form-section-left">
                {icon}
                <span>{label}</span>
                {key !== 'personalInfo' && key !== 'summary' && data[key]?.length > 0 && (
                  <span className="badge">{data[key].length}</span>
                )}
              </div>
              {isOpen(key) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {isOpen(key) && (
              <div className="form-section-body">
                {renderSection(key)}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button className="btn btn-primary btn-lg" onClick={onNext} disabled={!data.personalInfo.fullName}>
          Continue to AI Enhancement →
        </button>
      </div>
    </div>
  );
}
