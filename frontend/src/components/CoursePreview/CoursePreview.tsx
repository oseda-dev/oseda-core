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
    category: string[];
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
        <div className="course-preview card">
            <h1>{config.title}</h1>
            <h2 className="author">{config.author}</h2>
            <div className="categories">
                {config.category.map((txt, idx) => (
                    <p key={idx} className="category">{txt}</p>
                ))}
            </div>
            <div>{config.color}</div>

            <NavButton
                text="Go To Course"
                url={`/courses/${title}`}
            />
        </div>
    );
};

export default CoursePreview;
