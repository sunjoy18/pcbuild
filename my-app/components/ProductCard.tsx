import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { View } from "lucide-react"
import ThreeSixtyView from "./three-sixty-view"
import type { Product } from "@/types/product"
import { useState } from "react"
import { useCart } from "@/contexts/CartContext"
import Image from "next/image"

// ... other imports and code ...

export default function ProductCard({ product }: { product: Product }) {
  const { state, addItem } = useCart()
  console.log("STATE : ", state.items)
  const isInCart = state.items.some((item) => item._id === product._id || item?.productId?._id === product._id)

  return (
    <div className="relative group rounded-lg border p-4 space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-all group-hover:scale-105"
          priority
        />
        {/* <div className="absolute bottom-2 left-2 flex gap-1">
          {product.images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImage ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div> */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="absolute bottom-2 right-2 rounded-full bg-white/80 p-2 transition-all hover:bg-white"
              aria-label="View 360"
            >
              <View className="h-5 w-5" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <ThreeSixtyView
              images={product.threeSixtyImages || []}
              width={800}
              height={800}
              autoRotate={true}
              autoRotateSpeed={100}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="flex justify-between items-center">
          <p className="font-medium">${product.price}</p>
          <button
            onClick={() => addItem(product)}
            disabled={isInCart}
            className="rounded-lg bg-primary px-4 py-2 text-black hover:bg-primary/90 border-black"
          >
            {isInCart ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  )
}


