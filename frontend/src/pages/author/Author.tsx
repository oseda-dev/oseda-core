import { useEffect, useState } from "react";
import CoursePreview from "../../components/CoursePreview/CoursePreview";
import { useParams } from "react-router-dom";
import Paginator from "../../components/Paginator/Paginator";
import AuthorAvatar from "../../components/AuthorAvatar/AuthorAvatar";

const Author = () => {
    const { name } = useParams<{ name: string }>();

    
    const [courses, setCourses] = useState<string[]>([]);
    const [curPage, setCurPage] = useState<number>(0);
    
    const coursesPerPage = 8;
    
    useEffect(() => {
        const fullURL = new URL(`/api/author/${name}?start=${curPage * coursesPerPage}&limit=${coursesPerPage}`, window.location.href);
        
        fetch(fullURL)
        .then(res => res.json())
        .then((data: string[]) => setCourses(data))
        .catch(err => console.error("Failed to fetch courses:", err));
    }, [name, curPage]);
    
    // must come after all hooks
    // TODO implement 404 style page
    if(name === undefined){
        return <div>
            Please specify an author
        </div>;
    }


    return (
            <>

                <AuthorAvatar author={name} />
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
        );};

export default Author;
