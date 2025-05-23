import { useState } from 'react'

import style from '@styles/Project.module.scss'

export interface ProjectTech {
  name: string;
  icon: string;
}

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string[];
  featured?: boolean;
  technologies: ProjectTech[];
  links: {
    github?: string;
    demo?: string;
  };
}

interface ProjectCardProps {
  project: ProjectProps;
  onOpenDetails: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const [, setHovered] = useState(false);
  
  return (
    <div 
      className={`card ${style.card} h-100 ${project.featured ? style.featuredCard : ''}`} 
      data-category={project.category.join(',')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="position-relative">
        <img src={project.image} className={project.featured ? `img-fluid rounded-start h-100 w-100 object-fit-cover` : style.cardImgTop} alt={project.title} />
        <div className={style.categoryBadge}>{project.category[0]}</div>
        {project.featured && (
          <div className={style.featuredBadge}>
            <i className="fas fa-star"></i>
            <span>Featured</span>
          </div>
        )}
      </div>
      <div className={`${style.cardBody} d-flex flex-column`}>
        <h3 className={style.cardTitle}>{project.title}</h3>
        <p className={style.cardText}>
          {project.description}
        </p>
        <div>
          <h4 className={style.techTitle}>// TECHNOLOGIES_USED</h4>
          <div className={style.techStack}>
            {project.technologies.map((tech, index) => (
              <span className={style.techItem} key={index}>
                <i className={tech.icon}></i>
                <span>{tech.name}</span>
              </span>
            ))}
          </div>
        </div>
        <div className={`mt-auto d-flex gap-2 flex-wrap project-links`}>
          <button 
            className={`btn btn-outline-secondary`} 
            onClick={() => onOpenDetails(project.id)}
          >
            <i className="fas fa-info-circle me-2"></i>
            Project Details
          </button>
          
          {project.links.github && (
            <a href={project.links.github} className={`btn btn-outline-secondary`}>
              <i className="fab fa-github me-2"></i>
              View Code
            </a>
          )}
          
          {project.links.demo && (
            <a href={project.links.demo} className={`btn btn-outline-secondary`}>
              <i className="fas fa-external-link-alt me-2"></i>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}