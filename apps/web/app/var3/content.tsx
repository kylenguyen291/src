"use client";

import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Maximize2, Minimize2, Play, Pause, ChevronLeft, ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export default function Variant3Page() {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [direction, setDirection] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-play feature
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setPageNumber((prev) => {
                    if (numPages && prev >= numPages) {
                        setIsPlaying(false);
                        return prev;
                    }
                    setDirection(1);
                    return prev + 1;
                });
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, numPages]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();
            if (e.key === "ArrowRight" || e.key === " ") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "Escape" && isFullscreen) toggleFullscreen();
            if (e.key === "f") toggleFullscreen();

            // Show controls on keypress
            handleUserActivity();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [pageNumber, numPages, isFullscreen]);

    // Mouse activity hiding
    const handleUserActivity = () => {
        setShowControls(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    };

    useEffect(() => {
        handleUserActivity();
        return () => {
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        };
    }, []);

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

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div
            className="flex flex-col h-svh w-screen bg-black text-white overflow-hidden cursor-none"
            ref={containerRef}
            onMouseMove={() => handleUserActivity()}
            onClick={() => handleUserActivity()}
        >
            <Document
                file="/pdf/Project%201.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-500">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <p className="text-sm font-medium tracking-wider uppercase">Initializing Keynote...</p>
                    </div>
                }
                className="flex flex-col h-full w-full relative"
            >
                {numPages && (
                    <main className="flex-1 relative flex items-center justify-center bg-black overflow-hidden">
                        {/* Slide container */}
                        <div className={`relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${showControls ? '' : 'cursor-none'} scale-100`}>
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.div
                                    key={pageNumber}
                                    custom={direction}
                                    initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
                                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                                    exit={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <Page
                                        pageNumber={pageNumber}
                                        height={containerRef.current ? containerRef.current.clientHeight : 800}
                                        className="flex justify-center items-center w-full h-full max-h-screen object-contain drop-shadow-2xl"
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Floating Top Progress Bar */}
                        <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: showControls ? 0 : -10, opacity: showControls ? 1 : 0 }}
                            className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50 backdrop-blur-md"
                        >
                            <div
                                className="h-full bg-white transition-all duration-300"
                                style={{ width: `${(pageNumber / numPages) * 100}%` }}
                            />
                        </motion.div>

                        {/* Floating Control Pill */}
                        <AnimatePresence>
                            {showControls && (
                                <motion.div
                                    initial={{ y: 50, opacity: 0, scale: 0.9 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    exit={{ y: 50, opacity: 0, scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] cursor-auto"
                                >
                                    <Button variant="ghost" size="icon" asChild className="rounded-full text-zinc-300 hover:bg-white/20 hover:text-white transition-all">
                                        <Link href="/" title="Back to Home"><Home className="w-4 h-4" /></Link>
                                    </Button>
                                    <div className="w-px h-6 bg-white/20 mx-1" />

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={prevSlide}
                                        disabled={pageNumber <= 1}
                                        className="rounded-full text-zinc-300 hover:bg-white/20 hover:text-white disabled:opacity-30 transition-all"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </Button>

                                    <div className="flex items-center justify-center w-16 px-2 text-xs font-medium font-mono tracking-widest text-white select-none">
                                        {pageNumber} <span className="text-white/40 mx-1">/</span> {numPages}
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={nextSlide}
                                        disabled={pageNumber >= numPages}
                                        className="rounded-full text-zinc-300 hover:bg-white/20 hover:text-white disabled:opacity-30 transition-all"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </Button>

                                    <div className="w-px h-6 bg-white/20 mx-1" />

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className={`rounded-full transition-all ${isPlaying ? 'bg-primary text-primary-foreground hover:bg-primary/80' : 'text-zinc-300 hover:bg-white/20 hover:text-white'}`}
                                        title={isPlaying ? "Pause Auto-play" : "Start Auto-play (5s)"}
                                    >
                                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={toggleFullscreen}
                                        className="rounded-full text-zinc-300 hover:bg-white/20 hover:text-white transition-all"
                                        title={isFullscreen ? "Exit Fullscreen (f)" : "Enter Fullscreen (f)"}
                                    >
                                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </main>
                )}
            </Document>
        </div>
    );
}
