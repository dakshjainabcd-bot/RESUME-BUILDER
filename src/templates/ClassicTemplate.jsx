import '../templates/templates.css';

export default function ClassicTemplate({ data }) {
  const { personalInfo, summary, education, skills, experience, projects, certifications, achievements } = data;

  return (
    <div className="tpl tpl-classic">
      {/* Header */}
      <div className="tpl-classic-header">
        <h1 className="tpl-classic-name">{personalInfo.fullName}</h1>
        <div className="tpl-classic-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.portfolio]
            .filter(Boolean)
            .join('  ·  ')}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="tpl-classic-section">
          <h2 className="tpl-classic-section-title">Professional Summary</h2>
          <p className="tpl-classic-text">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <div className="tpl-classic-section">
          <h2 className="tpl-classic-section-title">Work Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="tpl-classic-entry">
              <div className="tpl-classic-entry-row">
                <div>
                  <strong>{exp.title}</strong> — {exp.company}
                </div>
                <div className="tpl-classic-date">{exp.startDate} – {exp.endDate}</div>
              </div>
              {exp.location && <div className="tpl-classic-location">{exp.location}</div>}
              <ul>
                {exp.bullets?.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div className="tpl-classic-section">
          <h2 className="tpl-classic-section-title">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="tpl-classic-entry">
              <div className="tpl-classic-entry-row">
                <div>
                  <strong>{edu.degree}</strong> — {edu.institution}
                </div>
                <div className="tpl-classic-date">{edu.startDate} – {edu.endDate}</div>
              </div>
              {edu.gpa && <div className="tpl-classic-location">GPA: {edu.gpa}</div>}
              {edu.details && <p className="tpl-classic-text">{edu.details}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div className="tpl-classic-section">
          <h2 className="tpl-classic-section-title">Skills</h2>
          <div className="tpl-classic-skills">
            {skills.map((skill) => (
              <div key={skill.id}>
                <strong>{skill.category}:</strong> {skill.items}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div className="tpl-classic-section">
          <h2 className="tpl-classic-section-title">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="tpl-classic-entry">
              <strong>{proj.name}</strong>
              {proj.technologies && <span className="tpl-classic-tech"> | {proj.technologies}</span>}
              <p className="tpl-classic-text">{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && (
        <div className="tpl-classic-section">
          <h2 className="tpl-classic-section-title">Certifications</h2>
          <ul>
            {certifications.map((cert) => (
              <li key={cert.id}>{cert.name} — {cert.issuer} ({cert.date})</li>
            ))}
          </ul>
        </div>
      )}

      {/* Achievements */}
      {achievements?.length > 0 && (
        <div className="tpl-classic-section">
          <h2 className="tpl-classic-section-title">Achievements</h2>
          <ul>
            {achievements.map((ach) => (
              <li key={ach.id}>{ach.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
