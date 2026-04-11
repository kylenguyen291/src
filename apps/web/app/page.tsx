import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "../lib/projects";
import { CustomCursor } from "../components/scrapbook/CustomCursor";
import { ScrapCard } from "../components/scrapbook/ScrapCard";

export default function DeskHubPage() {
    return (
        <div className="relative min-h-[100vh] w-full bg-[#121212] text-[#F9F6F0] selection:bg-[#C54B3E]/30 selection:text-white font-serif overflow-hidden cursor-none flex flex-col">
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

            {/* HERO SECTION */}
            <header className="relative z-20 pt-24 pb-12 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#F9F6F0] mb-4">
                    The Desk
                </h1>
                <p className="text-lg text-[#A0B0C0] max-w-2xl mx-auto font-mono uppercase tracking-widest text-sm">
                    Investigating Data to Answer Big Questions.
                </p>
            </header>

            {/* THE DESK - Scatter Area */}
            <main className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-12 md:px-24 pb-0 flex flex-wrap items-center justify-center gap-12 min-h-[60vh]">
                {projects.map((p, i) => (
                    <div key={p.slug} className="relative transition-transform duration-500 hover:z-50" style={{ zIndex: 10 + i }}>
                        <ScrapCard
                            width={p.card.width}
                            height={p.card.height}
                            rotation={p.card.rotation}
                            href={`/projects/${p.slug}`}
                            className="bg-white group"
                            delay={i * 0.15}
                            content={
                                <div className="flex flex-col h-full bg-white relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-2 scale-y-110" style={{ backgroundColor: p.card.accent }} />
                                    <div className="pl-6 pt-4 pb-2 flex-1 flex flex-col">
                                        <p className="font-mono text-xs uppercase tracking-widest text-[#A0B0C0] mb-2">{p.category} · {p.date}</p>
                                        <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4 flex-1">
                                            {p.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-6 font-sans">
                                            {p.subtitle}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {p.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-mono">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                ))}
            </main>

            {/* Kick off button */}
            <div className="relative z-20 flex justify-center pt-4 pb-16">
                <Link
                    href="/projects/football-sponsorship-analytics"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#C54B3E] text-[#F9F6F0] text-sm font-mono uppercase tracking-widest rounded-sm hover:bg-[#D45A4D] transition-colors duration-300 shadow-lg shadow-[#C54B3E]/20 hover:shadow-[#C54B3E]/40"
                >
                    Kick off
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <footer className="relative z-20 border-t border-[#A0B0C0]/20 pt-8 pb-12 text-center text-[#A0B0C0] font-mono text-xs uppercase tracking-widest">
                <p>© {new Date().getFullYear()} · Select a case file to begin</p>
            </footer>
        </div>
    );
}
