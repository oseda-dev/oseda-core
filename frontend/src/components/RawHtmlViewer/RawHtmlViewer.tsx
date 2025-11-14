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
      style={{ width: "100%", height: "100%", border: "none" }}
      title="Raw HTML Viewer"
    />
  );
};

export default RawHtmlViewer;
