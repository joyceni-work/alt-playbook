// ================================
// ALT Playbook Quiz Questions
// ================================
// Each question follows this shape:
// {
//   section: "Section Name",
//   question: "Question text?",
//   options: ["A", "B", "C", "D"],
//   answer: 0, // index of the correct option
//   explanation: "..."
// }

const questions = [

  // ── What is ALT? ──────────────────────────────────────────

  {
    section: "What is ALT?",
    question: "What does \"AI-First\" mean in the context of ALT?",
    options: [
      "Using AI exclusively, replacing all human work",
      "Prioritizing AI as the primary approach before considering alternatives",
      "Using AI only for automation tasks",
      "Deploying AI agents to manage the team"
    ],
    answer: 1,
    explanation: "\"AI-First signifies prioritizing the exploration and integration of AI tools as a primary approach to solving problems and enhancing workflows, rather than considering AI as an afterthought.\""
  },

  {
    section: "What is ALT?",
    question: "In ALT, what does \"Lean\" refer to?",
    options: [
      "Having a small team size",
      "Minimizing waste while keeping focus on the end product",
      "Moving fast by cutting corners on quality",
      "Using fewer AI tools to stay efficient"
    ],
    answer: 1,
    explanation: "\"Lean prioritizes value creation while minimizing waste in all its forms... ALT shifts the focus to the end product that is in the customer's hands, bringing all team members as close to it as possible.\""
  },

  {
    section: "What is ALT?",
    question: "What is \"Potential\" in the ALT model?",
    options: [
      "The team's capability ceiling",
      "Artifacts that contribute to but aren't the end product itself",
      "Unreleased features behind a flag",
      "Technical debt accumulated during sprints"
    ],
    answer: 1,
    explanation: "\"Potential refers to artifacts that contribute to the end product, but are not the end product itself – for example, design artifacts, detailed reporting, or in-depth requirements for a feature.\""
  },

  // ── Build to Think ────────────────────────────────────────

  {
    section: "Build to Think",
    question: "What does \"Build to Think\" deprioritize compared to traditional approaches?",
    options: [
      "Rapid prototyping",
      "Stakeholder feedback",
      "Long design and requirements phases",
      "Working software"
    ],
    answer: 2,
    explanation: "\"ALT encourages rapid prototyping and iterative development to foster innovation, solicit thinking, and embrace changes. Longer cycles of design iteration and requirements gathering are deprioritized in favor of active development.\""
  },

  {
    section: "Build to Think",
    question: "Why does ALT encourage quickly discarding in-flight work that isn't yielding results?",
    options: [
      "To avoid burnout",
      "AI makes it easy to start fresh, reducing attachment to a solution",
      "To meet daily shipping goals",
      "Because unfinished work counts against the ALT Scorecard"
    ],
    answer: 1,
    explanation: "\"AI tools enable teams to rapidly scaffold multiple new iterations of a single solution, reducing the investment in what's been built so far. If you're finding yourself stuck building something, ask your tool to give you a new set of questions and context to try to build the solution in a new chat window.\""
  },

  {
    section: "Build to Think",
    question: "What is a common pattern ALT warns against in traditional models?",
    options: [
      "Shipping too frequently",
      "Becoming \"married to\" a solution the longer you work on it",
      "Over-relying on stakeholder feedback",
      "Writing too many tests upfront"
    ],
    answer: 1,
    explanation: "\"A common pattern in traditional models is to become 'married to' a solution, the longer that the creator is spending on it.\""
  },

  {
    section: "Build to Think",
    question: "What can AI tools produce during requirements gathering that traditional methods can't?",
    options: [
      "Better meeting notes",
      "Automated stakeholder emails",
      "High-fidelity prototypes and documentation simultaneously, in real time",
      "Risk assessments"
    ],
    answer: 2,
    explanation: "\"Rapid prototyping via AI tools allow everyone to see outputs in real time. Take an epic and bring it into an AI tool like Fuel or Cursor to not only gather requirements faster, but produce working software against it.\""
  },

  // ── Daily Creation of Value ───────────────────────────────

  {
    section: "Daily Creation of Value",
    question: "What does the Good Morning Meeting replace in ALT?",
    options: [
      "Sprint Planning",
      "The Daily Stand Up",
      "The Sprint Retrospective",
      "Stakeholder check-ins"
    ],
    answer: 1,
    explanation: "\"This meeting is the first meeting of the day, it replaces Stand Up. In this meeting, the team sets Today's Goal and creates a plan for how to accomplish it.\""
  },

  {
    section: "Daily Creation of Value",
    question: "What is the main focus of the Good Morning Meeting?",
    options: [
      "Reviewing blockers from yesterday",
      "Assigning tasks to individuals",
      "Setting Today's Goal and the plan to achieve it",
      "Updating the project tracker"
    ],
    answer: 2,
    explanation: "\"The team sets Today's Goal and creates a plan for how to accomplish it... Here's what we will do, and here is how we will get there.\""
  },

  {
    section: "Daily Creation of Value",
    question: "What is the Daily Retro primarily used for?",
    options: [
      "Bug triage",
      "Demoing work and gathering stakeholder feedback",
      "Planning the next sprint",
      "Reviewing team performance metrics"
    ],
    answer: 1,
    explanation: "\"If the stakeholder can attend, this would be the ideal place to demo the work completed by the team during the day. Collect feedback and discuss here, or bring it to the Good Morning meeting the next day.\""
  },

  {
    section: "Daily Creation of Value",
    question: "How should work tickets be sized in ALT?",
    options: [
      "Enough to fill a full sprint",
      "Completable within a week",
      "Completable within a day",
      "Sized by story points agreed in planning"
    ],
    answer: 2,
    explanation: "\"Tickets are normalized and sized to work that can be confidently accomplished within a day.\""
  },

  // ── Reflexive AI Usage ────────────────────────────────────

  {
    section: "Reflexive AI Usage",
    question: "What characterizes Tier 1 — AI-Assisted teams?",
    options: [
      "Advanced prompt engineering and automation",
      "Reactive, basic prompting with surface-level engagement",
      "Custom GPT creation for repeated tasks",
      "Orchestrating multiple AI tools"
    ],
    answer: 1,
    explanation: "\"Basic Prompting: Simple prompts to address immediate needs or problems as they arise... Reactive Use: AI is called upon only when a specific task or issue surfaces. There's no proactive planning or integration of AI into their regular workflows.\""
  },

  {
    section: "Reflexive AI Usage",
    question: "What is a defining behavior of Tier 2 — AI-Enabled teams?",
    options: [
      "Using AI only for code generation",
      "Building prompt repositories and reusing effective prompts",
      "Fully autonomous AI agents running workflows",
      "Avoiding AI for creative or design tasks"
    ],
    answer: 1,
    explanation: "\"Teams and departments start building centralized repositories of effective prompts and AI resources. This knowledge sharing enables others to leverage successful strategies and accelerates overall adoption.\""
  },

  {
    section: "Reflexive AI Usage",
    question: "What best defines Tier 3 — AI-First teams?",
    options: [
      "They use the most AI tools on the market",
      "They have dedicated AI engineers on staff",
      "AI acts as an active agent — driving automation and orchestrating complex tasks",
      "They replaced all manual processes with AI"
    ],
    answer: 2,
    explanation: "\"AI-First signifies a shift where AI is not just a tool, but an active agent, driving automation, orchestrating complex tasks, and creating real, measurable change.\""
  },

  {
    section: "Reflexive AI Usage",
    question: "What is a \"Roving Catalyst\"?",
    options: [
      "An AI model fine-tuned for a specific domain",
      "A rotating team lead",
      "A domain expert who provides specialized help and challenges the team's ways of working",
      "A stakeholder who joins the Daily Retro"
    ],
    answer: 2,
    explanation: "\"The ALT model intentionally staffs a 'Roving Catalyst' role to provide for domain expertise where needed... They challenge how the team is working, injecting new ideas or ensuring alignment to ALT principles.\""
  },

  {
    section: "Reflexive AI Usage",
    question: "Where does AI tend to struggle most according to ALT?",
    options: [
      "Writing code in popular languages",
      "Summarizing long documents",
      "Open-ended problems requiring implicit knowledge or challenging requirements",
      "Generating initial prototypes"
    ],
    answer: 2,
    explanation: "\"Open-ended solutions: AI can struggle with tasks where there are many valid approaches and no single 'correct' answer... Implicit knowledge requirements: It lacks the ability to understand unspoken conventions, architectural vision, or deep implicit knowledge of a codebase.\""
  },

  // ── Radical Collaboration ─────────────────────────────────

  {
    section: "Radical Collaboration",
    question: "In a mobbing session, what is the Driver's role?",
    options: [
      "Directing the implementation strategy",
      "Providing feedback and asking questions",
      "Doing the typing, implementing the Navigator's vision",
      "Managing stakeholder communication"
    ],
    answer: 2,
    explanation: "\"This person is doing the typing, but is practically taking notes for or implementing the vision of the navigator(s) on the team.\""
  },

  {
    section: "Radical Collaboration",
    question: "What is the minimum mobbing time ALT teams should aim for daily?",
    options: [
      "1 hour",
      "4 hours",
      "2 hours",
      "Half a sprint"
    ],
    answer: 1,
    explanation: "\"Teams mob for a minimum of 4 hours every day, with a preference for even more.\""
  },

  {
    section: "Radical Collaboration",
    question: "What does \"Stop starting, start finishing\" mean in ALT?",
    options: [
      "Avoid pitching new projects mid-sprint",
      "Prioritize in-flight work over picking up new work",
      "Finish documentation before writing code",
      "Complete all tickets before attending meetings"
    ],
    answer: 1,
    explanation: "\"Team members prioritize existing in-flight work over picking up new work, wherever possible. This also organically enables more pair and mob programming.\""
  },

  {
    section: "Radical Collaboration",
    question: "How many hours per week should stakeholders ideally engage with the team?",
    options: [
      "2–5 hours",
      "1 hour per day",
      "Only during Sprint Reviews",
      "At least 10 hours, ideally closer to 20"
    ],
    answer: 3,
    explanation: "\"Stakeholder engagement of at least 10 hours each week, ideally pushing closer to 20. Stakeholders join working sessions with the team, co-creating the end product.\""
  },

  // ── Everyone Contributes ──────────────────────────────────

  {
    section: "Everyone Contributes",
    question: "What is ALT's view on design files, architecture diagrams, and requirements docs?",
    options: [
      "They should be eliminated entirely",
      "They are the primary deliverable of the team",
      "They are critical ingredients, but unrealized until software is built and shipped",
      "They should only be created by specialists"
    ],
    answer: 2,
    explanation: "\"To be clear, these are all critical ingredients for a successful software product. Until the software is both built and shipped, however, they're unrealized potential.\""
  },

  {
    section: "Everyone Contributes",
    question: "What does DVF stand for in how ALT structures team skills?",
    options: [
      "Design, Velocity, Features",
      "Discovery, Validation, Feedback",
      "Desirability, Viability, Feasibility",
      "Development, Verification, Finalization"
    ],
    answer: 2,
    explanation: "\"Teams are comprised of the following roles that follow the DVF Framework: Engineering skills (Feasibility), Product skills (Viability), Design skills (Desirability).\""
  },

  {
    section: "Everyone Contributes",
    question: "How do ALT teams handle project hygiene and reporting?",
    options: [
      "They skip it — stakeholders get updates through demos only",
      "They maintain high organization with DRIs and AI automations, without verbose weekly reports",
      "A dedicated project manager handles all reporting",
      "Weekly status meetings replace the Daily Retro"
    ],
    answer: 1,
    explanation: "\"ALT teams do not generate verbose weekly reports or status meetings. Daily stakeholder communication and regular working software, combined with engaged stakeholders, ensure consistent tracking of deliverables and goals.\""
  },

  // ── Bring the Pain Forward ────────────────────────────────

  {
    section: "Bring the Pain Forward",
    question: "When should an automated pipeline to production be set up?",
    options: [
      "After the first major feature ships",
      "During the final sprint",
      "Day zero — it's the highest priority",
      "Once the team has agreed on the tech stack"
    ],
    answer: 2,
    explanation: "\"An automated pipeline to production is a day zero priority for ALT teams and takes priority over other development work. Establishing an automated path to production is the most important work a team can do.\""
  },

  {
    section: "Bring the Pain Forward",
    question: "How frequently should ALT teams ship incremental releases?",
    options: [
      "Every sprint",
      "Weekly",
      "Every day",
      "When the product is stable enough"
    ],
    answer: 2,
    explanation: "\"Teams produce incremental releases frequently (every day!) to gather feedback and quickly make changes.\""
  },

  {
    section: "Bring the Pain Forward",
    question: "What does \"Bring the Pain Forward\" mean?",
    options: [
      "Assign the hardest tasks to senior engineers first",
      "Confront difficult integration challenges early rather than deferring them",
      "Push through team friction to hit deadlines",
      "Increase velocity by removing all blockers in Sprint 1"
    ],
    answer: 1,
    explanation: "\"This mindset encourages teams to confront difficult tasks, such as system integration, upfront rather than deferring them. By doing so, teams identify and resolve issues early, reducing the risk of complications during later stages of development.\""
  },

  {
    section: "Bring the Pain Forward",
    question: "What pipeline risk does ALT specifically call out?",
    options: [
      "Deploying too frequently",
      "Over-relying on AI for code reviews",
      "Having only one person who understands and can maintain the pipeline",
      "Running too many automated tests"
    ],
    answer: 2,
    explanation: "\"Single Point of Failure for Pipelines: Ensure team members are all capable of diagnosing and working through configurations of automated pipelines.\""
  }

];
