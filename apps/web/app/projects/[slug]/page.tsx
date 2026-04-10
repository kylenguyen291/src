"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import { Home, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import { projects } from "../../../lib/projects";
import { CustomCursor } from "../../../components/scrapbook/CustomCursor";
import { ScrapCard } from "../../../components/scrapbook/ScrapCard";
import { LiveSVG } from "../../../components/scrapbook/LiveSVG";

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const project = projects.find(p => p.slug === params.slug);
    
    // lenis initialization inside component avoids errors on server
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!project) return;
        const lenis = new Lenis({
            duration: 1.2,
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [project]);

    if (!project) {
        return <div className="min-h-screen text-white bg-[#121212] flex items-center justify-center">Project not found</div>;
    }

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const yFast = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const ySlow = useTransform(scrollYProgress, [0, 1], [0, 300]);

    return (
        <div
            className="relative min-h-[300vh] w-full bg-[#121212] text-[#F9F6F0] selection:bg-[#C54B3E]/30 selection:text-white font-serif overflow-hidden cursor-none"
            ref={containerRef}
        >
            <CustomCursor />

            {/* Global Noise Grain Overlay */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Grid Pattern Background - faint */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
                style={{ backgroundImage: `linear-gradient(#A0B0C0 1px, transparent 1px), linear-gradient(90deg, #A0B0C0 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            {/* Red Sticky Border Alignments */}
            <div className="fixed top-0 bottom-0 left-8 md:left-16 w-[1.5px] bg-[#C54B3E] opacity-50 z-10" />
            <div className="fixed top-0 bottom-0 right-8 md:right-16 w-[1.5px] bg-[#C54B3E] opacity-50 z-10" />

            {/* Floating Home Button */}
            <Link href="/" className="fixed top-6 left-12 z-50 interactive w-10 h-10 flex items-center justify-center rounded-full text-[#C54B3E] hover:bg-[#C54B3E]/10 transition-colors">
                <Home className="w-5 h-5" />
            </Link>

            <main className="relative z-20 mx-auto px-12 md:px-24 pt-32 pb-48 w-full">
                
                {/* HERO SECTION */}
                <section className="h-[90vh] flex flex-col items-center justify-center relative">
                    <motion.div className="flex flex-col items-center relative z-20">
                        <p className="font-mono text-[#A0B0C0] mb-6 tracking-widest uppercase text-sm">{project.category} · {project.date}</p>
                        <h1 className="text-6xl md:text-8xl text-center leading-[0.9] tracking-tight antialiased max-w-5xl">
                            {project.title}
                        </h1>

                        <LiveSVG
                            className="absolute -bottom-6 right-0 w-64 h-12"
                            viewBox="0 0 200 40"
                            paths={["M 10 20 Q 50 40 100 25 T 190 10"]}
                            delay={0.5}
                        />
                    </motion.div>

                    <motion.div style={{ y: ySlow }} className="absolute -bottom-32 left-0 rotate-[-8deg] opacity-70 blur-[2px] hidden md:block z-0 pointer-events-none">
                        <ScrapCard width={400} height={300} />
                    </motion.div>
                    <motion.div style={{ y: yFast }} className="absolute -bottom-16 right-10 rotate-[12deg] z-30 hidden md:block">
                        <ScrapCard width={350} height={250} />
                    </motion.div>
                </section>

                {/* OPENING HOOK */}
                <section className="relative mt-[20vh] min-h-[60vh] flex flex-col items-center justify-center max-w-4xl mx-auto text-center z-20">
                    <p className="text-3xl md:text-4xl text-[#F9F6F0] leading-relaxed mb-12">
                        {project.story.opening.hook}
                    </p>
                    <p className="text-[#A0B0C0] font-mono text-xl md:text-2xl italic">
                        "{project.story.opening.bigQuestion}"
                    </p>
                </section>

                {/* CHAPTERS */}
                <div className="space-y-[40vh] mt-[20vh] max-w-6xl mx-auto relative z-20">
                    {project.story.chapters.map((chapter, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <section key={chapter.id} id={chapter.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-16`}>
                                <div className="flex-1 space-y-8 relative">
                                    <h2 className="text-4xl md:text-5xl border-l-[3px] border-[#C54B3E] pl-6 font-medium leading-tight">
                                        {chapter.heading}
                                    </h2>
                                    <p className="text-[#A0B0C0] font-sans text-xl leading-relaxed max-w-xl">
                                        {chapter.body}
                                    </p>
                                    
                                    {chapter.stat && (
                                        <div className="pt-8">
                                            <p className="text-6xl sm:text-7xl font-bold text-[#C54B3E] tracking-tighter">{chapter.stat.value}</p>
                                            <p className="uppercase font-mono text-sm tracking-widest text-[#A0B0C0] mt-2">{chapter.stat.label}</p>
                                        </div>
                                    )}

                                    {chapter.annotation && (
                                        <div className={`absolute ${chapter.annotation.position === 'right' ? '-right-10 top-0' : '-left-10 top-20'}`}>
                                            <LiveSVG
                                                className="w-24 h-24"
                                                viewBox="0 0 100 100"
                                                paths={chapter.annotation.svg}
                                            />
                                            {chapter.annotation.label && (
                                                <span className="absolute -bottom-4 text-[#C54B3E] whitespace-nowrap rotate-6 text-xl font-medium" style={{ fontFamily: 'cursive' }}>
                                                    {chapter.annotation.label}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex-1 relative min-h-[400px] w-full flex items-center justify-center">
                                    {chapter.scrapCards ? (
                                        chapter.scrapCards.map((card, i) => (
                                            <motion.div key={i} style={{ y: i % 2 === 0 ? ySlow : yFast }} className="absolute z-10">
                                                <ScrapCard width={card.width} height={card.height} rotation={card.rotation} />
                                            </motion.div>
                                        ))
                                    ) : (
                                        <motion.div style={{ y: ySlow }} className="absolute z-10 opacity-30 blur-[2px]">
                                            <ScrapCard width={450} height={300} rotation={isEven ? 8 : -6} />
                                        </motion.div>
                                    )}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* CLOSING SECTION */}
                <section className="relative mt-[30vh] min-h-screen flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center z-30">
                    <h3 className="text-3xl font-mono text-[#C54B3E] mb-12 italic">"The Insight"</h3>
                    
                    <div className="relative">
                        <ScrapCard 
                            width={650} 
                            height={400} 
                            rotation={-2} 
                            className="bg-white/95 backdrop-blur shadow-2xl"
                            content={
                                <div className="flex flex-col items-center justify-center h-full text-gray-800 p-8 text-center space-y-8">
                                    <p className="text-xl md:text-2xl leading-relaxed font-serif">
                                        {project.story.closing.insight}
                                    </p>

                                    {project.story.closing.cta && project.story.closing.ctaHref && (
                                        <Link 
                                            href={project.story.closing.ctaHref} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="interactive inline-flex items-center gap-3 px-8 py-4 bg-[#C54B3E] text-white rounded-full font-sans font-semibold tracking-wide hover:bg-black transition-colors"
                                        >
                                            <FileText className="w-5 h-5" />
                                            {project.story.closing.cta}
                                            <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                                        </Link>
                                    )}
                                </div>
                            }
                        />
                        <LiveSVG
                            className="absolute -right-12 bottom-0 w-32 h-32"
                            viewBox="0 0 100 100"
                            paths={["M 20 80 Q 50 100 80 80 T 90 20"]}
                            delay={1}
                        />
                    </div>
                </section>

                <footer className="mt-[20vh] border-t border-[#A0B0C0]/20 pt-12 pb-24 text-center text-[#A0B0C0] font-mono text-xs uppercase tracking-widest relative z-20">
                    <p>© {new Date().getFullYear()} {project.title}. Data-Driven Problem Solving.</p>
                </footer>
            </main>
        </div>
    );
}
