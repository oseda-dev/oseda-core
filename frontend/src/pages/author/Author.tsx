import { useEffect, useState } from "react";
import CoursePreview from "../../components/CoursePreview/CoursePreview";
import { useParams } from "react-router-dom";
import Paginator from "../../components/Paginator/Paginator";
import AuthorAvatar from "../../components/AuthorAvatar/AuthorAvatar";
import "./Author.css";

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

    if (name === undefined) {
        return <div>
            Please specify an author
        </div>;
    }


    return (
        <div className="author-page">
            <span className="author-title">
                <AuthorAvatar author={name} />
                <h1>{name}</h1>

                <a href={`https://github.com/${name}`}>
                    <img className="gh-logo"
                        src="/GitHub_Invertocat_Black.png"
                        />
                </a>
            </span>

            <h1 className="courses-title">Courses:</h1>

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
        </div>
    );
};

export default Author;
