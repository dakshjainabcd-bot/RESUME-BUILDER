import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, TabStopPosition, TabStopType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

function createContactLine(info) {
  const parts = [info.email, info.phone, info.location, info.linkedin, info.portfolio].filter(Boolean);
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [
      new TextRun({
        text: parts.join('  |  '),
        size: 20,
        color: '666666',
        font: 'Calibri',
      }),
    ],
  });
}

function createSectionHeader(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
    },
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 22,
        color: '333333',
        font: 'Calibri',
      }),
    ],
  });
}

function createBulletPoint(text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 40 },
    children: [
      new TextRun({
        text,
        size: 21,
        font: 'Calibri',
      }),
    ],
  });
}

export async function exportToDocx(resumeData, filename = 'resume.docx') {
  const sections = [];

  // Name
  sections.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: resumeData.personalInfo.fullName,
          bold: true,
          size: 36,
          color: '1a1a1a',
          font: 'Calibri',
        }),
      ],
    })
  );

  // Contact
  sections.push(createContactLine(resumeData.personalInfo));

  // Summary
  if (resumeData.summary) {
    sections.push(createSectionHeader('Professional Summary'));
    sections.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: resumeData.summary,
            size: 21,
            font: 'Calibri',
          }),
        ],
      })
    );
  }

  // Experience
  if (resumeData.experience?.length > 0) {
    sections.push(createSectionHeader('Work Experience'));
    resumeData.experience.forEach((exp) => {
      sections.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({ text: exp.title, bold: true, size: 22, font: 'Calibri' }),
            new TextRun({ text: `  |  ${exp.company}`, size: 22, color: '555555', font: 'Calibri' }),
          ],
        })
      );
      sections.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: `${exp.startDate} – ${exp.endDate}  |  ${exp.location}`,
              size: 20,
              color: '888888',
              italics: true,
              font: 'Calibri',
            }),
          ],
        })
      );
      exp.bullets?.forEach((bullet) => {
        sections.push(createBulletPoint(bullet));
      });
    });
  }

  // Education
  if (resumeData.education?.length > 0) {
    sections.push(createSectionHeader('Education'));
    resumeData.education.forEach((edu) => {
      sections.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({ text: edu.degree, bold: true, size: 22, font: 'Calibri' }),
          ],
        })
      );
      sections.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: edu.institution, size: 21, font: 'Calibri' }),
            new TextRun({ text: `  |  ${edu.startDate} – ${edu.endDate}`, size: 20, color: '888888', font: 'Calibri' }),
          ],
        })
      );
      if (edu.gpa) {
        sections.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({ text: `GPA: ${edu.gpa}`, size: 20, color: '666666', font: 'Calibri' }),
            ],
          })
        );
      }
    });
  }

  // Skills
  if (resumeData.skills?.length > 0) {
    sections.push(createSectionHeader('Skills'));
    resumeData.skills.forEach((skill) => {
      sections.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: `${skill.category}: `, bold: true, size: 21, font: 'Calibri' }),
            new TextRun({ text: skill.items, size: 21, font: 'Calibri' }),
          ],
        })
      );
    });
  }

  // Projects
  if (resumeData.projects?.length > 0) {
    sections.push(createSectionHeader('Projects'));
    resumeData.projects.forEach((proj) => {
      sections.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({ text: proj.name, bold: true, size: 22, font: 'Calibri' }),
            new TextRun({ text: `  |  ${proj.technologies}`, size: 20, color: '666666', font: 'Calibri' }),
          ],
        })
      );
      sections.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: proj.description, size: 21, font: 'Calibri' }),
          ],
        })
      );
    });
  }

  // Certifications
  if (resumeData.certifications?.length > 0) {
    sections.push(createSectionHeader('Certifications'));
    resumeData.certifications.forEach((cert) => {
      sections.push(createBulletPoint(`${cert.name} — ${cert.issuer} (${cert.date})`));
    });
  }

  // Achievements
  if (resumeData.achievements?.length > 0) {
    sections.push(createSectionHeader('Achievements'));
    resumeData.achievements.forEach((ach) => {
      sections.push(createBulletPoint(ach.description));
    });
  }

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: { top: 720, right: 720, bottom: 720, left: 720 },
        },
      },
      children: sections,
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}
