import { PageHeader } from '../components/PageHeader';
import { ContactForm } from '../components/ContactForm';
import style from '@styles/Contact.module.scss';
import '@styles/Accordion.scss';

import { fetchContactData } from '../data/contactData'
import type { ContactProps } from '../untils/ContactProps';
import { useEffect, useState } from 'react';
import { Spinner } from '../components/Spinner';

export const Contact = () => {
  const [ContactProps, setContactProps] = useState<ContactProps>();

  useEffect(() => {
    const getContactData = async () => {
      const data = await fetchContactData();
      setContactProps(data);
    };
    getContactData();
  }, []);

  if (!ContactProps) {
    return <Spinner />;
  }

  return (
    <>
      <PageHeader
        title="Forge Connection"
        subtitle="Have a project in mind? Send a message to the forge and let's craft something extraordinary together"
      />

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Contact Form Column */}
            <div className="col-lg-7">
              <ContactForm />
            </div>

            {/* Contact Info Column */}
            <div className="col-lg-5">
              {/* Email Info */}
              <div className={`card mb-4 ${style.card}`}>
                <div className={`card-body p-4 ${style.cardBody}`}>
                  <div className={`${style.contactCard}`}>
                    <div className={`${style.contactIcon}`}>
                      <i className="fas fa-envelope"></i>
                    </div>
                    <h3 className={style.contactTitle}>Email</h3>
                    <div className="contact-content">
                      <p>For project inquiries or questions:</p>
                      <p>
                        <a href={`mailto:${ContactProps.email}`} className={style.contactLink}>
                          {ContactProps.email}
                        </a>
                      </p>
                      <p>For business collaborations:</p>
                      <p>
                        <a href={`mailto:${ContactProps.businessEmail}`} className={style.contactLink}>
                          {ContactProps.businessEmail}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {
                ContactProps.socialLinks.length > 0 && (
                  <div className={`card ${style.card}`}>
                    <div className={`card-body p-4 ${style.cardBody}`}>
                      <div className={style.contactCard}>
                        <div className={style.contactIcon}>
                          <i className="fas fa-link"></i>
                        </div>
                        <h3 className={style.contactTitle}>Connect Through the Ether</h3>
                        <div className={style.contactContent}>
                          <p>You can also reach me through these digital pathways:</p>
                          <div className={style.socialGrid}>
                          {ContactProps.socialLinks.map((link, index) => (

                              <a key={index} href={link.url} className={`social-item ${style.socialItem}`}>
                                <i className={`${link.icon} social-icon-lg ${style.socialIconLg}`}></i>
                                <span className={`social-name ${style.socialName}`}>{link.platform}</span>
                              </a>
                            
                          ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
              
            </div>
          </div>
        </div>
      </section >

      {/* FAQ Section */}
      < section className="py-5 bg-dark" >
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2 className="mb-3">Frequently Asked Questions</h2>
              <p className="text-muted">Common inquiries about forging digital solutions</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="accordion" id="faqAccordion">
                {
                  ContactProps.questionsAndAnswers.map((item, index) => (
                    <div className={`accordion-item`} key={index}>
                      <h2 className={`accordion-header`} id={`heading${index}`}>
                        <button
                          className={`accordion-button collapsed`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded="false"
                          aria-controls={`collapse${index}`}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading${index}`}
                        data-bs-parent="#faqAccordion"
                      >
                        <div className={`accordion-body`}>
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Map Section */}
      < section className="py-5" >
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2 className="mb-3">The Forge Location</h2>
              <p className="text-muted mb-4">Where digital creations are hammered into existence</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className={style.mapContainer}>
                <iframe
                  className={style.mapFrame}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82077.2903513271!2d21.9433946!3d50.0411861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cfae3cc14d449%3A0xd2240d31b33eb2ed!2zUnplc3rDs3c!5e0!3m2!1sen!2spl!4v1651813309336!5m2!1sen!2spl"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default Contact;