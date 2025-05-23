import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ProjectCard, type ProjectProps } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { projectsData } from '../data/projectsData';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);
  
  const filteredProjects = activeFilter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category.includes(activeFilter));
    
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
        <div className="filter-container text-center">
          <button 
            className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`} 
            onClick={() => handleFilterClick('all')}
          >
            All Artifacts
          </button>
          <button 
            className={`filter-button ${activeFilter === 'embedded' ? 'active' : ''}`} 
            onClick={() => handleFilterClick('embedded')}
          >
            Embedded Systems
          </button>
          <button 
            className={`filter-button ${activeFilter === 'web' ? 'active' : ''}`} 
            onClick={() => handleFilterClick('web')}
          >
            Web Development
          </button>
          <button 
            className={`filter-button ${activeFilter === 'ml' ? 'active' : ''}`} 
            onClick={() => handleFilterClick('ml')}
          >
            Machine Learning
          </button>
          <button 
            className={`filter-button ${activeFilter === 'iot' ? 'active' : ''}`} 
            onClick={() => handleFilterClick('iot')}
          >
            IoT
          </button>
        </div>

        <div className="row">
          {featuredProject && (activeFilter === 'all' || featuredProject.category.includes(activeFilter)) && (
            <div className="col-12 mb-4">
              <ProjectCard project={featuredProject} onOpenDetails={handleOpenDetails} />
            </div>
          )}

          {regularProjects.map(project => (
            <div className="col-md-6 col-lg-4 mb-4" key={project.id}>
              <ProjectCard project={project} onOpenDetails={handleOpenDetails} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center mt-5">
            <h3>No projects found for this category.</h3>
          </div>
        )}

        <div className="text-center mt-4">
          <a href="https://github.com/SecCodeSmith" className="btn btn-primary">
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