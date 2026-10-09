// data/experience.ts
export const experiences = [
  {
    company: "SEAR Lab, UT Arlington",
    role: "Research Assistant",
    period: "Apr 2026 - Present",
    location: "Arlington, TX",
    description: [
      "Refactored a 6-service Docker stack (Mosquitto MQTT, InfluxDB, Grafana, a FastAPI Data Hub, Python collectors) into a single self-contained FastAPI application with an embedded dashboard, eliminating the Docker/Grafana/MQTT infrastructure dependency entirely.",
      "Integrated live telemetry from three hardware APIs — LG ThinQ (AC), Rheem EcoNet (water heater), and Enphase (solar) — into a unified REST API computing a real-time Net Load metric (solar minus HVAC/HWH draw), via a background asyncio collector refreshing every 60 seconds."
    ]
  },
  {
    company: "Board Americas",
    role: "Software Developer Intern",
    period: "May 2025 - Mar 2026",
    location: "Remote, Texas",
    description: [
      "Resolved 45+ medium-to-high severity production bugs over 11 months across an enterprise forecasting platform (Aurelia/TypeScript, C#), improving platform stability across UI, state management, and backend API layers.",
      "Diagnosed and fixed critical D3.js charting bugs, including fiscal-year x-axis display errors and incorrect actual-vs-forecast rendering, correcting chart data clients relied on for business decisions.",
      "Fixed a company-wide cache-invalidation bug that let forecast data drift out of sync across users, by changing invalidation scope from per-user to per-company; also resolved a null-date bug across all datepicker components that was triggering 500 errors in production."
    ]
  },
  {
    company: "Infosys Private Ltd.",
    recognition: "3× Infosys Insta Awards (2021–22): JMeter performance pipeline, Meridian events platform, organizing a team event",
    role: "Technology Analyst",
    period: "Oct 2019 - Nov 2022",
    location: "Trivandrum, India",
    description: [
      "Developed React Native UI and integrated backend APIs for a curbside-pickup feature added to the Tractor Supply Company mobile app, improving user satisfaction by 30% based on pilot-release feedback.",
      "Built RESTful APIs in Node.js for an e-learning platform supporting 200+ concurrent users across student, teacher, and admin roles, enabling real-time session scheduling, participation, and new-user registration.",
      "Designed PostgreSQL schemas and optimized SQL queries for the platform; built a JMeter load-testing pipeline simulating 1K-10K virtual users, which identified and resolved a calendar API bottleneck for a team-reported 40% improvement in data-retrieval speed.",
      "Deployed the platform to live servers via PuTTY/WinSCP and managed process reliability with PM2, ensuring stable delivery across environments."
    ]
  }
];

// Undergrad internships (2016–2018), sourced from LinkedIn.
export const internships = [
  {
    company: "IHRD, Govt. of Kerala",
    role: "IoT & Embedded Systems Intern",
    period: "Jul 2018 - Aug 2018",
    location: "Ernakulam, India",
    summary:
      "Built end-to-end IoT prototypes connecting sensor modules and microcontrollers to cloud data pipelines, with microcontroller logic that captured telemetry and triggered real-time automated responses.",
    tags: ["IoT", "Sensor Integration", "Microcontrollers"]
  },
  {
    company: "Keltron Knowledge Center",
    role: "Big Data & Analytics Intern",
    period: "Jun 2018 - Jul 2018",
    location: "Kottayam, India",
    summary:
      "Explored distributed computing, batch processing pipelines and distributed file systems; designed schemas and ran descriptive analytics queries on Apache Cassandra.",
    tags: ["Distributed Systems", "NoSQL", "Cassandra"]
  },
  {
    company: "Cranes Software International",
    role: "Embedded Systems & Software Intern",
    period: "Jun 2017 - Aug 2017",
    location: "Bengaluru, India",
    summary:
      "Hands-on work with embedded systems architecture, microcontrollers and real-time computing, collaborating on firmware and interface programming that bridged hardware control with software logic.",
    tags: ["Microcontrollers", "RTOS", "Firmware"]
  },
  {
    company: "C-DAC",
    role: "Software Engineering Intern",
    period: "Jul 2016 - Aug 2016",
    location: "Thiruvananthapuram, India",
    summary:
      "Intensive training in core Python and internet application architecture; implemented modular backend scripts demonstrating networking and data-handling fundamentals.",
    tags: ["Python", "Internet Programming"]
  }
];
