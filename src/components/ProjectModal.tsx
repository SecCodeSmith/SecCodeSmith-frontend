import type { ProjectProps } from './ProjectCard';

import style from '@styles/Project.module.scss'


interface ProjectModalProps {
  project: ProjectProps | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project }) => {
  if (!project) return null;
  
  return (
    <div className="modal fade" id="shadowguardianModal" tabIndex={-1} aria-labelledby="shadowguardianModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className={`modal-content ${style.modalContent}`}>
                <div className="modal-header">
                    <h5 className={style.modalHeader} id="shadowguardianModalLabel">
                        {project.title}
                    </h5>
                    <button type="button" className={`btn-close ${style.btnClose}`} data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className={`modal-body ${style.modalBody}`}>
                    <div className="mb-4">
                        <img src="/api/placeholder/1000/400" className="img-fluid rounded mb-3" alt="ShadowGuardian Project" />
                        <div className="row">
                            <div className="col-md-8">
                                <p>ShadowGuardian is a comprehensive security monitoring system designed for both residential and commercial applications. Built on a foundation of STM32 microcontrollers, it provides reliable, secure monitoring with extremely low power consumption, allowing for battery operation of up to 2 years.</p>
                                <p>The system features end-to-end encryption for all communications, ensuring that sensitive security data remains private. Its modular architecture allows for easy expansion with additional sensors and integration with existing home automation systems.</p>
                            </div>
                            <div className="col-md-4">
                                <div className="card h-100">
                                    <div className="card-header">
                                        <h5 className="mb-0">Project Overview</h5>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Duration:</strong> 6 months</p>
                                        <p><strong>Role:</strong> Lead Developer</p>
                                        <p><strong>Status:</strong> Completed</p>
                                        <p><strong>Client:</strong> ConnectedWorld Technologies</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <h4 className="mt-4 mb-3">Key Features</h4>
                    <ul className="features-list">
                        <li>Military-grade AES-256 encryption for all data transmission</li>
                        <li>Ultra-low power consumption with intelligent sleep modes</li>
                        <li>Modular sensor architecture supporting motion, contact, glass-break, and environmental sensors</li>
                        <li>Local processing to reduce cloud dependency and improve response times</li>
                        <li>Mesh networking for extended coverage without Wi-Fi dependencies</li>
                        <li>Real-time notifications via mobile app (iOS and Android)</li>
                        <li>Integration with popular home automation platforms including HomeKit, Google Home, and Alexa</li>
                        <li>Tamper detection and notification system</li>
                        <li>Optional cellular backup connection for critical deployments</li>
                    </ul>
                    
                    <h4 className="mt-4 mb-3">Technologies Used</h4>
                    <div className="mb-4">
                        <span className="tech-chip">
                            <i className="devicon-cplusplus-plain tech-chip-icon"></i>
                            <span className="tech-chip-name">C++</span>
                        </span>
                        <span className="tech-chip">
                            <i className="fas fa-microchip tech-chip-icon"></i>
                            <span className="tech-chip-name">STM32F4</span>
                        </span>
                        <span className="tech-chip">
                            <i className="fas fa-wifi tech-chip-icon"></i>
                            <span className="tech-chip-name">ESP32</span>
                        </span>
                        <span className="tech-chip">
                            <i className="fas fa-shield-alt tech-chip-icon"></i>
                            <span className="tech-chip-name">AES-256</span>
                        </span>
                        <span className="tech-chip">
                            <i className="devicon-react-original tech-chip-icon"></i>
                            <span className="tech-chip-name">React Native</span>
                        </span>
                        <span className="tech-chip">
                            <i className="fas fa-broadcast-tower tech-chip-icon"></i>
                            <span className="tech-chip-name">BLE 5.0</span>
                        </span>
                        <span className="tech-chip">
                            <i className="fas fa-network-wired tech-chip-icon"></i>
                            <span className="tech-chip-name">Zigbee</span>
                        </span>
                        <span className="tech-chip">
                            <i className="fas fa-server tech-chip-icon"></i>
                            <span className="tech-chip-name">Node.js</span>
                        </span>
                        <span className="tech-chip">
                            <i className="fas fa-database tech-chip-icon"></i>
                            <span className="tech-chip-name">PostgreSQL</span>
                        </span>
                        <span className="tech-chip">
                            <i className="devicon-docker-plain tech-chip-icon"></i>
                            <span className="tech-chip-name">Docker</span>
                        </span>
                    </div>
                    
                    <h4 className="mt-4 mb-3">Gallery</h4>
                    <div className="row">
                        <div className="col-md-4 col-6">
                            <div className="gallery-item">
                                <img src="/api/placeholder/300/300" alt="ShadowGuardian Hub" className="gallery-image"></img>
                            </div>
                        </div>
                        <div className="col-md-4 col-6">
                            <div className="gallery-item">
                                <img src="/api/placeholder/300/300" alt="ShadowGuardian Sensor" className="gallery-image"></img>
                            </div>
                        </div>
                        <div className="col-md-4 col-6">
                            <div className="gallery-item">
                                <img src="/api/placeholder/300/300" alt="Mobile App Dashboard" className="gallery-image" />
                            </div>
                        </div>
                        <div className="col-md-4 col-6">
                            <div className="gallery-item">
                                <img src="/api/placeholder/300/300" alt="Door Sensor Installation" className="gallery-image" />
                            </div>
                        </div>
                        <div className="col-md-4 col-6">
                            <div className="gallery-item">
                                <img src="/api/placeholder/300/300" alt="System Architecture Diagram" className="gallery-image" />
                            </div>
                        </div>
                        <div className="col-md-4 col-6">
                            <div className="gallery-item">
                                <img src="/api/placeholder/300/300" alt="PCB Design" className="gallery-image" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`modal-footer ${style.modalFooter}`}>
                    <a href="#" className={`btn btn-outline-secondary ${style.btnOutlineSecondary}`}>
                        <i className="fab fa-github btn-icon"></i>Source Code
                    </a>
                    <a href="#" className={`btn btn-outline-secondary ${style.btnOutlineSecondary}`}>
                        <i className="fas fa-external-link-alt btn-icon"></i>Live Demo
                    </a>
                    <a href="#" className={`btn btn-outline-secondary ${style.btnOutlineSecondary}`}>
                        <i className="fas fa-book btn-icon"></i>Documentation
                    </a>
                    <button type="button" className={`btn btn-secondary`} data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
  );
}