import { useParams } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useRef, useEffect, useState } from "react";
import "./Course.css";
import GlassPanel from "../../components/GlassPanel/GlassPanel";
import { OsedaConfig } from "../..";

const Course = () => {
    const { title } = useParams<{ title: string }>();
    const handle = useFullScreenHandle();
    const iframeRef = useRef<HTMLIFrameElement>(null);


    const [config, setConfig] = useState<OsedaConfig | null>(null);
    const [isLoadingConfig, setIsLoadingConfig] = useState(true);
    const [isPresentationLoaded, setIsPresentationLoaded] = useState(false);


    const handleIframeLoad = () => {
        setIsPresentationLoaded(true);
    };

    useEffect(() => {
        // only fetch if title is passed, TS needs title to be defined
        if (!title) return;

        setIsLoadingConfig(true);

        fetch(`/api/info?title=${encodeURIComponent(title)}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch course info");
                return res.json();
            })
            .then((data: OsedaConfig) =>{
                setConfig(data);
                setIsLoadingConfig(false);
            })

            .catch(err => console.error(err));
    }, [title]);
    

    // set the inner frame to have active focus
    // want to be able to tab around without an additional click
    useEffect(() => {
        if (handle.active) {
            iframeRef.current?.focus();
        }
    }, [handle.active]);

    // all hooks must run before content returns sadly
    if (!title) return <div>No course selected</div>;

    const src = `/api/courses/${encodeURIComponent(title)}/index.html`;

    return (
        <GlassPanel as="div" className="course-container">
            <header className="course-header">
                <h1>{title}</h1>
                <GlassPanel as="button" className="fullscreen-btn" onClick={handle.enter}>
                    {/* cool fullscreen character :) */}
                    ⛶ View Fullscreen
                </GlassPanel>
            </header>

            <FullScreen handle={handle} className="video-wrapper">
                {!isPresentationLoaded && <p>Loading OSEDA presentation...</p>}
                <iframe
                    // keep track on when to render loading...
                    onLoad={handleIframeLoad}
                    ref={iframeRef}
                    className="course-iframe"
                    src={src}
                    title={title}
                    allow="fullscreen"
                    tabIndex={0}
                />
            </FullScreen>

            <div className="course-description">
                {isLoadingConfig ? (
                    <p className="loading-text">Loading course details...</p>
                ) : (
                    <p>{config?.description}</p>
                )}
            </div>
        </GlassPanel>
    );
};

export default Course;