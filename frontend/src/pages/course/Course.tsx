import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Course.css"

const Course = () => {
    const { title } = useParams<{ title: string }>();

    if (!title) return <div>No course selected</div>;

    const src = `/api/courses/${encodeURIComponent(
        title
    )}/index.html`;
    return (
        <>
            <h1>{title}</h1>
            <iframe
                className="courseFrame"
                src={src}
                title={title}
                allow="fullscreen"
            />

        </>
    );
};

export default Course;
