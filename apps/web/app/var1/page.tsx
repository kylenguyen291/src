"use client";

import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Home, Loader2, Maximize2, Minimize2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export default function Variant1Page() {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [direction, setDirection] = useState<number>(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [pageNumber, numPages]);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const nextSlide = () => {
        if (!numPages || pageNumber >= numPages) return;
        setDirection(1);
        setPageNumber((prev) => prev + 1);
    };

    const prevSlide = () => {
        if (pageNumber <= 1) return;
        setDirection(-1);
        setPageNumber((prev) => prev - 1);
    };

    const jumpToSlide = (idx: number) => {
        if (idx === pageNumber) return;
        setDirection(idx > pageNumber ? 1 : -1);
        setPageNumber(idx);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
            rotateY: direction > 0 ? 10 : -10,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
            rotateY: direction < 0 ? 10 : -10,
        }),
    };

    return (
        <div className="flex flex-col h-svh w-screen bg-zinc-950 text-white overflow-hidden selection:bg-primary/30" ref={containerRef}>
            <Document
                file="/pdf/presentation.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-400">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <p className="text-sm font-medium tracking-wider uppercase">Loading Presentation...</p>
                    </div>
                }
                className="flex flex-col h-full w-full"
            >
                {/* Top Nav */}
                <motion.nav
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between p-4 md:px-8 border-b border-white/10 glassmorphism z-50 bg-black/40 backdrop-blur-xl shrink-0"
                >
                    <div className="flex items-center gap-4">
                        {!isFullscreen && (
                            <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-white/10 text-zinc-300">
                                <Link href="/"><Home className="w-4 h-4" /></Link>
                            </Button>
                        )}
                        <div>
                            <h1 className="text-sm font-semibold tracking-wide text-zinc-100">SQL Final Presentation</h1>
                            <p className="text-xs text-zinc-500">Variant 1: Interactive Carousel</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono px-3 py-1 bg-white/5 rounded-full border border-white/10 text-zinc-300">
                            {pageNumber} / {numPages || "..."}
                        </span>
                        <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="hidden sm:flex bg-white/5 border-white/10 hover:bg-white/10 text-zinc-200 rounded-full">
                            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </Button>
                    </div>
                </motion.nav>

                {/* Main Viewer Area */}
                {numPages && (
                    <main className="flex-1 relative flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black p-4 sm:p-8 overflow-hidden">
                        <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center perspective-[2000px]">
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.div
                                    key={pageNumber}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 },
                                        rotateY: { duration: 0.4 }
                                    }}
                                    className="absolute inset-0 shadow-2xl shadow-black/50 rounded-xl overflow-hidden ring-1 ring-white/10 bg-white flex items-center justify-center"
                                >
                                    <Page
                                        pageNumber={pageNumber}
                                        width={containerRef.current ? Math.min(containerRef.current.clientWidth - 64, 1200) : 800}
                                        className="flex justify-center items-center w-full h-full"
                                        renderTextLayer={true}
                                        renderAnnotationLayer={true}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="absolute inset-y-0 left-4 sm:left-8 flex items-center z-10 pointer-events-none">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={prevSlide}
                                disabled={pageNumber <= 1}
                                className="w-12 h-12 rounded-full pointer-events-auto bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all disabled:opacity-30 disabled:hover:scale-100"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </Button>
                        </div>
                        <div className="absolute inset-y-0 right-4 sm:right-8 flex items-center z-10 pointer-events-none">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={nextSlide}
                                disabled={pageNumber >= (numPages || 1)}
                                className="w-12 h-12 rounded-full pointer-events-auto bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all disabled:opacity-30 disabled:hover:scale-100"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </Button>
                        </div>
                    </main>
                )}

                {/* Thumbnail Strip */}
                {numPages && (
                    <footer className="h-28 sm:h-36 border-t border-white/10 bg-black/60 backdrop-blur-xl shrink-0 overflow-x-auto overflow-y-hidden custom-scrollbar">
                        <div className="flex items-center gap-3 p-4 h-full min-w-max px-8">
                            {Array.from(new Array(numPages), (el, index) => (
                                <button
                                    key={`thumb_${index + 1}`}
                                    onClick={() => jumpToSlide(index + 1)}
                                    className={`relative h-full aspect-video rounded-md overflow-hidden transition-all duration-300 shrink-0 border-2 bg-white flex items-center justify-center
                    ${pageNumber === index + 1
                                            ? 'border-primary ring-2 ring-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.5)] scale-105 z-10'
                                            : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'
                                        }
                  `}
                                >
                                    <Page
                                        pageNumber={index + 1}
                                        height={100}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        className="w-full h-full object-cover pointer-events-none"
                                    />
                                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-white backdrop-blur-sm pointer-events-none">
                                        {index + 1}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </footer>
                )}
            </Document>
        </div>
    );
}
