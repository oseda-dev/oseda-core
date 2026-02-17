import { useEffect, useState } from "react";
import "../Docs.css"
import MarkdownRenderer from "../../../components/MarkdownRenderer/MarkdownRenderer";

const OverviewDoc = () => {

    const [content, setContent] = useState("");

    useEffect(() => {
        fetch("/api/docs/overview")
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
        <MarkdownRenderer markdown={content} />
    )
}

export default OverviewDoc
