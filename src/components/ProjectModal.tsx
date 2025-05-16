import type { ProjectProps } from './ProjectCard';

interface ProjectModalProps {
  project: ProjectProps | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;
  
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{project.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-4">
              <img src={project.image} className="img-fluid rounded mb-3" alt={project.title} />
            </div>
            
            <p>{project.description}</p>
            
            <h4 className="mt-4 mb-3">Technologies Used</h4>
            <div className="mb-4">
              {project.technologies.map((tech, index) => (
                <span className="tech-chip" key={index}>
                  <i className={`${tech.icon} tech-chip-icon`}></i>
                  <span className="tech-chip-name">{tech.name}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            {project.links.github && (
              <a href={project.links.github} className="btn btn-outline-secondary">
                <i className="fab fa-github me-2"></i>Source Code
              </a>
            )}
            
            {project.links.demo && (
              <a href={project.links.demo} className="btn btn-outline-secondary">
                <i className="fas fa-external-link-alt me-2"></i>Live Demo
              </a>
            )}
            
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
}