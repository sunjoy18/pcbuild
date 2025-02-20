'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './Categories.css'
import Image from 'next/image'
import Headphone from './images/category/gamingheadphone.jpg'
import Laptop from './images/category/macbook.jpg'
import Accessories from './images/category/accessories.jpg'
import Monitor from './images/category/monitor.png'
import Garmin from './images/category/garmin.jpg'
import PowerSupply from './images/category/powersupply.jpg'



 const allCategories = [
  {
    id: 'gaming-headphones',
    name: 'Gaming Headphones',
    image: Headphone,
    description: 'Premium gaming audio gear',
     path: '/shop/gaming-headphones'
   },
  {
     id: 'laptops',
     name: 'Laptops',
     image: Laptop,
     description: 'Powerful & portable computers',  
     path: '/shop/laptops'
   },
  {
     id: 'accessories',
     name: 'Accessories',
     image: Accessories,
    description: 'Essential tech accessories',
     path: '/shop/accessories'
   },
      {
      id: 'monitor',
    name: 'Monitors',
     image: Monitor,
     description: 'Curved Monitor',
     path: '/shop/  '
  },
  {
      id: 'Garmin',
     name: 'Watches',
     image: Garmin,
     description: 'Smart Watch',
     path: '/shop/Garmin'
  },
  {
      id: 'Power Supply',
     name: 'Power Supply',
     image: PowerSupply,
     description: 'Power Supply for your computer',
     path: '/shop/powersupply'
   }
 ]



const Categories = () => {
  const [visibleCount, setVisibleCount] = useState(3)
  const router = useRouter()
  
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, allCategories.length))
  }

  const handleBrowse = (path: string) => {
    router.push(path)
  }

  const visibleCategories = allCategories.slice(0, visibleCount)
  const hasMore = visibleCount < allCategories.length

  return (
    <section className="categories">
      <div className="container">
        <h2 className="section-title">Shop By Category</h2>
        <div className="category-grid">
          {visibleCategories.map((category) => (
            <div key={category.id} className="category-item">
              <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={300}
                className="category-image"
                priority
              />
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <button 
                onClick={() => handleBrowse(category.path)} 
                className="btn"
              >
                Browse
              </button>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="load-more-container">
            <button onClick={handleLoadMore} className="load-more-btn">
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Categories

