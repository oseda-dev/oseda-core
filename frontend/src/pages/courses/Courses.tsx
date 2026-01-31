import { useEffect, useState } from "react";
import CoursePreview from "../../components/CoursePreview/CoursePreview";
import "./Courses.css";
import GlassPanel from "../../components/GlassPanel/GlassPanel";
import Paginator from "../../components/Paginator/Paginator";

const Courses = () => {

    const [courses, setCourses] = useState<string[]>([]);
    const [curPage, setCurPage] = useState<number>(0);

    const coursesPerPage = 8;

    useEffect(() => {

        const fetchCourses = async () => {
            await fetch(`/api/courses?start=${curPage * coursesPerPage}&limit=${coursesPerPage}`)
                .then(res => res.json())
                .then((data: string[]) => setCourses(data))
                .catch(err => console.error("Failed to fetch courses:", err));
        }

        fetchCourses();

    }, [curPage]);

    return (
        <>
            <div className="courses-grid">
                {courses.map(courseTitle => (
                    <CoursePreview key={courseTitle} title={courseTitle} />
                ))}
            </div>
            
            <Paginator
                curPage={curPage}
                onPrev={() => setCurPage(curPage - 1)}
                onNext={() => setCurPage(curPage + 1)}
                disablePrev={curPage === 0}
            />
        </>
    );
};

export default Courses;
