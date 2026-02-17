import { useState } from "react";
import GlassPanel from "../../components/GlassPanel/GlassPanel";
import "./AboutUs.css";
import { AuthorData, CORE_MAINTAINERS } from "./Maintainers";


const AboutUs = () => {
    const [selectedAuthor, setSelectedAuthor] = useState<AuthorData>(CORE_MAINTAINERS[0]);

    return (
        <div className="about-us-wrapper">
            <GlassPanel as="header" className="about-header">
                <h1>About OSEDA</h1>
                {/* re-using bio div */}
                <hr className="bio-divider"></hr>
                <p>
                    OSEDA is a comprehensive <a href="https://github.com/oseda-dev/" target="_blank">open-source</a> platform for creating, distributing, and hosting educational presentations.
                    It includes a powerful
                    <a href="https://github.com/oseda-dev/oseda-cli" target="_blank">CLI</a>
                    for bootstrapping, running, and testing
                    <a href="https://revealjs.com/" target="_blank">Reveal.js</a>
                    presentations, as well as a simple deploy command that publishes your course to <a href="https://oseda.net">oseda.net</a> automatically via
                    <a href="https://github.com/oseda-dev/oseda-lib" target="_blank">GitHub</a>.
                    Once approved by our team, your course is automatically deployed publicly, and you are given a dedicated author page on <a href="https://oseda.net">oseda.net</a>.
                </p>

            </GlassPanel>

            <div className="about-content-grid">
                <div className="authors-selection-row">
                    {CORE_MAINTAINERS.map((author) => (
                        <div
                            key={author.id}
                            // conditional active author just has a conditional grayscale 40%
                            className={`glass avatarContainer author-clickable ${selectedAuthor.id === author.id ? 'active-author' : ''}`}
                            onClick={() => setSelectedAuthor(author)}
                        >
                            {/* this should really be the avatar component, but it has default click behavior, so doing this instead */}
                            <img src={author.avatar} alt={author.name} className="avatar" />
                        </div>
                    ))}
                </div>

                <GlassPanel as="article" className="bio-display-panel">
                    <div className="bio-inner">
                        <h2 className="bio-name">{selectedAuthor.name}</h2>
                        <hr className="bio-divider" />
                        <p className="bio-text">{selectedAuthor.bio}</p>
                    </div>
                </GlassPanel>
            </div>
        </div>
    );
};

export default AboutUs;