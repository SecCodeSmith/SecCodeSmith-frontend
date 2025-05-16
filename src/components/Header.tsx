import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export const Header = () => {
  const location = useLocation()
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)

  // Close the mobile menu when changing routes
  useEffect(() => {
    setIsNavCollapsed(true)
  }, [location])

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <div className="logo-icon">
            <i className="fas fa-hammer"></i>
            <i 
              className="fas fa-dragon" 
              style={{ 
                fontSize: '1.2rem', 
                position: 'absolute', 
                top: 0, 
                right: '-12px', 
                color: 'var(--accent-dragon)'
              }}
            ></i>
          </div>
          <div className="logo-text">SecCodeSmith</div>
        </NavLink>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          aria-controls="navbarNav" 
          aria-expanded={!isNavCollapsed} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-end`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/blog"
              >
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/projects"
              >
                Projects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}