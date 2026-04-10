"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

import { CustomCursor } from "../../components/scrapbook/CustomCursor";
import { ScrapCard } from "../../components/scrapbook/ScrapCard";
import { LiveSVG } from "../../components/scrapbook/LiveSVG";

export default function Variant4Page() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize smooth scroll
    useEffect(() => {
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
    }, []);

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

    // Slower/Faster scroll layers for Parallax "Scrapbook" depth
    const yFast = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const ySlow = useTransform(scrollYProgress, [0, 1], [0, 300]);

    // Hero explosion effect
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
    const heroRotate = useTransform(scrollYProgress, [0, 0.2], [0, -5]);

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

            {/* Red Sticky Border Alignments like the notebook string */}
            <div className="fixed top-0 bottom-0 left-8 md:left-16 w-[1.5px] bg-[#C54B3E] opacity-50 z-10" />
            <div className="fixed top-0 bottom-0 right-8 md:right-16 w-[1.5px] bg-[#C54B3E] opacity-50 z-10" />

            {/* Floating Home Button */}
            <Button variant="ghost" size="icon" asChild className="fixed top-6 left-12 z-50 interactive rounded-full text-[#C54B3E] hover:bg-[#C54B3E]/10 hover:text-[#C54B3E] transition-colors">
                <Link href="/"><Home className="w-5 h-5" /></Link>
            </Button>

            {/* SCRAPBOOK CONTENT */}
            <main className="relative z-20 mx-auto px-12 md:px-24 pt-32 pb-64 w-full">

                {/* HERO SECTION */}
                <section className="h-[90vh] flex flex-col items-center justify-center relative">
                    <motion.div
                        style={{ scale: heroScale, y: heroY, rotate: heroRotate }}
                        className="flex flex-col items-center relative z-20"
                    >
                        <p className="font-mono text-[#A0B0C0] mb-6 tracking-widest uppercase text-sm">Sports Analytics. DB Project</p>
                        <h1 className="text-6xl md:text-8xl text-center leading-[0.9] tracking-tight antialiased">
                            Football Sponsorship <br />
                            <span className="italic opacity-80 pl-12 text-[#A0B0C0]">Analytics.</span>
                        </h1>

                        {/* Draw a red scribble under the title */}
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

                {/* SECTION 2: The Core Problem */}
                <section className="relative mt-[20vh] min-h-screen flex flex-col md:flex-row items-center justify-between gap-12 w-full max-w-7xl mx-auto">
                    <div className="flex-1 space-y-8 relative z-20">
                        <h2 className="text-4xl md:text-5xl border-l-[3px] border-[#C54B3E] pl-6 font-medium">Data <br /> & Analytics</h2>
                        <p className="text-[#A0B0C0] font-sans text-lg max-w-md leading-relaxed">
                            Building a comprehensive database that tracks sponsorship ROI across leagues, clubs, and individual players. Transforming gut-feel decisions into data-driven strategic insights.
                        </p>
                    </div>
                    <div className="flex-1 relative h-[600px] w-full flex items-center justify-center">
                        {/* Pile of cards */}
                        <motion.div style={{ y: ySlow }} className="absolute top-0 right-0 z-10">
                            <ScrapCard width={500} height={350} rotation={-4} delay={0.1} />
                            {/* Hand drawn arrow pointing at something on the card */}
                            <LiveSVG
                                className="absolute -left-12 -top-12 w-32 h-32 scale-x-[-1]"
                                viewBox="0 0 100 100"
                                paths={["M 90 10 Q 50 20 20 80", "M 20 80 L 10 60", "M 20 80 L 40 70"]}
                                delay={0.6}
                            />
                        </motion.div>
                        <motion.div style={{ y: yFast }} className="absolute bottom-0 left-0 z-20">
                            <ScrapCard width={450} height={320} rotation={6} delay={0.3} className="border-[8px] border-white/90" />
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: Deep Dive */}
                <section className="relative mt-[30vh] min-h-screen flex flex-col items-center justify-center w-full max-w-5xl mx-auto text-center">
                    <h3 className="text-3xl font-mono text-[#A0B0C0] mb-20 italic">"From Gut Feel to Data-Driven ROI"</h3>

                    <div className="relative w-full aspect-video flex justify-center items-center">
                        <motion.div style={{ y: yFast }} className="z-30">
                            <ScrapCard 
                                width={800} 
                                height={500} 
                                rotation={-2} 
                                className="shadow-2xl shadow-black/60 !bg-white border-t-[30px] border-t-white"
                                href="/var2"
                                content={
                                    <div className="space-y-4 text-gray-800">
                                        <h2 className="text-3xl md:text-4xl font-bold border-l-[3px] border-[#C54B3E] pl-4 mb-6">
                                            Football Sponsorship Analytics
                                        </h2>
                                        <div className="space-y-4 text-base md:text-lg leading-relaxed">
                                            <p>
                                                <span className="font-bold text-2xl text-[#C54B3E]">$8.7 billion</span> spent on football sponsorships every year — and most of it decided on gut feel.
                                            </p>
                                            <p className="font-bold text-lg">
                                                What if a database could tell you exactly which league, which club, and which player gives your brand the highest return for the lowest risk?
                                            </p>
                                            <p>
                                                That's precisely what this project builds.
                                            </p>
                                        </div>
                                    </div>
                                }
                            />
                            <LiveSVG
                                className="absolute -right-8 bottom-12 w-24 h-24"
                                viewBox="0 0 100 100"
                                paths={["M 20 20 C 80 10 90 80 50 90 C 10 80 20 30 50 30"]}
                                delay={1}
                            />
                            <span className="absolute -right-24 bottom-2 text-[#C54B3E] font-bold rotate-12" style={{ fontFamily: 'cursive' }}>Check this!</span>
                        </motion.div>
                        <motion.div style={{ y: ySlow }} className="absolute -left-32 -top-24 z-10 opacity-50 blur-[3px]">
                            <ScrapCard width={400} height={280} rotation={15} />
                        </motion.div>
                    </div>
                </section>

                <footer className="mt-[40vh] border-t border-[#A0B0C0]/20 pt-12 pb-24 text-center text-[#A0B0C0] font-mono text-xs uppercase tracking-widest relative z-20">
                    <p>© {new Date().getFullYear()} Football Sponsorship Analytics. Data-Driven Sports Marketing.</p>
                </footer>

            </main>
        </div>
    );
}
