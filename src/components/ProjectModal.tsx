import type { ProjectProps } from './ProjectCard';

import style from '@styles/Project.module.scss'


interface ProjectModalProps {
  project: ProjectProps | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;
  
  return (
    <div className="modal fade" id="shadowguardianModal" tabIndex={-1} aria-labelledby="shadowguardianModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="shadowguardianModalLabel">ShadowGuardian: Secure IoT Monitoring System</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-4">
                        <img src="/api/placeholder/1000/400" className="img-fluid rounded mb-3" alt="ShadowGuardian Project"></img>
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
                    
                </div>
                <div className="modal-footer">
                    <a href="#" className="btn btn-outline-secondary">
                        <i className="fab fa-github btn-icon"></i>Source Code
                    </a>
                    <a href="#" className="btn btn-outline-secondary">
                        <i className="fas fa-external-link-alt btn-icon"></i>Live Demo
                    </a>
                    <a href="#" className="btn btn-outline-secondary">
                        <i className="fas fa-book btn-icon"></i>Documentation
                    </a>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
  );
}