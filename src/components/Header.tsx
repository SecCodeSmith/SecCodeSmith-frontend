import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/images/favicon.webp'
import {BLOG, ABOUT, CONTACT, PROJECTS} from '../Config'

export const Header = () => {
  const location = useLocation()
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)
  
  const moduleCount = (BLOG?1:0) + (ABOUT?1:0) + (CONTACT?1:0) + (PROJECTS?1:0);

  // Close the mobile menu when changing routes
  useEffect(() => {
    setIsNavCollapsed(true)
  }, [location])

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <div className="logo-icon">
            <img src={logo} alt="Logo" className='logo-image' height="100%" />
          </div>
          <div className="logo-text">SecCodeSmith</div>
        </NavLink>
        
        {moduleCount > 0 &&(<button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          aria-controls="navbarNav" 
          aria-expanded={!isNavCollapsed} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>)}
        
        {moduleCount > 0 &&(<div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-end`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/"
              >
                Home
              </NavLink>
            </li>
            {BLOG && (<li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/blog"
              >
                Blog
              </NavLink>
            </li>)}
            {ABOUT && (<li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/about"
              >
                About
              </NavLink>
            </li>)}
            {PROJECTS && (<li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/projects"
              >
                Projects
              </NavLink>
            </li>)}
            {CONTACT && (<li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/contact"
              >
                Contact
              </NavLink>
            </li>)}
          </ul>
        </div>)}
      </div>
    </nav>
  )
}

export default Header;