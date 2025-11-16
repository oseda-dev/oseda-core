import { useEffect, useState } from "react";
import CoursePreview from "../../components/CoursePreview/CoursePreview";
import "./Courses.css";

const Courses = () => {
    const [courses, setCourses] = useState<string[]>([]);

    useEffect(() => {
        fetch("/api/courses") // full backend URL
            .then(res => res.json())
            .then((data: string[]) => setCourses(data))
            .catch(err => console.error("Failed to fetch courses:", err));
    }, []);

    return (
        <div className="courses-grid">
            {courses.map(courseTitle => (
                <CoursePreview key={courseTitle} title={courseTitle} />
            ))}
        </div>
    );
};

export default Courses;
