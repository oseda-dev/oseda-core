import { useParams } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useRef, useEffect } from "react";
import "./Course.css";

const Course = () => {
    const { title } = useParams<{ title: string }>();
    const handle = useFullScreenHandle();
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // this is a little silly
    // but it annoys me that the iframe loses focus and you have to click on it again
    
    useEffect(() => {
        if (handle.active) {
            iframeRef.current?.focus();
        }
    }, [handle.active]);

    // all hooks gotta run before this guard
    if (!title) return <div>No course selected</div>;

    const src = `/api/courses/${encodeURIComponent(title)}/index.html`;

    return (
        <>
            <h1>{title}</h1>

            <FullScreen handle={handle} className="courseFrame">
                <iframe
                    ref={iframeRef}
                    className="courseFrame"
                    src={src}
                    title={title}
                    allow="fullscreen"
                    tabIndex={0}
                    style={{ width: "100%", height: "100%" }}
                />
            </FullScreen>

            <button onClick={handle.enter}>Go Fullscreen</button>
        </>
    );
};

export default Course;
