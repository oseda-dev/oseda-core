import { useEffect, useState } from "react";
import CoursePreview from "../../components/CoursePreview/CoursePreview";
import "./Courses.css";

const Courses = () => {

    const [courses, setCourses] = useState<string[]>([]);
    const curPage = useState<number>(0);


    useEffect(() => {

        const fetchCourses = async () => {
            await fetch("/api/courses?start=9&limit=5") 
                .then(res => res.json())
                .then((data: string[]) => setCourses(data))
                .catch(err => console.error("Failed to fetch courses:", err));
        }

        fetchCourses();
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
