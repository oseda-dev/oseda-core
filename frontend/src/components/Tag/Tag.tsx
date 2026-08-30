import React from 'react';
import GlassPanel from '../GlassPanel/GlassPanel';
import "./Tag.css";
import { useLocation, useNavigate } from 'react-router-dom';


// random colors for now
export const tagToColor = {
    "aerospace": "#4f8cff",
    "business": "#2ecc71",
    "computerscience": "#9b59b6",
    "economics": "#f1c40f",
    "education": "#1abc9c",
    "engineering": "#e67e22",
    "geography": "#27ae60",
    "healthmedicine": "#e74c3c",
    "history": "#8e44ad",
    "languagearts": "#3498db",
    "liberalarts": "#95a5a6",
    "mathematics": "#16a085",
    "politics": "#c0392b",
    "psychology": "#ff6f91",
    "science": "#2980b9",
} as const;


export type TagName = keyof typeof tagToColor

export interface TagProps {
    tagName: string;    
}

// it deeply saddens me that JS has not std. library way of handling this
function stringToIndex(str: string, arrayLength: number) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 7) - hash + str.charCodeAt(i);
    }
    
    return (hash >>> 0) % arrayLength;
}

const Tag: React.FC<TagProps> = ({ tagName }: TagProps) => {
    const normalizedTagName = tagName.toLowerCase() as TagName

    let color: string;
    if(normalizedTagName in tagToColor){
        color = tagToColor[normalizedTagName];
    }
    else {
        const idx = stringToIndex(normalizedTagName, Object.keys(tagToColor).length);
        
        color = tagToColor[Object.keys(tagToColor)[idx] as TagName];

        console.log("Tag " + normalizedTagName+ " not pre-defined, using: " + color);
        console.log("Index computer: " + idx);
    }
    
    
    const navigate = useNavigate();
    const location = useLocation();

    const onTagClick = (e: React.MouseEvent) => {

        e.stopPropagation();

        const params = new URLSearchParams(location.search);

        if (params.getAll("tag").includes(tagName)) {
            return;
        }

        params.append("tag", tagName);

        navigate({
            pathname: location.pathname,
            search: params.toString(),
        });

    };

    return (
        <GlassPanel
            as="p"
            className="tag"
            style={{ backgroundColor: color }}
            onClick={onTagClick}
        >
            {tagName}
        </GlassPanel>
    )
};

export default Tag;

