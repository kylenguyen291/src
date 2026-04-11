"use client";

import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { Loader2, ArrowDownCircle, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export default function Variant2Page() {
    const [numPages, setNumPages] = useState<number>();
    const [width, setWidth] = useState<number>(1000);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [activePage, setActivePage] = useState(1);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!numPages) return;
        const current = Math.max(1, Math.min(numPages, Math.floor(latest * numPages) + 1));
        if (current !== activePage) {
            setActivePage(current);
        }
    });

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth > 1200 ? 1000 : window.innerWidth - 64);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <div className="bg-zinc-50 dark:bg-zinc-950 min-h-svh text-zinc-900 dark:text-zinc-100 font-sans selection:bg-primary/20">

            {/* Sticky Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-primary/20 z-50 origin-left"
            >
                <motion.div
                    className="h-full bg-primary"
                    style={{ scaleX: smoothProgress }}
                />
            </motion.div>

            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 p-4 md:px-8 z-40 flex items-center justify-between pointer-events-none">
                <Button variant="outline" size="icon" asChild className="rounded-full bg-background/80 backdrop-blur-md pointer-events-auto border-border shadow-sm">
                    <Link href="/"><Home className="w-4 h-4" /></Link>
                </Button>
                <div className="bg-background/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-border shadow-sm text-sm font-medium pointer-events-auto">
                    Scrollytelling • Slide {activePage} of {numPages || "..."}
                </div>
            </nav>

            <Document
                file="/pdf/Project%201.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 text-zinc-500">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <p className="text-sm font-medium tracking-wider uppercase">Loading Story...</p>
                    </div>
                }
            >
                {numPages && (
                    <div ref={containerRef} className="relative w-full" style={{ height: `${numPages * 100}vh` }}>

                        {/* Sticky Viewer */}
                        <div className="sticky top-0 h-svh w-full flex items-center justify-center overflow-hidden bg-dot-black/[0.1] dark:bg-dot-white/[0.1]">
                            {/* Radial gradient mask for dots */}
                            <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />

                            <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center perspective-[1000px] z-10 px-4 md:px-0">
                                {Array.from(new Array(numPages), (el, index) => {
                                    const pageNum = index + 1;
                                    const isActive = activePage === pageNum;
                                    const isPrev = activePage > pageNum;

                                    return (
                                        <motion.div
                                            key={`slide_${pageNum}`}
                                            initial={false}
                                            animate={{
                                                opacity: isActive ? 1 : 0,
                                                y: isActive ? 0 : isPrev ? -100 : 100,
                                                scale: isActive ? 1 : 0.9,
                                                rotateX: isActive ? 0 : isPrev ? 10 : -10,
                                                zIndex: isActive ? 10 : 0,
                                            }}
                                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                            className="absolute inset-0 shadow-2xl rounded-xl overflow-hidden ring-1 ring-border bg-white flex items-center justify-center mx-4 md:mx-0"
                                            style={{ pointerEvents: isActive ? "auto" : "none" }}
                                        >
                                            {/* Render Page only if it's close to active to save memory */}
                                            {Math.abs(activePage - pageNum) <= 2 && (
                                                <Page
                                                    pageNumber={pageNum}
                                                    width={width}
                                                    className="flex justify-center items-center w-full h-full"
                                                    renderTextLayer={isActive}
                                                    renderAnnotationLayer={isActive}
                                                />
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Scroll prompt at start */}
                            <motion.div
                                animate={{ opacity: activePage === 1 ? 1 : 0, y: activePage === 1 ? 0 : 20 }}
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
                            >
                                <span className="text-xs tracking-widest uppercase font-medium">Scroll to explore</span>
                                <ArrowDownCircle className="w-6 h-6 animate-bounce" />
                            </motion.div>
                        </div>
                    </div>
                )}
            </Document>
        </div>
    );
}
