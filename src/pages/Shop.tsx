import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ShoppingBag, Search, Filter, Star, CheckCircle2 } from "lucide-react";
import { useCartStore } from "../stores/cartStore";
import { useProductStore } from "../stores/productStore";
import { glassmorphism } from "../lib/utils";

export function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const { addItem } = useCartStore();
  const { getActiveProducts } = useProductStore();
  
  // Get only active products
  const products = getActiveProducts();

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAddedItems(new Set([...addedItems, product.id]));
    setTimeout(() => {
      setAddedItems(new Set());
    }, 2000);
  };

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];
  
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">E-commerce</h1>
        <p className="text-muted-foreground mt-2">
          Browse our collection of premium products
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              <Filter className="h-4 w-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Card className={`${glassmorphism} overflow-hidden h-full flex flex-col`}>
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2">
                  <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>Stock: {product.stock}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    size="sm"
                    disabled={addedItems.has(product.id)}
                  >
                    {addedItems.has(product.id) ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
