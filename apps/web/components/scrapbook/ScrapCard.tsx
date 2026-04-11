"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ScrapCardProps {
    rotation?: number;
    width?: number;
    height?: number;
    className?: string;
    delay?: number;
    onClick?: () => void;
    content?: React.ReactNode;
    href?: string;
}

export function ScrapCard({
    rotation = 0,
    width = 600,
    height = 400,
    className = "",
    delay = 0,
    onClick,
    content,
    href
}: ScrapCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (href) {
            router.push(href);
        } else {
            onClick?.();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotate: rotation }}
            whileInView={{ opacity: 1, y: 0, rotate: rotation }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{
                rotate: 0,
                scale: 1.05,
                zIndex: 50,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`interactive relative bg-[#F9F6F0] rounded-sm shadow-xl shadow-black/20 ring-1 ring-black/5 origin-center overflow-hidden ${className}`}
            style={{ width, height }}
        >
            {/* Tape effect on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/30 backdrop-blur-sm -rotate-2 mix-blend-overlay shadow-sm z-10" />

            {/* Content area */}
            <div className="flex flex-col justify-center w-full h-full text-left">
                {content || (
                    <div className="flex items-center justify-center w-full h-full text-gray-400 text-lg font-medium">
                        Content Area
                    </div>
                )}
            </div>


        </motion.div>
    );
}
