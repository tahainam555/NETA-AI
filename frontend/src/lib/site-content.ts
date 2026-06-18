import {
  Zap,
  MessageSquare,
  Workflow,
  TrendingUp,
  Database,
  LayoutDashboard,
  Layers,
} from "lucide-react";

import c1 from "@/assets/case-1.jpg";
import c2 from "@/assets/case-2.jpg";
import c3 from "@/assets/case-3.jpg";

import blog1 from "@/assets/blog1.png";
import blog2 from "@/assets/blog2.png";
import blog3 from "@/assets/blog3.png";

export const services = [
  {
    slug: "ai-growth-engine-setup",
    icon: Zap,
    title: "AI Growth Engine Setup",
    desc:
      "Install a complete AI-powered lead capture and follow-up system that responds to every new enquiry in under 90 seconds, qualifies prospects, and books calls 24/7 without manual intervention.",
    summary:
      "An end-to-end inbound engine that captures, qualifies, and books meetings without manual follow up.",
    deliverables: [
      "Lead capture and routing automation",
      "AI qualification flow with lead scoring",
      "Calendar and CRM booking workflow",
      "Performance dashboard with alerts",
    ],
    outcomes: [
      "90-second response SLA on inbound leads",
      "Higher show rates for booked calls",
      "24/7 coverage without new headcount",
    ],
    timeline: "2-4 weeks",
  },
  {
    slug: "ai-outreach-personalization",
    icon: MessageSquare,
    title: "AI Outreach Personalization",
    desc:
      "Build an intelligent outreach engine that researches prospects and generates tailored messages, consistently achieving 8-12% reply rates for your B2B sales pipeline.",
    summary:
      "AI research and personalization workflows that lift reply rates while staying on-brand.",
    deliverables: [
      "Prospect enrichment and intent signals",
      "Personalized email and LinkedIn drafts",
      "Compliance and tone guidelines",
      "A/B testing and reply analytics",
    ],
    outcomes: [
      "8-12% reply rate range",
      "More qualified pipeline from outbound",
      "Less manual prospecting time",
    ],
    timeline: "3-5 weeks",
  },
  {
    slug: "marketing-automation-audit-build",
    icon: Workflow,
    title: "Marketing Automation Audit & Build",
    desc:
      "A comprehensive audit to identify manual bottlenecks, followed by a fully integrated AI-powered marketing stack built specifically for your business model from acquisition to retention.",
    summary:
      "Audit your current stack, then design and ship a full AI-ready marketing automation system.",
    deliverables: [
      "Stack audit and workflow map",
      "Automation blueprint and ROI plan",
      "Implementation of core workflows",
      "Team handover and SOPs",
    ],
    outcomes: [
      "Clear owners and steps for each workflow",
      "Faster lead-to-opportunity conversion",
      "Reduced manual ops work",
    ],
    timeline: "4-6 weeks",
  },
  {
    slug: "ai-reporting-dashboard",
    icon: TrendingUp,
    title: "AI Reporting Dashboard",
    desc:
      "Automate your reporting. Connect all marketing channels to aggregate performance data and generate clear weekly summaries, saving your team 10+ hours per week.",
    summary:
      "Unified reporting that pulls data from every channel and produces weekly insights automatically.",
    deliverables: [
      "Data connectors for key tools",
      "Unified KPIs and definitions",
      "Automated weekly summaries",
      "Alerting for anomalies",
    ],
    outcomes: [
      "10+ hours saved per week",
      "Faster decisions from fresh data",
      "Reliable forecasting baseline",
    ],
    timeline: "2-3 weeks",
  },
];

