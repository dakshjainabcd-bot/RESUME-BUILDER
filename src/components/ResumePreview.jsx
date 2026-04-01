import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import './ResumePreview.css';

const templateComponents = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
};

export default function ResumePreview({ data, template }) {
  const TemplateComponent = templateComponents[template] || ModernTemplate;

  return (
    <div className="resume-preview-wrapper">
      <div className="resume-preview-page" id="resume-preview">
        <TemplateComponent data={data} />
      </div>
    </div>
  );
}
