/**
 * Seed data for the `projects` collection.
 *
 * Auto-extracted from the former scripts/setup-db.ts (Supabase era) so the
 * portfolio content carries over to MongoDB unchanged.
 *
 * Imported by: scripts/seed-projects.ts
 */

export interface SeedProject {
  slug: string;
  name: string;
  description: string;
  thumbnail: string;
  tags: string[];
  client: string;
  role: string;
  duration: string;
  color: string;
  heroText: string;
  heroImage: string;
  solutionImage: string;
  summary: string;
  problem: string;
  solution: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  thoughtProcess: { id: number; title: string; text: string }[];
  process: {
    dfd: { title: string; description: string; image: string };
    prototyping: { title: string; description: string; image: string };
  };
}

const PROJECTS_DATA: Record<string, SeedProject> = {
  carefree: {
    slug: "carefree",
    name: "Carefree Mobility",
    description:
      "Premium car rental MVP built with Next.js. Fluid UI and performance-focused implementation.",
    thumbnail:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    tags: ["Next.js", "Tailwind", "Supabase"],
    client: "Carefree Auth",
    role: "Full-Stack Architect",
    duration: "4 Weeks",
    color: "neon-cyan",
    heroText: "REINVENTING RENTALS.",
    heroImage:
      "https://images.unsplash.com/photo-1510279931157-4caac8cbb72c?q=80&w=2000&auto=format&fit=crop",
    solutionImage:
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2000&auto=format&fit=crop",
    summary:
      "Carefree needed a way to penetrate the stagnant car rental market with a Gen-Z focused, mobile-first approach. I stepped in and architected a high-performance web application featuring instant booking algorithms, immersive WebGL interactions, and a cinematic dark mode UI. I spent countless late nights refining every micro-interaction to ensure it blew away their previous sluggish metrics.",
    problem:
      "Traditional car rental platforms are bloated, slow, and visually unappealing to younger demographics. They lacked the technical firepower to build a custom solution from scratch in under a month, making it intensely frustrating for the client to watch competitors launch faster with inferior products.",
    solution:
      "I deployed a Next.js 14 architecture with a highly optimized Tailwind CSS design system. By leveraging Framer Motion for complex animations and a custom Headless CMS, I delivered an MVP that looks and feels like a multimillion-dollar product, engineered completely single-handedly over a brutal but rewarding sprint.",
    techStack: [
      "Next.js 14",
      "Tailwind CSS",
      "Framer Motion",
      "Supabase",
      "Stripe API",
    ],
    metrics: [
      { label: "Launch Time", value: "28 Days" },
      { label: "Performance", value: "99/100" },
      { label: "Conversion", value: "+314%" },
    ],
    thoughtProcess: [
      {
        id: 1,
        title: "01. Mental Model Deconstruction",
        text: "I tore apart existing car rental flows, analyzing exactly what makes them feel so painfully slow. The goal was to remove cognitive friction and reduce the clicks-to-book ratio by at least 60%.",
      },
      {
        id: 2,
        title: "02. Motion & Physics Ideation",
        text: "Because static UI feels cheap, I conceptualized a physics-based interaction model where buttons resist interaction and swipe gestures feel tactile, using heavy spring math in Framer Motion.",
      },
      {
        id: 3,
        title: "03. Aggressive Database Modeling",
        text: "To support instant availability checks, I denormalized the car availability schema in Postgres. This allowed me to fetch localized inventory in under 40ms globally.",
      },
      {
        id: 4,
        title: "04. Polish & Deployment",
        text: "The final stretch involved ruthless performance audits. I stripped out heavy JS libraries and moved computing to the edge, resulting in a 99/100 Lighthouse score.",
      },
    ],
    process: {
      dfd: {
        title: "DATA FLOW Architecture",
        description:
          "The application relies on a lightning-fast data pipeline. Every user interaction is instantly synced via real-time websockets, heavily optimized to prevent layout shifts. I obsessed over the database layer, specifically optimizing the PostgreSQL queries to achieve consistent sub-50ms latency across the board.",
        image:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
      },
      prototyping: {
        title: "ITERATIVE PROTOTYPING",
        description:
          "Moving from wireframe to production meant relentless iterations. Every micro-animation and transition was carefully sculpted in Framer Motion, ensuring the application felt tactile. The effort was astronomical—over 40 prototype versions were scrapped before we landed on the perfect, immersive feel.",
        image:
          "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop",
      },
    },
  },
  aethos: {
    slug: "aethos",
    description: "DeFi dashboard for institutional crypto management.",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    tags: ["React", "Web3", "D3.js"],
    name: "Aethos Finance",
    client: "Aethos Core",
    role: "Lead UI/UX & UI Engineer",
    duration: "6 Weeks",
    color: "cyber-yellow",
    heroText: "DEFI REDEFINED.",
    heroImage:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2000&auto=format&fit=crop",
    solutionImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    summary:
      "Aethos wanted to simplify complex institutional crypto management. I took their chaotic data models and transformed them into a breathtaking, modular UI. I built this dashboard to not just show data, but to command a cinematic experience, wrestling with raw WebSocket feeds for days to ensure absolute fluidity.",
    problem:
      "Their existing dashboard was a nightmare of disconnected tables and laggy Web3 components. It was actively scaring away institutional investors who expected premium, zero-latency fintech experiences, putting millions of TVL at risk.",
    solution:
      "I built a lightning-fast React architecture with D3.js integrated directly into Framer Motion contexts. The result was a shockingly smooth, hyper-visual terminal that made reading blockchain data feel like flying a spaceship. The visual density is high, but the cognitive load is effectively zero.",
    techStack: ["React", "Web3", "D3.js", "GraphQL", "Tailwind CSS"],
    metrics: [
      { label: "TVL Handled", value: "$40M+" },
      { label: "User Retention", value: "94%" },
      { label: "Render Time", value: "<100ms" },
    ],
    thoughtProcess: [
      {
        id: 1,
        title: "01. Information Hierarchy Mapping",
        text: "Dealing with institutional DeFi means drowning in data. I mapped out the core psychological needs of a trader: extreme clarity on volatile assets, and instant execution.",
      },
      {
        id: 2,
        title: "02. The Terminal Concept",
        text: "I rejected standard dashboard layouts and instead designed an 'operating system' or 'terminal' interface. This allowed for deeply nested, modular widgets that the user could freely configure.",
      },
      {
        id: 3,
        title: "03. Zero-Latency D3 Implementation",
        text: "Plotting thousands of candlesticks usually crashes React. I bypassed React's render cycle entirely for the charts, mounting D3 directly to the canvas for native-level GPU paint speeds.",
      },
      {
        id: 4,
        title: "04. Cinematic Execution",
        text: "Added subtle chromatic aberration and glow effects to positive/negative values. It makes making (or losing) money feel incredibly visceral and impactful.",
      },
    ],
    process: {
      dfd: {
        title: "STATE MANAGEMENT & DFD",
        description:
          "Cryptocurrency data is incredibly volatile. I engineered a strict state management DFD that completely isolated live price feeds from user input. This required massive architectural rewrites but guaranteed zero frame drops even during intense market volatility and thousands of ticks per second.",
        image:
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
      },
      prototyping: {
        title: "HIGH-FIDELITY ITERATIONS",
        description:
          "Financial dashboards demand extreme precision. I generated dozens of high-fidelity interface prototypes, refining typography, layout grids, and visual hierarchy until it felt like a tier-one banking terminal wrapped in a cyberpunk aesthetic. The visual iterations were exhausting but absolutely critical.",
        image:
          "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop",
      },
    },
  },
  lumina: {
    slug: "lumina",
    description: "Enterprise AI content generator prototype.",
    thumbnail: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop",
    tags: ["OpenAI", "Next.js", "Pinecone"],
    name: "Lumina AI",
    client: "Lumina Intelligence",
    role: "AI Systems Architect",
    duration: "3 Weeks",
    color: "hot-pink",
    heroText: "PURE INTELLIGENCE.",
    heroImage:
      "https://images.unsplash.com/photo-1677442135136-760c813028c0?q=80&w=2000&auto=format&fit=crop",
    solutionImage:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop",
    summary:
      "Lumina needed an enterprise AI content generator prototype fast. I went from concept to a fully functional, high-margin prototype in under 3 weeks. It was an exercise in intense focus, leveraging raw API power while crafting an interface that felt completely frictionless to end-users.",
    problem:
      "They were struggling with slow legacy LLMs and a heavily disjointed vector database approach. The UI was clunky, and generation operations were constantly timing out, completely destroying the user trust during demonstrations.",
    solution:
      "I entirely ripped out their legacy backend and wired OpenAI directly to Pinecone using edge-deployed Next.js API routes. I wrapped this raw power in an extremely vibrant, minimal, and premium interface. The application started generating revenue within days of its deployment.",
    techStack: ["OpenAI", "Next.js", "Pinecone", "SaaS", "Vercel"],
    metrics: [
      { label: "MRR Generated", value: "$10k+" },
      { label: "Latency Drop", value: "-60%" },
      { label: "Time to Market", value: "18 Days" },
    ],
    thoughtProcess: [
      {
        id: 1,
        title: "01. Prompt Engineering Foundation",
        text: "Before writing the UI, I spent a week locked in prompt optimization. I needed the LLM to return strictly structured JSON so I could programmatically render rich components, rather than dumping plain text.",
      },
      {
        id: 2,
        title: "02. The Magic Sandbox",
        text: "An AI tool needs to feel magical. I designed the input field to be the absolute center of the universe—a glowing, breathing component that reacts physically to user keystrokes.",
      },
      {
        id: 3,
        title: "03. Streaming UI Pipeline",
        text: "Waiting 15 seconds for a response is death for UX. I established an edge-streaming pipeline that parses LLM chunks in real-time, rendering UI elements instantly as the stream completes them.",
      },
      {
        id: 4,
        title: "04. Vector Caching",
        text: "To save API costs, I built a brutal caching layer using Pinecone. If a similar prompt was fired globally within a 90% vector similarity, it returned the cached result instantly, saving the client thousands.",
      },
    ],
    process: {
      dfd: {
        title: "AI PIPELINE ARCHITECTURE",
        description:
          "The AI data pipeline was constructed to sanitize prompts contextually before hitting the LLM APIs, utilizing Redis for aggressive edge caching. This Data Flow structure drastically reduced latency and token expenditure. I rigorously stress-tested the pipeline to handle massive usage spikes without degrading.",
        image:
          "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop",
      },
      prototyping: {
        title: "WIREFRAMING GENERATION",
        description:
          "Instead of standard block layouts, I heavily prototyped conversational and generative UI elements. I focused intensely on micro-feedback states—glowing text, morphing loaders—to ensure users always felt the AI was actively processing in real-time. It's the small visual cues that make AI feel like magic.",
        image:
          "https://images.unsplash.com/photo-1550684376-ef3dbceadd93?q=80&w=2000&auto=format&fit=crop",
      },
    },
  },
  strata: {
    slug: "strata",
    description: "PropTech marketplace for fractional real estate.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
    tags: ["React Native", "Firebase", "Stripe"],
    name: "Strata Homes",
    client: "Strata Investments",
    role: "Mobile/Web Architect",
    duration: "8 Weeks",
    color: "electric-blue",
    heroText: "FRACTIONAL FUTURE.",
    heroImage:
      "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2000&auto=format&fit=crop",
    solutionImage:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop",
    summary:
      "Strata is a PropTech marketplace designed to fractionalize real estate. I led the development of the primary investment portal from absolute scratch, ensuring military-grade transaction security wrapped tightly in an editorial, high-fashion aesthetic.",
    problem:
      "Buying fractional real estate felt like using an Excel spreadsheet. The client was bleeding potential high-net-worth individuals because the interface felt cheap. They wanted a platform that felt as premium and trustworthy as the multi-million dollar luxury properties they were fractionalizing.",
    solution:
      "By utilizing React Native and Firebase alongside a rigidly mathematical geometric design system, I created an investment platform that feels incredibly dynamic and trustworthy. Every screen transition was choreographed to instill a sense of absolute security and luxury.",
    techStack: ["React Native", "Firebase", "Stripe", "Next.js"],
    metrics: [
      { label: "Tx Volume", value: "$5M+" },
      { label: "Sec Audits", value: "Passed" },
      { label: "Onboarding", value: "<2 Mins" },
    ],
    thoughtProcess: [
      {
        id: 1,
        title: "01. Establishing Trust via Typography",
        text: "When asking users for $10,000+ fractional investments on a screen, trust is everything. I selected austere, razor-sharp typefaces and implemented intense grid logic to project total systemic stability.",
      },
      {
        id: 2,
        title: "02. High-Fashion Real Estate",
        text: "I engineered a custom image-loading pipeline that applies subtle color grading via canvas to property images, ensuring every listing looks like an editorial spread in Vogue Architecture.",
      },
      {
        id: 3,
        title: "03. Transactional Security Flows",
        text: "I mapped out an unbreakable State Machine for the checkout flow. The UI physically locked down during escrow verification, using deterministic loading sequences to communicate high security to the user.",
      },
      {
        id: 4,
        title: "04. Native Bridge Optimization",
        text: "To keep the mobile experience perfectly buttery, I wrote custom Native Modules for the React Native bridge to handle crypto-graphic signing without dropping a single UI frame.",
      },
    ],
    process: {
      dfd: {
        title: "TRANSACTIONAL DFD",
        description:
          "Handling real-estate fractionality required a strict edge-to-edge State Machine. The data flow mapped Escrow verifications dynamically, preventing locking states during heavy transaction volumes. Building this transactional flow required brutal attention to edge cases and database rollbacks.",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
      },
      prototyping: {
        title: "EDITORIAL PROTOTYPING",
        description:
          "The mockups were purposefully designed to feel like a digital luxury magazine. I iterated endlessly on subtle type-scales, grid alignments, and image aspect ratios. The goal was to ensure properties were presented flawlessly on everything from a massive 4K display to a cracked iPhone screen.",
        image:
          "https://images.unsplash.com/photo-1528459801415-a3c510738916?q=80&w=2000&auto=format&fit=crop",
      },
    },
  },
  nexus: {
    slug: "nexus",
    description: "Telehealth scheduling app for boutique clinics.",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
    tags: ["Nuxt", "Vue", "PostgreSQL"],
    name: "Nexus Health",
    client: "Nexus Clinics",
    role: "Full-Stack Engineer",
    duration: "5 Weeks",
    color: "neon-green",
    heroText: "DIGITAL CLINIC.",
    heroImage:
      "https://images.unsplash.com/photo-1588600878108-578307a3cc9d?q=80&w=2000&auto=format&fit=crop",
    solutionImage:
      "https://images.unsplash.com/photo-1550807014-1236e91b92d4?q=80&w=2000&auto=format&fit=crop",
    summary:
      "A telehealth scheduling app targeting boutique clinics. I designed the entire backend architecture to handle severe API load spikes while maintaining an extremely calm, modern, and visually engaging frontend user interface. Balancing clinical reliability with cutting-edge design was the ultimate challenge here.",
    problem:
      "Legacy medical scheduling is horrific for everyone involved. Nexus desperately needed a system that exhausted doctors wouldn't hate using at 3 AM, and that anxious patients could navigate intuitively without calling support.",
    solution:
      "I opted for a Vue/Nuxt frontend backed by an aggressively tuned PostgreSQL database, eliminating the massive load times inherent to typical medical apps. I delivered a completely custom-built calendar interface from the ground up that finally made booking appointments feel effortless.",
    techStack: ["Nuxt", "Vue", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { label: "Bookings", value: "10k+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Load Speed", value: "0.8s" },
    ],
    thoughtProcess: [
      {
        id: 1,
        title: "01. Stress-Free Architecture",
        text: "Medical environments are high-stress. The UI had to be actively calming. I created a design system based entirely on incredibly soft neon-greens and massive amounts of negative space to lower the user's resting heart rate.",
      },
      {
        id: 2,
        title: "02. Infinite Horizon Calendar",
        text: "I tore apart standard calendar libraries because they were too rigid. I built a custom virtualized grid that allowed for infinite, frictionless scrolling through 50 years of appointments globally.",
      },
      {
        id: 3,
        title: "03. Concurrency Protection",
        text: "Two patients booking the same highly-demanded specialist could cripple operations. I implemented optimistic UI updates paired with pessimistic Postgres locks to ensure flawless booking integrity.",
      },
      {
        id: 4,
        title: "04. Webhooks & Automations",
        text: "I wired up background queue processors to handle SMS reminders and pre-appointment surveys perfectly synchronously, preventing drop-offs and miscommunications entirely.",
      },
    ],
    process: {
      dfd: {
        title: "SCHEDULING DATA FLOW",
        description:
          "The core DFD was built entirely around hardcore concurrency. I meticulously mapped the journey of a single booking request through the load balancers, ensuring absolutely zero double-bookings via pessimistic locking in Postgres. It took days of simulating race conditions to get it flawless.",
        image:
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
      },
      prototyping: {
        title: "ACCESSIBLE ITERATIONS",
        description:
          "Healthcare UI strictly demands accessibility. We pushed through six major prototyping phases solely focused on AAA color contrast, heavily readable typography, and massive touch targets—all without compromising the futuristic, neon aesthetic they explicitly wanted.",
        image:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
      },
    },
  },
  vertex: {
    slug: "vertex",
    description: "B2B SaaS data visualization tool.",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
    tags: ["Next.js", "Prisma", "AWS"],
    name: "Vertex Analytics",
    client: "Vertex B2B",
    role: "Founding Engineer",
    duration: "10 Weeks",
    color: "neon-purple",
    heroText: "DATA VISUALIZED.",
    heroImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
    solutionImage:
      "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2000&auto=format&fit=crop",
    summary:
      "Vertex is a B2B SaaS data visualization tool built for massive enterprise e-commerce. I authored the entire rendering pipeline and dashboard UI to ensure that displaying millions of rows wouldn't drop frame rates. I lived and breathed performance profiling for ten straight weeks.",
    problem:
      "Most analytics tools immediately crash the browser when manipulating large datasets. Vertex needed a robust solution that was brutally efficient but also aggressively stylish, standing out from the sea of boring gray B2B dashboards.",
    solution:
      "I implemented a Next.js/Prisma backend directly integrated with massive AWS data lakes. More importantly, I created a heavily customized, grid-based dashboard using WebGL and Three.js that turns boring massive datasets into striking visual art, running flawlessly at 60FPS.",
    techStack: ["Next.js", "Prisma", "AWS", "Three.js"],
    metrics: [
      { label: "Rows Processed", value: "10M+" },
      { label: "Active Users", value: "2k+" },
      { label: "FPS Maintained", value: "60FPS" },
    ],
    thoughtProcess: [
      {
        id: 1,
        title: "01. Overcoming the DOM Limit",
        text: "Rendering 10,000 DOM nodes means an instant browser crash. The first decision was to abandon HTML for the heavy dataviz entirely, committing to a complete WebGL rendering strategy.",
      },
      {
        id: 2,
        title: "02. Cyberpunk Data Aesthetics",
        text: "Enterprise dashboards look like spreadsheets. I injected an ultra-vibrant, glowing wireframe aesthetic using custom fragment shaders to make massive data swarms look absolutely beautiful and menacing.",
      },
      {
        id: 3,
        title: "03. Interstellar Streaming",
        text: "I engineered a WebSocket streaming pipeline that pulled gigabytes of raw analytics and serialized them into ArrayBuffers, passing them directly to Web Workers to keep the UI thread completely unblocked.",
      },
      {
        id: 4,
        title: "04. Tactile Filtering",
        text: "Building the filter logic meant executing bitwise operations on the client so users could slice through 1,000,000 rows in realtime, watching the 3D particles reform and cluster instantly.",
      },
    ],
    process: {
      dfd: {
        title: "STREAMING ARCHITECTURE",
        description:
          "A comprehensive massive DFD was required to stream millions of rows without blocking the browser's main thread. I engineered a solution using concurrent Web Workers and heavily optimized buffer geometry in Three.js resulting in buttery-smooth, jaw-dropping data rendering.",
        image:
          "https://images.unsplash.com/photo-1605806616949-1e87b487cc2a?q=80&w=2000&auto=format&fit=crop",
      },
      prototyping: {
        title: "DATAVIZ PROTOTYPING",
        description:
          "Graphing data isn't just plotting static points. We prototyped intense physics-based interactions, magnetic hover states, and glowing neon color ramps. The iterations focused heavily on creating an aesthetic reminiscent of cyberpunk UI systems, making data analysis actually fun.",
        image:
          "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2000&auto=format&fit=crop",
      },
    },
  },
};

