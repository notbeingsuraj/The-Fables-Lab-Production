/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import LineOverlay from "@/components/ui/LineOverlay";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { VectorGrid, GeometricShapes, HandDrawnLines } from "@/components/ui/PhysicsIllustrations";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project_name: "",
    architecture_details: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        project_name: "",
        architecture_details: "",
      });
    } catch (error: any) {
      console.error("Submit error:", error);
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="relative w-full bg-transparent min-h-screen pt-32 pb-24">
      <LineOverlay />
      <VectorGrid className="opacity-10" />
      <GeometricShapes className="opacity-60 mix-blend-screen z-0" />
      <HandDrawnLines className="opacity-50 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-16 pt-12 text-center border-x border-gridline bg-charcoal/50 pb-16">
            <span className="text-neon-cyan font-mono font-bold text-xs tracking-widest uppercase mb-4 block">{"// Initialize Sequence"}</span>
            <h1 className="font-grotesk font-black text-6xl md:text-8xl tracking-tighter text-off-white mb-8">
              Want to Contribute ? <br />
              <span className="font-grotesk italic font-light text-transparent text-stroke">
                
              </span>
            </h1>
            <p className="text-xl text-off-white/70 max-w-2xl mx-auto font-grotesk font-light leading-relaxed">
              Skip the agency bloat. We build precise, high-performance MVPs in 30 days. Define parameters below via standard protocol.
            </p>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border border-gridline bg-charcoal p-8 md:p-16">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-12 pr-8 border-b md:border-b-0 md:border-r border-gridline pb-12 md:pb-0">
               <div>
                  <h3 className="font-grotesk italic font-light text-3xl md:text-5xl text-off-white mb-6">THE STUDIO</h3>
                  <p className="text-off-white/60 font-grotesk font-light text-lg leading-relaxed mb-8">
                     We operate out of Chandigarh but we have felt our presence everywhere. We selective about the projects we take on. If you&apos;re a founder with a clear vision, we want to hear from you.
                  </p>
               </div>
               
               <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                     <div className="w-12 h-12 border border-gridline bg-navy flex items-center justify-center group-hover:bg-electric-blue group-hover:border-electric-blue transition-colors">
                        <Mail className="text-off-white group-hover:text-white" size={20} />
                     </div>
                     <div>
                        <p className="text-off-white/40 font-mono text-xs font-bold uppercase tracking-widest mb-1">Comm.Link</p>
                        <p className="text-off-white font-mono text-sm tracking-widest uppercase">imysuraj1218@gmail.com</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                     <div className="w-12 h-12 border border-gridline bg-navy flex items-center justify-center group-hover:bg-hot-pink group-hover:border-hot-pink transition-colors">
                        <MapPin className="text-off-white group-hover:text-white" size={20} />
                     </div>
                     <div>
                        <p className="text-off-white/40 font-mono text-xs font-bold uppercase tracking-widest mb-1">Base.Coords</p>
                        <p className="text-off-white font-mono text-sm tracking-widest uppercase">Aura Avenue, Mohali, Punjab</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* High-Contrast Brutalist Form */}
            <div className="lg:col-span-7">
               <form onSubmit={handleSubmit} className="bg-navy/50 border border-gridline p-8 md:p-12 backdrop-blur-md relative overflow-hidden">
                  <VectorGrid className="opacity-20 text-electric-blue" />
                  <div className="relative z-10">
                      {status === "success" && (
                        <div className="mb-8 p-4 bg-neon-green/10 border border-neon-green text-neon-green font-mono text-sm tracking-widest text-center">
                          Data Transmitted Successfully. We will be in touch.
                        </div>
                      )}
                      {status === "error" && (
                        <div className="mb-8 p-4 bg-hot-pink/10 border border-hot-pink text-hot-pink font-mono text-sm tracking-widest text-center">
                          Error: {errorMessage}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                         <div className="space-y-2">
                            <label className="text-off-white/50 font-mono text-xs font-bold uppercase tracking-widest px-2 block">Name</label>
                            <input 
                              type="text" 
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="John Doe" 
                              className="w-full bg-charcoal border border-gridline px-6 py-4 font-mono text-sm tracking-widest text-off-white focus:outline-none focus:border-neon-cyan transition-colors rounded-none placeholder:text-gridline" 
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-off-white/50 font-mono text-xs font-bold uppercase tracking-widest px-2 block">Email</label>
                            <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="john@startup.com" 
                              className="w-full bg-charcoal border border-gridline px-6 py-4 font-mono text-sm tracking-widest text-off-white focus:outline-none focus:border-neon-cyan transition-colors rounded-none placeholder:text-gridline" 
                            />
                         </div>
                      </div>

                      <div className="space-y-2 mb-6">
                         <label className="text-off-white/50 font-mono text-xs font-bold uppercase tracking-widest px-2 block">System / Project Name</label>
                         <input 
                           type="text" 
                           name="project_name"
                           value={formData.project_name}
                           onChange={handleChange}
                           required
                           placeholder="Acme Inc." 
                           className="w-full bg-charcoal border border-gridline px-6 py-4 font-mono text-sm tracking-widest text-off-white focus:outline-none focus:border-neon-cyan transition-colors rounded-none placeholder:text-gridline" 
                         />
                      </div>

                      <div className="space-y-2 mb-10">
                         <label className="text-off-white/50 font-mono text-xs font-bold uppercase tracking-widest px-2 block">Architecture Details</label>
                         <textarea 
                           name="architecture_details"
                           value={formData.architecture_details}
                           onChange={handleChange}
                           required
                           rows={5} 
                           placeholder="Tell us about the vision, timeline, and current state..." 
                           className="w-full bg-charcoal border border-gridline px-6 py-4 font-mono text-sm tracking-widest text-off-white focus:outline-none focus:border-neon-cyan transition-colors resize-none rounded-none placeholder:text-gridline" 
                         />
                      </div>

                      <button 
                        type="submit" 
                        disabled={status === "submitting"}
                        className="w-full py-5 bg-cyber-yellow text-charcoal font-mono font-bold uppercase tracking-widest text-sm hover:glow-yellow transition-all flex items-center justify-center gap-2 border border-gridline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                         {status === "submitting" ? "Transmitting..." : "Transmit Data"} <ArrowRight size={18} />
                      </button>
                  </div>
               </form>
            </div>

         </div>
      </div>
    </div>
  );
}
