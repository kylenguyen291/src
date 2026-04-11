"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "../lib/projects";
import { CustomCursor } from "../components/scrapbook/CustomCursor";
import { ScrapCard } from "../components/scrapbook/ScrapCard";
import { motion } from "framer-motion";

export default function DeskHubPage() {
    return (
        <div className="relative min-h-[100vh] w-full bg-[#121212] text-[#F9F6F0] selection:bg-[#C54B3E]/30 selection:text-white font-serif overflow-hidden cursor-none flex flex-col">
            <CustomCursor />

            {/* Noise Grain */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            {/* Grid */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
                style={{ backgroundImage: `linear-gradient(#A0B0C0 1px, transparent 1px), linear-gradient(90deg, #A0B0C0 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            {/* Red margin lines */}
            <div className="fixed top-0 bottom-0 left-8 md:left-16 w-[1.5px] bg-[#C54B3E] opacity-50 z-10" />
            <div className="fixed top-0 bottom-0 right-8 md:right-16 w-[1.5px] bg-[#C54B3E] opacity-50 z-10" />

            {/* HERO */}
            <header className="relative z-20 pt-36 pb-0 px-8 md:px-24 max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center text-center gap-6 border-b border-[#A0B0C0]/20 pb-12"
                >
                    <p className="font-mono text-[#C54B3E] text-xs uppercase tracking-[0.3em]">
                        Portfolio · Data Analytics · Product Management
                    </p>
                    <p className="font-mono text-[#A0B0C0]/60 text-[10px] uppercase tracking-[0.25em]">
                        Presented by <span className="text-[#F9F6F0]/70">Nguyen Duc Phi Long</span>
                    </p>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[#F9F6F0] leading-[0.9] whitespace-nowrap">
                        The Desk.
                    </h1>
                    <p className="text-[#A0B0C0] font-sans text-lg leading-relaxed max-w-xl">
                        A collection of data investigations — each one a question worth asking, a dataset worth breaking open.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
                        className="relative max-w-2xl w-full mt-4 overflow-hidden rounded-sm"
                    >
                        {/* Animated border */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                            className="absolute top-0 left-0 right-0 h-[1px] bg-[#C54B3E]/50 origin-left"
                        />
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
                            className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C54B3E]/50 origin-right"
                        />
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
                            className="absolute top-0 left-0 bottom-0 w-[1px] bg-[#C54B3E]/30 origin-top"
                        />
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
                            className="absolute top-0 right-0 bottom-0 w-[1px] bg-[#C54B3E]/30 origin-bottom"
                        />

                        {/* Corner accents */}
                        <div className="absolute -top-[2px] -left-[2px] w-2 h-2 border-t-2 border-l-2 border-[#C54B3E]" />
                        <div className="absolute -top-[2px] -right-[2px] w-2 h-2 border-t-2 border-r-2 border-[#C54B3E]" />
                        <div className="absolute -bottom-[2px] -left-[2px] w-2 h-2 border-b-2 border-l-2 border-[#C54B3E]" />
                        <div className="absolute -bottom-[2px] -right-[2px] w-2 h-2 border-b-2 border-r-2 border-[#C54B3E]" />

                        {/* Shine sweep */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{ duration: 1.4, delay: 1.8, ease: "easeInOut" }}
                            className="absolute inset-0 w-1/3 pointer-events-none z-10"
                            style={{
                                background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.07) 60%, transparent 80%)",
                                transform: "skewX(-15deg)",
                            }}
                        />

                        {/* Repeating pulse glow */}
                        <motion.div
                            animate={{ opacity: [0, 0.06, 0] }}
                            transition={{ duration: 3, delay: 3.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                            className="absolute inset-0 pointer-events-none"
                            style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)" }}
                        />

                        <div className="px-8 py-7 space-y-4 text-center relative z-20">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: 1.4 }}
                                className="text-[#F9F6F0]/80 font-sans text-base leading-relaxed"
                            >
                                Hi — my name is <span className="text-[#F9F6F0] font-semibold">Nguyen Duc Phi Long</span>, currently a student in Business Analytics with a deep enthusiasm for{" "}
                                <motion.span
                                    initial={{ backgroundSize: "0% 2px" }}
                                    animate={{ backgroundSize: "100% 2px" }}
                                    transition={{ duration: 0.8, delay: 2.0, ease: "easeOut" }}
                                    className="text-[#F9F6F0] font-bold relative"
                                    style={{
                                        backgroundImage: "linear-gradient(#C54B3E, #C54B3E)",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "0 100%",
                                    }}
                                >
                                    product management
                                </motion.span>
                                {" "}and{" "}
                                <motion.span
                                    initial={{ backgroundSize: "0% 2px" }}
                                    animate={{ backgroundSize: "100% 2px" }}
                                    transition={{ duration: 0.8, delay: 2.3, ease: "easeOut" }}
                                    className="text-[#F9F6F0] font-bold relative"
                                    style={{
                                        backgroundImage: "linear-gradient(#C54B3E, #C54B3E)",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "0 100%",
                                    }}
                                >
                                    data analytics
                                </motion.span>
                                .
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: 1.8 }}
                                className="text-[#A0B0C0] font-sans text-sm leading-relaxed"
                            >
                                I love{" "}
                                <motion.span
                                    initial={{ backgroundSize: "0% 2px" }}
                                    animate={{ backgroundSize: "100% 2px" }}
                                    transition={{ duration: 0.8, delay: 2.6, ease: "easeOut" }}
                                    className="text-[#F9F6F0]/70 font-medium"
                                    style={{
                                        backgroundImage: "linear-gradient(#C54B3E, #C54B3E)",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "0 100%",
                                    }}
                                >
                                    sports
                                </motion.span>
                                {" "}and{" "}
                                <motion.span
                                    initial={{ backgroundSize: "0% 2px" }}
                                    animate={{ backgroundSize: "100% 2px" }}
                                    transition={{ duration: 0.8, delay: 2.9, ease: "easeOut" }}
                                    className="text-[#F9F6F0]/70 font-medium"
                                    style={{
                                        backgroundImage: "linear-gradient(#C54B3E, #C54B3E)",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "0 100%",
                                    }}
                                >
                                    finance
                                </motion.span>
                                {" "}— among many. And those passions find their way into everything I build.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 2.2 }}
                                className="flex items-center justify-center gap-3 pt-1"
                            >
                                {/* Left line */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.6, delay: 2.5, ease: "easeOut" }}
                                    className="h-[1px] w-10 bg-[#C54B3E]/40 origin-right"
                                />
                                <motion.p
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 3, delay: 3.2, repeat: Infinity, ease: "easeInOut" }}
                                    className="text-[#F9F6F0]/70 font-mono text-xs font-bold uppercase tracking-[0.2em]"
                                >
                                    Here are the projects I've built so far — still building more, and more to come.
                                </motion.p>
                                {/* Right line */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.6, delay: 2.5, ease: "easeOut" }}
                                    className="h-[1px] w-10 bg-[#C54B3E]/40 origin-left"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll hint */}
            </header>

            {/* CASE FILES SECTION */}
            <main className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-8 md:px-24 pt-20 pb-24">

                <div className="flex flex-wrap items-end justify-center gap-20">
                    {projects.map((p, i) => (
                        <motion.div
                            key={p.slug}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.2, duration: 0.7, ease: "easeOut" }}
                            className="relative flex flex-col items-center group"
                            style={{ zIndex: 10 + i }}
                        >
                            {/* Case number + category label */}
                            <div className="mb-5 flex items-baseline gap-4">
                                <span className="font-mono text-[#C54B3E] text-sm font-bold tracking-widest">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="font-serif text-[#F9F6F0] text-2xl font-bold uppercase tracking-wide">
                                    {p.category}
                                </span>
                            </div>

                            <ScrapCard
                                width={480}
                                height={340}
                                rotation={p.card.rotation}
                                href={`/projects/${p.slug}`}
                                className="bg-white"
                                delay={i * 0.15}
                                content={
                                    <div className="flex flex-col h-full bg-white relative overflow-hidden">
                                        {/* Accent bar */}
                                        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: p.card.accent }} />
                                        {/* Tape strip */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 bg-yellow-100/80 z-10" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }} />
                                        <div className="pl-6 pr-5 pt-6 pb-5 flex flex-col h-full">
                                            <p className="font-mono text-[10px] uppercase tracking-widest text-[#A0B0C0] mb-3">
                                                {p.date}
                                            </p>
                                            <h2 className="text-xl font-bold text-gray-900 leading-tight mb-3">
                                                {p.title}
                                            </h2>
                                            <p className="text-gray-500 text-sm leading-relaxed font-sans mb-4">
                                                {p.subtitle}
                                            </p>
                                            <div className="mt-auto flex flex-wrap gap-1.5">
                                                {p.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded font-mono border border-gray-200 text-gray-500">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                }
                            />

                            {/* Kick off button */}
                            <Link
                                href={`/projects/${p.slug}`}
                                className="mt-5 interactive inline-flex items-center gap-2 px-7 py-3 bg-[#C54B3E] text-[#F9F6F0] text-xs font-mono uppercase tracking-[0.2em] rounded-sm border border-[#C54B3E] hover:bg-transparent hover:text-[#C54B3E] transition-all duration-300 shadow-lg shadow-[#C54B3E]/20 hover:shadow-none"
                            >
                                Kick off
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>

            <footer className="relative z-20 border-t border-[#A0B0C0]/20 px-8 md:px-24 py-8 flex items-center justify-between text-[#A0B0C0]/50 font-mono text-[10px] uppercase tracking-widest max-w-7xl mx-auto w-full">
                <p>© {new Date().getFullYear()} · Nguyen Duc Phi Long</p>
                <p>Data-Driven Problem Solving</p>
            </footer>
        </div>
    );
}
