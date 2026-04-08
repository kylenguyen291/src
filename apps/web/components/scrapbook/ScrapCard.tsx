"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Page, Document } from "react-pdf";

interface ScrapCardProps {
    pageNumber: number;
    rotation?: number;
    width?: number;
    className?: string;
    delay?: number;
}

export function ScrapCard({ pageNumber, rotation = 0, width = 600, className = "", delay = 0 }: ScrapCardProps) {
    const [isHovered, setIsHovered] = useState(false);

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
            className={`interactive relative bg-[#F9F6F0] p-4 rounded-sm shadow-xl shadow-black/20 ring-1 ring-black/5 origin-center ${className}`}
            style={{ width }}
        >
            {/* Tape effect on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/30 backdrop-blur-sm -rotate-2 mix-blend-overlay shadow-sm z-10" />

            <div className="overflow-hidden w-full h-full pointer-events-none mix-blend-multiply opacity-90">
                <Document file="/pdf/presentation.pdf" loading={null}>
                    <Page
                        pageNumber={pageNumber}
                        width={width - 32} // accounting for padding
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                </Document>
            </div>
        </motion.div>
    );
}
