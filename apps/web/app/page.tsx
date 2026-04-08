import Link from "next/link";
import { ArrowRight, BookOpen, Presentation, MousePointerClick } from "lucide-react";

const variants = [
  {
    href: "/var1",
    title: "Variant 1: Flipbook Gallery",
    description: "A tactile, polished document viewer with a thumbnail strip and smooth 3D-like transitions.",
    icon: BookOpen,
  },
  {
    href: "/var2",
    title: "Variant 2: Scrollytelling",
    description: "A scroll-driven experience where presentation slides transition seamlessly in the background as you scroll.",
    icon: MousePointerClick,
  },
  {
    href: "/var3",
    title: "Variant 3: Immersive Keynote",
    description: "A cinematic, distraction-free presentation mode with smooth keyboard navigation and minimalist controls.",
    icon: Presentation,
  },
  {
    href: "/var4",
    title: "Variant 4: Digital Scrapbook",
    description: "An interactive, tactile 'developer desk' with physical paper physics, animated SVG annotations, and a custom cursor.",
    icon: Presentation, // Will use another icon but reusing Presentation for now
  },
];

export default function Page() {
  return (
    <div className="min-h-svh bg-background flex flex-col items-center justify-center p-6 sm:p-12 font-sans selection:bg-primary/20">
      <div className="w-full max-w-4xl space-y-12">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border border-border bg-muted/30 px-3 py-1 text-sm font-medium">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            SQL Final Presentation Showcases
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Visualizing the Presentation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three creative, interactive ways to experience a static PDF. Built with Next.js, Framer Motion, and react-pdf.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {variants.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col h-full space-y-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <v.icon className="w-6 h-6" />
                </div>

                <div className="space-y-2 flex-grow">
                  <h2 className="text-xl font-semibold flex items-center justify-between">
                    {v.title}
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
