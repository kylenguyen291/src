"use client";

import { motion } from "framer-motion";

interface LiveSVGProps {
    paths: string[];
    width?: string | number;
    height?: string | number;
    viewBox?: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export function LiveSVG({
    paths,
    width = "100%",
    height = "100%",
    viewBox = "0 0 100 100",
    className = "",
    delay = 0,
    duration = 1.5
}: LiveSVGProps) {
    return (
        <motion.svg
            width={width}
            height={height}
            viewBox={viewBox}
            className={`absolute pointer-events-none stroke-[#C54B3E] fill-none stroke-[3] overflow-visible ${className}`}
            style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
        >
            {paths.map((d, i) => (
                <motion.path
                    key={i}
                    d={d}
                    variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: {
                            pathLength: 1,
                            opacity: 1,
                            transition: {
                                pathLength: { delay: delay + (i * 0.2), type: "spring", duration, bounce: 0 },
                                opacity: { delay: delay + (i * 0.2), duration: 0.1 }
                            }
                        }
                    }}
                />
            ))}
        </motion.svg>
    );
}
