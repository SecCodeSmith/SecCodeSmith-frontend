import React, { useEffect, useState } from 'react'

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
  category: Category[];
  featured?: boolean;
  technologies: ProjectTech[];
  links: {
    github?: string;
    demo?: string;
  };
}

export interface Category {
  [key: string]: string;
  fullName: string;
  shortName: string;
  icon: string;
}

interface ProjectCardProps {
  project: ProjectProps;
  onOpenDetails: (id: string) => void;
}

const ProjectCardTech: React.FC<{ technology: ProjectTech[] }> = ({ technology }) => (
  <div>
    <h4 className={style.techTitle}>// TECHNOLOGIES_USED</h4>
    <div className={style.techStack}>
      {technology.map((tech, index) => (
        <span className={`${style.techItem}`} key={index}>
          <i className={`${tech.icon} ${style.techIcon}`}></i>
          <span>{tech.name}</span>
        </span>
      ))}
    </div>
  </div>
)

const CategoryBadge: React.FC<{ category: Category[] }> = ({ category }) => (
  < div className={style.categoryBadgeContainer} >
    {
      category.map((cat, index) => (
        <span key={index} className={`${style.categoryBadge}`}>
          {cat.shortName}
        </span>
      ))}
  </div>
)

const ProjectLinks: React.FC<{ links: { github?: string; demo?: string }, id: string, onOpenDetails: (id: string) => void }> = ({ links, id, onOpenDetails }) => (
  <div className={`mt-auto d-flex gap-2 flex-wrap project-links ${style.projectLinks}`}>
    <button
      className={`btn btn-outline-secondary  ${style.btnOutlineSecondary}`}
      onClick={() => onOpenDetails(id)}
    >
      <i className={`fas fa-info-circle ${style.btnIcon}`} ></i>
      Project Details
    </button>

    {links.github && (
      <a href={links.github} className={`btn btn-outline-secondary  ${style.btnOutlineSecondary} `}>
        <i className={`fab fa-github ${style.btnIcon}`} ></i>
        View Code
      </a>
    )}

    {links.demo && (
      <a href={links.demo} className={`btn btn-outline-secondary  ${style.btnOutlineSecondary}`}>
        <i className={`fas fa-external-link-alt ${style.btnIcon}`}></i>
        Live Demo
      </a>
    )}
  </div>
)

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const [, setHovered] = useState(false);

  useEffect(() => {
    const createEmbers = () => {
      const embersContainer = document.querySelectorAll(`.${style.cardImgTop}`);

      embersContainer.forEach((container) => {
        for (let i = 0; i < 5; i++) {
          const ember = document.createElement('div');
          ember.className = style.emberParticle;

          ember.style.left = `${Math.random() * 100}%`;
          ember.style.bottom = '0';
          ember.style.animationDuration = `${Math.random() * 2 + 3}s`;
          ember.style.animationDelay = `${Math.random() * 3}s`;
          container.appendChild(ember);
        }
      });
    };
    createEmbers();
  }, []);

  if (project.featured) {
    return (
      <div className={`"col-12 mb-4`}>
        <div
          className={`card ${style.card} ${style.featuredCard}`}
          data-category={project.category.join(',')}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className={`row g-0`}>
            <div className={`col-md-6 position-relative`}>
              <img src={project.image} className={`img-fluid rounded-start h-100 w-100 object-fit-cover`} alt={project.title} />
              <div className={style.featuredBadge}>
                <i className="fas fa-star"></i>
                <span>Featured</span>
              </div>
              <CategoryBadge category={project.category} />
            </div>
            <div className={`col-md-6`}>
              <div className={`card-body d-flex flex-column h-100 ${style.cardBody}`}>
                <h3 className={`${style.cardTitle} card-title`}>{project.title}</h3>
                <p className={`${style.cardText} card-text`}>
                  {project.description}
                </p>
                <ProjectCardTech technology={project.technologies} />
                <ProjectLinks links={project.links} id={project.id} onOpenDetails={onOpenDetails} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className={`col-md-6 col-lg-4 mb-4`}>
      <div className={`card ${style.card} h-100`}
        data-category={project.category.join(',')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <div className={`position-relative`}>
          <img src={project.image} className={style.cardImgTop} alt={project.title} />
          <CategoryBadge category={project.category} />
        </div>
        <div className={`card-body d-flex flex-column ${style.cardBody}`}>
          <h3 className={`${style.cardTitle} card-title`}>{project.title}</h3>
          <p className={`${style.cardText} card-text`}>
            {project.description}
          </p>
          <ProjectCardTech technology={project.technologies} />
          <ProjectLinks links={project.links} id={project.id} onOpenDetails={onOpenDetails} />
        </div>
      </div>
    </div>
  )
};
