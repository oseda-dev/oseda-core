import { useNavigate } from "react-router-dom";
import NavButton from "../NavButton/NavButton";
import "./CoursePreview.css";
import { useEffect, useState } from "react";

interface CoursePreviewProps {
    title: string;
}

interface OsedaConfig {
    title: string;
    author: string;
    tags: string[];
    last_updated: string;
    color: string;
}

const CoursePreview = ({ title }: CoursePreviewProps) => {
    const [config, setConfig] = useState<OsedaConfig | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/info?title=${encodeURIComponent(title)}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch course info");
                return res.json();
            })
            .then((data: OsedaConfig) => setConfig(data))
            .catch(err => console.error(err));
    }, [title]);

    if (!config) return <div>Loading...</div>;

    return (
        <div className="course-preview card" onClick={() => {navigate(`/courses/${title}`)}}>
            <div className="course-preview-header" style={{background: config.color}}>
                <h1>{config.title}</h1>
                <h2 className="author">{config.author}</h2>
            </div>
            
            <div className="tags">
                {config.tags.map((txt, idx) => (
                    <p key={idx} className="tag">{txt}</p>
                ))}
            </div>
            <div>
                <h2>Course Description:</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    );
};

export default CoursePreview;
