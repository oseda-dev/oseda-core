import { useEffect, useState } from "react";

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
        <img src={avatarURL} className="circular-image" />
    );
}


export default AuthorAvatar;