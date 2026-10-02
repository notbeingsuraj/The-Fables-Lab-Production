/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import LineOverlay from "@/components/ui/LineOverlay";
import ProjectCard from "@/components/ui/ProjectCard";
import { VectorGrid, GeometricShapes, HandDrawnLines } from "@/components/ui/PhysicsIllustrations";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects");
        const { data } = await res.json();
        if (res.ok && Array.isArray(data)) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);
  return (
    <div className="relative w-full bg-transparent min-h-screen pt-24 pb-32">
      <LineOverlay />
      <VectorGrid className="opacity-10" />
      <GeometricShapes className="opacity-60 mix-blend-screen z-0" />
      <HandDrawnLines className="opacity-50 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full border-x border-gridline pt-12">
        {/* Header */}
        <div className="border-b border-gridline pb-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cobalt font-mono font-bold text-xs tracking-widest uppercase mb-4 block">{"// Our Work"}</span>
            <h1 className="font-grotesk italic font-light text-6xl md:text-8xl tracking-tighter text-off-white mb-6 leading-[0.9]">
              SELECTED <br />
              <span className="font-grotesk not-italic font-black text-transparent text-stroke">
                PROJECTS.
              </span>
            </h1>
            <p className="text-xl text-off-white/70 max-w-2xl font-grotesk font-light leading-relaxed">
              We move fast and break legacy paradigms. Here is a selection of MVPs, platforms, and digital experiences we&apos;ve engineered from the ground up out of Chandigarh University TBI.
            </p>
          </motion.div>
        </div>

        {/* Filters/Categories (Static visual for now) */}
        <div className="flex flex-wrap gap-4 mb-16 px-4">
          {["All Work", "SaaS", "FinTech", "PropTech", "AI / ML", "E-Commerce"].map((tag, i) => (
             <button 
                key={tag} 
                className={`px-5 py-2 border text-xs font-mono uppercase tracking-widest transition-colors ${
                  i === 0 
                  ? 'border-off-white bg-off-white text-charcoal shadow-[0_0_15px_rgba(244,244,240,0.3)]' 
                  : 'border-gridline text-off-white/70 hover:border-off-white hover:text-off-white bg-charcoal/50 backdrop-blur-md'
                }`}
             >
               {tag}
             </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-y border-gridline divide-y md:divide-y-0 md:divide-x divide-gridline min-h-[50vh]">
          {loading ? (
             <div className="col-span-full flex items-center justify-center p-20">
               <span className="text-off-white/50 font-mono tracking-widest uppercase animate-pulse">Loading Archive...</span>
             </div>
          ) : projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-4 md:p-8"
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
        
        {/* Load More CTA Placeholder */}
        <div className="mt-20 flex justify-center border-t border-gridline pt-16">
          <button className="px-8 py-4 border border-gridline font-mono bg-charcoal text-off-white font-bold text-sm tracking-widest uppercase hover:bg-white/5 transition-colors">
            Load More Archive
          </button>
        </div>
      </div>
    </div>
  );
}
