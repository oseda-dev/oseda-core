import "./Cargo.css"

const Cargo = () => {

    const title = "Oseda CLI Cargo Docs";
    const docsUrl = "https://docs.rs/oseda-cli/latest/oseda_cli/"; 

    return (
        <>
            <h1>{title}</h1>
            <iframe
                className="cargo-docs"
                title={title}
                src={docsUrl}
                >
            </iframe>
        </>
    )
}

export default Cargo
