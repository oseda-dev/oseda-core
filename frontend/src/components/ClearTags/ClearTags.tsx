import React from 'react';
import GlassPanel from '../GlassPanel/GlassPanel';

const ClearTags: React.FC = ({ }) => {

    const clearTags = () =>{

        const url = new URL(window.location.href);
        url.search = "";
        
        // this potentially causes some issues with the back button.
        window.history.replaceState({}, document.title, url.toString());
        window.location.href = url.toString();
    }

    return (
        <GlassPanel as='button' onClick={clearTags}>
            Clear Tags
        </GlassPanel>
    );
};

export default ClearTags;