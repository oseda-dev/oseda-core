import { useEffect, useState } from "react";
import CoursePreview from "../../components/CoursePreview/CoursePreview";
import "./Courses.css";
import GlassPanel from "../../components/GlassPanel/GlassPanel";

const Courses = () => {

    const [courses, setCourses] = useState<string[]>([]);
    const [curPage, setCurPage] = useState<number>(0);

    const coursesPerPage = 5;



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

            {/* TODO implement this class */}
            <span className="page-buttons-container">
                {curPage != 0 ? (<GlassPanel as="button" onClick={() => { setCurPage(curPage - 1) }}> Prev </GlassPanel>) : <></>}
                <GlassPanel>
                    {curPage}
                </GlassPanel>
                {/* should probably conditionally render on last page, but would need the backend to track that */}
                <GlassPanel as="button" onClick={() => { setCurPage(curPage + 1) }}>
                    Next
                </GlassPanel>
            </span>
        </>
    );
};

export default Courses;
