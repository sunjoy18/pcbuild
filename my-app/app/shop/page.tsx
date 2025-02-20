'use client'
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProduct } from '@/utils/product';
import './shop.css';

export default function ShopPage() {
  const [products, setProducts] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();
        const groupedProducts = response.reduce((acc: any, product: any) => {
          const category = product.category || 'Others';
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});
        setProducts(groupedProducts);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h1 className="shop-title">Shop Our Products</h1>

      <div className="tabs-container">
        <Tabs defaultValue="all">
          <TabsList className="tabs-list">
            <TabsTrigger className="tab-trigger" value="all">All Products</TabsTrigger>
            {Object.keys(products).map((category) => (
              <TabsTrigger key={category} className="tab-trigger" value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <div className="products-grid">
              {Object.values(products).flat().map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </TabsContent>

          {Object.entries(products).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="products-grid">
                {items.map((product: any) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
