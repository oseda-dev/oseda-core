import { useEffect, useState } from "react";
import CoursePreview from "../../components/CoursePreview/CoursePreview";
import { useParams, useSearchParams } from "react-router-dom";
import Paginator from "../../components/Paginator/Paginator";
import AuthorAvatar from "../../components/AuthorAvatar/AuthorAvatar";
import "./Author.css";
import { tagsToQueryString } from "../courses/Courses";
import ClearTags from "../../components/ClearTags/ClearTags";
import Controller from "../../components/Controller/Controller";

const Author = () => {
    const { name } = useParams<{ name: string }>();

    const [courses, setCourses] = useState<string[]>([]);
    const [curPage, setCurPage] = useState<number>(0);

    const [queryParams] = useSearchParams();
    const tags = queryParams.getAll("tag");


    const coursesPerPage = 8;

    console.log(`/api/author/${name}?start=${curPage * coursesPerPage}&limit=${coursesPerPage}${tagsToQueryString(tags)}`)

    useEffect(() => {
        const fullURL = new URL(`/api/author/${name}?start=${curPage * coursesPerPage}&limit=${coursesPerPage}${tagsToQueryString(tags)}`, window.location.href);

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
            />
        </div>
    );
};

export default Author;
