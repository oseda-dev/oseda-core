import React from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";


interface RendererProps {
    markdown: string
}

const MarkdownRenderer: React.FC<RendererProps> = ( { markdown }: RendererProps) => {
    

//     const content = `
// # gfm test

// this is **bold**, *italic*, ~~strikethrough~~, and \`inline code\`.

// ## task list
// - [x] done item
// - [ ] not done item

// ## table
// | name | value | note |
// |------|-------|------|
// | foo  | 123   | ok   |
// | bar  | 456   | yes  |

// ## blockquote
// > this is a quote  
// > with multiple lines

// ## code block
// \`\`\`js
// const x = 42
// console.log(x)
// \`\`\`

// ## link and image
// [github](https://github.com)

// ![alt text](https://placehold.co/300x100)

// ## list
// 1. first
// 2. second
// - nested
// - items
// `;
    
    return (
        <>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
            </ReactMarkdown>
        </>
    );
};

export default MarkdownRenderer;