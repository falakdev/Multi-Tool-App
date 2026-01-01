import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Users, DollarSign, Package, TrendingUp, Plus, Upload } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { users, revenueData } from "../lib/data";
import { glassmorphism } from "../lib/utils";
import { useAuthStore } from "../stores/authStore";
import { useCourseStore } from "../stores/courseStore";
import { useProductStore } from "../stores/productStore";
import { Link } from "react-router-dom";

export function Admin() {
  const { user } = useAuthStore();
  const { addCourse, getAllCourses } = useCourseStore();
  const { addProduct, getActiveProducts } = useProductStore();
  const demoCourses = getAllCourses();
  const demoProducts = getActiveProducts();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formType, setFormType] = useState<"course" | "product">("course");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    instructor: "",
    duration: "",
    lessons: "",
    category: "",
    stock: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const stats = [
    { name: "Total Users", value: "1,234", icon: Users, color: "text-blue-600", change: "+12%" },
    { name: "Total Revenue", value: "$45,678", icon: DollarSign, color: "text-green-600", change: "+18%" },
    { name: "Products", value: "156", icon: Package, color: "text-purple-600", change: "+5" },
    { name: "Growth", value: "+24%", icon: TrendingUp, color: "text-orange-600", change: "This month" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">
            Manage your platform, {user?.name}
          </p>
        </div>
        <Button onClick={() => setShowUploadForm(!showUploadForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Upload New
        </Button>
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
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600"
        >
          {successMessage}
        </motion.div>
      )}

      {/* Upload Form */}
      {showUploadForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={`${glassmorphism}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upload New {formType === "course" ? "Course" : "Product"}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={formType === "course" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormType("course")}
                  >
                    Course
                  </Button>
                  <Button
                    variant={formType === "product" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormType("product")}
                  >
                    Product
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (formType === "course") {
                    const newCourse = {
                      title: formData.title,
                      description: formData.description,
                      thumbnail: formData.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
                      price: parseFloat(formData.price) || 0,
                      instructor: formData.instructor || "Admin Instructor",
                      duration: formData.duration || "10 hours",
                      lessons: parseInt(formData.lessons) || 20,
                    };
                    addCourse(newCourse);
                    const allCourses = getAllCourses();
                    console.log("Course added! Total courses now:", allCourses.length);
                    setSuccessMessage(`Course "${formData.title}" added successfully! Total courses: ${allCourses.length}`);
                    setTimeout(() => setSuccessMessage(""), 5000);
                  } else {
                    addProduct({
                      name: formData.title,
                      description: formData.description,
                      price: parseFloat(formData.price) || 0,
                      image: formData.image || "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
                      category: formData.category || "General",
                      stock: parseInt(formData.stock) || 0,
                    });
                  }
                  setFormData({
                    title: "",
                    description: "",
                    price: "",
                    image: "",
                    instructor: "",
                    duration: "",
                    lessons: "",
                    category: "",
                    stock: "",
                  });
                  setShowUploadForm(false);
                }}
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder={`Enter ${formType} title`}
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>
                {formType === "course" && (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instructor">Instructor</Label>
                      <Input
                        id="instructor"
                        placeholder="Instructor name"
                        value={formData.instructor}
                        onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        placeholder="10 hours"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lessons">Lessons</Label>
                      <Input
                        id="lessons"
                        type="number"
                        placeholder="20"
                        value={formData.lessons}
                        onChange={(e) => setFormData({ ...formData, lessons: e.target.value })}
                      />
                    </div>
                  </div>
                )}
                {formType === "product" && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        placeholder="Accessories, Electronics, etc."
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        placeholder="0"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder={`Enter ${formType} description`}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload {formType === "course" ? "Course" : "Product"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowUploadForm(false);
                      setFormData({
                        title: "",
                        description: "",
                        price: "",
                        image: "",
                        instructor: "",
                        duration: "",
                        lessons: "",
                        category: "",
                        stock: "",
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className={`${glassmorphism}`}>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and orders for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue ($)" />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <Card className={`${glassmorphism}`}>
          <CardHeader>
            <CardTitle>Demo Data</CardTitle>
            <CardDescription>Sample courses and products visible to all accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Courses</h4>
                {demoCourses.slice(0, 4).map((c) => (
                  <div key={c.id} className="p-3 rounded-lg border border-border mb-2">
                    <p className="font-medium">{c.title}</p>
                    <p className="text-sm text-muted-foreground">{c.instructor} • {c.duration} • ${c.price}</p>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold mb-2">Products</h4>
                {demoProducts.slice(0, 6).map((p) => (
                  <div key={p.id} className="p-3 rounded-lg border border-border mb-2">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.category} • ${p.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className={`${glassmorphism}`}>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage all users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.slice(0, 3).map((u) => (
                  <div key={u.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{u.name}</p>
                      <p className="text-sm text-muted-foreground">{u.email}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize">
                      {u.role}
                    </span>
                  </div>
                ))}
                <Link to="/admin/users">
                  <Button variant="outline" className="w-full">
                    View All Users
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className={`${glassmorphism}`}>
            <CardHeader>
              <CardTitle>Revenue Chart</CardTitle>
              <CardDescription>Revenue breakdown by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
