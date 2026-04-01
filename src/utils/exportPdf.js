import html2pdf from 'html2pdf.js';

export async function exportToPdf(elementId, filename = 'resume.pdf') {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Resume element not found');

  const opt = {
    margin: 0,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
    },
    jsPDF: {
      unit: 'in',
      format: 'letter',
      orientation: 'portrait',
    },
  };

  await html2pdf().set(opt).from(element).save();
}
