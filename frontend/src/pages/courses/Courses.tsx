import { useEffect, useState } from "react";
import CoursePreview from "../../components/CoursePreview/CoursePreview";
import "./Courses.css";
import GlassPanel from "../../components/GlassPanel/GlassPanel";
import Paginator from "../../components/Paginator/Paginator";
import { useSearchParams } from "react-router-dom";
import ClearTags from "../../components/ClearTags/ClearTags";
import Controller from "../../components/Controller/Controller";


// evil function
// defaults to "," as default join if "" is not passed
export const tagsToQueryString = (tags: string[]): string => tags.map(tag => `&tag=${tag}`).join("")



const Courses = () => {

    const [courses, setCourses] = useState<string[]>([]);
    const [curPage, setCurPage] = useState<number>(0);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);

    const [queryParams] = useSearchParams();

    const tags = queryParams.getAll("tag");

    const coursesPerPage = 8;

    useEffect(() => {
        const fetchCourses = async () => {
            
            const limitWithPeek = coursesPerPage + 1;

            try {
                // request 1 extra item to see if there are more pages to render
                const res = await fetch(`/api/courses?start=${curPage * coursesPerPage}&limit=${limitWithPeek}${tagsToQueryString(tags)}`);
                const data: string[] = await res.json();

                if (data.length > coursesPerPage) {
                    setHasNextPage(true);
                    setCourses(data.slice(0, coursesPerPage));
                } else {
                    // if the amount we got is less than what can render on a single page
                    // we know there are no more pages left to render
                    setHasNextPage(false);
                    setCourses(data);
                }
            } catch (err) {
                console.error("Failed to fetch courses:", err);
            }
        };

        fetchCourses();
    }, [curPage, queryParams]);
    // reset current page on tag change
    useEffect(() => {
        setCurPage(0);
    }, [queryParams]);

    return (
        <section className="courses-container">
            <Controller tags={tags} />
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
                disableNext={!hasNextPage}
            />
        </section>
    );
};

export default Courses;