export const solutions = [
  {
    slug: "instant-lead-response",
    icon: Zap,
    title: "Instant Lead Response",
    desc: "Respond, qualify, and route every inbound lead within 90 seconds, automatically and 24/7.",
    summary:
      "Always-on lead handling that qualifies prospects, routes them to the right owner, and books meetings fast.",
    capabilities: [
      "Multi-channel intake with smart routing",
      "AI qualification and lead scoring",
      "Calendar scheduling and CRM sync",
    ],
    idealFor: [
      "High inbound volume teams",
      "Sales-led growth orgs",
      "Marketing teams chasing speed-to-lead",
    ],
  },
  {
    slug: "crm-reengagement",
    icon: Database,
    title: "CRM Re-engagement",
    desc:
      "Segment your database and initiate personalized outreach to bring cold relationships back into active pipeline.",
    summary:
      "AI segmentation and personalization that reactivates dormant accounts and rebuilds pipeline momentum.",
    capabilities: [
      "Lifecycle and intent segmentation",
      "Dynamic message personalization",
      "Re-engagement sequences with guardrails",
    ],
    idealFor: [
      "Enterprise CRM owners",
      "Revenue teams with large databases",
      "Ops teams tasked with pipeline recovery",
    ],
  },
  {
    slug: "personalized-outreach",
    icon: MessageSquare,
    title: "Personalized Outreach",
    desc:
      "Research prospects and craft relevant outreach at scale, delivering 8-12% reply rates.",
    summary:
      "Research-driven outbound that preserves your voice while scaling personalization across accounts.",
    capabilities: [
      "Account research and insight capture",
      "AI generated drafts and edits",
      "Reply intent routing to reps",
    ],
    idealFor: [
      "Outbound sales teams",
      "BDR organizations",
      "Founder-led GTM motions",
    ],
  },
  {
    slug: "automated-reporting",
    icon: LayoutDashboard,
    title: "Automated Reporting",
    desc:
      "Eliminate administrative burden with automated reporting that aggregates data across all your marketing channels.",
    summary:
      "Live performance dashboards with automated narratives for every stakeholder.",
    capabilities: [
      "Cross-channel data ingestion",
      "Unified KPI definitions",
      "Weekly insights with anomaly detection",
    ],
    idealFor: [
      "Marketing ops and RevOps",
      "Leadership teams needing visibility",
      "Distributed teams across tools",
    ],
  },
  {
    slug: "roi-driven-integration",
    icon: Layers,
    title: "ROI-driven Integration",
    desc:
      "Connect your existing AI investments to measurable growth, transforming scattered tools into a unified system.",
    summary:
      "Unify your AI stack into one orchestrated system tied to revenue outcomes.",
    capabilities: [
      "Tool and data unification",
      "Workflow orchestration across teams",
      "Governance and measurement layer",
    ],
    idealFor: [
      "Enterprises with fragmented tooling",
      "Operations teams scaling fast",
      "Organizations focused on ROI tracking",
    ],
  },
];

export const caseStudies = [
  {
    slug: "global-payments-analytics",
    img: c1,
    tag: "Fintech · Payments",
    title: "AI analytics for a global payments platform",
    summary:
      "A payments leader replaced manual reporting with autonomous analytics across 12 markets.",
    challenge:
      "Manual reporting bottlenecked product decisions across 12 markets, with insights lagging by 4-7 days.",
    solution:
      "Deployed autonomous analytics agents on a unified data layer with real-time anomaly detection.",
    metrics: [
      { k: "+186%", v: "Insights velocity" },
      { k: "-72%", v: "Reporting time" },
    ],
    results: [
      "Daily executive insights delivered in under 30 minutes",
      "Anomaly alerts routed directly to product owners",
      "Unified data layer across regional markets",
    ],
  },
  {
    slug: "support-workload-reduction",
    img: c2,
    tag: "B2B SaaS · Support",
    title: "Reduced manual support workload by 63%",
    summary:
      "A B2B SaaS support team deployed AI agents to resolve tier-1 and tier-2 requests.",
    challenge:
      "Support backlog grew 4x during expansion while CSAT dropped below the 85% target.",
    solution:
      "Conversational AI agents handling tier-1 and tier-2 resolutions with human handoff and brand-tuned tone.",
    metrics: [
      { k: "94%", v: "Auto-resolution" },
      { k: "+38pt", v: "CSAT lift" },
    ],
    results: [
      "Faster first response time for every ticket",
      "Consistent tone across self-serve and agent replies",
      "Clear escalation paths for complex cases",
    ],
  },
  {
    slug: "automated-lead-qualification",
    img: c3,
    tag: "Enterprise · Revenue",
    title: "Automated lead qualification pipeline",
    summary:
      "Sales teams automated lead qualification and enrichment across their CRM.",
    challenge:
      "Sales reps spent 40% of their time on data entry, enrichment and low-intent follow-ups.",
    solution:
      "AI sales agents handling enrichment, scoring and outbound, synced with Salesforce and HubSpot.",
    metrics: [
      { k: "3.4x", v: "Pipeline created" },
      { k: "+52%", v: "Win rate" },
    ],
    results: [
      "Automated enrichment for every inbound lead",
      "Scoring rules aligned with revenue goals",
      "Real-time updates in Salesforce and HubSpot",
    ],
  },
];

