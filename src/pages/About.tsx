import { lazy } from 'react';
import { fetchAboutProps } from '../data/AboutProps';
import style from '@styles/About.module.scss';
import { useEffect, useState } from 'react';
import type { AboutProps } from '../untils/AboutProps';
import type { ContactProps } from '../untils/ContactProps';
import { fetchContactData } from '../data/contactData';

const PageHeader = lazy(() => import('../components/PageHeader'));
const Spinner = lazy(() => import('../components/Spinner'));

export const About = () => {
  const [data, setData] = useState<AboutProps>();
  const [ContactProps, setContactProps] = useState<ContactProps>();
  
  useEffect(() => {
    const fetchData = async () => {
      const aboutData = await fetchAboutProps();
      setData(aboutData);
      const data = await fetchContactData();
      setContactProps(data);
    };
    fetchData();
  }, []);
  if (!data) {
    return <Spinner />;
  }
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
                <img src="/images/profile.webp" alt="SecCodeSmith" />
              </div>
            </div>
            <div className="col-lg-8">
              <div className={style.introText}>
                <p className={style.introText}>Greetings, seeker of digital arcana. I am <strong>SecCodeSmith</strong>, a master craftsman of code and conductor of silicon. For over a decade, I have been forging robust solutions across the realms of embedded systems, machine learning, and web development.</p>

                <p className={style.introText}>My journey began in the depths of <span className={style.accent}>low-level programming</span>, where I learned to bend hardware to my will through carefully crafted instructions. From the arcane energies of microcontrollers to the vast landscapes of cloud architecture, I have honed my skills to create solutions that stand the test of time.</p>

                <p className={style.introText}>What distinguishes my work is the <strong>meticulous attention to security</strong> and performance. Like a blacksmith who understands that a sword's true value lies not just in its edge but in the integrity of its steel, I craft code that is not merely functional but resilient against the chaotic forces of the digital wilderness.</p>

                <p className={style.introText}>Beyond the technical realms, I am a devoted practitioner of open-source sorcery, contributing to projects that empower others to create and innovate. When not at the forge, I can be found exploring the ancient texts of computer science, delving into new programming languages, or mentoring apprentices on their own journey.</p>

                <div className="mt-4">
                  {
                    ContactProps?.socialLinks && 
                    ContactProps.socialLinks.length > 0 && 
                    ContactProps.socialLinks.map((link, index) => (
                      <a key={index} href={link.url} className={`${style.connectLink}`}>
                        <i className={`${link.icon} ${style.connectIcon}`}></i>
                        <span>{link.platform}</span>
                      </a>
                    ))
                  }
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
            {data.core_values.map((value, index) => (
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
            {data.technical_arsenal.map((value, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className={`h-100 ${style.skillCard}`} key={index}>
                  <div className={`${style.skillHeader}`}>
                    <div className={`${style.skillIcon}`}>
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
              <ul className={`${style.timeline}`}>
                {data.professional_journal.map((journey, index) => (
                  <li className={`${style.timelineItem} clearfix`} key={index}>
                    <div className={`${style.timelineDot}`}></div>
                    <div className={`${style.timelineContent}`}>
                      <div className={`${style.timelineDate}`}>{journey.duration}</div>
                      <h3 className={`${style.timelineTitle}`}>{journey.title}</h3>
                      <p className={`${style.timelineText}`}>{journey.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section >

      {/* Testimonials Section */}
      {data.testimonials.length > 0 && (
        < section className="py-5" >
          <div className="container">
            <div className="row mb-4">
              <div className="col-12">
                <h2 className={`section-title ${style.sectionTitle}`}>Tales from the Guild</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 mx-auto">
                {data.testimonials.map((testimonial, index) => (
                  <div className="testimonial" key={index}>
                    <div className="testimonial-content">
                      {testimonial.content}
                    </div>
                    <div className="d-flex align-items-center gap-3 testimonial-author">
                      <div className="author-avatar">
                        <img src="/images/testimonials/james.jpg" alt={testimonial.author} />
                      </div>
                      <div className="author-info">
                        <h4 className="author-name">{testimonial.author}</h4>
                        <div className="author-title">{testimonial.position}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section >)}
    </>
  );
};

export default About;