const ALL_PROJECTS = [
  {
    id: "carefree",
    name: "Carefree Mobility",
    description:
      "Premium car rental MVP built with Next.js. I engineered a fluid, high-octane UI that absolutely destroyed previous bounds of performance.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    tags: ["Next.js", "Tailwind", "Supabase"],
    color: "neon-cyan" as const,
  },
  {
    id: "aethos",
    name: "Aethos Finance",
    description:
      "DeFi dashboard redefining institutional crypto management. I tamed chaotic Web3 data streams into a cinematic, ultra-responsive terminal.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    tags: ["React", "Web3", "D3.js"],
    color: "cyber-yellow" as const,
  },
  {
    id: "lumina",
    name: "Lumina AI",
    description:
      "Enterprise AI content generator prototype. Rapid 3-week sprint combining raw API power with an intensely vibrant, premium interface.",
    image:
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop",
    tags: ["OpenAI", "Next.js", "Pinecone"],
    color: "hot-pink" as const,
  },
  {
    id: "strata",
    name: "Strata Homes",
    description:
      "PropTech marketplace for fractional real estate. Structured a secure, rigid geometric design system with a high-fashion aesthetic.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
    tags: ["React Native", "Firebase", "Stripe"],
    color: "electric-blue" as const,
  },
  {
    id: "nexus",
    name: "Nexus Health",
    description:
      "Telehealth scheduling app for boutique clinics. Architected for severe load spikes while maintaining a serene architectural layout.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
    tags: ["Nuxt", "Vue", "PostgreSQL"],
    color: "neon-green" as const,
  },
  {
    id: "vertex",
    name: "Vertex Analytics",
    description:
      "B2B SaaS data visualization tool. Built an aggressive streaming pipeline to render millions of rows without a single dropped frame.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
    tags: ["Next.js", "Prisma", "AWS"],
    color: "neon-purple" as const,
  },
];


/** Flattens PROJECTS_DATA + ALL_PROJECTS into insert-ready documents. */
export function buildSeedProjects(): SeedProject[] {
  return Object.keys(PROJECTS_DATA).map((key) => {
    const p = PROJECTS_DATA[key];
    const preview = ALL_PROJECTS.find((v) => v.id === key);
    return {
      slug: key,
      name: p.name,
      description: preview?.description || p.summary,
      thumbnail: preview?.image || p.heroImage,
      tags: p.techStack,
      client: p.client,
      role: p.role,
      duration: p.duration,
      color: p.color,
      heroText: p.heroText,
      heroImage: p.heroImage,
      solutionImage: p.solutionImage,
      summary: p.summary,
      problem: p.problem,
      solution: p.solution,
      techStack: p.techStack,
      metrics: p.metrics,
      thoughtProcess: p.thoughtProcess,
      process: p.process,
    };
  });
}
