"use client";

import { useState, useEffect, useCallback, useMemo, use } from "react";
import dynamic from "next/dynamic";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ChevronLeft, ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

const PDFDocument = dynamic(() => import("react-pdf").then((mod) => mod.Document), { ssr: false });
const PDFPage = dynamic(() => import("react-pdf").then((mod) => mod.Page), { ssr: false });

const PROJECT_CONFIGS: Record<string, {
    pdfPath: string;
    sections: { label: string; start: number; end: number }[];
}> = {
    "football-sponsorship-analytics": {
        pdfPath: "/pdf/Project%201.pdf",
        sections: [
            { label: "Background", start: 1, end: 3 },
            { label: "System Analysis", start: 4, end: 5 },
            { label: "Data Normalization", start: 6, end: 10 },
            { label: "DB Design", start: 11, end: 15 },
            { label: "Insights & Recs", start: 16, end: 31 },
            { label: "Conclusion", start: 32, end: 33 },
        ],
    },
    "loan-default-prediction": {
        pdfPath: "/pdf/Project%202.pdf",
        sections: [
            { label: "The Gap", start: 1, end: 4 },
            { label: "The Data", start: 5, end: 9 },
            { label: "Methods", start: 10, end: 15 },
            { label: "Results", start: 16, end: 22 },
            { label: "Impact", start: 23, end: 28 },
            { label: "Conclusion", start: 29, end: 33 },
        ],
    },
};

const DEFAULT_CONFIG = {
    pdfPath: "/pdf/Project%201.pdf",
    sections: [
        { label: "Introduction", start: 1, end: 5 },
        { label: "Analysis", start: 6, end: 15 },
        { label: "Results", start: 16, end: 25 },
        { label: "Conclusion", start: 26, end: 33 },
    ],
};

