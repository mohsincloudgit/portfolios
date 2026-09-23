/**
 * ANTIGRAVITY PROJECTS & ARCHITECTURE DATA STORE — MUHAMMAD MOHSIN
 * Structured into Filterable Categories: CRM & GHL, CMS Development, Marketing & AI Automations
 */

const portfolioProjects = [
  // --- Category: CRM & GHL ---
  {
    id: 'ghl-agency-ecosystem',
    title: 'Enterprise GoHighLevel (GHL) Agency Ecosystem',
    category: 'crm-ghl',
    categoryLabel: 'CRM & GHL Automations',
    company: 'Carpe Diem & Bembex Lab',
    role: 'GHL Automation Specialist',
    period: '2025 – Present',
    badge: 'GHL &bull; 40+ SUB-ACCOUNTS',
    badgeColor: '#00f0ff',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    overview: 'Universal agency GHL snapshot managing 40+ client sub-accounts. Implemented custom funnels, trigger link sequences, calendar booking engines, and dynamic Stripe billing.',
    architecture: [
      'Master Snapshot with pre-built multi-step sales funnels, pipeline stages, custom tags, and trigger links.',
      'Automated client onboarding workflow connected to Stripe billing and instant sub-account provisioning via GHL v2 API.',
      'Autonomous two-way SMS & dynamic Email conversation drips with custom value personalization.',
      'Multi-tier sub-account white-label portal with custom menus and client permissions.'
    ],
    techStack: ['GoHighLevel v2 API', 'GHL Snapshots', 'Stripe Billing', 'Twilio SMS', 'Custom Values', 'Smart Pipelines'],
    metrics: [
      { label: 'Sub-Accounts', value: '40+ Active' },
      { label: 'Lead Velocity', value: '+340% Lift' },
      { label: 'Client Retention', value: '94.2%' }
    ]
  },
  {
    id: 'multi-crm-middleware',
    title: 'Enterprise Multi-CRM Synchronization Middleware',
    category: 'crm-ghl',
    categoryLabel: 'Multi-CRM Architecture',
    company: 'Enterprise Client Solutions',
    role: 'CRM & Middleware Architect',
    period: '2024 – 2026',
    badge: 'GHL &bull; HUBSPOT &bull; ENGAGEBAY &bull; MONDAY',
    badgeColor: '#ff2a54',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    overview: 'Engineered a resilient multi-CRM infrastructure reconciling pipelines, leads, and opportunities across GoHighLevel (GHL), HubSpot CRM, EngageBay CRM, and Monday.com CRM with automated conflict resolution.',
    architecture: [
      'Event-driven webhook listeners capturing contact updates across GoHighLevel, HubSpot CRM, EngageBay CRM, and Monday.com CRM with sub-200ms latency.',
      'Deduplication algorithm hashing unique emails and phone numbers to eliminate duplicate contact entries across all CRM instances.',
      'Dead-letter queue (DLQ) with automated exponential backoff retries protecting against API rate limits and network drops.',
      'Unified executive audit dashboard tracking bi-directional sync events, stage movements, and error telemetry in real time.'
    ],
    techStack: ['GoHighLevel (GHL)', 'HubSpot CRM', 'EngageBay CRM', 'Monday.com CRM', 'Node.js', 'Zapier / Make', 'PostgreSQL'],
    metrics: [
      { label: 'Sync Latency', value: '< 180ms' },
      { label: 'Data Accuracy', value: '99.98%' },
      { label: 'CRMs Unified', value: '4 Platforms' }
    ]
  },

  // --- Category: CMS Development ---
  {
    id: 'bembex-custom-cms',
    title: 'Multi-Platform Custom CMS & Headless Portal',
    category: 'cms',
    categoryLabel: 'CMS Development',
    company: 'Bembex Lab',
    role: 'WordPress CMS Developer',
    period: 'January 2026 – PRESENT',
    badge: 'BEMBEX LAB &bull; 5+ PLATFORMS',
    badgeColor: '#00f0ff',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    overview: 'Custom functionality-based CMS development across WordPress, Shopify, Webflow, Squarespace, and Unbounce. Delivering lightning-fast load times and custom theme/plugin architectures.',
    architecture: [
      'Engineered fully custom WordPress themes with zero bloat and clean modular template hierarchy.',
      'Developed custom Shopify Liquid sections with dynamic filtering, AJAX cart, and checkout conversion tuning.',
      'Designed responsive Webflow layouts with custom interactions and clean HTML5/CSS exports.',
      'Configured cloud DNS, SSL certificates, staging environments, and multi-domain hosting management.'
    ],
    techStack: ['WordPress Core', 'Shopify Liquid', 'Webflow', 'Squarespace', 'Unbounce', 'Tailwind CSS', 'PHP'],
    metrics: [
      { label: 'Page Speed', value: '0.6s LCP' },
      { label: 'Platforms', value: '5 CMS Engines' },
      { label: 'Delivery', value: '100% On-Time' }
    ]
  },
  {
    id: 'source-code-ecommerce',
    title: 'High-Converting E-Commerce & Custom Web Engine',
    category: 'cms',
    categoryLabel: 'CMS Development',
    company: 'SOURCE CODE',
    role: 'Front End Developer',
    period: 'Jan 2024 – June 2025',
    badge: 'SOURCE CODE &bull; FULL-STACK',
    badgeColor: '#ff2a54',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    overview: 'Full-stack client store development combining custom WordPress and Shopify architectures with conversion-optimized UI/UX and rapid checkout workflows.',
    architecture: [
      'Custom WooCommerce integration with localized payment gateways and automated invoice generation.',
      'Shopify custom app integrations for automated inventory sync and order notifications.',
      'Modular CSS architecture guaranteeing instant paint and responsive mobile fidelity.',
      'Cross-browser optimization tested across Chrome, Safari, Edge, iOS, and Android devices.'
    ],
    techStack: ['WordPress / WooCommerce', 'Shopify', 'HTML5 / SCSS', 'JavaScript ES6+', 'PHP', 'Stripe'],
    metrics: [
      { label: 'Mobile Score', value: '99 / 100' },
      { label: 'Conversion Lift', value: '+35%' },
      { label: 'Checkout Time', value: '-40%' }
    ]
  },

  // --- Category: Marketing & AI Automations ---
  {
    id: 'voice-ai-live-agents',
    title: 'Autonomous Voice AI Calling & Live Chat Ecosystem',
    category: 'marketing-ai',
    categoryLabel: 'Voice AI & Generative Chat',
    company: 'Carpe Diem & NextGen AI',
    role: 'AI Systems Architect',
    period: '2025 – Present',
    badge: 'VAPI &bull; ELEVENLABS &bull; CLAUDE &bull; CHATGPT',
    badgeColor: '#00f0ff',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    overview: 'Production deployment of real-time Voice AI calling agents and omnichannel live chat systems engineered with Vapi, ElevenLabs, Claude 3.5/3.7, ChatGPT (GPT-4o), Cursor IDE, and Grok (xAI) for sub-second lead qualification and booking.',
    architecture: [
      'Bidirectional low-latency Voice AI phone agents powered by Vapi telephony and ElevenLabs neural voice synthesis for inbound support and outbound scheduling.',
      'Omnichannel live chat widgets powered by Claude 3.5 Sonnet and ChatGPT APIs with strict enterprise guardrails and context injection.',
      'Instant calendar sync directly locking discovery slots into GoHighLevel (GHL) and syncing contact telemetry into HubSpot, EngageBay, and Monday.com.',
      'Rapidly engineered and maintained using Cursor IDE agentic rules and Grok (xAI) dynamic search grounding.'
    ],
    techStack: ['Vapi Voice AI', 'ElevenLabs', 'Claude 3.5 / 3.7', 'ChatGPT (OpenAI)', 'Cursor AI', 'Grok (xAI)', 'GHL Calendar API', 'Webhooks'],
    metrics: [
      { label: 'Voice Latency', value: '< 650ms' },
      { label: 'Booking Rate', value: '+74% Lift' },
      { label: 'Live Resolution', value: '92.6%' }
    ]
  },
  {
    id: 'carpe-diem-n8n-agents',
    title: 'Autonomous n8n Lead Qualification & AI Agent Pipeline',
    category: 'marketing-ai',
    categoryLabel: 'Marketing & AI Automations',
    company: 'Carpe Diem',
    role: 'Automation & Digital Specialist',
    period: 'June 2025 – Jan 2026',
    badge: 'CARPE DIEM &bull; AI AGENTS',
    badgeColor: '#ff2a54',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    overview: 'Architected autonomous AI agent workflows using n8n and make.com, qualifying inbound marketing leads across Meta ads and booking live discovery slots in under 15 seconds.',
    architecture: [
      'Multi-branch n8n workflow listening to Meta and Google Ads webhooks with instant token validation.',
      'AI prompt guardrails analyzing inbound inquiry intent, budget, and timeline criteria.',
      'Automated GHL calendar negotiation sending confirmation links via SMS and Email.',
      'Real-time Slack notification dispatching high-intent prospect summaries to executive sales reps.'
    ],
    techStack: ['n8n Workflows', 'Make.com', 'OpenAI API', 'GHL Calendar API', 'Zapier', 'Webhooks'],
    metrics: [
      { label: 'Response Time', value: '< 15 Seconds' },
      { label: 'Booking Rate', value: '+68% Lift' },
      { label: 'Hours Saved', value: '45 hrs/week' }
    ]
  },
  {
    id: 'technical-seo-programmatic',
    title: 'Full-Spectrum Technical SEO, Crawlability & Core Web Vitals Suite',
    category: 'marketing-ai',
    categoryLabel: 'Technical SEO & Performance',
    company: 'SOURCE CODE & Enterprise Clients',
    role: 'Technical SEO & Front End Architect',
    period: '2024 – Present',
    badge: 'TECHNICAL SEO &bull; 100/100 CWV',
    badgeColor: '#00f0ff',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    overview: 'Full-spectrum Technical SEO architecture engineered for maximum organic dominance. Covers Meta Titles & Descriptions, Crawlability & Indexability, dynamic XML Sitemaps, Canonicalization (rel="canonical"), HTTPS & 301/404 redirect governance, Silo Site Architecture, 100/100 Page Speed (LCP < 0.8s, INP < 50ms), Mobile SEO, JavaScript SEO (CSR/SSR hydration), Schema.org JSON-LD graphs, HTML5 semantic structure, WebP/AVIF images, pagination, internal linking silos, server security headers, and Google Search Console & GA4 telemetry.',
    architecture: [
      'Crawlability & Indexability Engineering: Dynamic XML sitemap clusters (news, images, index), Robots.txt directive rules, meta robots tags, and URL inspection monitoring.',
      'Canonicalization & 301/404 Redirect Governance: Self-referential and cross-domain canonical enforcement (rel="canonical") eliminating duplicate content, wildcard 301/302 redirect mapping tables, and soft 404 eradication.',
      'Site Architecture, Semantic URLs & Internal Linking: Strict topic-silo hierarchy, clean parameterized URL normalization, pagination markup (rel="next"/rel="prev"), and strategic internal link equity distribution.',
      'JavaScript SEO & Mobile-First Rendering: Resolved client-side CSR/SSR hydration pitfalls, ensured dynamic DOM content indexing, and achieved 100% mobile-first viewport parity.',
      'Schema.org JSON-LD Graphs & Semantic HTML: Multi-entity nested structured data (Organization, LocalBusiness, ProfessionalService, FAQPage, BreadcrumbList, Product, Article) and semantic HTML5 landmark tags.',
      'Core Web Vitals, Edge Server Caching & Media Compression: WebP/AVIF next-gen media with native lazy loading, sub-300ms TTFB edge caching, HSTS/CSP security headers, GSC index coverage, and GA4 telemetry.'
    ],
    techStack: ['Crawlability & Indexability', 'Robots.txt & XML Sitemaps', 'Canonical & 301/404', 'Schema.org JSON-LD', 'JavaScript & Mobile SEO', 'Core Web Vitals (100/100)', 'Google Search Console', 'Google Analytics 4', 'Server Security & HTTPS'],
    metrics: [
      { label: 'Lighthouse SEO', value: '100 / 100' },
      { label: 'Organic Traffic', value: '+420% YoY' },
      { label: 'LCP / Core Vitals', value: '0.6s / 100' }
    ]
  },
  {
    id: 'kelectric-data-integrity',
    title: 'Critical Outages Operations Data Integrity System',
    category: 'crm-ghl',
    categoryLabel: 'CRM & GHL Automations',
    company: 'K-Electric',
    role: 'Back Office Operations Executive',
    period: 'June 2023 – Jan 2024',
    badge: 'K-ELECTRIC &bull; ZERO DOWNTIME',
    badgeColor: '#ff2a54',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    overview: 'Outages Operations Data Management at Karachi’s primary utility network. Handled live operational data streams, telemetry integrity, and real-time status reporting.',
    architecture: [
      'Real-time incident verification protocols ensuring 99.98% telemetry accuracy.',
      'Zero-discrepancy reporting between field ground teams and executive dispatch boards.',
      'Operational workflow automation reducing incident logging latency.',
      'Standardized incident reporting checklists ensuring regulatory compliance.'
    ],
    techStack: ['Operational Telemetry', 'Incident Logging', 'Data Verification', 'Real-Time Sync'],
    metrics: [
      { label: 'Data Accuracy', value: '99.98%' },
      { label: 'Uptime', value: '24/7/365' },
      { label: 'Discrepancies', value: '0.00%' }
    ]
  },
  {
    id: 'ecommerce-data-scraping',
    title: 'Automated E-Commerce Data Scraping & Catalog Pipeline',
    category: 'marketing-ai',
    categoryLabel: 'Marketing & AI Automations',
    company: 'E-Commerce',
    role: 'Data Assortment Executive',
    period: 'Aug 2019 – Sep 2020',
    badge: 'DATA SCRAPING &bull; PIPELINES',
    badgeColor: '#00f0ff',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    overview: 'Automated web scraping pipelines for competitor price monitoring, product catalog normalization, and high-accuracy inventory assortment.',
    architecture: [
      'Automated Python/Node web scrapers extracting pricing and inventory data.',
      'Catalog transformation algorithms mapping disparate supplier taxonomies.',
      'Real-time price monitoring dashboards alerting merchandising teams to competitor discounts.'
    ],
    techStack: ['Data Scraping', 'Inventory Mapping', 'Competitive Analysis', 'Catalog Integration'],
    metrics: [
      { label: 'Catalog Accuracy', value: '99.9%' },
      { label: 'SKUs Managed', value: '15,000+' },
      { label: 'Extraction Time', value: '-80%' }
    ]
  }
];

