"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createProjectAction } from "../../actions";

export default function AdminNewProjectPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    client: "",
    role: "",
    duration: "",
    color: "neon-cyan",
    heroText: "",
    heroImage: "",
    solutionImage: "",
    summary: "",
    problem: "",
    solution: "",
    techStack: "",
  });

  const [metrics, setMetrics] = useState([{ label: "", value: "" }]);
  const [thoughtProcess, setThoughtProcess] = useState([{ id: 1, title: "", text: "" }]);
  
  const [process, setProcess] = useState({
    dfd: { title: "DATA FLOW Architecture", description: "", image: "" },
    prototyping: { title: "ITERATIVE PROTOTYPING", description: "", image: "" }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMetricChange = (index: number, field: string, value: string) => {
    const newMetrics = [...metrics];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    setMetrics(newMetrics);
  };

  const handleThoughtProcessChange = (index: number, field: string, value: string) => {
    const newProcess = [...thoughtProcess];
    newProcess[index] = { ...newProcess[index], [field]: value };
    setThoughtProcess(newProcess);
  };

  const handleProcessChange = (section: 'dfd' | 'prototyping', field: string, value: string) => {
    setProcess({
      ...process,
      [section]: { ...process[section], [field]: value }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const payload = {
      ...formData,
      techStack: formData.techStack.split(",").map(t => t.trim()).filter(Boolean),
      metrics: metrics.filter(m => m.label && m.value),
      thoughtProcess: thoughtProcess.filter(t => t.title && t.text),
      process
    };

    const res = await createProjectAction(payload);
    
    setLoading(false);
    if (res.success) {
      setSuccess(true);
      window.scrollTo(0,0);
    } else {
      setError(res.error || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-off-white font-grotesk pb-32">
      {/* Header */}
      <div className="border-b border-gridline bg-navy/50 py-6 px-4 md:px-8 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/projects" className="p-2 border border-gridline hover:bg-off-white hover:text-charcoal transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="font-mono font-bold tracking-widest uppercase text-xl text-off-white">Admin Hub</h1>
              <p className="text-xs font-mono text-off-white/50 tracking-widest uppercase">/projects/new</p>
            </div>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-neon-cyan text-charcoal font-mono font-bold uppercase tracking-widest text-sm hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {loading ? "Deploying..." : <><Save size={18} /> Deploy Project</>}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {success && (
          <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="mb-8 p-4 border border-neon-green bg-neon-green/10 text-neon-green font-mono uppercase text-sm tracking-widest">
            Data.Log Successfully Written to MongoDB Core.
          </motion.div>
        )}
        {error && (
          <div className="mb-8 p-4 border border-hot-pink bg-hot-pink/10 text-hot-pink font-mono uppercase text-sm tracking-widest">
            ERR: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-16">
          
          {/* Section 1: Core Identities */}
          <section className="space-y-6">
            <div className="border-b border-gridline pb-4 mb-8">
              <h2 className="font-mono font-bold text-lg tracking-widest uppercase text-off-white">01. Identity & Routing</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-mono text-xs text-off-white/60 uppercase tracking-widest">URL Slug (Primary Key)</label>
                <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full bg-navy border border-gridline p-4 text-off-white font-mono focus:border-neon-cyan focus:outline-none transition-colors" placeholder="e.g., carefree" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs text-off-white/60 uppercase tracking-widest">Project Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-navy border border-gridline p-4 text-off-white font-mono focus:border-neon-cyan focus:outline-none transition-colors" placeholder="Carefree Mobility" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs text-off-white/60 uppercase tracking-widest">Client / Entity</label>
                <input required type="text" name="client" value={formData.client} onChange={handleChange} className="w-full bg-navy border border-gridline p-4 text-off-white font-mono focus:border-neon-cyan focus:outline-none transition-colors" placeholder="Carefree Auth" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs text-off-white/60 uppercase tracking-widest">Protocol Role</label>
                <input required type="text" name="role" value={formData.role} onChange={handleChange} className="w-full bg-navy border border-gridline p-4 text-off-white font-mono focus:border-neon-cyan focus:outline-none transition-colors" placeholder="Full-Stack Architect" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs text-off-white/60 uppercase tracking-widest">Execution Time</label>
                <input required type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-navy border border-gridline p-4 text-off-white font-mono focus:border-neon-cyan focus:outline-none transition-colors" placeholder="4 Weeks" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs text-off-white/60 uppercase tracking-widest">Theme Color</label>
                <select name="color" value={formData.color} onChange={handleChange} className="w-full bg-navy border border-gridline p-4 text-off-white font-mono focus:border-neon-cyan focus:outline-none transition-colors appearance-none">
                  <option value="neon-cyan">Neon Cyan</option>
                  <option value="cyber-yellow">Cyber Yellow</option>
                  <option value="hot-pink">Hot Pink</option>
                  <option value="neon-green">Neon Green</option>
                  <option value="electric-blue">Electric Blue</option>
                  <option value="neon-purple">Neon Purple</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: Narrative */}
          <section className="space-y-6">
            <div className="border-b border-gridline pb-4 mb-8">
              <h2 className="font-mono font-bold text-lg tracking-widest uppercase text-off-white">02. Visuals & Narrative</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-mono text-xs text-off-white/60 uppercase tracking-widest">Hero Landing Text</label>
                <input required type="text" name="heroText" value={formData.heroText} onChange={handleChange} className="w-full bg-navy border border-gridline p-4 text-off-white font-mono text-xl focus:border-neon-cyan focus:outline-none transition-colors" placeholder="REINVENTING RENTALS." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs text-off-white/60 uppercase tracking-widest">Hero BG Image (Unsplash URL)</label>
                  <input required type="url" name="heroImage" value={formData.heroImage} onChange={handleChange} className="w-full bg-navy border border-gridline p-4 text-off-white font-mono text-xs focus:border-neon-cyan focus:outline-none transition-colors" placeholder="https://images.unsplash.com/..." />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs text-off-white/60 uppercase tracking-widest">Solution Block Image (Unsplash URL)</label>
                  <input type="url" name="solutionImage" value={formData.solutionImage} onChange={handleChange} className="w-full bg-navy border border-gridline p-4 text-off-white font-mono text-xs focus:border-neon-cyan focus:outline-none transition-colors" placeholder="https://images.unsplash.com/..." />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="font-mono text-xs text-off-white/60 uppercase tracking-widest">The Vision Summary</label>
                <textarea required name="summary" value={formData.summary} onChange={handleChange} rows={4} className="w-full bg-navy border border-gridline p-4 text-off-white focus:border-neon-cyan focus:outline-none transition-colors resize-none font-light" placeholder="Carefree needed a way to penetrate..."></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs text-off-white/60 uppercase tracking-widest">The Conflict (Problem)</label>
                  <textarea required name="problem" value={formData.problem} onChange={handleChange} rows={5} className="w-full bg-navy border border-gridline p-4 text-off-white focus:border-neon-cyan focus:outline-none transition-colors resize-none font-light" placeholder="Traditional platforms are bloated..."></textarea>
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs text-off-white/60 uppercase tracking-widest">My Solution</label>
                  <textarea required name="solution" value={formData.solution} onChange={handleChange} rows={5} className="w-full bg-navy border border-gridline p-4 text-off-white focus:border-neon-cyan focus:outline-none transition-colors resize-none font-light" placeholder="I deployed a Next.js architecture..."></textarea>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs text-off-white/60 uppercase tracking-widest">Tech Stack (Comma Separated)</label>
                <input required type="text" name="techStack" value={formData.techStack} onChange={handleChange} className="w-full bg-navy border border-gridline p-4 text-off-white font-mono focus:border-neon-cyan focus:outline-none transition-colors" placeholder="Next.js, Tailwind CSS, Stripe API" />
              </div>
            </div>
          </section>

          {/* Section 3: Arrays & Nested Data */}
          <section className="space-y-12">
            <div className="border-b border-gridline pb-4 mb-8 flex justify-between items-end">
              <h2 className="font-mono font-bold text-lg tracking-widest uppercase text-off-white">03. Impact Metrics</h2>
              <button type="button" onClick={() => setMetrics([...metrics, {label:'', value:''}])} className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neon-cyan hover:underline">
                <Plus size={14} /> Add Metric
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metrics.map((metric, i) => (
                <div key={i} className="border border-gridline p-4 bg-navy relative group">
                  <button type="button" onClick={() => setMetrics(metrics.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-off-white/30 hover:text-hot-pink transition-colors">
                    <Trash2 size={16} />
                  </button>
                  <div className="space-y-4 pt-4">
                    <input type="text" value={metric.value} onChange={(e) => handleMetricChange(i, 'value', e.target.value)} className="w-full bg-transparent border-b border-gridline pb-2 text-off-white font-grotesk font-black text-2xl focus:border-neon-cyan focus:outline-none" placeholder="28 Days / 99%" />
                    <input type="text" value={metric.label} onChange={(e) => handleMetricChange(i, 'label', e.target.value)} className="w-full bg-transparent border-none text-off-white/60 font-mono text-xs uppercase tracking-widest focus:outline-none" placeholder="LABEL (E.G. LAUNCH TIME)" />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-b border-gridline pb-4 mb-8 flex justify-between items-end pt-8">
              <h2 className="font-mono font-bold text-lg tracking-widest uppercase text-off-white">04. Cognitive Flow (Thought Process)</h2>
              <button type="button" onClick={() => setThoughtProcess([...thoughtProcess, {id: thoughtProcess.length + 1, title:'', text:''}])} className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neon-cyan hover:underline">
                <Plus size={14} /> Add Step
              </button>
            </div>

            <div className="space-y-6">
              {thoughtProcess.map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="p-4 border border-gridline bg-charcoal text-off-white/50 font-mono font-bold">{String(i+1).padStart(2, '0')}</div>
                  <div className="flex-1 space-y-4 border border-gridline bg-navy p-6 relative">
                    <button type="button" onClick={() => setThoughtProcess(thoughtProcess.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-off-white/30 hover:text-hot-pink transition-colors">
                      <Trash2 size={16} />
                    </button>
                    <input type="text" value={step.title} onChange={(e) => handleThoughtProcessChange(i, 'title', e.target.value)} className="w-full md:w-2/3 bg-transparent border-b border-gridline pb-2 text-off-white font-mono font-bold tracking-widest uppercase focus:border-neon-cyan focus:outline-none" placeholder="01. SPRINT PLANNING..." />
                    <textarea value={step.text} onChange={(e) => handleThoughtProcessChange(i, 'text', e.target.value)} rows={3} className="w-full bg-transparent border-none text-off-white/70 font-grotesk font-light resize-none focus:outline-none" placeholder="Describe the thought process..."></textarea>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-b border-gridline pb-4 mb-8 pt-8">
              <h2 className="font-mono font-bold text-lg tracking-widest uppercase text-off-white">05. Engineering Process Blocks</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* DFD Block */}
              <div className="p-8 border border-gridline bg-navy space-y-4">
                <h3 className="font-mono font-bold uppercase tracking-widest text-xs text-neon-cyan mb-6">Block 1: Data Flow / Architecture</h3>
                <input type="text" value={process.dfd.title} onChange={(e) => handleProcessChange('dfd', 'title', e.target.value)} className="w-full bg-transparent border-b border-gridline pb-2 text-off-white font-grotesk font-black text-2xl uppercase focus:border-neon-cyan focus:outline-none" placeholder="DATA FLOW Title" />
                <textarea value={process.dfd.description} onChange={(e) => handleProcessChange('dfd', 'description', e.target.value)} rows={4} className="w-full bg-transparent border-b border-gridline pb-2 text-off-white/70 font-grotesk font-light resize-none focus:border-neon-cyan focus:outline-none" placeholder="Describe the DFD..."></textarea>
                <input type="url" value={process.dfd.image} onChange={(e) => handleProcessChange('dfd', 'image', e.target.value)} className="w-full bg-transparent border-b border-gridline pb-2 text-off-white font-mono text-xs focus:border-neon-cyan focus:outline-none" placeholder="Unsplash Image URL" />
              </div>

              {/* Prototyping Block */}
              <div className="p-8 border border-gridline bg-navy space-y-4">
                <h3 className="font-mono font-bold uppercase tracking-widest text-xs text-hot-pink mb-6">Block 2: Prototyping / Iterations</h3>
                <input type="text" value={process.prototyping.title} onChange={(e) => handleProcessChange('prototyping', 'title', e.target.value)} className="w-full bg-transparent border-b border-gridline pb-2 text-off-white font-grotesk font-black text-2xl uppercase focus:border-hot-pink focus:outline-none" placeholder="PROTOTYPING Title" />
                <textarea value={process.prototyping.description} onChange={(e) => handleProcessChange('prototyping', 'description', e.target.value)} rows={4} className="w-full bg-transparent border-b border-gridline pb-2 text-off-white/70 font-grotesk font-light resize-none focus:border-hot-pink focus:outline-none" placeholder="Describe the prototyping..."></textarea>
                <input type="url" value={process.prototyping.image} onChange={(e) => handleProcessChange('prototyping', 'image', e.target.value)} className="w-full bg-transparent border-b border-gridline pb-2 text-off-white font-mono text-xs focus:border-hot-pink focus:outline-none" placeholder="Unsplash Image URL" />
              </div>
            </div>

          </section>

        </form>
      </div>
    </div>
  );
}
