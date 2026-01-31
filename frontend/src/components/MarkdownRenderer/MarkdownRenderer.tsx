import React from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";


interface RendererProps {
    markdown: string
}

const MarkdownRenderer: React.FC<RendererProps> = ( { markdown }: RendererProps) => {
    
    return (
        <>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
            </ReactMarkdown>
        </>
    );
};

export default MarkdownRenderer;