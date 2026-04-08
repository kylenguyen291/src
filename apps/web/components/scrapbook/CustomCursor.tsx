"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Smooth springs for cursor movement
    const springX = useSpring(0, { stiffness: 500, damping: 28 });
    const springY = useSpring(0, { stiffness: 500, damping: 28 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            springX.set(e.clientX);
            springY.set(e.clientY);
        };

        const updateHoverState = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // If hovering over a link, button, or our interactive cards
            if (
                target.closest("a") ||
                target.closest("button") ||
                target.closest(".interactive")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", updateHoverState);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", updateHoverState);
        };
    }, [springX, springY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[#C54B3E] pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center text-[10px] font-bold text-white whitespace-nowrap overflow-hidden"
            style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
            }}
            animate={{
                scale: isHovering ? 4 : 1,
                opacity: 0.8,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {isHovering && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    VIEW
                </motion.span>
            )}
        </motion.div>
    );
}
