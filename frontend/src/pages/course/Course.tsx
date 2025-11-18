import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Course = () => {
    const { title } = useParams<{ title: string }>();

    if (!title) return <div>No course selected</div>;

    const src = `/api/courses/${encodeURIComponent(
        title
    )}/index.html`;

    return (
        <iframe
            src={src}
            style={{ width: "100%", height: "80vh", border: "none" }}
            title={title}
        />
    );
};

export default Course;
