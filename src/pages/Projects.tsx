import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ProjectCard, type ProjectProps } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { projectsData, Categories } from '../data/projectsData';

import style from '@styles/Project.module.scss'


export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(project => project.category.some(cat => cat.shortName.toLowerCase() === activeFilter));

  const categories = Categories;

  const featuredProject = projectsData.find(project => project.featured);

  const regularProjects = filteredProjects.filter(project => !project.featured);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleOpenDetails = (id: string) => {
    const project = projectsData.find(p => p.id === id);
    if (project) {
      setSelectedProject(project);
    }
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <PageHeader
        title="The Digital Forge"
        subtitle="Artifacts crafted with code, hammered with precision, and tempered in the fires of innovation"
      />

      <div className="container mt-5">
        {/* Projects Filter */}
        <div className={`filter-container ${style.filterContainer} text-center`}>
          <button
            className={`filter-button  ${style.filterButton} ${activeFilter === 'all' ? style.active : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            All Artifacts
          </button>
          {Object.values(categories).map((category) => (
            <button
              key={category.shortName}
              className={`filter-button ${style.filterButton} ${activeFilter === category.shortName.toLowerCase() ? style.active : ''}`}
              onClick={() => handleFilterClick(category.shortName.toLowerCase())}
            >
              {category.fullName}
            </button>
          ))}
        </div>

        <div className="row">
          {featuredProject && (activeFilter === 'all' || featuredProject.category.some(cat => cat.shortName.toLowerCase() === activeFilter)) && (
            <div className="col-12 mb-4">
              <ProjectCard project={featuredProject} onOpenDetails={handleOpenDetails} />
            </div>
          )}

          {regularProjects.map(project => (

            <ProjectCard project={project} onOpenDetails={handleOpenDetails} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center mt-5">
            <h3>No projects found for this category.</h3>
          </div>
        )}

        <div className="text-center mt-4 mb-5">
          <a href="https://github.com/SecCodeSmith" className={`btn btn-primary ${style.btnPrimary}`}>
            <i className="fab fa-github me-2"></i> View All Projects on GitHub
          </a>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseDetails} />
      )}
    </>
  );
};