// Interactive Modal Controller for Projects
(function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');

  if (!modal || !modalClose || !modalBody) return;

  window.openProjectModalById = function (projectId) {
    const p = portfolioProjects.find(item => item.id === projectId);
    if (!p) return;

    modalBody.innerHTML = `
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: ${p.badgeColor}; letter-spacing: 2px; margin-bottom: 8px;">
        // ${p.company.toUpperCase()} &bull; ${p.period}
      </div>
      <h2 style="font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; color: #fff; margin-bottom: 8px; line-height: 1.2;">
        ${p.title}
      </h2>
      <div style="font-size: 0.95rem; color: #94a3b8; font-family: 'JetBrains Mono'; margin-bottom: 20px;">
        Role: <strong style="color: #fff;">${p.role}</strong> &bull; Category: <span style="color: ${p.badgeColor};">${p.categoryLabel}</span>
      </div>
      <div style="width: 100%; height: 260px; border-radius: 12px; overflow: hidden; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.1);">
        <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      
      <p style="color: #94a3b8; font-size: 1rem; line-height: 1.8; margin-bottom: 24px;">
        ${p.overview}
      </p>

      <div style="margin-bottom: 24px;">
        <h4 style="font-family: 'Syne', sans-serif; font-size: 1.15rem; color: #fff; margin-bottom: 12px;">
          Key Architectural Deliverables
        </h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
          ${p.architecture.map(item => `
            <li style="display: flex; gap: 10px; font-size: 0.92rem; color: #cbd5e1; line-height: 1.6;">
              <span style="color: ${p.badgeColor};">✦</span>
              <span>${item}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 28px;">
        <h4 style="font-family: 'Syne', sans-serif; font-size: 1.15rem; color: #fff; margin-bottom: 12px;">
          Technologies & Tools
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${p.techStack.map(tech => `
            <span style="padding: 5px 12px; border-radius: 6px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: #e2e8f0;">
              ${tech}
            </span>
          `).join('')}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 20px; background: rgba(0, 102, 255, 0.06); border: 1px solid rgba(0, 102, 255, 0.2); border-radius: 12px;">
        ${p.metrics.map(m => `
          <div>
            <div style="font-size: 0.75rem; color: #94a3b8; font-family: 'JetBrains Mono';">${m.label}</div>
            <div style="font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; color: #fff; margin-top: 2px;">
              ${m.value}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.openProjectModal = function(index) {
    if (portfolioProjects[index]) {
      window.openProjectModalById(portfolioProjects[index].id);
    }
  };

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
})();

// Category Filter & Load More Controller
(function initProjectFilterAndLoadMore() {
  let currentCategory = 'all';
  let visibleCount = 4;
  const increment = 4;

  const tabs = document.querySelectorAll('.project-tab-btn');
  const grid = document.getElementById('projectsGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const loadMoreContainer = document.getElementById('loadMoreContainer');

  if (!grid) return;

  function renderProjects() {
    const filtered = currentCategory === 'all'
      ? portfolioProjects
      : portfolioProjects.filter(p => p.category === currentCategory);

    const toShow = filtered.slice(0, visibleCount);

    grid.innerHTML = toShow.map(p => `
      <div class="project-showcase-card" onclick="openProjectModalById('${p.id}')">
        <div class="project-preview-wrap">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
          <div class="project-badge-float" style="color: ${p.badgeColor};">${p.badge}</div>
        </div>
        <div class="project-content">
          <div class="project-header-row">
            <h3 class="project-title">${p.title}</h3>
            <span class="project-arrow">↗</span>
          </div>
          <p class="project-desc">${p.overview}</p>
          <div class="project-stats-row">
            <div class="project-stat-pill">${p.metrics[0].label}: <strong>${p.metrics[0].value}</strong></div>
            <div class="project-stat-pill ${p.badgeColor === '#ff2a54' ? 'red-stat' : ''}">${p.metrics[1].label}: <strong>${p.metrics[1].value}</strong></div>
          </div>
        </div>
      </div>
    `).join('');

    // Update Load More button visibility
    if (loadMoreContainer) {
      if (visibleCount >= filtered.length) {
        loadMoreContainer.style.display = 'none';
      } else {
        loadMoreContainer.style.display = 'flex';
        loadMoreBtn.innerHTML = `Load More Deployments (+${filtered.length - visibleCount}) ✦`;
      }
    }

    // Trigger subtle GSAP entrance on newly rendered cards
    if (typeof gsap !== 'undefined') {
      gsap.from('#projectsGrid .project-showcase-card', {
        y: 25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out'
      });
    }
  }

  // Handle Tab Switch
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      visibleCount = 4; // Reset to 4 items on tab switch
      renderProjects();
    });
  });

  // Handle Load More
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += increment;
      renderProjects();
    });
  }

  // Initial render
  renderProjects();
})();
