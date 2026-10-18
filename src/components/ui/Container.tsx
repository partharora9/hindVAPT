import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className = "",
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`w-full max-w-[1600px] mx-auto px-[clamp(16px,4vw,52px)] min-w-0 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
