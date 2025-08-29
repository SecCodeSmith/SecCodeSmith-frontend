import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy } from 'react'
import { Layout } from './components/Layout'
import {BLOG, ABOUT, CONTACT, PROJECTS} from './Config'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
import '@components/styles.css'
import '@styles/index.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {ABOUT && ( <Route path="/about" element={<About />} />)}
          {BLOG && (<Route path="/blog" element={<Blog />} />)}
          {BLOG && (<Route path="/blog/:slug" element={<BlogPost />} />)}
          {PROJECTS && (<Route path="/projects" element={<Projects />} />)}
          {CONTACT && (<Route path="/contact" element={<Contact />} />)}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App