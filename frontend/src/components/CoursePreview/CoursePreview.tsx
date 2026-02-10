import { useNavigate } from "react-router-dom";
import NavButton from "../NavButton/NavButton";
import "./CoursePreview.css";
import { useEffect, useState } from "react";
import Tag, { tagToColor } from "../Tag/Tag";
import GlassPanel from "../GlassPanel/GlassPanel";
import { OsedaConfig } from "../..";


interface CoursePreviewProps {
    title: string;
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
        <GlassPanel as="div" className="course-preview card" onClick={() => {navigate(`/courses/${title}`)}}>
            <div className="course-preview-header" style={{background: config.color}}>
                <h1>{config.title}</h1>
                <h2 className="author">{config.author}</h2>
            </div>
            
            <div className="tags">
                {config.tags.map((tagName, idx) => (
                    <Tag tagName={
                        tagName                    
                    }
                    key={idx} />
                ))}
            </div>
            <div className="course-description">
                <h2>Course Description:</h2>
                <p>{config.description}</p>
            </div>
        </GlassPanel>
    );
};

export default CoursePreview;