export default function Variant2Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const config = PROJECT_CONFIGS[slug] ?? DEFAULT_CONFIG;
    const SECTIONS = config.sections;

    const [numPages, setNumPages] = useState<number>();
    const [width, setWidth] = useState<number>(1000);
    const [activePage, setActivePage] = useState(1);
    const [direction, setDirection] = useState(0);

    const activeSection = useMemo(() => {
        return SECTIONS.findIndex(s => activePage >= s.start && activePage <= s.end);
    }, [activePage, SECTIONS]);

    useEffect(() => {
        import("react-pdf").then((mod) => {
            mod.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${mod.pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
        });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth > 1200 ? 1000 : window.innerWidth - 64);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const goTo = useCallback((page: number) => {
        if (!numPages) return;
        const clamped = Math.max(1, Math.min(numPages, page));
        if (clamped !== activePage) {
            setDirection(clamped > activePage ? 1 : -1);
            setActivePage(clamped);
        }
    }, [numPages, activePage]);

    const goNext = useCallback(() => goTo(activePage + 1), [goTo, activePage]);
    const goPrev = useCallback(() => goTo(activePage - 1), [goTo, activePage]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
                e.preventDefault();
                goNext();
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                goPrev();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [goNext, goPrev]);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const variants = {
        enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 300 : -300, scale: 0.95 }),
        center: { opacity: 1, x: 0, scale: 1 },
        exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -300 : 300, scale: 0.95 }),
    };

    return (
        <div className="relative h-svh w-full bg-[#121212] text-[#F9F6F0] font-sans overflow-hidden">

            {/* Noise Grain Overlay */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            {/* Grid Pattern Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
                style={{ backgroundImage: `linear-gradient(#A0B0C0 1px, transparent 1px), linear-gradient(90deg, #A0B0C0 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            {/* Red Sticky Border Lines */}
            <div className="fixed top-0 bottom-0 left-8 md:left-16 w-[1.5px] bg-[#C54B3E] opacity-50 z-10" />
            <div className="fixed top-0 bottom-0 right-8 md:right-16 w-[1.5px] bg-[#C54B3E] opacity-50 z-10" />

            {/* Top progress bar */}
            {numPages && (
                <div className="fixed top-0 left-0 right-0 h-1 bg-[#C54B3E]/20 z-50">
                    <div
                        className="h-full bg-[#C54B3E] transition-all duration-500 ease-out"
                        style={{ width: `${((activePage) / numPages) * 100}%` }}
                    />
                </div>
            )}

            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 p-4 md:px-8 z-40 flex items-center justify-between pointer-events-none">
                <Button variant="outline" size="icon" asChild className="rounded-full bg-background/80 backdrop-blur-md pointer-events-auto border-border shadow-sm">
                    <Link href="/"><Home className="w-4 h-4" /></Link>
                </Button>
                <div className="bg-[#1a1a1a]/80 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10 shadow-lg text-sm font-medium pointer-events-auto text-[#A0B0C0]">
                    {activeSection >= 0 ? SECTIONS[activeSection]?.label : "..."} • Slide {activePage} of {numPages || "..."}
                </div>
            </nav>

            {/* Prev / Next arrows */}
            {numPages && (
                <>
                    <button
                        onClick={goPrev}
                        disabled={activePage <= 1}
                        className="fixed left-4 md:left-20 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:pointer-events-none"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={goNext}
                        disabled={activePage >= numPages}
                        className="fixed right-4 md:right-20 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:pointer-events-none"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </>
            )}

            {/* Section Stepper */}
            {numPages && (
                <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
                    <div className="relative flex items-center bg-black/70 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10 shadow-2xl shadow-black/50">
                        {/* Connecting line (background) */}
                        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-white/10 rounded-full" />
                        {/* Connecting line (progress fill) */}
                        <div
                            className="absolute left-6 top-1/2 -translate-y-1/2 h-[2px] bg-[#C54B3E] rounded-full transition-all duration-700 ease-out"
                            style={{
                                width: activeSection >= 0
                                    ? `${(activeSection / (SECTIONS.length - 1)) * (100 - 8)}%`
                                    : "0%"
                            }}
                        />

                        {SECTIONS.map((section, i) => {
                            const isCurrent = i === activeSection;
                            const isPast = i < activeSection;

                            return (
                                <button
                                    key={section.label}
                                    onClick={() => goTo(section.start)}
                                    className="relative z-10 group flex flex-col items-center"
                                    style={{ width: '56px' }}
                                    title={`${section.label} (Slides ${section.start}–${section.end})`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                                        isCurrent
                                            ? "bg-[#C54B3E] border-[#C54B3E] scale-125 shadow-[0_0_12px_rgba(197,75,62,0.5)]"
                                            : isPast
                                                ? "bg-[#C54B3E] border-[#C54B3E]"
                                                : "bg-transparent border-white/25 group-hover:border-white/50 group-hover:scale-110"
                                    }`}>
                                        {isCurrent && (
                                            <div className="absolute inset-0 rounded-full bg-[#C54B3E] animate-ping opacity-20" />
                                        )}
                                    </div>

                                    <span className={`absolute top-8 whitespace-nowrap text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
                                        isCurrent
                                            ? "opacity-100 text-[#C54B3E] font-bold translate-y-0"
                                            : "opacity-0 group-hover:opacity-70 text-white/60 translate-y-1 group-hover:translate-y-0"
                                    }`}>
                                        {section.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </nav>
            )}

            {/* PDF Viewer */}
            <PDFDocument
                file={config.pdfPath}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 text-[#A0B0C0] z-20">
                        <Loader2 className="w-8 h-8 animate-spin text-[#C54B3E]" />
                        <p className="text-sm font-mono tracking-widest uppercase">Loading Story...</p>
                    </div>
                }
            >
                {numPages && (
                    <div className="h-svh w-full flex items-center justify-center px-4 md:px-0">
                        <div className="relative w-full max-w-5xl aspect-video">
                            <AnimatePresence custom={direction} mode="popLayout">
                                <motion.div
                                    key={activePage}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                    className="absolute inset-0 shadow-2xl rounded-xl overflow-hidden ring-1 ring-white/10 bg-white flex items-center justify-center"
                                >
                                    <PDFPage
                                        pageNumber={activePage}
                                        width={width}
                                        className="flex justify-center items-center w-full h-full"
                                        renderTextLayer={true}
                                        renderAnnotationLayer={true}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </PDFDocument>
        </div>
    );
}
