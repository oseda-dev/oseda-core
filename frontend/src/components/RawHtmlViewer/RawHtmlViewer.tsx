import React, { useEffect, useRef } from "react";

interface RawHtmlViewerProps {
  htmlContent: string;
}

const RawHtmlViewer: React.FC<RawHtmlViewerProps> = ({ htmlContent }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.srcdoc = htmlContent;
    }
  }, [htmlContent]);

  return (
    <iframe
      ref={iframeRef}
      style={{ width: "100%", height: "100%", border: "none", position: "fixed", top: "0", bottom: "0", right: "0", left: "0" }}
      title="Raw HTML Viewer"
    />
  );
};

export default RawHtmlViewer;
