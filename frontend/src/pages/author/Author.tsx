import { useEffect, useState } from "react";
import CoursePreview from "../../components/CoursePreview/CoursePreview";
import { useParams, useSearchParams } from "react-router-dom";
import Paginator from "../../components/Paginator/Paginator";
import AuthorAvatar from "../../components/AuthorAvatar/AuthorAvatar";
import "./Author.css";
import { tagsToQueryString } from "../courses/Courses";
import Controller from "../../components/Controller/Controller";
import GlassPanel from "../../components/GlassPanel/GlassPanel";

const Author = () => {
    const { name } = useParams<{ name: string }>();

    const [courses, setCourses] = useState<string[]>([]);
    const [curPage, setCurPage] = useState<number>(0);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);

    const [queryParams] = useSearchParams();
    const tags = queryParams.getAll("tag");

    const coursesPerPage = 8;

    useEffect(() => {
        if (!name) return;

        const limitWithPeek = coursesPerPage + 1;
        const fullURL = new URL(
            `/api/author/${name}?start=${curPage * coursesPerPage}&limit=${limitWithPeek}${tagsToQueryString(tags)}`, 
            window.location.origin
        );

        fetch(fullURL)
            .then(res => res.json())
            .then((data: string[]) => {
                // if we got back more than 8 items, there is a next page
                if (data.length > coursesPerPage) {
                // drop secret ninth item and only render the first 0-8
                    setHasNextPage(true);
                    setCourses(data.slice(0, coursesPerPage));
                } else {
                    setHasNextPage(false);
                    setCourses(data);
                }
            })
            .catch(err => console.error("Failed to fetch courses:", err));
    }, [name, curPage, queryParams]);

    useEffect(() => {
        setCurPage(0);
    }, [queryParams]);

    if (name === undefined) {
        return (
            <div>
                Please specify an author
            </div>
        );
    }

    return (
        <div className="author-page">
            <span className="author-title">
                <AuthorAvatar author={name} />
                <GlassPanel
                    as="div"
                    className="author-glass-panel"
                    style={{
                        padding: '20px 30px',
                        display: 'block',
                        width: 'fit-content'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '20px'
                    }}>
                        <h1 style={{ margin: 0, lineHeight: 1 }}>{name}</h1>

                        <a href={`https://github.com/${name}`} style={{ display: 'flex' }}>
                            <img
                                className="gh-logo"
                                src="/GitHub_Invertocat_Black.png"
                                style={{ height: '2.2rem', width: 'auto' }}
                            />
                        </a>
                    </div>
                </GlassPanel>
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
                onPrev={() => setCurPage(prev => Math.max(0, prev - 1))}
                onNext={() => setCurPage(prev => prev + 1)}
                disablePrev={curPage === 0}
                disableNext={!hasNextPage}
            />
        </div>
    );
};

export default Author;