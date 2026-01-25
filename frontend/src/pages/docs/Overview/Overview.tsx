import { useEffect, useState } from "react";
import "../Docs.css"

const OverviewDoc = () => {

    const [content, setContent] = useState("");

    useEffect(() => {
        fetch("/api/docs/README.md")
            // comes back as raw text
            .then(res => res.text())
            .then(text => {
                setContent(text);
                console.log(text);
            })
            .catch(err => {
                console.error(err)
            })
    }, [])


    return (
        <div>
            <h1>Overview</h1>
            <p>OSEDA documentation overview.</p>
        </div>
    )
}

export default OverviewDoc
