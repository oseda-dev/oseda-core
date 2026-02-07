import React from 'react';
import GlassPanel from '../GlassPanel/GlassPanel';

interface TagProps {
    tagName: string;
    key: number
}

const Tag: React.FC<TagProps> = ({ tagName, key }: TagProps) => {
    
    // <p key={idx} className="tag">{txt}</p>
    return (
        <GlassPanel as="p" className="author-searcher tag" key={key}  >
            {tagName}
        </GlassPanel>
    )
    
};

export default Tag;


// random colors for now
const tagToClors = {
    Aerospace: "#4f8cff",
    Business: "#2ecc71",
    ComputerScience: "#9b59b6",
    Economics: "#f1c40f",
    Education: "#1abc9c",
    Engineering: "#e67e22",
    Geography: "#27ae60",
    HealthMedicine: "#e74c3c",
    History: "#8e44ad",
    LanguageArts: "#3498db",
    LiberalArts: "#95a5a6",
    Mathematics: "#16a085",
    Politics: "#c0392b",
    Psychology: "#ff6f91",
    Science: "#2980b9",
}
