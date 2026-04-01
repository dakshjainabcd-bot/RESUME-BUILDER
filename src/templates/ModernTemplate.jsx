import '../templates/templates.css';

export default function ModernTemplate({ data }) {
  const { personalInfo, summary, education, skills, experience, projects, certifications, achievements } = data;

  return (
    <div className="tpl tpl-modern">
      <div className="tpl-modern-sidebar">
        <div className="tpl-modern-name">{personalInfo.fullName}</div>
        
        {/* Contact */}
        <div className="tpl-modern-section">
          <div className="tpl-modern-section-title">Contact</div>
          {personalInfo.email && <div className="tpl-modern-contact-item">{personalInfo.email}</div>}
          {personalInfo.phone && <div className="tpl-modern-contact-item">{personalInfo.phone}</div>}
          {personalInfo.location && <div className="tpl-modern-contact-item">{personalInfo.location}</div>}
          {personalInfo.linkedin && <div className="tpl-modern-contact-item">{personalInfo.linkedin}</div>}
          {personalInfo.portfolio && <div className="tpl-modern-contact-item">{personalInfo.portfolio}</div>}
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="tpl-modern-section">
            <div className="tpl-modern-section-title">Skills</div>
            {skills.map((skill) => (
              <div key={skill.id} className="tpl-modern-skill-group">
                <div className="tpl-modern-skill-cat">{skill.category}</div>
                <div className="tpl-modern-skill-items">{skill.items}</div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications?.length > 0 && (
          <div className="tpl-modern-section">
            <div className="tpl-modern-section-title">Certifications</div>
            {certifications.map((cert) => (
              <div key={cert.id} className="tpl-modern-cert">
                <div className="tpl-modern-cert-name">{cert.name}</div>
                <div className="tpl-modern-cert-meta">{cert.issuer} · {cert.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="tpl-modern-main">
        {/* Summary */}
        {summary && (
          <div className="tpl-modern-section">
            <div className="tpl-modern-main-title">Professional Summary</div>
            <p className="tpl-modern-summary">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <div className="tpl-modern-section">
            <div className="tpl-modern-main-title">Work Experience</div>
            {experience.map((exp) => (
              <div key={exp.id} className="tpl-modern-entry">
                <div className="tpl-modern-entry-header">
                  <div>
                    <div className="tpl-modern-entry-title">{exp.title}</div>
                    <div className="tpl-modern-entry-company">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                  </div>
                  <div className="tpl-modern-entry-date">{exp.startDate} – {exp.endDate}</div>
                </div>
                <ul className="tpl-modern-bullets">
                  {exp.bullets?.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <div className="tpl-modern-section">
            <div className="tpl-modern-main-title">Education</div>
            {education.map((edu) => (
              <div key={edu.id} className="tpl-modern-entry">
                <div className="tpl-modern-entry-header">
                  <div>
                    <div className="tpl-modern-entry-title">{edu.degree}</div>
                    <div className="tpl-modern-entry-company">{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</div>
                  </div>
                  <div className="tpl-modern-entry-date">{edu.startDate} – {edu.endDate}</div>
                </div>
                {edu.gpa && <div className="tpl-modern-gpa">GPA: {edu.gpa}</div>}
                {edu.details && <p className="tpl-modern-details">{edu.details}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <div className="tpl-modern-section">
            <div className="tpl-modern-main-title">Projects</div>
            {projects.map((proj) => (
              <div key={proj.id} className="tpl-modern-entry">
                <div className="tpl-modern-entry-title">{proj.name}</div>
                <div className="tpl-modern-entry-tech">{proj.technologies}</div>
                <p className="tpl-modern-details">{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {achievements?.length > 0 && (
          <div className="tpl-modern-section">
            <div className="tpl-modern-main-title">Achievements</div>
            <ul className="tpl-modern-bullets">
              {achievements.map((ach) => <li key={ach.id}>{ach.description}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
