'use client'

import './Header.css'
import { useRouter } from 'next/navigation'
import SearchBar from './SearchBar'
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const router = useRouter()

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleBuildClick = () => {
    router.push('/build')
  }

  const handleShopClick = () => {
    router.push('/shop')
  }


  const handleNavigation = (path: string) => {
    try {
      if (window.location.pathname !== '/') {
        router.push('/')
        setTimeout(() => {
          const element = document.getElementById(path)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        const element = document.getElementById(path)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <h1
            className="logo"
            onClick={() => router.push('/')}
            style={{ cursor: 'pointer' }}
          >
            BuildMaster
          </h1>
          <nav>
            <ul>
              <li>
                <button
                  onClick={() => router.push('/')}
                  className="nav-link"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={handleShopClick}
                  className="nav-link"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/about')}
                  className="nav-link"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/blogs')}
                  className="nav-link"
                >
                  Blogs
                </button>
              </li>
              <li>
                <button
                  onClick={handleBuildClick}
                  className="nav-link"
                >
                  Build
                </button>
              </li>
              <li className="dropdown">
                <button className="nav-link">Quick Links</button>
                <ul className="dropdown-content">
                  <li><button onClick={() => handleNavigation('pc-parts')} className="nav-link">PC Parts</button></li>
                  <li><button onClick={() => handleNavigation('pre-built')} className="nav-link">Pre-Built PCs</button></li>
                  <li><button onClick={() => handleNavigation('gaming')} className="nav-link">Gaming Setup</button></li>
                  <li><button onClick={() => handleNavigation('accessories')} className="nav-link">Accessories</button></li>
                  <li><button onClick={() => handleNavigation('support')} className="nav-link">Support</button></li>
                  <li><button onClick={() => handleNavigation('deals')} className="nav-link">Todays Deals</button></li>
                </ul>
              </li>
              {user && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="nav-link"
                  >
                    Logout
                  </button>
                </li>
              )}

              <li>
                <button
                  onClick={() => router.push('/profile')}
                  className="nav-link"
                >
                  Profile
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <SearchBar />
    </>
  )
}

export default Header

