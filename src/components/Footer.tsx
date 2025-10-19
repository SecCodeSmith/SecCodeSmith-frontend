import { useEffect, useState } from 'react';
import {fetchSocialLinkData} from '../data/socialLinkData'
import type {SocialLink} from '../utils/SocialLink'
import { PAGE_TITLE } from '../Config';


export const Footer = () => {
   const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchSocialLinkData();
        setSocialLinks(data);
      };
      fetchData();
    }, []);
    
  const currentYear = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="social-links">
          {socialLinks && socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
        <p className="copyright">&copy; {currentYear} {PAGE_TITLE}. All rights forged in digital fire.</p>
      </div>
    </footer>
  )
}

export default Footer;