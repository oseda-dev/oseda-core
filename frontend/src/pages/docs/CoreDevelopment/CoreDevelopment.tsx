import React, { useEffect, useState } from 'react';
import MarkdownRenderer from '../../../components/MarkdownRenderer/MarkdownRenderer';

const CoreDevelopment: React.FC = () => {
    
    const [content, setContent] = useState("");
    
        useEffect(() => {
            fetch("/api/docs/core/readme")
                // comes back as raw text
                .then(res => res.text())
                .then(text => {
                    setContent(text);
                    console.log(text);
                })
                .catch(err => {
                    console.error(err)
                })
        }, [])
    


    return (
        <MarkdownRenderer markdown={content}/>
    );
};

export default CoreDevelopment;