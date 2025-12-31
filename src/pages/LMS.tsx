import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Play, CheckCircle2, Clock, BookOpen, User } from "lucide-react";
import { courses } from "../lib/data";
import { glassmorphism } from "../lib/utils";

export function LMS() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const course = selectedCourse ? courses.find((c) => c.id === selectedCourse) : courses[0];

  const lessons = [
    { id: "1", title: "Introduction to React Hooks", duration: "15:30", completed: true },
    { id: "2", title: "Understanding useState", duration: "22:45", completed: true },
    { id: "3", title: "Working with useEffect", duration: "18:20", completed: true },
    { id: "4", title: "Custom Hooks", duration: "25:10", completed: false },
    { id: "5", title: "Context API Deep Dive", duration: "20:00", completed: false },
    { id: "6", title: "Performance Optimization", duration: "30:15", completed: false },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Course Curriculum Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        <Card className={`${glassmorphism}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              My Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {courses.map((c) => (
              <motion.button
                key={c.id}
                onClick={() => setSelectedCourse(c.id)}
                whileHover={{ x: 4 }}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedCourse === c.id || (!selectedCourse && c.id === courses[0].id)
                    ? "bg-primary/10 border-primary"
                    : "bg-background border-border hover:bg-accent"
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2">{c.title}</h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{c.duration}</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Video Player and Lessons */}
      <div className="lg:col-span-2 space-y-6">
        {course && (
          <>
            {/* Video Player */}
            <Card className={`${glassmorphism} overflow-hidden`}>
              <div className="relative aspect-video bg-black">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center shadow-2xl"
                  >
                    <Play className="h-12 w-12 text-primary ml-1" fill="currentColor" />
                  </motion.button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h2 className="text-white text-2xl font-bold mb-2">{course.title}</h2>
                  <p className="text-white/80">{course.description}</p>
                </div>
              </div>
            </Card>

            {/* Course Info */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className={`${glassmorphism}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                      <p className="font-semibold">{course.instructor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className={`${glassmorphism}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lessons</p>
                      <p className="font-semibold">{course.lessons} Total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className={`${glassmorphism}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{course.duration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lessons List */}
            <Card className={`${glassmorphism}`}>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <CardDescription>
                  {course.completedLessons} of {course.lessons} lessons completed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      {lesson.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{lesson.title}</h4>
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
