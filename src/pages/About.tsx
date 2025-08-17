import { lazy } from 'react';
import { fetchAboutProps } from '../data/AboutProps';
import style from '@styles/About.module.scss';
import { useEffect, useState } from 'react';
import type { AboutProps } from '../untils/AboutProps';
import type { ContactProps } from '../untils/ContactProps';
import { fetchContactData } from '../data/contactData';
import { API_BASE_URL } from '../Config';

const PageHeader = lazy(() => import('../components/PageHeader'));
const Spinner = lazy(() => import('../components/Spinner'));

export const About = () => {
  const [data, setData] = useState<AboutProps>();
  const [ContactProps, setContactProps] = useState<ContactProps>();
  const [description, setDescription] = useState<string>('');
  
  useEffect(() => {
    const fetchData = async () => {
      const aboutData = await fetchAboutProps();
      setData(aboutData);
      setDescription('');
      const lines = aboutData.text.split('\n')

      for (let i = 0; i < lines.length; i++) {
        const formated_line = `<p class=${style.introText}>` + lines[i].
          replace(/\*\*\*(.*?)\*\*\*/g, `<span class=${style.accent}>$1</span>`).
          replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').
          trim() + '</p>';

          setDescription(prev => prev + (formated_line ? formated_line + '\n' : ''));
      }
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
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* Introduction Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h2 className={`${style.sectionTitle}`}>{data.image_title}</h2>
              <div className={style.profileImage}>
                <img src={`${API_BASE_URL}${data.image}`} alt="SecCodeSmith" />
              </div>
            </div>
            <div className="col-lg-8">
              <div className={style.introText}>
                {description && (<div dangerouslySetInnerHTML={{ __html: description }}></div>)}
                
                <div className="mt-4">
                  {
                    ContactProps?.social_links && 
                    ContactProps.social_links.length > 0 && 
                    ContactProps.social_links.map((link, index) => (
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
              <h2 className={` ${style.sectionTitle}`}>{data.core_values_title}</h2>
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
              <h2 className={`${style.sectionTitle}`}>{data.technical_arsenal_title}</h2>
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
              <h2 className={`section-title ${style.sectionTitle}`}>{data.professional_journal_title}</h2>
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
                      <h5 className={`${style.timelineCompany}`}><i className="fa-solid fa-briefcase"></i> {journey.company}</h5>
                      <p className={`${style.timelineText}`}>
                        {
                        journey.description && journey.description.split('\n').map((line, lineIndex) => (
                          <><span key={lineIndex}>{line.trim()}</span><br /></>
                        ))
                       }
                      </p>
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
                <h2 className={`section-title ${style.sectionTitle}`}>{data.testimonials_title}</h2>
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