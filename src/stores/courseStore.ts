import { create } from "zustand";
import { persist } from "zustand/middleware";
import { courses as initialCourses } from "../lib/data";

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  progress?: number;
  lessons: number;
  completedLessons?: number;
  instructor: string;
  price: number;
  isPublished: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CourseState {
  courses: Course[];
  addCourse: (course: Omit<Course, "id" | "createdAt" | "updatedAt" | "isPublished" | "isActive" | "progress" | "completedLessons">) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  getPublishedCourses: () => Course[];
  getCourseById: (id: string) => Course | undefined;
  getAllCourses: () => Course[];
}

// Helper to initialize courses only if store is empty
const initializeCourses = (): Course[] => {
  return initialCourses.map((course) => ({
    ...course,
    isPublished: true,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    progress: course.progress || 0,
    completedLessons: course.completedLessons || 0,
  }));
};

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: initializeCourses(),
      addCourse: (courseData) => {
        const newCourse: Course = {
          ...courseData,
          id: `course-${Date.now()}`,
          isPublished: true,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          progress: 0,
          completedLessons: 0,
        };
        set({ courses: [...get().courses, newCourse] });
      },
      updateCourse: (id, updates) => {
        set({
          courses: get().courses.map((course: Course) =>
            course.id === id
              ? { ...course, ...updates, updatedAt: new Date().toISOString() }
              : course
          ),
        });
      },
      deleteCourse: (id) => {
        set({ courses: get().courses.filter((course: Course) => course.id !== id) });
      },
      getPublishedCourses: () => {
        return get().courses.filter((course: Course) => course.isPublished && course.isActive);
      },
      getCourseById: (id) => {
        return get().courses.find((course: Course) => course.id === id);
      },
      getAllCourses: () => {
        return get().courses;
      },
    }),
    {
      name: "course-storage",
      // Merge persisted state with current state
      merge: (persistedState: any, currentState: CourseState) => {
        // If we have persisted courses, use them; otherwise use initial state
        if (persistedState?.courses && Array.isArray(persistedState.courses) && persistedState.courses.length > 0) {
          return {
            ...currentState,
            courses: persistedState.courses,
          };
        }
        // If no persisted state, use initial courses
        return {
          ...currentState,
          courses: initializeCourses(),
        };
      },
    }
  )
);
