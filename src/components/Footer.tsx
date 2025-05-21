import {socialLinkData} from '../data/socialLinkData'
export interface socialLink {
  icon: string;
  url: string;
}

export const Footer = () => {
  const socialLinks: socialLink[] = socialLinkData;

  const currentYear = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="social-links">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url} className="social-icon">
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
        <p className="copyright">&copy; {currentYear} SecCodeSmith. All rights forged in digital fire.</p>
      </div>
    </footer>
  )
}