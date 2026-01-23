import React from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface RendererProps {
    markdown: string;
}

const MarkdownRender: React.FC = () => {

    const temp = `A paragraph with *emphasis* and **strong importance**.

    > A block quote with ~strikethrough~ and a URL: https://reactjs.org.

    * Lists
    * [ ] todo
    * [x] done

    A table:

    | a | b |
    | - | - |
    `

    return (
        <Markdown remarkPlugins={[remarkGfm]}>{temp}</Markdown>    
    );
};

export default MarkdownRender;