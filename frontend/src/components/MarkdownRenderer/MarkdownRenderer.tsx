import React from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";


// interface RendererProps {
//     markdown: string
// }

const MarkdownRenderer: React.FC = ( ) => {
    

    const content = `
# gfm test

this is **bold**, *italic*, ~~strikethrough~~, and \`inline code\`.

## task list
- [x] done item
- [ ] not done item

## table
| name | value | note |
|------|-------|------|
| foo  | 123   | ok   |
| bar  | 456   | yes  |

## blockquote
> this is a quote  
> with multiple lines

## code block
\`\`\`js
const x = 42
console.log(x)
\`\`\`

## link and image
[github](https://github.com)

![alt text](https://placehold.co/300x100)

## list
1. first
2. second
- nested
- items
`;
    
    return (
        <>
            <h1>Markdown Renderer</h1>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </>
    );
};

export default MarkdownRenderer;