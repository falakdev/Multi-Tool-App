import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Package, ShoppingCart, DollarSign, TrendingUp, Plus, CheckCircle2, Truck, Upload } from "lucide-react";
import { useProductStore } from "../stores/productStore";
import { useOrderStore } from "../stores/orderStore";
import { useAuthStore } from "../stores/authStore";
import { glassmorphism } from "../lib/utils";

export function VendorDashboard() {
  const { user } = useAuthStore();
  const { orders, updateOrderStatus } = useOrderStore();
  const { getProductsByVendor, addProduct } = useProductStore();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });
  
  // Get products for this vendor
  const vendorId = user?.id || "vendor-1";
  const vendorProducts = getProductsByVendor(vendorId);
  
  // Get orders for this vendor
  const vendorOrders = orders.filter((order) => order.vendorId === vendorId || !order.vendorId);

  const stats = [
    { name: "Total Products", value: "24", icon: Package, color: "text-blue-600" },
    { name: "Pending Orders", value: "8", icon: ShoppingCart, color: "text-orange-600" },
    { name: "Total Revenue", value: "$12,450", icon: DollarSign, color: "text-green-600" },
    { name: "Growth", value: "+18%", icon: TrendingUp, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your products and orders, {user?.name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className={`${glassmorphism}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className={`${glassmorphism}`}>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendorOrders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No orders yet</p>
                ) : (
                  vendorOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-lg border border-border space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order {order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.customerName} • {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "delivered"
                              ? "bg-green-500/10 text-green-500"
                              : order.status === "shipped"
                              ? "bg-blue-500/10 text-blue-500"
                              : order.status === "confirmed"
                              ? "bg-purple-500/10 text-purple-500"
                              : "bg-orange-500/10 text-orange-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
                        <div className="flex gap-2">
                          {order.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, "confirmed")}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Confirm
                            </Button>
                          )}
                          {order.status === "confirmed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, "shipped")}
                            >
                              <Truck className="h-4 w-4 mr-1" />
                              Ship
                            </Button>
                          )}
                          {order.status === "shipped" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, "delivered")}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Mark Delivered
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Product Inventory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className={`${glassmorphism}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Product Inventory</CardTitle>
                  <CardDescription>Manage your products</CardDescription>
                </div>
                <Button size="sm" onClick={() => setShowAddProduct(!showAddProduct)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showAddProduct && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 border border-border rounded-lg bg-muted/50"
                >
                  <h4 className="font-semibold mb-4">Add New Product</h4>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addProduct({
                        name: productForm.name,
                        description: productForm.description,
                        price: parseFloat(productForm.price) || 0,
                        image: productForm.image || "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
                        category: productForm.category || "General",
                        stock: parseInt(productForm.stock) || 0,
                        vendorId: vendorId,
                      });
                      setProductForm({
                        name: "",
                        description: "",
                        price: "",
                        image: "",
                        category: "",
                        stock: "",
                      });
                      setShowAddProduct(false);
                    }}
                    className="space-y-3"
                  >
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="prod-name">Product Name</Label>
                        <Input
                          id="prod-name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="prod-price">Price</Label>
                        <Input
                          id="prod-price"
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="prod-category">Category</Label>
                        <Input
                          id="prod-category"
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="prod-stock">Stock</Label>
                        <Input
                          id="prod-stock"
                          type="number"
                          value={productForm.stock}
                          onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="prod-desc">Description</Label>
                      <textarea
                        id="prod-desc"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="prod-image">Image URL</Label>
                      <Input
                        id="prod-image"
                        placeholder="https://images.unsplash.com/..."
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddProduct(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
              <div className="space-y-4">
                {vendorProducts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No products yet. Add your first product!</p>
                ) : (
                  vendorProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Stock: {product.stock} • ${product.price}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

