import { useState, type FormEvent } from 'react';
import '@styles/FormControl.scss'
import styles from '@styles/Contact.module.scss'

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    projectType: '',
    message: '',
    budget: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, ] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        projectType: '',
        message: '',
        budget: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className={`card h-100 ${styles.card}`}>
      <div className={`card-header bg-transparent ${styles.cardHeader}`}>
        <h2 className="mb-0 py-2">Send a Message to the Forge</h2>
      </div>
      <div className={`card-body p-4 ${styles.cardBody}`}>
        {/* Success message */}
        {showSuccess && (
          <div className="alert alert-success" role="alert">
            <i className="fas fa-check-circle me-2"></i> Your message has been successfully sent. I'll get back to you soon!
          </div>
        )}
        
        {/* Error message */}
        {showError && (
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-circle me-2"></i> There was an error sending your message. Please try again later.
          </div>
        )}
        
        {/* Contact Form */}
        <form id="contact-form" className="needs-validation" noValidate onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                name="name" 
                placeholder="Enter your name" 
                required
                value={formData.name}
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                Please provide your name.
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email" 
                placeholder="Enter your email" 
                required
                value={formData.email}
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                Please provide a valid email address.
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input 
              type="text" 
              className="form-control" 
              id="subject" 
              name="subject" 
              placeholder="What's this regarding?" 
              required
              value={formData.subject}
              onChange={handleChange}
            />
            <div className="invalid-feedback">
              Please provide a subject for your message.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="projectType" className="form-label">Project Type</label>
            <select 
              className="form-select" 
              id="projectType" 
              name="projectType" 
              required
              value={formData.projectType}
              onChange={handleChange}
            >
              <option value="" selected disabled>Select a project type</option>
              <option value="embedded">Embedded Systems</option>
              <option value="web">Web Development</option>
              <option value="ml">Machine Learning</option>
              <option value="iot">IoT Solution</option>
              <option value="consulting">Technical Consulting</option>
              <option value="other">Other</option>
            </select>
            <div className="invalid-feedback">
              Please select a project type.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Your Message</label>
            <textarea 
              className="form-control" 
              id="message" 
              name="message" 
              rows={5} 
              placeholder="Tell me about your project, requirements, or questions..." 
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <div className="invalid-feedback">
              Please provide a message.
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="budget" className="form-label">Budget Range (Optional)</label>
            <select 
              className="form-select" 
              id="budget" 
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            >
              <option value="" selected disabled>Select your budget range</option>
              <option value="small">$1,000 - $5,000</option>
              <option value="medium">$5,000 - $15,000</option>
              <option value="large">$15,000 - $30,000</option>
              <option value="enterprise">$30,000+</option>
              <option value="undecided">Not sure yet</option>
            </select>
          </div>
          <div className="text-center">
            <button 
              type="submit" 
              className={`btn btn-primary position-relative ${styles.btnPrimary}`}
              id="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane me-2"></i> Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}