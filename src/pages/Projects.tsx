import { createContext, useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { fetchProjectsData, fetchCategories } from '../data/projectsData';
import type { ProjectProps, Category } from '../untils/ProjectProps';

import style from '@styles/Project.module.scss'
import { Spinner } from '../components/Spinner';

export const contextProjectId = createContext<string | null>(null)


export const Projects = () => {
  const [projectsData, setprojectsData] = useState<ProjectProps[]>();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setprojectsData([]);
      const data = await fetchProjectsData(activeFilter);
      const cat = await fetchCategories();
      setprojectsData(data);
      setCategories(cat);
    };
    fetchData();
  }, [activeFilter]);



  if (!projectsData) {
    return <Spinner />;
  }

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
            className={`filter-button  ${style.filterButton} ${activeFilter === null ? style.active : ''}`}
            onClick={() => setActiveFilter(null)}
          >
            All Artifacts
          </button>
          {categories && categories.map((category) => (
            <button
              key={category.short}
              className={`filter-button ${style.filterButton} ${activeFilter === category.short.toLowerCase() ? style.active : ''}`}
              onClick={() => setActiveFilter(category.short)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {
          projectsData.length > 0 && (
            <div className="row">
              {projectsData.map(project => (
                <div className={project.featured ? 'col-12 mb-4' : ''} key={project.id}>
                  <ProjectCard project={project} onOpenDetails={setActiveProjectId} />
                </div>
              ))}
            </div>
          )
        }

        {projectsData.length === 0 && (
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


      <contextProjectId.Provider value={activeProjectId}>
        <ProjectModal />
      </contextProjectId.Provider>

    </>
  );
};

export default Projects;