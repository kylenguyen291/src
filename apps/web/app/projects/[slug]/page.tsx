"use client";

import { useEffect, useRef, useState, use, useCallback } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import { Home, FileText } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { projects } from "../../../lib/projects";
import { CustomCursor } from "../../../components/scrapbook/CustomCursor";
import { ScrapCard } from "../../../components/scrapbook/ScrapCard";
import { LiveSVG } from "../../../components/scrapbook/LiveSVG";

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const project = projects.find(p => p.slug === slug);

    // lenis initialization inside component avoids errors on server
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState(0);
    const lenisRef = useRef<Lenis | null>(null);

    const sectionIds = [
        "section-hero",
        "section-opening",
        ...(project?.story.chapters.map(c => c.id) || []),
        "section-closing",
    ];
    const sectionLabels = [
        "Intro",
        "The Question",
        ...(project?.story.chapters.map(c => c.heading.split(" ").slice(0, 3).join(" ")) || []),
        "The Insight",
    ];

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
        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [project]);

    // IntersectionObserver to track active section
    useEffect(() => {
        if (!project) return;
        const observers: IntersectionObserver[] = [];
        const handleIntersect = (index: number) => (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(index);
                }
            });
        };

        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            sectionIds.forEach((id, index) => {
                const el = document.getElementById(id);
                if (el) {
                    const observer = new IntersectionObserver(handleIntersect(index), {
                        rootMargin: "-40% 0px -40% 0px",
                        threshold: 0.1,
                    });
                    observer.observe(el);
                    observers.push(observer);
                }
            });
        }, 300);

        return () => {
            clearTimeout(timer);
            observers.forEach(o => o.disconnect());
        };
    }, [project]);

    const scrollToSection = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) {
            if (lenisRef.current) {
                lenisRef.current.scrollTo(el, { offset: -100, duration: 1.5 });
            } else {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, []);

    // Confetti effect when "The Insight" section comes into view
    const confettiFired = useRef(false);
    useEffect(() => {
        if (!project) return;
        const timer = setTimeout(() => {
            const closingEl = document.getElementById("section-closing");
            if (!closingEl) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !confettiFired.current) {
                            confettiFired.current = true;

                            // Initial burst from left
                            confetti({
                                particleCount: 80,
                                spread: 70,
                                origin: { x: 0.2, y: 0.6 },
                                colors: ["#C54B3E", "#F9F6F0", "#A0B0C0", "#FFD700", "#FF6B6B"],
                                ticks: 200,
                                gravity: 0.8,
                                scalar: 1.2,
                            });
                            // Burst from right with slight delay
                            setTimeout(() => {
                                confetti({
                                    particleCount: 80,
                                    spread: 70,
                                    origin: { x: 0.8, y: 0.6 },
                                    colors: ["#C54B3E", "#F9F6F0", "#A0B0C0", "#FFD700", "#FF6B6B"],
                                    ticks: 200,
                                    gravity: 0.8,
                                    scalar: 1.2,
                                });
                            }, 200);
                            // Final center shower
                            setTimeout(() => {
                                confetti({
                                    particleCount: 120,
                                    spread: 100,
                                    origin: { x: 0.5, y: 0.3 },
                                    colors: ["#C54B3E", "#F9F6F0", "#A0B0C0", "#FFD700", "#FF6B6B"],
                                    ticks: 300,
                                    gravity: 0.6,
                                    scalar: 1.4,
                                });
                            }, 500);
                        }
                    });
                },
                { threshold: 0.3 }
            );

            observer.observe(closingEl);
            return () => observer.disconnect();
        }, 500);

        return () => clearTimeout(timer);
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

            {/* Progress Stepper */}
            <nav className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
                <div className="mx-auto max-w-4xl px-8 py-5 pointer-events-auto">
                    <div className="relative flex items-center justify-between bg-[#1a1a1a]/80 backdrop-blur-xl rounded-full px-6 py-3 border border-white/5 shadow-2xl shadow-black/40">
                        {/* Connecting line (background) */}
                        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-[#A0B0C0]/15 rounded-full" />
                        {/* Connecting line (progress fill) */}
                        <div
                            className="absolute left-6 top-1/2 -translate-y-1/2 h-[2px] bg-[#C54B3E] rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${(activeSection / (sectionIds.length - 1)) * (100 - (12 / 4))}%` }}
                        />

                        {sectionIds.map((id, i) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className="interactive relative z-10 group flex flex-col items-center"
                                title={sectionLabels[i]}
                            >
                                {/* Circle */}
                                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${i <= activeSection
                                        ? "bg-[#C54B3E] border-[#C54B3E] scale-110 shadow-[0_0_12px_rgba(197,75,62,0.5)]"
                                        : "bg-[#1a1a1a] border-[#A0B0C0]/30 hover:border-[#C54B3E]/50 hover:scale-110"
                                    }`}>
                                    {i === activeSection && (
                                        <div className="absolute inset-0 rounded-full bg-[#C54B3E] animate-ping opacity-30" />
                                    )}
                                </div>
                                {/* Label tooltip */}
                                <span className={`absolute top-7 whitespace-nowrap text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${i === activeSection
                                        ? "opacity-100 text-[#C54B3E] translate-y-0"
                                        : "opacity-0 group-hover:opacity-70 text-[#A0B0C0] translate-y-1 group-hover:translate-y-0"
                                    }`}>
                                    {sectionLabels[i]}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="relative z-20 mx-auto px-12 md:px-24 pt-32 pb-48 w-full">

                {/* HERO SECTION */}
                <section id="section-hero" className="h-[90vh] flex flex-col items-center justify-center relative">
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
                        <ScrapCard width={400} height={300} content={
                            <div className="absolute inset-0 overflow-hidden">
                                <img src="/images/uefa-champions-league.jpg" alt="UEFA Champions League" className="w-full h-full object-cover" />
                            </div>
                        } />
                    </motion.div>
                    <motion.div style={{ y: yFast }} className="absolute -bottom-16 right-10 rotate-[12deg] z-30 hidden md:block">
                        <ScrapCard width={350} height={250} content={
                            <div className="absolute inset-0 overflow-hidden">
                                <img src="/images/uefa-champions-league.jpg" alt="UEFA Champions League" className="w-full h-full object-cover" />
                            </div>
                        } />
                    </motion.div>
                </section>

                {/* OPENING HOOK */}
                <section id="section-opening" className="relative mt-[20vh] min-h-[60vh] flex flex-col items-center justify-center max-w-4xl mx-auto text-center z-20">
                    <p className="text-3xl md:text-4xl text-[#F9F6F0] leading-relaxed mb-12">
                        {project.story.opening.hook}
                    </p>
                    <p className="text-[#A0B0C0] font-mono text-xl md:text-2xl italic mb-16">
                        "{project.story.opening.bigQuestion}"
                    </p>

                    {project.story.opening.highlights && (
                        <div className="flex flex-wrap justify-center gap-4">
                            {project.story.opening.highlights.map((highlight, i) => (
                                <div key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                                    <span className="text-[#A0B0C0] font-mono text-xs uppercase tracking-widest">{highlight}</span>
                                </div>
                            ))}
                        </div>
                    )}
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

                                    {chapter.highlights && (
                                        <ul className="space-y-3 pt-4">
                                            {chapter.highlights.map((highlight, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C54B3E] shrink-0" />
                                                    <span className="text-[#A0B0C0] font-mono text-sm leading-relaxed">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

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
                                                <ScrapCard width={card.width} height={card.height} rotation={card.rotation} content={card.content} />
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

                {/* TECHNICAL DEPICTION */}
                {project.story.depiction && (
                    <section className="mt-[30vh] max-w-6xl mx-auto px-6 relative z-20">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-sm font-mono text-[#C54B3E] uppercase tracking-[0.3em] mb-4">Technical Breakdown</h2>
                                <h3 className="text-4xl md:text-5xl font-medium mb-8 uppercase tracking-tight">{project.story.depiction.title}</h3>
                                <p className="text-[#A0B0C0] text-xl leading-relaxed mb-10">
                                    {project.story.depiction.body}
                                </p>
                                <div className="space-y-6">
                                    {project.story.depiction.highlights.map((h, i) => (
                                        <div key={i} className="flex flex-col border-l-2 border-[#C54B3E]/30 pl-6 py-2">
                                            <span className="text-[#F9F6F0] font-mono text-lg">{h.split(' — ')[0]}</span>
                                            {h.includes(' — ') && (
                                                <span className="text-[#A0B0C0] text-sm uppercase tracking-wider mt-1">{h.split(' — ')[1]}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center">
                                <LiveSVG 
                                    className="absolute inset-0 opacity-20"
                                    viewBox="0 0 400 400"
                                    paths={[
                                        "M 50 50 L 350 50 L 350 350 L 50 350 Z",
                                        "M 100 100 L 300 100 M 100 150 L 300 150 M 100 200 L 300 200",
                                        "M 200 50 L 200 350"
                                    ]}
                                />
                                <div className="relative transform rotate-3 scale-110">
                                    <ScrapCard 
                                        width={450} 
                                        height={320} 
                                        rotation={-4}
                                        content={
                                            <div className="absolute inset-0 bg-[#0f0f0f] p-8 font-mono text-xs text-green-500/80 leading-relaxed overflow-hidden">
                                                <div className="space-y-1">
                                                    <p>IMPORT football_raw.csv AS raw_data</p>
                                                    <p>VALIDATE raw_data.game_id NOT NULL</p>
                                                    <p>MAP raw_data TO football_core.schema</p>
                                                    <p className="text-white/30 italic mt-4">-- Normalization Layer --</p>
                                                    <p>UPDATE football_core SET value_index = (involvement * 0.7) + (predictability * 0.3)</p>
                                                    <p>WHERE season BETWEEN 2014 AND 2020</p>
                                                    <p className="mt-4">SUCCESS: 726,000+ rows migrated.</p>
                                                    <div className="mt-8 h-32 w-full bg-green-500/10 rounded flex items-center justify-center border border-green-500/20">
                                                        [DATA_CORE_STRUCT_READY]
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* CLOSING SECTION */}
                <section id="section-closing" className="relative mt-[30vh] min-h-screen flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center z-30">
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
                                            className="interactive inline-flex items-center gap-3 px-8 py-4 bg-[#C54B3E] text-white rounded-full font-sans font-semibold tracking-wide hover:bg-black transition-colors"
                                        >
                                            <FileText className="w-5 h-5" />
                                            {project.story.closing.cta}
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
