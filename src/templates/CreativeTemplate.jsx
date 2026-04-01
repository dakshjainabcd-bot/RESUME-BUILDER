import '../templates/templates.css';

export default function CreativeTemplate({ data }) {
  const { personalInfo, summary, education, skills, experience, projects, certifications, achievements } = data;

  return (
    <div className="tpl tpl-creative">
      {/* Bold Header */}
      <div className="tpl-creative-header">
        <h1 className="tpl-creative-name">{personalInfo.fullName}</h1>
        <div className="tpl-creative-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.portfolio]
            .filter(Boolean)
            .join('  ·  ')}
        </div>
        {summary && <p className="tpl-creative-summary">{summary}</p>}
      </div>

      <div className="tpl-creative-body">
        {/* Skills as tags */}
        {skills?.length > 0 && (
          <div className="tpl-creative-section">
            <h2 className="tpl-creative-section-title">Skills</h2>
            <div className="tpl-creative-tags">
              {skills.map((skill) =>
                skill.items.split(',').map((item, i) => (
                  <span key={`${skill.id}-${i}`} className="tpl-creative-tag">{item.trim()}</span>
                ))
              )}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <div className="tpl-creative-section">
            <h2 className="tpl-creative-section-title">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="tpl-creative-entry">
                <div className="tpl-creative-entry-left">
                  <div className="tpl-creative-entry-date">{exp.startDate} – {exp.endDate}</div>
                  <div className="tpl-creative-entry-location">{exp.location}</div>
                </div>
                <div className="tpl-creative-entry-right">
                  <div className="tpl-creative-entry-title">{exp.title}</div>
                  <div className="tpl-creative-entry-company">{exp.company}</div>
                  <ul>
                    {exp.bullets?.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <div className="tpl-creative-section">
            <h2 className="tpl-creative-section-title">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="tpl-creative-entry">
                <div className="tpl-creative-entry-left">
                  <div className="tpl-creative-entry-date">{edu.startDate} – {edu.endDate}</div>
                </div>
                <div className="tpl-creative-entry-right">
                  <div className="tpl-creative-entry-title">{edu.degree}</div>
                  <div className="tpl-creative-entry-company">{edu.institution}</div>
                  {edu.gpa && <div className="tpl-creative-gpa">GPA: {edu.gpa}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <div className="tpl-creative-section">
            <h2 className="tpl-creative-section-title">Projects</h2>
            <div className="tpl-creative-projects">
              {projects.map((proj) => (
                <div key={proj.id} className="tpl-creative-project-card">
                  <div className="tpl-creative-entry-title">{proj.name}</div>
                  <div className="tpl-creative-tech">{proj.technologies}</div>
                  <p>{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom row */}
        <div className="tpl-creative-bottom">
          {certifications?.length > 0 && (
            <div className="tpl-creative-section">
              <h2 className="tpl-creative-section-title">Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="tpl-creative-small">{cert.name} · {cert.issuer} ({cert.date})</div>
              ))}
            </div>
          )}
          {achievements?.length > 0 && (
            <div className="tpl-creative-section">
              <h2 className="tpl-creative-section-title">Achievements</h2>
              {achievements.map((ach) => (
                <div key={ach.id} className="tpl-creative-small">{ach.description}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
