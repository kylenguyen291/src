"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!glowRef.current) return;
            glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    return (
        <div
            ref={glowRef}
            className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none z-[5] rounded-full"
            style={{
                background: "radial-gradient(circle, rgba(197,75,62,0.13) 0%, rgba(197,75,62,0.05) 40%, transparent 70%)",
                willChange: "transform",
                transition: "transform 0.08s linear",
            }}
        />
    );
}
