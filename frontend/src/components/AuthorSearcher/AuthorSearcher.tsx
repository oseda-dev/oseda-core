import { ChangeEvent, FormEvent, KeyboardEventHandler, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";



const AuthorSearcher = () => {
    const nav = useNavigate();
    const [author, setAuthor] = useState<string>("");

    const typedInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAuthor(event.target.value);
    }

    const goToAuthorPage = () => {
        if(author.length >= 0){
            nav(`/author/${author}`);
        }
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            goToAuthorPage();
        }
    };

    return (
            <span className="glass nav-button">

                <input
                    className="glass"
                    type="text"
                    onChange={typedInputHandler}
                    value={author}
                    placeholder="Go to author..."
                    onKeyDown={handleKeyDown}

                ></input>
                <button
                    className="glass"
                    onClick={(e: any) =>{
                        goToAuthorPage()
                    }}
                > → </button>
            </span>
    );
};

export default AuthorSearcher;