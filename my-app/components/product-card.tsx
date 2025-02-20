"use client"

import Image from "next/image"
import { useState } from "react"
import { useCart } from "@/contexts/CartContext"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const { addItem } = useCart()

  return (
    <div className="card">
      <div className="image-container">
        <Image 
          src={product.images[currentImage].url}
          alt={product.images[currentImage].alt}
          width={300}
          height={300}
          className="product-image"
        />
        <div className="image-dots">
          {product.images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentImage ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  )
} 