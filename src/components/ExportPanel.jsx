import { useState } from 'react';
import { Download, FileText, File, ArrowLeft, Edit3, Loader } from 'lucide-react';
import { exportToPdf } from '../utils/exportPdf';
import { exportToDocx } from '../utils/exportDocx';
import './ExportPanel.css';

export default function ExportPanel({ data, onBack, onEdit }) {
  const [exporting, setExporting] = useState('');

  const handlePdf = async () => {
    setExporting('pdf');
    try {
      await exportToPdf('resume-preview', `${data.personalInfo.fullName || 'resume'}_resume.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF export failed. Please try again.');
    }
    setExporting('');
  };

  const handleDocx = async () => {
    setExporting('docx');
    try {
      await exportToDocx(data, `${data.personalInfo.fullName || 'resume'}_resume.docx`);
    } catch (err) {
      console.error('DOCX export failed:', err);
      alert('DOCX export failed. Please try again.');
    }
    setExporting('');
  };

  return (
    <div className="export-panel">
      <div className="export-header">
        <h3>Export Resume</h3>
      </div>
      <div className="export-buttons">
        <button className="btn btn-primary export-btn" onClick={handlePdf} disabled={!!exporting}>
          {exporting === 'pdf' ? <Loader size={16} className="spin-icon" /> : <FileText size={16} />}
          {exporting === 'pdf' ? 'Exporting...' : 'Download PDF'}
        </button>
        <button className="btn btn-secondary export-btn" onClick={handleDocx} disabled={!!exporting}>
          {exporting === 'docx' ? <Loader size={16} className="spin-icon" /> : <File size={16} />}
          {exporting === 'docx' ? 'Exporting...' : 'Download DOCX'}
        </button>
      </div>
      <div className="export-actions">
        <button className="btn btn-ghost btn-sm" onClick={onEdit}>
          <Edit3 size={14} /> Edit Details
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <ArrowLeft size={14} /> Change Template
        </button>
      </div>
    </div>
  );
}
