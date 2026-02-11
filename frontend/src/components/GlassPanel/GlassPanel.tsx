import React from "react";

type GlassPanelProps<T extends React.ElementType = "section"> = {
  as?: T;
  className?: string;
  noise?: boolean;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function GlassPanel<T extends React.ElementType = "section">({
  as,
  className = "",
  noise = true,
  children,
  ...props
}: GlassPanelProps<T>) {
  const Tag = (as ?? "section") as React.ElementType;

  return (
    <Tag className={`glass ${className}`.trim()} {...props}>
      {noise && <span className="glass-noise" aria-hidden="true" />}
      <div className="glass-content-container">
        <div className="glass-content">{children}</div>
      </div>
      
    </Tag>
  );
}
