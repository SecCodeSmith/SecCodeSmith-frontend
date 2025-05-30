import { Outlet } from 'react-router-dom'
import { lazy } from 'react'

const Header = lazy(() => import('./Header').then(module => ({ default: module.Header })))
const Footer = lazy(() => import('./Footer').then(module => ({ default: module.Footer })))

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout