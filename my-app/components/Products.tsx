'use client'

import './Products.css'
import Image from 'next/image'
import AirPodsMax from './images/category/AirPodsMax.png'
import AppleWatch from './images/category/applewatch.png'
import Monitor from './images/category/monitor.png'

const products = [
  {
    id: 1,
    name: 'AirPods Max',
    tagline: 'High-Fidelity Audio Experience',
    image: AirPodsMax,
    price: '$549',
    description: 'Immersive sound with active noise cancellation'
  },
  {
    id: 2,
    name: 'Apple Watch',
    tagline: 'Time Meets Innovation',
    image: AppleWatch,
    price: '$399',
    description: 'Stay connected, track your fitness, live healthier'
  },
  {
    id: 3,
    name: 'Pro Display XDR',
    tagline: 'Professional Grade Display',
    image: Monitor,
    price: '$4999',
    description: 'Exceptional color accuracy and stunning brightness'
  }
]

const Products = () => {
  return (
    <section className="products">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <Image
                src={product.image}
                alt={product.name}
                width={250}
                height={220}
                priority
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p className="tagline">{product.tagline}</p>
              <p className="price">{product.price}</p>
              <p className="description">{product.description}</p>
              <button className="btn">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products

