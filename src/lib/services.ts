/**
 * THE FABLES LAB — Six Core Services
 * Single source of truth for service content. Kept here so the Services
 * section, the /services page, and the inquiry form can all reference the
 * same accurate descriptions without duplication.
 */

export interface ServiceDeliverable {
  label: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  positioning: string;
  description: string;
  capabilities: string[];
  deliverables: ServiceDeliverable[];
  visualTone: "bronze" | "graphite" | "warm";
  inquiryLabel: string;
}

export const SERVICES: Service[] = [
  {
    id: "full-stack",
    number: "01",
    title: "Full-Stack Solutions",
    positioning: "Digital products engineered from interface to infrastructure.",
    description:
      "Reliable digital products designed around actual business workflows. We build custom web applications from the frontend interface to the backend infrastructure, with API design, database architecture, authentication, admin dashboards, e-commerce platforms, and deployment — all optimised for how your team actually works.",
    capabilities: [
      "Custom web application development",
      "Frontend and backend engineering",
      "API design and third-party integrations",
      "Database architecture",
      "Authentication and authorization",
      "Admin dashboards and internal tools",
      "E-commerce and business platforms",
      "Deployment, maintenance, and optimization",
    ],
    deliverables: [
      { label: "Production web application" },
      { label: "API documentation" },
      { label: "Admin dashboard" },
      { label: "Deployment pipeline" },
      { label: "Maintenance plan" },
    ],
    visualTone: "bronze",
    inquiryLabel: "Full-Stack Solutions",
  },
  {
    id: "ai",
    number: "02",
    title: "AI Solutions",
    positioning: "Practical AI systems built around real business problems.",
    description:
      "Useful AI outcomes, not buzzwords. We integrate LLMs, build RAG knowledge assistants, automate intelligent workflows, and deploy AI agents with evaluation, guardrails, and reliability improvements. We do not promise autonomous intelligence or guaranteed accuracy — we build systems that solve genuine problems.",
    capabilities: [
      "AI-powered applications and features",
      "LLM integrations",
      "Intelligent workflow automation",
      "Retrieval-augmented generation and knowledge assistants",
      "AI agents and tool integrations",
      "Data extraction and processing pipelines",
      "AI-assisted internal business tools",
      "Evaluation, guardrails, and reliability improvements",
    ],
    deliverables: [
      { label: "AI feature specification" },
      { label: "LLM integration layer" },
      { label: "RAG knowledge assistant" },
      { label: "Eval + guardrails framework" },
      { label: "Monitoring dashboard" },
    ],
    visualTone: "graphite",
    inquiryLabel: "AI Solutions",
  },
  {
    id: "marketing",
    number: "03",
    title: "Marketing Solutions",
    positioning: "Digital marketing systems that help businesses reach the right audience.",
    description:
      "Marketing systems built around audience research, positioning, and measurable outcomes. We support campaign planning, SEO, landing-page optimization, conversion improvements, analytics, and creative distribution — without claiming guaranteed rankings, leads, or sales.",
    capabilities: [
      "Marketing strategy and campaign planning",
      "Search engine optimization",
      "Landing-page optimization",
      "Paid campaign support where offered",
      "Conversion-focused website improvements",
      "Audience research and positioning",
      "Analytics and performance measurement",
      "Campaign creative and distribution planning",
    ],
    deliverables: [
      { label: "Marketing strategy document" },
      { label: "SEO audit & roadmap" },
      { label: "Optimized landing pages" },
      { label: "Analytics setup" },
      { label: "Campaign creative plan" },
    ],
    visualTone: "warm",
    inquiryLabel: "Marketing Solutions",
  },
  {
    id: "design",
    number: "04",
    title: "UI/UX Design",
    positioning: "Interfaces that make complex products clear, useful, and memorable.",
    description:
      "Usability, consistency, and business objectives first — visual decoration second. We conduct user research, build information architecture, design high-fidelity interfaces, create interactive prototypes, establish design systems, and deliver developer-ready handoff across responsive experiences.",
    capabilities: [
      "User research and information architecture",
      "User flows and wireframes",
      "High-fidelity interface design",
      "Interactive prototypes",
      "Design systems and reusable components",
      "Responsive design",
      "Usability improvements",
      "Developer-ready design handoff",
    ],
    deliverables: [
      { label: "Research findings" },
      { label: "Wireframes + user flows" },
      { label: "High-fidelity designs" },
      { label: "Interactive prototype" },
      { label: "Design system + component library" },
      { label: "Developer handoff spec" },
    ],
    visualTone: "bronze",
    inquiryLabel: "UI/UX Design",
  },
  {
    id: "community",
    number: "05",
    title: "Community Building",
    positioning: "Build meaningful communities around products, brands, and ideas.",
    description:
      "Communities with real engagement, not inflated metrics. We help with strategy, platform selection, onboarding systems, content and discussion programming, operations and moderation workflows, feedback collection, retention, and launch initiatives. We do not fabricate community sizes or engagement numbers.",
    capabilities: [
      "Community strategy and positioning",
      "Platform selection and setup",
      "Community onboarding and engagement systems",
      "Content and discussion programming",
      "Community operations and moderation workflows",
      "Feedback collection and member retention",
      "Launch and growth initiatives",
    ],
    deliverables: [
      { label: "Community strategy" },
      { label: "Platform setup" },
      { label: "Onboarding system" },
      { label: "Content calendar" },
      { label: "Moderation playbook" },
    ],
    visualTone: "graphite",
    inquiryLabel: "Community Building",
  },
  {
    id: "content",
    number: "06",
    title: "Content Management",
    positioning: "Give businesses a structured, maintainable way to manage their digital content.",
    description:
      "Content teams should manage everyday updates without unnecessary developer involvement. We implement and customize CMS platforms, build admin dashboards and content workflows, manage product and service catalogues, structure content models, handle media and assets, and add SEO metadata and publishing controls — with integrations into your existing websites and applications.",
    capabilities: [
      "CMS implementation and customization",
      "Admin dashboards and content workflows",
      "Product, service, and catalogue management",
      "Content publishing systems",
      "Structured content models",
      "Media and asset management",
      "SEO metadata and publishing controls",
      "Integrations with existing websites and applications",
    ],
    deliverables: [
      { label: "CMS platform setup" },
      { label: "Content model schema" },
      { label: "Admin dashboard" },
      { label: "Publishing workflow" },
      { label: "Media library" },
      { label: "SEO controls" },
    ],
    visualTone: "warm",
    inquiryLabel: "Content Management",
  },
];
