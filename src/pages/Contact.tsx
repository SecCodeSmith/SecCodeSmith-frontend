import { PageHeader } from '../components/PageHeader';
import { ContactForm } from '../components/ContactForm';
import style from '@styles/Contact.module.scss';

import { contactData } from '../data/contactData'
import type { ContactProps } from '../untils/ContactProps';

export const Contact = () => {
  const data: ContactProps = contactData;

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
              <div className="card mb-4">
                <div className="card-body p-4">
                  <div className="contact-card">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <h3 className="contact-title">Email</h3>
                    <div className="contact-content">
                      <p>For project inquiries or questions:</p>
                      <p>
                        <a href="mailto:forge@seccodesmtih.com" className="contact-link">
                          forge@seccodesmtih.com
                        </a>
                      </p>
                      <p>For business collaborations:</p>
                      <p>
                        <a href="mailto:business@seccodesmtih.com" className="contact-link">
                          business@seccodesmtih.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connect Through Socials */}
              <div className="card">
                <div className="card-body p-4">
                  <div className="contact-card">
                    <div className="contact-icon">
                      <i className="fas fa-link"></i>
                    </div>
                    <h3 className="contact-title">Connect Through the Ether</h3>
                    <div className="contact-content">
                      <p>You can also reach me through these digital pathways:</p>
                      <div className="social-grid">
                        <a href="#" className="social-item">
                          <i className="fab fa-github social-icon-lg"></i>
                          <span className="social-name">GitHub</span>
                        </a>
                        <a href="#" className="social-item">
                          <i className="fab fa-linkedin social-icon-lg"></i>
                          <span className="social-name">LinkedIn</span>
                        </a>
                        <a href="#" className="social-item">
                          <i className="fab fa-twitter social-icon-lg"></i>
                          <span className="social-name">Twitter</span>
                        </a>
                        <a href="#" className="social-item">
                          <i className="fab fa-discord social-icon-lg"></i>
                          <span className="social-name">Discord</span>
                        </a>
                        <a href="#" className="social-item">
                          <i className="fab fa-telegram social-icon-lg"></i>
                          <span className="social-name">Telegram</span>
                        </a>
                        <a href="#" className="social-item">
                          <i className="fab fa-stack-overflow social-icon-lg"></i>
                          <span className="social-name">Stack Overflow</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-dark">
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
                  data.questionsAndAnswers.map((item, index) => (
                    <div className="accordion-item">
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button
                          className="accordion-button collapsed"
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
                        <div className="accordion-body">
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
      </section>

      {/* Map Section */}
      <section className="py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2 className="mb-3">The Forge Location</h2>
              <p className="text-muted mb-4">Where digital creations are hammered into existence</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="map-container">
                <iframe
                  className="map-frame"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82077.2903513271!2d21.9433946!3d50.0411861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cfae3cc14d449%3A0xd2240d31b33eb2ed!2zUnplc3rDs3c!5e0!3m2!1sen!2spl!4v1651813309336!5m2!1sen!2spl"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};