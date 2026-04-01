import '../templates/templates.css';

export default function MinimalTemplate({ data }) {
  const { personalInfo, summary, education, skills, experience, projects, certifications, achievements } = data;

  return (
    <div className="tpl tpl-minimal">
      {/* Header */}
      <div className="tpl-minimal-header">
        <h1 className="tpl-minimal-name">{personalInfo.fullName}</h1>
        <div className="tpl-minimal-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.location]
            .filter(Boolean)
            .map((item, i) => (
              <span key={i}>{item}</span>
            ))}
        </div>
        <div className="tpl-minimal-links">
          {[personalInfo.linkedin, personalInfo.portfolio].filter(Boolean).map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="tpl-minimal-section">
          <p className="tpl-minimal-summary">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <div className="tpl-minimal-section">
          <h2 className="tpl-minimal-section-title">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="tpl-minimal-entry">
              <div className="tpl-minimal-entry-top">
                <span className="tpl-minimal-title">{exp.title}</span>
                <span className="tpl-minimal-date">{exp.startDate} – {exp.endDate}</span>
              </div>
              <div className="tpl-minimal-company">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
              <ul>
                {exp.bullets?.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div className="tpl-minimal-section">
          <h2 className="tpl-minimal-section-title">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="tpl-minimal-entry">
              <div className="tpl-minimal-entry-top">
                <span className="tpl-minimal-title">{edu.degree}</span>
                <span className="tpl-minimal-date">{edu.startDate} – {edu.endDate}</span>
              </div>
              <div className="tpl-minimal-company">
                {edu.institution}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div className="tpl-minimal-section">
          <h2 className="tpl-minimal-section-title">Skills</h2>
          <div className="tpl-minimal-skills">
            {skills.map((skill) => (
              <div key={skill.id} className="tpl-minimal-skill-row">
                <span className="tpl-minimal-skill-cat">{skill.category}</span>
                <span className="tpl-minimal-skill-items">{skill.items}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div className="tpl-minimal-section">
          <h2 className="tpl-minimal-section-title">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="tpl-minimal-entry">
              <div className="tpl-minimal-entry-top">
                <span className="tpl-minimal-title">{proj.name}</span>
                <span className="tpl-minimal-date">{proj.technologies}</span>
              </div>
              <p className="tpl-minimal-desc">{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications & Achievements */}
      {(certifications?.length > 0 || achievements?.length > 0) && (
        <div className="tpl-minimal-section tpl-minimal-two-col">
          {certifications?.length > 0 && (
            <div>
              <h2 className="tpl-minimal-section-title">Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="tpl-minimal-small">
                  {cert.name} · {cert.date}
                </div>
              ))}
            </div>
          )}
          {achievements?.length > 0 && (
            <div>
              <h2 className="tpl-minimal-section-title">Achievements</h2>
              {achievements.map((ach) => (
                <div key={ach.id} className="tpl-minimal-small">{ach.description}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
