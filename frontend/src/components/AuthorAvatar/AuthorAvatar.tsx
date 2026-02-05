import { useEffect, useState } from "react";
import "./AuthorAvatar.css"

interface AuthorAvatarProps {
    author: string
}


const AuthorAvatar = ({ author }: AuthorAvatarProps) => {

    const [avatarURL, setAvatarURL] = useState<string>("");

    useEffect(() => {
        fetch(`/api/author/${author}/avatar`)
            .then(res => res.json())
            .then((data: string) => setAvatarURL(data))
            .catch(err => console.log("Failed to fetch author avatar url"));
    }, [])

    return (
        <div className="glass avatarContainer">
           <img src={avatarURL} className="avatar" />
        </div>
           );
}


export default AuthorAvatar;
