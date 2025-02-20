'use client'

import './Footer.css'
import { Instagram, Mail, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Footer = () => {
  const router = useRouter()

  const handleEmailClick = () => {
    window.location.href = 'mailto:buildmaster965@gmail.com'
  }

  const handlePhoneClick = () => {
    window.location.href = 'tel:+911234567890'
  }

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/rohan_karadkar27', '_blank')
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavigation = (path: string) => {
    if (window.location.pathname !== '/') {
      router.push('/')
      // Wait for navigation to complete before scrolling
      setTimeout(() => scrollToSection(path), 100)
    } else {
      scrollToSection(path)
    }
  }

  const handleCartClick = () => {
    router.push('/cart')
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 
              onClick={() => router.push('/')} 
              className="footer-logo"
            >
              BuildMaster
            </h3>
            <p>Your one-stop shop for Pc Components and tech gadgets.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <button 
                  onClick={() => router.push('/')}
                  className="footer-link"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('categories')}
                  className="footer-link"
                >
                  Shop
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('about')}
                  className="footer-link"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('recent-news')}
                  className="footer-link"
                >
                  Blogs
                </button>
              </li>
              <li>
                <button 
                  onClick={handleCartClick}
                  className="footer-link"
                >
                  Cart
                </button>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-item" onClick={handleEmailClick}>
              <Mail size={20} />
              <p>buildmaster965@gmail.com</p>
            </div>
            <div className="contact-item" onClick={handlePhoneClick}>
              <Phone size={20} />
              <p>(+91) 123-456-7890</p>
            </div>
            <div className="contact-item" onClick={handleInstagramClick}>
              <Instagram size={20} />
              <p>Follow us on Instagram</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p>&copy; 2025 BuildMaster. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

