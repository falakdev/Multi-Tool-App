import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Play, CheckCircle2, Clock, BookOpen, User, ArrowLeft, Target, Award, TrendingUp } from "lucide-react";
import { useCourseStore } from "../stores/courseStore";
import { glassmorphism } from "../lib/utils";

export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCourseById } = useCourseStore();
  const course = id ? getCourseById(id) : undefined;

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground mb-4">Course not found</p>
        <Button onClick={() => navigate("/dashboard")}>Go Back</Button>
      </div>
    );
  }

  const roadmap = [
    {
      week: "Week 1-2",
      title: "Foundation & Setup",
      topics: ["Introduction to React", "Setting up development environment", "JSX and Components"],
      completed: true,
    },
    {
      week: "Week 3-4",
      title: "State Management",
      topics: ["useState Hook", "useEffect Hook", "Custom Hooks"],
      completed: true,
    },
    {
      week: "Week 5-6",
      title: "Advanced Patterns",
      topics: ["Context API", "Performance Optimization", "Code Splitting"],
      completed: false,
    },
    {
      week: "Week 7-8",
      title: "Testing & Deployment",
      topics: ["Unit Testing", "Integration Testing", "Deployment Strategies"],
      completed: false,
    },
  ];

  const learningOutcomes = [
    "Master React fundamentals and best practices",
    "Build scalable and maintainable applications",
    "Understand advanced React patterns",
    "Implement performance optimizations",
    "Deploy production-ready applications",
  ];

  return (
    <div className="space-y-8">
      <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className={`${glassmorphism} overflow-hidden`}>
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{course.title}</h1>
              <p className="text-white/90 text-lg mb-4">{course.description}</p>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{course.lessons} Lessons</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Learning Outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={`${glassmorphism}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Learning Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Course Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className={`${glassmorphism}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Course Roadmap
                </CardTitle>
                <CardDescription>Your learning path through this course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {roadmap.map((module, index) => (
                    <div key={index} className="relative pl-8 border-l-2 border-border">
                      <div className="absolute -left-2 top-0">
                        {module.completed ? (
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-muted border-2 border-border" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-muted-foreground">{module.week}</span>
                          <h3 className="font-semibold">{module.title}</h3>
                        </div>
                        <ul className="space-y-1 ml-4">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className={`${glassmorphism}`}>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Overall Progress</span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                  <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-1">Lessons Completed</p>
                  <p className="text-2xl font-bold">
                    {course.completedLessons} / {course.lessons}
                  </p>
                </div>
                <Button className="w-full" size="lg">
                  <Play className="h-5 w-5 mr-2" />
                  Continue Learning
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate("/lms")}>
                  View All Lessons
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