export const blogPosts = [
  {
    slug: "ai-agents-reshape-operations",
    tag: "AI Agents",
    title: "How AI agents reshape operations",
    excerpt: "Autonomous agents are changing how enterprise teams run support, sales, and ops.",
    read: "8 min read",
    date: "May 2026",
    accent: "from-[#0a0b10] via-[#0e1530] to-[#1a2a55]",
    image: blog1,
    sections: [
      {
        heading: "Why agents win in complex ops",
        body:
          "Traditional automation breaks when inputs change. Agents keep context, reason through ambiguity, and adapt to real-time signals without brittle rules.",
      },
      {
        heading: "Where they deliver immediate ROI",
        body:
          "Support triage, lead qualification, and reporting are the fastest wins. Teams see speed gains and fewer escalations within the first few weeks.",
      },
      {
        heading: "How to deploy safely",
        body:
          "Start with clear guardrails, human review, and audit trails. Expand autonomy only after quality and accuracy targets are met.",
      },
    ],
  },
  {
    slug: "adaptive-automation-wins",
    tag: "Workflow Automation",
    title: "Adaptive automation wins",
    excerpt: "Static workflows break. Adaptive systems learn from real operational signals.",
    read: "6 min read",
    date: "Apr 2026",
    accent: "from-[#0a0b10] via-[#142035] to-[#0a4a6a]",
    image: blog2,
    sections: [
      {
        heading: "Why static workflows fail",
        body:
          "Rules assume perfect inputs. Real-world data changes fast, creating breaks that force manual fixes and slow teams down.",
      },
      {
        heading: "Signals that should drive automation",
        body:
          "Intent data, CRM updates, and product usage are reliable signals. Use them to trigger adaptive paths instead of one-size workflows.",
      },
      {
        heading: "Building adaptive systems",
        body:
          "Define a control layer that tracks outcomes, then tune your workflows based on feedback loops and measurable KPIs.",
      },
    ],
  },
  {
    slug: "ai-infrastructure-matters",
    tag: "AI Strategy",
    title: "Why AI infrastructure matters",
    excerpt: "The system of record is shifting. Here is what enterprise teams fund next.",
    read: "5 min read",
    date: "Apr 2026",
    accent: "from-[#0a0b10] via-[#1a1235] to-[#3a1f6e]",
    image: blog3,
    sections: [
      {
        heading: "Infrastructure before experimentation",
        body:
          "Winning teams standardize data, governance, and access before deploying new AI apps. It keeps costs down and trust high.",
      },
      {
        heading: "The new system of record",
        body:
          "AI workflows need a unified source of truth for customer and revenue data. That foundation unlocks reliable automation.",
      },
      {
        heading: "Where budgets are moving",
        body:
          "Funding is shifting toward orchestration, security, and lifecycle management to ensure AI initiatives scale safely.",
      },
    ],
  },
];
