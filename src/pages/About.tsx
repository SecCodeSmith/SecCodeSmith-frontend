import { PageHeader } from '../components/PageHeader';
import { aboutProps } from '../data/experienceData';

import style from '@styles/About.module.scss';

export interface AboutProps {
  coreValues: CoreValue[];
  technicalArsenal: TechnicalArsenal[];
  professionalJourney: ProfessionalJourney[];
  testimonials: Testimonial[];
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface ProfessionalJourney {
  title: string;
  description: string;
  duration: string;
}

export interface TechnicalArsenal {
  title: string;
  icon: string;
  skills: string[];
}

export interface Testimonial {
  content: string;
  author: string;
  position: string;
}

export const About = () => {
  const data = aboutProps;
  return (
    <>
      <PageHeader
        title="The Forgemaster"
        subtitle="Crafting digital solutions from the raw materials of innovation"
      />

      {/* Introduction Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h2 className={`${style.sectionTitle}`}>The Master Behind the Mask</h2>
              <div className={style.profileImage}>
                <img src="/images/profile.jpg" alt="SecCodeSmith" />
              </div>
            </div>
            <div className="col-lg-8">
              <div className={style.introText}>
                <p className={style.introText}>Greetings, seeker of digital arcana. I am <strong>SecCodeSmith</strong>, a master craftsman of code and conductor of silicon. For over a decade, I have been forging robust solutions across the realms of embedded systems, machine learning, and web development.</p>

                <p className={style.introText}>My journey began in the depths of <span className={style.accent}>low-level programming</span>, where I learned to bend hardware to my will through carefully crafted instructions. From the arcane energies of microcontrollers to the vast landscapes of cloud architecture, I have honed my skills to create solutions that stand the test of time.</p>

                <p className={style.introText}>What distinguishes my work is the <strong>meticulous attention to security</strong> and performance. Like a blacksmith who understands that a sword's true value lies not just in its edge but in the integrity of its steel, I craft code that is not merely functional but resilient against the chaotic forces of the digital wilderness.</p>

                <p className={style.introText}>Beyond the technical realms, I am a devoted practitioner of open-source sorcery, contributing to projects that empower others to create and innovate. When not at the forge, I can be found exploring the ancient texts of computer science, delving into new programming languages, or mentoring apprentices on their own journey.</p>

                <div className="mt-4">
                  <a href="#" className={style.connectLink}>
                    <i className={`fab fa-github ${style.connectIcon}`}></i>
                    <span>GitHub</span>
                  </a>
                  <a href="#" className={style.connectLink}>
                    <i className={`fab fa-linkedin ${style.connectIcon}`}></i>
                    <span>LinkedIn</span>
                  </a>
                  <a href="#" className={style.connectLink}>
                    <i className={`fab fa-twitter ${style.connectIcon}`}></i>
                    <span>Twitter</span>
                  </a>
                  <a href="#" className={style.connectLink}>
                    <i className={`fas fa-envelope ${style.connectIcon}`}></i>
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-5 bg-dark">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2 className={` ${style.sectionTitle}`}>Forging Principles</h2>
            </div>
          </div>
          <div className={`row g-4 ${style.row}`}>
            {data.coreValues.map((value, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className={` h-100 ${style.valueCard}`}>
                  <div className={style.valueIcon}>
                    <i className={value.icon}></i>
                  </div>
                  <h3 className={`${style.valueTitle}`}>{value.title}</h3>
                  <p className={`${style.valueText}`}>{value.description}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section className="py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2 className={`${style.sectionTitle}`}>Arsenal of Expertise</h2>
            </div>
          </div>
          <div className="row g-4">
            {data.technicalArsenal.map((value, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className={`h-100 ${style.skillCard}`} key={index}>
                  <div className={`${style.skillHeader}`}>
                    <div className={`skill-icon ${style.skillIcon}`}>
                      <i className={value.icon}></i>
                    </div>
                    <h3 className={`skill-title ${style.skillTitle}`}>{value.title}</h3>
                  </div>
                  <ul className="list-unstyled">
                    {value.skills.map((skillItem, skillIndex) => (
                      <li className="mb-2" key={skillIndex}>
                        <i className={`fas fa-check skill-check ${style.skillCheck}`}></i>
                        <span>{skillItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section >

      {/* Professional Journey Section */}
      < section className="py-5 bg-dark" >
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className={`section-title ${style.sectionTitle}`}>The Smith's Journey</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <ul className="timeline">
                {/* Timeline Item 1 */}
                <li className="timeline-item clearfix">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">2021 - Present</div>
                    <h3 className="timeline-title">Lead Systems Engineer</h3>
                    <p className="timeline-text">Architecting secure IoT solutions for critical infrastructure, combining embedded firmware expertise with cloud integration. Leading a team of 8 engineers across hardware and software disciplines.</p>
                  </div>
                </li>

                {/* Timeline Item 2 */}
                <li className="timeline-item clearfix">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">2018 - 2021</div>
                    <h3 className="timeline-title">Senior Embedded Developer</h3>
                    <p className="timeline-text">Developed firmware for next-generation industrial control systems. Implemented machine learning capabilities on resource-constrained devices, reducing predictive maintenance false positives by 87%.</p>
                  </div>
                </li>

                {/* Timeline Item 3 */}
                <li className="timeline-item clearfix">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">2015 - 2018</div>
                    <h3 className="timeline-title">Full-Stack Developer</h3>
                    <p className="timeline-text">Created web applications and APIs for data visualization and analysis. Specialized in integrating hardware systems with web interfaces, enabling real-time monitoring of distributed sensor networks.</p>
                  </div>
                </li>

                {/* Timeline Item 4 */}
                <li className="timeline-item clearfix">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">2012 - 2015</div>
                    <h3 className="timeline-title">Firmware Engineer</h3>
                    <p className="timeline-text">Designed and implemented firmware for medical devices, focusing on reliability and safety-critical operations. Reduced power consumption by 35% while improving processing performance.</p>
                  </div>
                </li>

                {/* Timeline Item 5 */}
                <li className="timeline-item clearfix">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">2010 - 2012</div>
                    <h3 className="timeline-title">Junior Software Developer</h3>
                    <p className="timeline-text">Began the journey into the digital forge, working on embedded C programming for consumer electronics. Learned the fundamentals of hardware-software integration and real-time systems.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section >

      {/* Testimonials Section */}
      < section className="py-5" >
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2 className={`section-title ${style.sectionTitle}`}>Tales from the Guild</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto">
              {/* Testimonial 1 */}
              <div className="testimonial">
                <div className="testimonial-content">
                  "Working with SecCodeSmith transformed our approach to IoT security. Their expertise in both embedded systems and network security allowed us to create a solution that our clients trust implicitly. The attention to detail and foresight regarding potential vulnerabilities saved us from what could have been catastrophic security incidents."
                </div>
                <div className="d-flex align-items-center gap-3 testimonial-author">
                  <div className="author-avatar">
                    <img src="/images/testimonials/alexandra.jpg" alt="Alexandra Foster" />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">Alexandra Foster</h4>
                    <div className="author-title">CTO, ConnectedWorld Technologies</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="testimonial">
                <div className="testimonial-content">
                  "The custom firmware developed by SecCodeSmith for our industrial controllers exceeded all expectations. Not only was the code incredibly efficient, but the documentation was meticulous—something rare in our industry. Three years later, we're still building upon that solid foundation with minimal issues."
                </div>
                <div className="d-flex align-items-center gap-3 testimonial-author">
                  <div className="author-avatar">
                    <img src="/images/testimonials/marcus.jpg" alt="Marcus Chen" />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">Marcus Chen</h4>
                    <div className="author-title">Lead Engineer, Precision Automation Inc.</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="testimonial">
                <div className="testimonial-content">
                  "I've collaborated with numerous developers over my 20-year career, but SecCodeSmith stands apart for their ability to bridge the gap between theoretical concepts and practical implementation. Their machine learning models for anomaly detection operate efficiently even on our limited hardware, which competitors claimed was impossible."
                </div>
                <div className="d-flex align-items-center gap-3 testimonial-author">
                  <div className="author-avatar">
                    <img src="/images/testimonials/sophia.jpg" alt="Sophia Rodriguez" />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">Sophia Rodriguez</h4>
                    <div className="author-title">Research Director, Advanced Sensing Lab</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};