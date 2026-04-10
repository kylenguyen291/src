"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ScrapCardProps {
    rotation?: number;
    width?: number;
    height?: number;
    className?: string;
    delay?: number;
    onClick?: () => void;
}

export function ScrapCard({ 
    rotation = 0, 
    width = 600, 
    height = 400, 
    className = "", 
    delay = 0,
    onClick 
}: ScrapCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick?.();
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
            className={`interactive relative bg-[#F9F6F0] p-8 rounded-sm shadow-xl shadow-black/20 ring-1 ring-black/5 origin-center flex items-center justify-center ${className}`}
            style={{ width, height }}
        >
            {/* Tape effect on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/30 backdrop-blur-sm -rotate-2 mix-blend-overlay shadow-sm z-10" />

            {/* Placeholder content area */}
            <div className="flex items-center justify-center w-full h-full text-gray-400 text-lg font-medium">
                Content Area
            </div>

            {/* Find out more button */}
            <motion.button
                onClick={handleClick}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                    opacity: isHovered ? 1 : 0.8, 
                    y: isHovered ? 0 : 20,
                    scale: isHovered ? 1.05 : 1
                }}
                whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
            >
                Find out more here
            </motion.button>
        </motion.div>
    );
}
