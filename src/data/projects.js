// Project Data Configuration
// All data is modular and editable for easy updates.

export const projects = [
  {
    slug: "washora",
    title: "WASHORA",
    number: "01",
    category: "Multi-Service Marketplace",
    shortDescription: "A multi-service marketplace connecting customers, service providers and delivery partners for cleaning and maintenance services.",
    preview: "/images/projects/image copy.png",
    fallbackPreview: "/images/projects/washora.png",
    liveUrl: "https://washora.onrender.com/",
    featured: true,
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js"
    ],
    abstract: {
      overview: "WASHORA re-engineers on-demand urban utility care by structuring a 4-sided ecosystem (Customers, Service Providers, Delivery Partners, and Operations/Admin) under a single high-performance engine, backed by strict frontend route-level boundaries and role-isolated access surfaces.",
      problem: "Traditional urban cleaning and maintenance services—spanning laundry, sneaker restoration, vehicle detailing, and helmet sanitization—are fragmented, lack transparent pricing, have unmonitored handling of delicate items, and suffer from disjointed communication between customers and workshop technicians.",
      solution: "WASHORA introduces a unified digital platform featuring 4 dedicated, role-isolated portals with cryptographically guarded routing, digital item intake photo logs, milestone progression tracking, and tamper-evident OTP item handovers.",
      intendedFor: "Busy urban households, working professionals, and gear enthusiasts needing dependable care for their apparel and vehicles, alongside workshop merchants seeking streamlined digital job triage."
    },
    highlights: [
      "4-Sided Isolated Architecture: Consumer, Partner Workshop, Delivery Partner, and SuperAdmin surfaces",
      "Verticals: Clothes & Fabrics, Shoes & Footwear, Helmets & Gear, Bikes, Cars, and Bags",
      "Auditable Order State Machine: Real-time tracking from scheduled pickup to ultrasonic wash and doorstep return"
    ]
  },
  {
    slug: "veronica",
    title: "VÉRONA",
    number: "02",
    category: "Production Full-Stack Fashion E-Commerce",
    shortDescription: "A production-grade full-stack fashion e-commerce platform built with Next.js, TypeScript, and MongoDB Atlas, featuring an end-to-end customer journey, secure Razorpay checkout, and comprehensive RBAC operations management.",
    preview: "/images/projects/Screenshot 2026-10-01 143219.png",
    fallbackPreview: "/images/projects/veronica.png",
    liveUrl: "https://veronica-71uo.onrender.com/",
    featured: true,
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "MongoDB Atlas",
      "Mongoose",
      "Clerk",
      "Razorpay",
      "Cloudinary",
      "Resend",
      "Zod",
      "Vitest",
      "Playwright",
      "GitHub",
      "Vercel"
    ],
    abstract: {
      overview: "VÉRONA is a production-grade full-stack fashion e-commerce platform built with Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, MongoDB Atlas, Mongoose, Clerk, Razorpay, Cloudinary, Resend, Zod, Vitest, Playwright, GitHub and Vercel. It provides a complete customer journey from product discovery, search, category browsing, color/size-based garment variants, wishlist and cart to address management, checkout, secure Razorpay payments, order tracking, inventory and warehouse management, fulfillment, shipping, returns, exchanges, refunds, reviews, notifications and customer support.",
      problem: "Real-world fashion commerce requires deep operational integrity beyond a basic catalog—handling multi-variant garment matrices, inventory race conditions during high-volume drops, cryptographically secure payment and webhook reconciliation, customer returns/exchanges/refunds, and cross-team fulfillment across warehouse surfaces.",
      solution: "VÉRONA delivers a modular monolith architecture with strong domain boundaries, server-side authorization, atomic inventory reservation, concurrency protection, automated testing (Vitest & Playwright), security hardening, and dedicated RBAC control panels for Admin, Inventory, Order, Warehouse, Support, and Marketing operations.",
      intendedFor: "Modern fashion shoppers demanding a seamless, high-speed retail experience, alongside multi-role brand operations teams requiring dependable inventory control, automated fulfillment, and audit-logged workflows."
    },
    ecommercePillars: [
      {
        title: "Complete Customer Journey",
        items: [
          "Product discovery, search & category browsing",
          "Color/size-based garment variants & inventory display",
          "Persistent wishlist, interactive cart & address management",
          "Seamless checkout with secure Razorpay payment flow",
          "Real-time order tracking & milestone notifications",
          "Customer returns, exchanges, refunds & verified reviews"
        ]
      },
      {
        title: "Operations & RBAC Suite",
        items: [
          "Role-based access: Admin, Inventory, Order, Warehouse, Support & Marketing",
          "Warehouse management, fulfillment & shipping workflows",
          "Dynamic product catalog, merchandising & content management",
          "Real-time sales analytics, audit logs & platform administration"
        ]
      },
      {
        title: "Architecture & Engineering Hardening",
        items: [
          "Modular monolith architecture with strict domain boundaries",
          "Server-side authorization & cryptographic webhook verification",
          "Atomic inventory reservation & concurrency race protection",
          "Automated test coverage with Vitest & end-to-end Playwright",
          "Production deployment via Vercel + MongoDB Atlas with automated CI/CD"
        ]
      }
    ],
    highlights: [
      "End-to-End Customer Journey: Product discovery, color/size garment variants, wishlist, cart, address management, Razorpay checkout, tracking, returns & reviews",
      "Full Operations Suite: RBAC-based Admin, Inventory, Order, Warehouse fulfillment, Support, and Marketing management with audit logs",
      "Resilient Monolith Engine: Server-side authorization, payment/webhook verification, atomic inventory reservation, concurrency protection, and automated testing (Vitest + Playwright)"
    ]
  },
  {
    slug: "zoolearn",
    title: "ZooLearn",
    number: "03",
    category: "Interactive Biology Learning Platform",
    shortDescription: "An interactive biology learning platform combining concept-based learning, 3D models and educational experiences for students and NEET aspirants.",
    preview: "/images/projects/image.png",
    fallbackPreview: "/images/projects/zoolearn.png",
    liveUrl: "https://zoolearn.in",
    featured: true,
    technologies: [
      "React",
      "JavaScript",
      "3D",
      "Spline",
      "Sketchfab",
      "Three.js",
      "Tailwind CSS"
    ],
    abstract: {
      overview: "ZooLearn is a browser-first spatial biology learning platform built to help students and competitive medical examination (NEET) aspirants grasp complex anatomical structures, cellular pathways, and physiological systems through interactive 3D WebGL models.",
      problem: "NEET aspirants and school students face immense cognitive load attempting to memorize intricate spatial biological structures from static 2D textbook sketches, leading to frequent exam confusion on anatomical orientation questions.",
      solution: "ZooLearn integrates optimized, lightweight 3D WebGL models with 360-degree rotation, layer-by-layer anatomical dissection, clickable biochemical hotspots, NCERT-aligned concept cards, and diagnostic chapter quizzes.",
      intendedFor: "Medical aspirants (NEET-UG), high school biology students, and educators seeking high-yield visual learning tools that dramatically boost spatial comprehension and concept retention."
    },
    highlights: [
      "35+ Interactive 3D Biological Models: Rotate, dissect, and inspect organs with real-time lighting",
      "Three-Pillar Pedagogy: Spatial 3D manipulation, NCERT concept synthesis, and instant retrieval testing",
      "Draco Compression Pipeline: Asset payloads kept under 2.5MB for smooth 60fps mobile execution"
    ]
  },
  {
    slug: "queryholic",
    title: "Queryholic",
    number: "04",
    category: "Technology Company / Digital Solutions",
    isFlagship: true,
    shortDescription: "A technology company focused on software development, AI automation, IoT, embedded systems and custom digital solutions.",
    preview: "/images/projects/Screenshot 2026-10-01 143938.png",
    fallbackPreview: "/images/projects/queryholic.png",
    liveUrl: "https://queryholic.in",
    featured: true,
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion"
    ],
    abstract: {
      overview: "Queryholic is a multidisciplinary technology company and digital solutions powerhouse dedicated to building next-generation digital products, AI automation pipelines, IoT hardware systems, and scalable enterprise software solutions for forward-thinking businesses.",
      problem: "Businesses navigating modern digital transformation typically face high coordination friction and inflated costs having to contract separate agencies for frontend websites, mobile applications, autonomous AI integrations, and embedded hardware electronics.",
      solution: "Queryholic unifies full-spectrum engineering capabilities under one agile roof—delivering high-performance Next.js web applications, autonomous LLM agent automation, custom ESP32/microcontroller firmware, and real-time clean energy telemetry systems.",
      intendedFor: "Startups, enterprises, clean energy innovators, and institutions seeking reliable, high-impact digital transformation and bespoke hardware-software engineering solutions."
    },
    flagshipFocusAreas: [
      "Website Development",
      "Web App Development",
      "Mobile App Development",
      "UI/UX Design",
      "AI Integration",
      "AI Automation",
      "Custom Software Solutions",
      "Embedded Systems",
      "IoT",
      "Smart Energy",
      "EV Solutions"
    ],
    highlights: [
      "Full-Spectrum Digital Services: From custom SaaS applications to ESP32 firmware and smart solar telemetry",
      "Autonomous AI Pipelines: Tailored LLM workflows for customer inquiry triage, data extraction, and business automation",
      "Hardware-to-Cloud Integration: Seamless MQTT/WebSocket telemetry connecting physical microcontroller sensors to web dashboards"
    ]
  }
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}
