"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    const fastX = useSpring(0, { stiffness: 600, damping: 30 });
    const fastY = useSpring(0, { stiffness: 600, damping: 30 });
    const slowX = useSpring(0, { stiffness: 120, damping: 22 });
    const slowY = useSpring(0, { stiffness: 120, damping: 22 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            fastX.set(e.clientX);
            fastY.set(e.clientY);
            slowX.set(e.clientX);
            slowY.set(e.clientY);
        };

        const onOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            setIsHovering(
                !!(target.closest("a") || target.closest("button") || target.closest(".interactive"))
            );
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseover", onOver);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
        };
    }, [fastX, fastY, slowX, slowY]);

    return (
        <>
            {/* Outer diffuse glow */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
                style={{
                    x: slowX,
                    y: slowY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: 120,
                    height: 120,
                    background: "radial-gradient(circle, rgba(14,86,250,0.18) 0%, transparent 70%)",
                }}
            />

            {/* VIEW ring — expands on hover */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[#0E56FA]/60 flex items-center justify-center"
                style={{ x: slowX, y: slowY, translateX: "-50%", translateY: "-50%" }}
                animate={{
                    width: isHovering ? 80 : 28,
                    height: isHovering ? 80 : 28,
                    opacity: isHovering ? 1 : 0.5,
                    backgroundColor: isHovering ? "rgba(14,86,250,0.12)" : "transparent",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
                <motion.span
                    className="font-mono font-bold tracking-[0.25em] text-[#0E56FA] select-none"
                    style={{ fontSize: "0.6rem" }}
                    animate={{ opacity: isHovering ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                >
                    VIEW
                </motion.span>
            </motion.div>

            {/* Inner sharp dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#0E56FA]"
                style={{
                    x: fastX,
                    y: fastY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: 6,
                    height: 6,
                    boxShadow: "0 0 8px rgba(14,86,250,0.8)",
                }}
                animate={{ scale: isHovering ? 0 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
        </>
    );
}
