import type { ProjectProps } from '../untils/ProjectProps';
import moment from "moment";

import style from '@styles/Project.module.scss'
import { API_BASE_URL } from '../Config';


interface ProjectModalProps {
    project: ProjectProps | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project }) => {
    if (!project) return null;

    const startDate = moment(project.projectDetails?.startDate, project.projectDetails?.dateFormatted);
    const endDate = moment(project.projectDetails?.endDate, project.projectDetails?.dateFormatted);
    const duration = startDate.isValid() && endDate.isValid()
        ? Math.ceil(endDate.diff(startDate, 'days') / 7) + ' weeks'
        : 'Ongoing';

    return (
        <div className="modal fade" id="shadowguardianModal" tabIndex={-1} aria-labelledby="shadowguardianModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
                <div className={`modal-content ${style.modalContent}`}>
                    <div className={`modal-header ${style.modalHeader}`}>
                        <h5 className={style.modalHeader} id="shadowguardianModalLabel">
                            {project.title}
                        </h5>
                        <button type="button" className={`btn-close ${style.btnClose}`} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className={`modal-body ${style.modalBody}`}>
                        <div className="mb-4">
                            <img src={`${API_BASE_URL}${project.image}`} className="img-fluid rounded mb-3" alt={project.title} />
                            <div className={`row ${style.row}`}>
                                <div className="col-md-8">
                                    {
                                        project.projectDetails ? project.projectDetails.descriptions?.map((desc, index) => (
                                            <p key={index} className="mb-3">{desc}</p>
                                        )) :
                                            <p>{project.description}</p>
                                    }
                                </div>
                                <div className="col-md-4">
                                    <div className={`card h-100 ${style.card}`}>
                                        <div className={`card-header ${style.cardHeader}`}>
                                            <h5 className="mb-0">Project Overview</h5>
                                        </div>
                                        <div className="card-body">
                                            {project.projectDetails && project.projectDetails.startDate && project.projectDetails.endDate ? (
                                                <p><strong>Duration:</strong> {duration}</p>
                                            ) : (
                                                <p><strong>Duration:</strong> Ongoing</p>
                                            )
                                            }
                                            {
                                                project.projectDetails && project.projectDetails.role ? (
                                                    <p><strong>Role:</strong> {project.projectDetails.role}</p>
                                                ) : (
                                                    <p><strong>Role:</strong> Developer</p>
                                                )
                                            }
                                            {
                                                project.projectDetails && project.projectDetails.client ? (
                                                    <p><strong>Client:</strong> {project.projectDetails.client}</p>
                                                ) : (
                                                    <p><strong>Client:</strong> Internal Project</p>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {
                                project.projectDetails?.keyFeatures && project.projectDetails.keyFeatures.length > 0 && (
                                    <>
                                        <h4 className="mt-4 mb-3">Key Features</h4>
                                        <ul className={style.featuresList}>
                                        {
                                            project.projectDetails?.keyFeatures.map((feature, index) => (
                                                <li key={index}>
                                                    {feature}
                                                </li>
                                            ))
                                        }
                                        </ul>
                                    </>
                                )
                            }

                            <h4 className="mt-4 mb-3">Technologies Used</h4>
                            <div className="mb-4"></div>
                            {
                                project.projectDetails?.fullTechStack && project.projectDetails?.fullTechStack?.length > 0 ? (
                                    <>
                                        {project.projectDetails.fullTechStack.map((tech, index) => (
                                            <span key={index} className={`tech-chip ${style.techChip}`}>
                                                <i className={`${tech.icons} tech-chip-icon`}></i>
                                                <span className="tech-chip-name">{tech.name}</span>
                                            </span>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {project.technologies && project.technologies.length > 0 ? (
                                            project.technologies.map((tech, index) => (

                                                <span key={index} className={`tech-chip ${style.techChip}`}>
                                                    <i className={`${tech.icon} tech-chip-icon`}></i>
                                                    <span className="tech-chip-name">{tech.name}</span>
                                                </span>

                                            ))
                                        ) : (
                                            <p className="text-muted">No technologies listed.</p>
                                        )
                                        }
                                    </>
                                )
                            }
                        </div>

                        {
                            project.projectDetails?.gallery && project.projectDetails?.gallery.length > 0 && (
                                <>
                                    <h4 className="mt-4 mb-3">Gallery</h4>
                                    <div className="row">
                                        {
                                            project.projectDetails.gallery.map((image, index) => (
                                                <div className="col-md-4 col-6">
                                                    <div key={index} className={`gallery-item ${style.galleryItem}`}>
                                                        <img src={image} alt={`Gallery Image ${index + 1}`} className={`gallery-image ${style.galleryImage}`}></img>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </>
                            )
                        }
                    </div>
                    <div className={`modal-footer ${style.modalFooter}`}>
                        {project.github && (
                            <a href={project.github} className={`btn btn-outline-secondary ${style.btnOutlineSecondary}`} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github btn-icon"></i>Source Code
                            </a>
                        )}
                        {project.demo && (
                            <a href={project.demo} className={`btn btn-outline-secondary ${style.btnOutlineSecondary}`} target="_blank" rel="noopener noreferrer">
                                <i className="fas fa-external-link-alt btn-icon"></i>Live Demo
                            </a>
                        )}
                        {project.documentation && (
                            <a href={project.documentation} className={`btn btn-outline-secondary ${style.btnOutlineSecondary}`} target="_blank" rel="noopener noreferrer">
                                <i className="fas fa-book btn-icon"></i>Documentation
                            </a>
                        )}

                        <button type="button" className={`btn btn-secondary`} data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;