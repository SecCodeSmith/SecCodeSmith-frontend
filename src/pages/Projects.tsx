import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ProjectCard, type ProjectProps } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { projectsData } from '../data/projectsData';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);
  
  // Filter projects based on selected category
  const filteredProjects = activeFilter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category.includes(activeFilter));
    
  // Get the featured project
  const featuredProject = projectsData.find(project => project.featured);
  
  // Get regular projects (non-featured)
  const regularProjects = filteredProjects.filter(project => !project.featured);
  
  // Handle project filter click
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };
  
  // Handle opening project details modal
  const handleOpenDetails = (id: string) => {
    const project = projectsData.find(p => p.id === id);
    if (project) {
      setSelectedProject(project);
    }
  };
  
  // Handle closing project details modal
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

        {/* Projects Grid */}
        <div className="row">
          {/* Featured Project */}
          {featuredProject && (activeFilter === 'all' || featuredProject.category.includes(activeFilter)) && (
            <div className="col-12 mb-4">
              <ProjectCard project={featuredProject} onOpenDetails={handleOpenDetails} />
            </div>
          )}

          {/* Regular Projects */}
          {regularProjects.map(project => (
            <div className="col-md-6 col-lg-4 mb-4" key={project.id}>
              <ProjectCard project={project} onOpenDetails={handleOpenDetails} />
            </div>
          ))}
        </div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center mt-5">
            <h3>No projects found for this category.</h3>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-4">
          <a href="https://github.com/SecCodeSmith" className="btn btn-primary">
            <i className="fab fa-github me-2"></i> View All Projects on GitHub
          </a>
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseDetails} />
      )}
    </>
  );
};