import { ChangeEvent, FormEvent, KeyboardEventHandler, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import GlassPanel from "../GlassPanel/GlassPanel";
import "./AuthorSearcher.css";


const AuthorSearcher = () => {
    const nav = useNavigate();
    const [author, setAuthor] = useState<string>("");

    const typedInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAuthor(event.target.value);
    }

    const goToAuthorPage = () => {
        if (author.length >= 0) {
            nav(`/author/${author}`);
        }
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            goToAuthorPage();
        }
    };

    return (
        <GlassPanel as="main" className="author-searcher">
            <input
                className="glass"
                type="text"
                value={author}
                placeholder="Go to author..."
                onChange={typedInputHandler}
                onKeyDown={handleKeyDown}
            />
            <button
                className="glass"
                onClick={goToAuthorPage}
            >
                →
            </button>
        </GlassPanel>
    );
};

export default AuthorSearcher;
