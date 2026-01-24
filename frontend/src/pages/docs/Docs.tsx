import React from 'react';
import MarkdownRenderer from '../../components/MarkdownRenderer/MarkdownRenderer';


const Docs: React.FC = () => {


    return (
        
        <>
            <h1>OSEDA Docs</h1>
            <p>Documentation for OSEDA including course contribution guides, blog posts, and more.</p>
            <MarkdownRenderer markdown={"# Hello "} />
        </>
    );
};

export default Docs;