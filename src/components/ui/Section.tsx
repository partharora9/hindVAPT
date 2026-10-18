import React, { forwardRef } from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
  contentVisibilityAuto?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      ariaLabel,
      children,
      className = "",
      contentVisibilityAuto = true,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        aria-label={ariaLabel}
        className={`relative w-full overflow-x-clip ${
          contentVisibilityAuto ? "content-auto" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";
