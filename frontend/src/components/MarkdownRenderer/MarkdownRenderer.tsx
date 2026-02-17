import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface RendererProps {
    markdown: string
}

const MarkdownRenderer: React.FC<RendererProps> = ({ markdown }) => {
    return (
        <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
        >
            {markdown}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;