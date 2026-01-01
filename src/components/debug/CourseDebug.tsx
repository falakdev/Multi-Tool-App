import { useCourseStore } from "../../stores/courseStore";

export function CourseDebug() {
  const { getPublishedCourses, getAllCourses } = useCourseStore();
  const allCourses = getAllCourses();
  const published = getPublishedCourses();

  if (import.meta.env.MODE !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs z-50 max-w-xs">
      <div className="font-bold mb-2">Course Store Debug</div>
      <div>Total Courses: {allCourses.length}</div>
      <div>Published Courses: {published.length}</div>
      <div className="mt-2 max-h-40 overflow-y-auto">
        {allCourses.map((c) => (
          <div key={c.id} className="text-xs mb-1">
            {c.title} - Published: {c.isPublished ? "Yes" : "No"}
          </div>
        ))}
      </div>
    </div>
  );
}

