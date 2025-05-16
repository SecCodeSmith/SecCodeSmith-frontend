export const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="social-links">
          <a href="#" className="social-icon"><i className="fab fa-github"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-discord"></i></a>
          <a href="#" className="social-icon"><i className="fas fa-envelope"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-hackerrank"></i></a>
        </div>
        <p className="copyright">&copy; {currentYear} SecCodeSmith. All rights forged in digital fire.</p>
      </div>
    </footer>
  )
}