/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Play, Layers } from "lucide-react";
import LineOverlay from "@/components/ui/LineOverlay";
import { VectorGrid, GeometricShapes, HandDrawnLines, TopographicPattern, MagneticField } from "@/components/ui/PhysicsIllustrations";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DynamicCaseStudyPage() {
  const params = useParams() as any;
  const projectSlug = params?.slug as string;
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!projectSlug) return;
      try {
        const res = await fetch(`/api/projects/${encodeURIComponent(projectSlug)}`);
        if (res.ok) {
          const { data } = await res.json();
          if (data) {
            setProject({
              name: data.name,
              client: data.client,
              role: data.role,
              duration: data.duration,
              color: data.color,
              heroText: data.heroText,
              heroImage: data.heroImage,
              solutionImage: data.solutionImage,
              summary: data.summary,
              problem: data.problem,
              solution: data.solution,
              techStack: data.techStack || [],
              metrics: data.metrics || [],
              thoughtProcess: data.thoughtProcess || [],
              process: data.process || { dfd: {}, prototyping: {} }
            });
          }
        }
      } catch (error) {
        console.error("Failed to load project:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [projectSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <span className="text-off-white/50 font-mono tracking-widest uppercase animate-pulse">Initializing Data.Log...</span>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center">
        <span className="text-off-white/50 font-mono tracking-widest uppercase mb-4">404 - Log Not Found</span>
        <Link href="/projects" className="px-6 py-3 border border-gridline bg-navy text-off-white font-mono uppercase text-sm hover:bg-electric-blue transition-colors">Return to Archive</Link>
      </div>
    );
  }

  const bgClasses: Record<string, string> = {
    "neon-cyan": "bg-neon-cyan",
    "cyber-yellow": "bg-cyber-yellow",
    "hot-pink": "bg-hot-pink",
    "neon-green": "bg-neon-green",
    "electric-blue": "bg-electric-blue",
    "neon-purple": "bg-neon-purple",
  };

  const textClasses: Record<string, string> = {
    "neon-cyan": "text-neon-cyan",
    "cyber-yellow": "text-cyber-yellow",
    "hot-pink": "text-hot-pink",
    "neon-green": "text-neon-green",
    "electric-blue": "text-electric-blue",
    "neon-purple": "text-neon-purple",
  };

  const borderClasses: Record<string, string> = {
    "neon-cyan": "border-neon-cyan",
    "cyber-yellow": "border-cyber-yellow",
    "hot-pink": "border-hot-pink",
    "neon-green": "border-neon-green",
    "electric-blue": "border-electric-blue",
    "neon-purple": "border-neon-purple",
  };

  return (
    <div className="relative w-full bg-charcoal min-h-screen">
      <LineOverlay />
      <VectorGrid className={`opacity-10 ${textClasses[project.color]}`} />
      <GeometricShapes className="opacity-20 mix-blend-screen z-0" />
      <HandDrawnLines className="opacity-20 z-0" />
      <MagneticField className={`absolute top-0 right-0 opacity-10 -translate-y-1/2 w-full max-w-[1000px] ${textClasses[project.color]}`} />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col justify-end pt-32 pb-16 border-b-[1px] border-gridline overflow-hidden bg-navy/80 backdrop-blur-sm">
        {project.heroImage && (
          <div className="absolute inset-0 z-0">
            <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover opacity-40 mix-blend-luminosity filter saturate-200" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-navy/50 mix-blend-multiply" />
          </div>
        )}
        <TopographicPattern className={`${textClasses[project.color]} opacity-10 absolute inset-0 mix-blend-screen scale-150 z-0`} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-12 border-x border-gridline pt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`bg-charcoal border px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest ${textClasses[project.color]} ${borderClasses[project.color]} shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                  Project Initialized By Suraj
                </span>
                <span className="text-off-white/60 font-mono text-xs tracking-widest uppercase">
                  Data.Log // {project.name}
                </span>
              </div>
              <h1 className="font-grotesk font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter text-off-white leading-[0.85] mb-8 uppercase">
                {project.heroText}
              </h1>
            </motion.div>
        </div>
      </section>

      {/* Meta Specs */}
      <section className="py-12 border-b-[1px] border-gridline bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-x border-gridline">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="text-off-white/40 font-mono text-xs font-bold uppercase tracking-widest mb-2">Entity</p>
              <p className="text-off-white font-grotesk font-medium text-lg">{project.client}</p>
            </div>
            <div>
              <p className="text-off-white/40 font-mono text-xs font-bold uppercase tracking-widest mb-2">Protocol Role</p>
              <p className="text-off-white font-grotesk font-medium text-lg">{project.role}</p>
            </div>
            <div>
              <p className="text-off-white/40 font-mono text-xs font-bold uppercase tracking-widest mb-2">Execution Time</p>
              <p className="text-off-white font-grotesk font-medium text-lg">{project.duration}</p>
            </div>
            <div>
               <a href="#" className={`inline-flex items-center gap-2 font-mono font-bold uppercase tracking-widest text-sm hover:underline ${textClasses[project.color]}`}>
                 Live Target <ArrowUpRight size={16} />
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Narrative */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-x border-gridline">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <span className={`font-mono text-xs tracking-widest uppercase mb-4 block ${textClasses[project.color]}`}>{"// Initialization"}</span>
            <h2 className="font-grotesk font-black text-4xl md:text-5xl mb-6 text-off-white tracking-tighter">THE VISION</h2>
            <p className="text-xl text-off-white/70 font-grotesk font-light leading-relaxed mb-12">{project.summary}</p>
            
            {project.solutionImage && (
              <div className={`relative aspect-square md:aspect-video lg:aspect-square border p-2 backdrop-blur-sm ${borderClasses[project.color]}`}>
                <div className={`absolute -inset-0.5 bg-current ${textClasses[project.color]} opacity-20 blur-xl z-0`} />
                <img 
                  src={project.solutionImage} 
                  alt="Solution Context" 
                  className="w-full h-full object-cover filter mix-blend-screen opacity-90 hover:opacity-100 transition-opacity duration-500 relative z-10" 
                />
                <div className={`absolute bottom-0 right-0 p-3 text-[10px] font-mono uppercase bg-charcoal border-t border-l ${borderClasses[project.color]} ${textClasses[project.color]} z-20`}>
                  VISUAL_ASSET.JPG
                </div>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-6 lg:col-start-7 space-y-16">
            <div className="bg-navy border border-gridline p-8 relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-1 h-full ${bgClasses[project.color]}`} />
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 border border-gridline bg-charcoal ${textClasses[project.color]}`}>
                  <Play size={20} />
                </div>
                <h3 className="font-mono font-bold text-xl tracking-widest uppercase text-off-white">The Conflict</h3>
              </div>
              <p className="text-off-white/60 font-grotesk leading-relaxed font-light text-lg">{project.problem}</p>
            </div>

            <div className="bg-navy border border-gridline p-8 relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-1 h-full ${bgClasses[project.color]}`} />
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 border border-gridline bg-charcoal ${textClasses[project.color]}`}>
                  <Code2 size={20} />
                </div>
                <h3 className="font-mono font-bold text-xl tracking-widest uppercase text-off-white">My Solution</h3>
              </div>
              <p className="text-off-white/60 font-grotesk leading-relaxed font-light text-lg">{project.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Thought Process */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-x border-gridline bg-gradient-to-b from-navy/30 to-charcoal">
        <div className="mb-16">
          <span className={`font-mono text-xs tracking-widest uppercase mb-4 block ${textClasses[project.color]}`}>{"// Cognitive Flow"}</span>
          <h2 className="font-grotesk font-black text-4xl md:text-5xl mb-6 text-off-white tracking-tighter">THOUGHT PROCESS.</h2>
        </div>
        <div className="relative border-l border-gridline ml-4 md:ml-8 pl-8 md:pl-16 space-y-24">
          {project.thoughtProcess?.map((step: any, index: number) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="relative"
            >
              <div className={`absolute -left-[37px] md:-left-[69px] top-0 w-4 h-4 rounded-full border-2 bg-charcoal ${borderClasses[project.color]}`} />
              <div className={`absolute -left-[36px] md:-left-[68px] top-1 w-2 h-2 rounded-full ${bgClasses[project.color]} animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_10px_currentcolor] ${textClasses[project.color]}`} />
              
              <h3 className={`font-mono font-bold text-2xl tracking-widest uppercase mb-4 ${textClasses[project.color]}`}>{step.title}</h3>
              <p className="text-xl text-off-white/70 font-grotesk font-light leading-relaxed max-w-3xl">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEW: Engineering Process (DFD & Prototyping) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-x border-gridline">
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <span className={`h-px w-12 bg-current ${textClasses[project.color]} glow-${project.color.split('-')[1]}`} />
            <h2 className="font-mono font-bold text-2xl tracking-widest uppercase text-off-white">Architecture & Data Flow</h2>
            <span className={`h-px flex-1 bg-gridline`} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className={`font-grotesk font-black text-4xl uppercase tracking-tighter ${textClasses[project.color]}`}>
                {project.process.dfd.title}
              </h3>
              <p className="text-xl text-off-white/70 font-grotesk font-light leading-relaxed">
                {project.process.dfd.description}
              </p>
            </div>
            <div className={`relative aspect-video border p-2 backdrop-blur-sm ${borderClasses[project.color]}`}>
              <div className={`absolute -inset-0.5 bg-current ${textClasses[project.color]} opacity-20 blur-xl z-0`} />
              <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/80 to-transparent z-10 pointer-events-none" />
              <img 
                src={project.process.dfd.image} 
                alt="Data Flow Diagram" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 relative z-0"
              />
              <div className={`absolute top-0 right-0 p-3 text-xs font-mono uppercase bg-charcoal border-b border-l ${borderClasses[project.color]} ${textClasses[project.color]} z-20 shadow-md`}>
                SYS_ARCH.PNG
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-12 flex-row-reverse text-right">
            <span className={`h-px w-12 bg-current ${textClasses[project.color]} glow-${project.color.split('-')[1]}`} />
            <h2 className="font-mono font-bold text-2xl tracking-widest uppercase text-off-white">Prototyping & Iteration</h2>
            <span className={`h-px flex-1 bg-gridline`} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`relative aspect-[4/3] border p-2 backdrop-blur-sm lg:order-1 order-2 ${borderClasses[project.color]}`}>
              <div className={`absolute -inset-0.5 bg-current ${textClasses[project.color]} opacity-20 blur-xl z-0`} />
              <div className="absolute inset-0 bg-gradient-to-bl from-charcoal/80 to-transparent z-10 pointer-events-none" />
              <img 
                src={project.process.prototyping.image} 
                alt="Prototyping Iterations" 
                className="w-full h-full object-cover filter mix-blend-screen opacity-80 hover:opacity-100 transition-all duration-700 hover:mix-blend-normal relative z-0"
              />
              <div className={`absolute bottom-0 left-0 p-3 text-xs font-mono uppercase bg-charcoal border-t border-r ${borderClasses[project.color]} ${textClasses[project.color]} z-20 shadow-md`}>
                UI_ITERATIONS.FIG
              </div>
            </div>
            <div className="space-y-6 lg:order-2 order-1 text-left lg:text-right">
              <h3 className={`font-grotesk font-black text-4xl uppercase tracking-tighter ${textClasses[project.color]}`}>
                {project.process.prototyping.title}
              </h3>
              <p className="text-xl text-off-white/70 font-grotesk font-light leading-relaxed">
                {project.process.prototyping.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Phased Creation Section - Highlight of Suraj's work */}
      <section className="relative py-32 bg-navy border-y border-gridline overflow-hidden">
        <VectorGrid className="opacity-20 text-electric-blue" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full border-x border-gridline">
           <div className="text-center mb-24 relative z-10">
              <span className={`font-mono font-bold text-xs uppercase tracking-widest block mb-4 ${textClasses[project.color]}`}>Execution Blueprint</span>
              <h2 className="font-grotesk font-black text-6xl tracking-tighter text-off-white">MY FOUR PHASE PROTOCOL.</h2>
              <p className="text-off-white/60 font-grotesk font-light text-lg mt-6 max-w-2xl mx-auto">This is exactly how I orchestrated the build from a raw concept to a fully realized production environment.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-gridline border border-gridline bg-charcoal relative z-10">
              {[
                { phase: "01", title: "DISCOVERY", quality: "Obsessive Deep Dive", desc: "Before writing a single line of code, I map the entire psychological and technical surface area of the product." },
                { phase: "02", title: "ARCHITECTURE", quality: "Scalable Precision", desc: "Setting up a bulletproof Next.js foundation, defining schemas, and constructing the structural grid system." },
                { phase: "03", title: "EXECUTION", quality: "Relentless Coding", desc: "Isolating myself to build out the components, injecting Framer Motion math, and wiring the entire application together." },
                { phase: "04", title: "LAUNCH", quality: "Zero Tolerance deployment", desc: "Running intense QA, performance audits, and ensuring the final live build matches the visual perfection of the design." }
              ].map((step, i) => (
                <div key={i} className="p-8 group hover:bg-navy transition-colors relative">
                   <span className={`absolute top-4 right-6 font-grotesk font-black text-5xl opacity-10 group-hover:opacity-40 transition-opacity ${textClasses[project.color]}`}>{step.phase}</span>
                   <h3 className="font-mono font-bold text-xl text-off-white tracking-widest mb-2 mt-12">{step.title}</h3>
                   <span className={`text-[10px] font-mono tracking-widest uppercase mb-4 block border px-2 py-1 inline-block ${borderClasses[project.color]} ${textClasses[project.color]} shadow-[0_0_15px_rgba(255,255,255,0.05)]`}>{step.quality}</span>
                   <p className="text-off-white/60 font-grotesk font-light text-xs leading-loose">{step.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Big Impact Numbers wrapped in ColorBlock style context */}
      <div className={`border-b border-gridline`}>
        <div className="max-w-7xl mx-auto border-x border-gridline">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gridline">
            {project.metrics.map((metric: any, i: number) => (
               <div key={i} className={`p-12 text-center md:text-left bg-charcoal backdrop-blur-md hover:${bgClasses[project.color]} hover:bg-opacity-10 transition-colors group`}>
                 <p className={`font-grotesk font-black text-6xl lg:text-7xl tracking-tighter mb-4 text-off-white transition-colors`}>{metric.value}</p>
                 <p className={`font-mono font-bold uppercase tracking-widest text-xs ${textClasses[project.color]} transition-colors`}>{metric.label}</p>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-x border-gridline">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
           <div>
             <span className={`font-mono font-bold text-xs tracking-widest uppercase mb-3 block ${textClasses[project.color]}`}>{"</> Core Components"}</span>
             <h2 className="font-grotesk font-black text-5xl tracking-tighter text-off-white">MY TECH STACK.</h2>
           </div>
           <Layers className={`opacity-40 ${textClasses[project.color]}`} size={64} />
        </div>
        <div className="flex flex-wrap gap-4 px-2">
          {project.techStack.map((tech: string) => (
            <div key={tech} className={`px-6 py-4 bg-navy border font-mono font-bold text-sm tracking-widest uppercase text-off-white hover:bg-charcoal transition-colors cursor-default ${borderClasses[project.color]}`}>
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* Next Project CTA Footer */}
      <section className="relative py-40 border-t-[1px] border-gridline flex items-center justify-center text-center overflow-hidden bg-navy">
         <MagneticField className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] text-hot-pink opacity-20 animate-[spin_60s_linear_infinite]" />
         <div className="relative z-10 max-w-3xl px-4">
            <p className="text-off-white/40 font-mono font-bold text-xs tracking-widest uppercase mb-6">Review Next Implementation</p>
            <Link href="/projects">
              <h2 className="font-grotesk font-black text-5xl md:text-7xl tracking-tighter mb-10 text-off-white hover:text-electric-blue transition-colors hover:glow-cyan">
                 RETURN TO ARCHIVE.
              </h2>
            </Link>
            <Link href="/projects" className="px-10 py-5 bg-charcoal border border-gridline text-off-white font-mono font-bold tracking-widest uppercase hover:bg-electric-blue transition-all">
               View All
            </Link>
         </div>
      </section>
    </div>
  );
}
