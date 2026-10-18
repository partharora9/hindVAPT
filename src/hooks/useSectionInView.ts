"use client";

import { useState, useEffect, type RefObject } from "react";

export function useSectionInView(
  targetRef: RefObject<HTMLElement | null>,
  rootMargin = "200px 0px 200px 0px"
): boolean {
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = targetRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetRef, rootMargin]);

  return isInView;
}
